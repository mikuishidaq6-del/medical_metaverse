import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const DANGEROUS_SYMPTOMS = [
  { pattern: /38.*℃|38.*度|高熱|熱.*38/i, keyword: '発熱' },
  { pattern: /出血.*止まら|血.*止まら|出血.*続/i, keyword: '出血' },
  { pattern: /息.*苦しい|呼吸.*苦|息切れ.*ひど|呼吸.*困難/i, keyword: '呼吸困難' },
  { pattern: /胸.*痛|胸.*苦しい/i, keyword: '胸痛' },
  { pattern: /意識.*ぼんやり|意識.*もうろう|意識.*はっきり/i, keyword: '意識障害' },
  { pattern: /腹.*痛.*強い|お腹.*痛.*ひど/i, keyword: '強い腹痛' },
  { pattern: /水分.*とれ|飲め.*ない|水.*飲め/i, keyword: '水分摂取困難' },
  { pattern: /ぐったり|動け.*ない|起き.*れない/i, keyword: '重度倦怠感' },
  { pattern: /急.*悪化|急.*悪く|突然.*悪/i, keyword: '急激な悪化' },
];

const YELLOW_SYMPTOMS = [
  { pattern: /37.*℃|微熱|熱.*37/i, keyword: '微熱' },
  { pattern: /だるい|倦怠感|疲れ.*ひど/i, keyword: '倦怠感' },
  { pattern: /吐き気|嘔吐|気持ち.*悪/i, keyword: '消化器症状' },
  { pattern: /下痢|便.*ゆる/i, keyword: '下痢' },
  { pattern: /頭痛|頭.*痛/i, keyword: '頭痛' },
  { pattern: /食欲.*ない|食べ.*れない/i, keyword: '食欲不振' },
];

interface RequestBody {
  message: string;
  userId: string;
  diseaseType: string;
  treatmentPhase: string;
}

function detectTriageLevel(message: string, treatmentPhase: string): string {
  const lowerMessage = message.toLowerCase();

  for (const symptom of DANGEROUS_SYMPTOMS) {
    if (symptom.pattern.test(message)) {
      return 'RED';
    }
  }

  if (treatmentPhase === 'post_transplant') {
    if (/発熱|熱|下痢|皮膚.*悪化|皮膚.*ひど/.test(message)) {
      return 'RED';
    }
  }

  for (const symptom of YELLOW_SYMPTOMS) {
    if (symptom.pattern.test(message)) {
      return 'YELLOW';
    }
  }

  return 'GREEN';
}

async function generateAIResponse(
  message: string,
  diseaseType: string,
  treatmentPhase: string,
  triageLevel: string
): Promise<any> {
  const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');

  if (!anthropicApiKey) {
    throw new Error('ANTHROPIC_API_KEY is not configured');
  }

  const systemPrompt = `あなたは白血病患者のための経験豊富で思いやりのあるAI看護師です。

役割と責任:
- 患者の症状や不安に共感的に応答する
- 一般的な医療情報を提供する（診断はしない）
- 危険な症状を見極め、適切に受診を勧める
- 患者が主治医に伝える内容を整理する支援をする

応答は必ず以下のJSON形式で返してください:
{
  "empathy": "患者への共感的な言葉",
  "summary": "状況の簡潔なまとめ",
  "triage_level": "${triageLevel}",
  "general_info": "症状や治療に関する一般的な説明",
  "action": "推奨される行動"
}

トリアージレベル別の対応:
- RED: 直ちに医療機関への連絡・受診を強く勧める。夜間・休日なら救急相談も提案。
- YELLOW: できるだけ早く（本日中または近日中に）主治医や外来に相談するよう勧める。
- GREEN: セルフケアのアドバイスと経過観察の案内。気になることがあれば次回受診時に相談を勧める。

重要な制約:
- 診断、病名の断定、薬の指示はしない
- 緊急症状を軽視しない
- 専門的すぎる医学用語は避け、わかりやすい言葉を使う
- 患者の不安に寄り添いつつ、必要な行動を明確に示す

患者情報:
- 疾患タイプ: ${diseaseType}
- 治療フェーズ: ${treatmentPhase}
- 現在のトリアージレベル: ${triageLevel}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        system: systemPrompt,
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.content[0].text;

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return {
      empathy: "お話を聞かせていただきありがとうございます。",
      summary: "現在の状況について確認させていただきました。",
      triage_level: triageLevel,
      general_info: content,
      action: "ご不安なことがございましたら、いつでもご相談ください。"
    };
  } catch (error) {
    console.error('AI generation error:', error);
    throw error;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { message, userId, diseaseType, treatmentPhase }: RequestBody = await req.json();

    if (!message || !userId) {
      return new Response(
        JSON.stringify({ error: 'メッセージとユーザーIDが必要です' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const triageLevel = detectTriageLevel(message, treatmentPhase);

    const aiResponse = await generateAIResponse(
      message,
      diseaseType,
      treatmentPhase,
      triageLevel
    );

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (supabaseUrl && supabaseServiceKey) {
      await fetch(`${supabaseUrl}/rest/v1/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify({
          user_id: userId,
          message,
          response: aiResponse,
          triage_level: triageLevel,
        }),
      });
    }

    return new Response(
      JSON.stringify(aiResponse),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        error: 'エラーが発生しました。もう一度お試しください。',
        details: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

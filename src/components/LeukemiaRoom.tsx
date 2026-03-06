import { useState } from 'react';
import { Heart, MessageCircle, Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ChatInterface } from './ChatInterface';
import { ProfileSettings } from './ProfileSettings';

export function LeukemiaRoom() {
  const [showChat, setShowChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { profile, signOut } = useAuth();

  const handleSignOut = async () => {
    if (confirm('ログアウトしますか？')) {
      await signOut();
    }
  };

  const getDiseaseLabel = (type: string) => {
    const labels: Record<string, string> = {
      AML: '急性骨髄性白血病',
      ALL: '急性リンパ性白血病',
      CML: '慢性骨髄性白血病',
      MDS: '骨髄異形成症候群',
      other: 'その他',
      unknown: 'わからない',
    };
    return labels[type] || type;
  };

  const getTreatmentPhaseLabel = (phase: string) => {
    const labels: Record<string, string> = {
      in_treatment: '治療中',
      follow_up: '経過観察中',
      pre_transplant: '移植前',
      post_transplant: '移植後',
      unknown: 'わからない',
    };
    return labels[phase] || phase;
  };

  if (showSettings) {
    return <ProfileSettings onClose={() => setShowSettings(false)} />;
  }

  if (showChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="w-6 h-6 text-blue-500" />
              <div>
                <h1 className="font-bold text-gray-800">AI看護師相談</h1>
                <p className="text-xs text-gray-600">{profile?.nickname}さん</p>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              戻る
            </button>
          </div>
        </div>

        <div className="flex-1 max-w-4xl mx-auto w-full bg-white shadow-lg">
          <ChatInterface />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Heart className="w-10 h-10" />
                <div>
                  <h1 className="text-2xl font-bold">白血病ルーム</h1>
                  <p className="text-blue-100">安心してお話しできる場所</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">ログアウト</span>
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-3">
                <User className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="font-bold text-gray-800 mb-2">
                    ようこそ、{profile?.nickname}さん
                  </h2>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>疾患タイプ: {getDiseaseLabel(profile?.disease_type || '')}</p>
                    <p>治療フェーズ: {getTreatmentPhaseLabel(profile?.treatment_phase || '')}</p>
                  </div>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="mt-3 flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <Settings className="w-4 h-4" />
                    <span>設定を変更</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <Heart className="w-12 h-12 mb-4 opacity-80" />
                <h3 className="text-xl font-bold mb-2">AI看護師</h3>
                <p className="text-blue-100 mb-4 leading-relaxed">
                  経験豊富な看護師のように、あなたの症状や不安に寄り添います。いつでも安心してご相談ください。
                </p>
                <button
                  onClick={() => setShowChat(true)}
                  className="flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors w-full justify-center"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>相談する</span>
                </button>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-3">AI看護師ができること</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>症状や不安についての相談</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>受診の目安についてのアドバイス</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>主治医に伝える内容の整理</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>一般的な医療情報の提供</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>心理的サポートと傾聴</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-bold text-red-800 mb-3 flex items-center space-x-2">
                <span>緊急時の対応</span>
              </h3>
              <p className="text-sm text-red-700 mb-3">
                以下の症状がある場合は、すぐに医療機関に連絡してください：
              </p>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-red-800">
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">●</span>
                  <span>38℃以上の発熱</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">●</span>
                  <span>止まりにくい出血</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">●</span>
                  <span>強い息苦しさ</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">●</span>
                  <span>意識がぼんやりする</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">●</span>
                  <span>強い胸痛や腹痛</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">●</span>
                  <span>水分がとれない</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

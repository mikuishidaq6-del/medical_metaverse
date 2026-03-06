import { useState, useEffect, useRef } from 'react';
import { Send, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Conversation, AIResponse } from '../types';

export function ChatInterface() {
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, profile } = useAuth();

  useEffect(() => {
    loadConversations();
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user || !profile || loading) return;

    setLoading(true);
    const userMessage = message;
    setMessage('');

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-nurse`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          userId: user.id,
          diseaseType: profile.disease_type,
          treatmentPhase: profile.treatment_phase,
        }),
      });

      if (!response.ok) {
        throw new Error('メッセージの送信に失敗しました');
      }

      await loadConversations();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('エラーが発生しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  const getTriageIcon = (level: string) => {
    switch (level) {
      case 'RED':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'YELLOW':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'GREEN':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getTriageBgColor = (level: string) => {
    switch (level) {
      case 'RED':
        return 'bg-red-50 border-red-200';
      case 'YELLOW':
        return 'bg-yellow-50 border-yellow-200';
      case 'GREEN':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (loadingHistory) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversations.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="mb-2">AI看護師がお話を伺います</p>
            <p className="text-sm">お気軽にご相談ください</p>
          </div>
        ) : (
          conversations.map((conv) => (
            <div key={conv.id} className="space-y-3">
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                  {conv.message}
                </div>
              </div>

              <div className="flex justify-start">
                <div className={`border rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] ${getTriageBgColor(conv.triage_level)}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {getTriageIcon(conv.triage_level)}
                    <span className="font-medium text-sm text-gray-700">AI看護師</span>
                  </div>

                  <div className="space-y-3 text-sm text-gray-800">
                    {conv.response.empathy && (
                      <p className="font-medium">{conv.response.empathy}</p>
                    )}

                    {conv.response.summary && (
                      <p>{conv.response.summary}</p>
                    )}

                    {conv.response.general_info && (
                      <div className="bg-white bg-opacity-50 rounded-lg p-3">
                        <p className="text-xs font-medium text-gray-600 mb-1">一般的な情報</p>
                        <p>{conv.response.general_info}</p>
                      </div>
                    )}

                    {conv.response.action && (
                      <div className={`rounded-lg p-3 ${
                        conv.triage_level === 'RED'
                          ? 'bg-red-100 border border-red-300'
                          : conv.triage_level === 'YELLOW'
                          ? 'bg-yellow-100 border border-yellow-300'
                          : 'bg-white bg-opacity-50'
                      }`}>
                        <p className="text-xs font-medium text-gray-600 mb-1">
                          {conv.triage_level === 'RED' ? '重要な案内' : '推奨される行動'}
                        </p>
                        <p className="font-medium">{conv.response.action}</p>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 mt-2">
                    {new Date(conv.created_at).toLocaleString('ja-JP')}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="症状や気になることを入力してください..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Heart, AlertCircle } from 'lucide-react';
import { DiseaseType, TreatmentPhase } from '../types';

const DISEASE_TYPES: { value: DiseaseType; label: string }[] = [
  { value: 'AML', label: '急性骨髄性白血病（AML）' },
  { value: 'ALL', label: '急性リンパ性白血病（ALL）' },
  { value: 'CML', label: '慢性骨髄性白血病（CML）' },
  { value: 'MDS', label: '骨髄異形成症候群（MDS）' },
  { value: 'other', label: 'その他' },
  { value: 'unknown', label: 'わからない' },
];

const TREATMENT_PHASES: { value: TreatmentPhase; label: string }[] = [
  { value: 'in_treatment', label: '治療中' },
  { value: 'follow_up', label: '経過観察中' },
  { value: 'pre_transplant', label: '移植前' },
  { value: 'post_transplant', label: '移植後' },
  { value: 'unknown', label: 'わからない' },
];

export function ProfileSetup() {
  const [nickname, setNickname] = useState('');
  const [diseaseType, setDiseaseType] = useState<DiseaseType>('unknown');
  const [treatmentPhase, setTreatmentPhase] = useState<TreatmentPhase>('unknown');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreedToDisclaimer, setAgreedToDisclaimer] = useState(false);
  const { createProfile } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToDisclaimer) {
      setError('ご利用にあたっての注意事項に同意してください');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await createProfile(nickname, diseaseType, treatmentPhase);
    } catch (err: any) {
      setError(err.message || 'プロフィール作成中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <div className="flex items-center justify-center mb-6">
          <Heart className="w-12 h-12 text-blue-500" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          プロフィール設定
        </h1>
        <p className="text-center text-gray-600 mb-6">
          より適切なサポートを提供するため、いくつか教えてください
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-2">ご利用にあたっての重要な注意事項</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>AI看護師は医療者の代わりではありません</li>
                <li>診断、治療の指示、薬の変更などは行いません</li>
                <li>緊急時は直ちに医療機関に連絡してください</li>
                <li>不安な症状があれば主治医に相談してください</li>
                <li>このサービスは情報提供と心理的サポートを目的としています</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ニックネーム
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="例: さくら"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              疾患タイプ
            </label>
            <select
              value={diseaseType}
              onChange={(e) => setDiseaseType(e.target.value as DiseaseType)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              {DISEASE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              治療フェーズ
            </label>
            <select
              value={treatmentPhase}
              onChange={(e) => setTreatmentPhase(e.target.value as TreatmentPhase)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              {TREATMENT_PHASES.map((phase) => (
                <option key={phase.value} value={phase.value}>
                  {phase.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="disclaimer"
              checked={agreedToDisclaimer}
              onChange={(e) => setAgreedToDisclaimer(e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="disclaimer" className="text-sm text-gray-700">
              上記の注意事項を理解し、同意します
            </label>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '設定中...' : '白血病ルームに入る'}
          </button>
        </form>
      </div>
    </div>
  );
}

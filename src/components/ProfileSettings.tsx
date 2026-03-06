import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { X } from 'lucide-react';
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

interface ProfileSettingsProps {
  onClose: () => void;
}

export function ProfileSettings({ onClose }: ProfileSettingsProps) {
  const { profile, updateProfile } = useAuth();
  const [nickname, setNickname] = useState(profile?.nickname || '');
  const [diseaseType, setDiseaseType] = useState<DiseaseType>(
    (profile?.disease_type as DiseaseType) || 'unknown'
  );
  const [treatmentPhase, setTreatmentPhase] = useState<TreatmentPhase>(
    (profile?.treatment_phase as TreatmentPhase) || 'unknown'
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await updateProfile({
        nickname,
        disease_type: diseaseType,
        treatment_phase: treatmentPhase,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || '更新中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">プロフィール設定</h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
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

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-lg transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '更新中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

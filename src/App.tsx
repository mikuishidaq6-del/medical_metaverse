import { useAuth } from './contexts/AuthContext';
import { Auth } from './components/Auth';
import { ProfileSetup } from './components/ProfileSetup';
import { LeukemiaRoom } from './components/LeukemiaRoom';

function App() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  if (!profile) {
    return <ProfileSetup />;
  }

  return <LeukemiaRoom />;
}

export default App;

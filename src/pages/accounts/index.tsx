import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginSection from './components/LoginSection';
import RegisterSection from './components/RegisterSection';
import LogoutSection from './components/LogoutSection';

type Mode = 'login' | 'register' | 'logout';

export default function AccountsPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem('accessToken'),
  );

  const isLoggedIn = !!accessToken;

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
  };
  const handleMoveToRegister = () => {
    setMode('register');
  };
  const handleMoveToLogin = () => {
    setMode('login');
  };
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    setMode('login');
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-93.75 min-h-screen relative bg-gray-ui flex flex-col">
        <Header />
        {!isLoggedIn && mode === 'login' && (
          <LoginSection
            onLoginSuccess={handleLoginSuccess}
            onMoveToRegister={handleMoveToRegister}
          />
        )}

        {!isLoggedIn && mode === 'register' && (
          <RegisterSection
            onRegisterSuccess={handleMoveToLogin}
            onMoveToLogin={handleMoveToLogin}
          />
        )}

        {isLoggedIn && <LogoutSection onLogout={handleLogout} />}
        <Footer />
      </div>
    </div>
  );
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginSection from './components/LoginSection';
import RegisterSection from './components/RegisterSection';
import LogoutSection from './components/LogoutSection';

export default function AccountsPage() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-93.75 min-h-screen relative bg-gray-ui">
        <Header />
        <LogoutSection />
        <Footer />
      </div>
    </div>
  );
}

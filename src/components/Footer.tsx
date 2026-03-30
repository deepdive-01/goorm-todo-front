import { useNavigate, useLocation } from 'react-router-dom';
import TodayIcon from '@/assets/today-icon.svg?react';
import CalendarIcon from '@/assets/calendar-icon.svg?react';
import FriendsIcon from '@/assets/friends-icon.svg?react';
import SettingsIcon from '@/assets/settings-icon.svg?react';
import Text from './Text';

const tabs = [
  { key: 'today', label: '오늘', Icon: TodayIcon, path: '/today' },
  { key: 'calendar', label: '캘린더', Icon: CalendarIcon, path: '/calendar' },
  { key: 'friends', label: '친구', Icon: FriendsIcon, path: '/friends' },
  { key: 'accounts', label: '계정', Icon: SettingsIcon, path: '/accounts' },
] as const;

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className="w-full h-18 flex flex-row bg-white sticky bottom-0">
      {tabs.map((tab) => {
        const isActive =   location.pathname === tab.path || (tab.key === 'friends' && location.pathname === '/friendstodo');

        return (
          <FooterButton
            key={tab.key}
            label={tab.label}
            Icon={tab.Icon}
            onClick={() => navigate(tab.path)}
            isActive={isActive}
          />
        );
      })}
    </footer>
  );
}

type FooterButtonProps = {
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  isActive: boolean;
};

function FooterButton({ label, Icon, onClick, isActive }: FooterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex flex-col gap-1 items-center justify-center cursor-pointer group"
    >
      <Icon className={`group-hover:scale-105 ${isActive ? 'text-primary' : 'text-black'}`} />
      <Text className={`group-hover:scale-105 ${isActive ? 'text-primary' : 'text-black'}`}>
        {label}
      </Text>
    </button>
  );
}

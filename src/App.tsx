import { Navigate, Route, Routes } from "react-router-dom";
import TodayPage from "@/pages/today";
import CalendarPage from "@/pages/calendar";
import FriendsPage from "@/pages/friends";
import SettingsPage from "@/pages/settings";
import FriendsTodoPage from "@/pages/friendstodo"
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/today" replace />} />
      <Route path="/today" element={<TodayPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/friends" element={<FriendsPage />} />
      <Route path="/friendstodo" element={<FriendsTodoPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}

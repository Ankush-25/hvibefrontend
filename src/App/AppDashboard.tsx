import { useEffect, useState } from "react";
import HeroSection from "./DashboardHeroSec/HeroSecDashboard";
import RecomendedJobsCrousel from "./RecomendedJob";
import { useAuth } from "../context/AuthContext";

function AppDashboard() {
  const [userName, setUserName] = useState<string>("");
  const { currentUser } = useAuth();

  useEffect(() => {
    // Get user's name from auth context or localStorage
    if (currentUser && currentUser.username) {
      setUserName(currentUser.username);
    }
  }, [currentUser]);

  return (
    <div className="dashboard-container">
      <HeroSection userName={userName} />
      <RecomendedJobsCrousel theme="dark" />
    </div>
  );
}

export default AppDashboard;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faMapMarkerAlt,
  faBuilding,
  faUser,
  faGraduationCap,
  faBell,
  faSignInAlt,
  faUserPlus,
  faBars,
  faTimes,
  faSignOutAlt,
  faUserCog,
  faBookmark,
  faFileAlt,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../../authContext";
import { Imagepaths } from "../../../../../src/assets/Global_Need_files/ImagesPaths";
import { Api_url } from "../../../../globalConfig";
import { setSearchResult } from "../../../../redux/searchSlice";
import { RootState } from "../../../../types/redux";
import axios from "axios";

interface MenuItem {
  label: string;
  path?: string;
  icon: any;
  className?: string; // Keep for compatibility if needed, though mostly replaced by Tailwind
  action?: () => void;
}

export function LandingNavBar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [notifications] = useState(5);
  const userAvtar = useSelector((state: RootState) => state.usrProfile?.ProfileImage);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleUserDropdown = () => setShowUserDropdown(!showUserDropdown);
  const SearchedData = useSelector((state: RootState) => state.search.data);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      if (searchQuery.trim()) {
        const getSerRes = await axios.get(
          `${Api_url}/searchJobs/?query=${encodeURIComponent(
            searchQuery
          )}&location=${encodeURIComponent(locationInput)}`
        );
        if (getSerRes.status === 200) {
          console.log(getSerRes.data);
          dispatch(setSearchResult(getSerRes.data));
          console.log(SearchedData);
          localStorage.setItem(
            "jobSearchResults",
            JSON.stringify(getSerRes.data)
          );
        }
      }
    } catch (error) {
      console.error("unable to Search", error);
    } finally {
      navigate("/search-results");
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
    navigate("/");
  };

  const condObj: MenuItem | null = (() => {
    if (["/app"].includes(pathname)) {
      return null; // fallback if condition not met
    }
    return {
      label: "Dashboard",
      path: "/app",
      icon: faHome,
    };
  })();

  const menuItems: MenuItem[] = [
    { label: "Companies", path: "/companies", icon: faBuilding },
    { label: "Freshers", path: "/freshers", icon: faUser },
    { label: "Internships", path: "/internships", icon: faGraduationCap },
    ...(condObj ? [condObj] : []),
  ];

  const userMenuItems: MenuItem[] = [
    {
      label: "My Profile",
      icon: faUserCog,
      action: () => navigate("/app/profile"),
    },
    {
      label: "Saved Jobs",
      icon: faBookmark,
      action: () => navigate("/saved-jobs"),
    },
    {
      label: "My Applications",
      icon: faFileAlt,
      action: () => navigate("/applications"),
    },
    { label: "Logout", icon: faSignOutAlt, action: handleLogout },
  ];

  const shouldShowSearch = !["/", "/home"].includes(pathname);

  return (
    <div className="flex justify-between items-center px-4 py-4 md:px-8 bg-[#1d1d1d] backdrop-blur-md border-b-2 border-white/10 sticky top-0 z-[1000] font-sans shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Logo Section */}
      <div
        className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
        onClick={() => navigate("/")}
      >
        <img
          src={Imagepaths.HiringstoreslogoPath}
          alt="HiringStores Logo"
          className="h-[60px] transition-[filter] duration-300 hover:brightness-110"
        />
      </div>

      {/* Search Section */}
      {shouldShowSearch && (
        <div className="flex-1 max-w-[600px] mx-4 md:mx-8 hidden md:block">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white rounded-full px-6 py-2 shadow-md transition-all duration-300 border border-black/10 focus-within:shadow-lg focus-within:border-[#007bff]/30"
          >
            <FontAwesomeIcon icon={faSearch} className="text-gray-500 text-lg mr-4" />
            <input
              type="text"
              placeholder="Search jobs, companies, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
              className="flex-1 border-none outline-none text-sm text-[#333] bg-transparent placeholder:text-gray-500"
            />
            <div className="w-[1px] h-6 bg-gray-500 mx-2"></div>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Location"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
              className="w-[150px] border-none outline-none text-sm text-[#333] bg-transparent placeholder:text-gray-500"
            />
            <button
              type="submit"
              className="bg-[#007bff] text-white border-none px-6 py-2 rounded-full cursor-pointer font-semibold transition-all duration-300 ml-4 hover:bg-[#0056b3] hover:-translate-y-[1px]"
            >
              <span>Search</span>
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden flex bg-none border-none text-gray-600 text-2xl cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-[#007bff]/10 hover:text-[#007bff]"
      >
        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
      </button>

      {/* Main Navigation */}
      <nav className={`flex items-center gap-2 ${isMobileMenuOpen ? 'flex flex-col w-full mt-4 bg-white rounded-xl p-4 shadow-lg animate-slideInFromTop md:flex-row md:w-auto md:mt-0 md:bg-transparent md:p-0 md:shadow-none' : 'hidden md:flex'}`}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path || '/'}
            className={`no-underline text-gray-600 font-semibold px-5 py-3 rounded-lg transition-all duration-300 relative text-sm whitespace-nowrap flex items-center gap-2 hover:bg-[#007bff]/10 hover:text-[#007bff] hover:-translate-y-[2px] hover:scale-105 group md:w-auto w-full justify-center md:justify-start md:mb-0 mb-2 ${item.className === 'jobs-link' ? 'bg-gradient-to-br from-[#28a745] to-[#20c997] text-white animate-pulse hover:bg-gradient-to-br hover:from-[#218838] hover:to-[#1e7e34] hover:scale-105' : ''}`}
          >
            <FontAwesomeIcon icon={item.icon} className="text-base transition-transform duration-300 group-hover:scale-110" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="flex items-center gap-4 md:gap-2">
        {currentUser ? (
          <>
            <button className="relative bg-none border-none text-gray-600 text-lg cursor-pointer p-2 rounded-full transition-all duration-300 hover:bg-[#007bff]/10 hover:text-[#007bff] hover:scale-110">
              <FontAwesomeIcon icon={faBell} />
              {notifications > 0 && (
                <span className="absolute -top-[2px] -right-[2px] bg-red-600 text-white text-[0.7rem] font-semibold px-[0.4rem] py-[0.2rem] rounded-[10px] min-w-[18px] text-center animate-pulse">
                  {notifications}
                </span>
              )}
            </button>

            <div className="relative">
              <div
                onClick={toggleUserDropdown}
                className="relative cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                  <img
                    className="w-full h-full object-cover"
                    src={userAvtar || Imagepaths.globalProfileAvatar}
                    alt="User Avatar"
                  />
                </div>
              </div>

              {showUserDropdown && (
                <div className="absolute top-full right-0 bg-white rounded-xl shadow-xl border border-black/10 min-w-[200px] z-[1000] overflow-hidden animate-slideInFromTop mt-2">
                  {userMenuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.action?.();
                        setShowUserDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-none border-none text-left cursor-pointer transition-all duration-300 text-gray-600 text-sm font-medium hover:bg-[#007bff]/10 hover:text-[#007bff] group border-t border-black/10 first:border-none"
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="text-base text-gray-500 transition-colors duration-300 group-hover:text-[#007bff]"
                      />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex gap-4 items-center">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer transition-all duration-300 border border-gray-500 bg-transparent text-gray-300 hover:bg-gray-500/50 hover:text-white hover:-translate-y-[1px]"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="text-sm" />
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer transition-all duration-300 border border-transparent bg-[#007bff] text-white hover:bg-[#0056b3] hover:-translate-y-[1px] hover:shadow-lg"
            >
              <FontAwesomeIcon icon={faUserPlus} className="text-sm" />
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

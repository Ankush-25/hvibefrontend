import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {
  NavbarContainer,
  LogoSection,
  SearchSection,
  SearchBar,
  MainNavigation,
  NavItem,
  UserSection,
  NotificationButton,
  NotificationBadge,
  UserProfile,
  ActionButtons,
  AuthButton,
  MobileMenuButton,
  DropdownMenu,
  DropdownItem,
} from "./navbarstyes";
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
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../../authContext";
import { Imagepaths } from "../../../../../src/assets/Global_Need_files/ImagesPaths";
import { useEffect } from "react";
import { Api_url } from "../../../../globalConfig";
import { setSearchResult } from "../../../../redux/searchSlice";
import axios from "axios";
export function LandingNavBar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [notifications] = useState(5);
  const userAvtar = useSelector((state) => state.usrProfile?.ProfileImage);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { pathname } = useLocation();
  const [showLoginButton, setshowLoginButton] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleUserDropdown = () => setShowUserDropdown(!showUserDropdown);
  const SearchedData = useSelector((state) => state.search.data)
  
  useEffect(() => {
      if (currentUser && currentUser?.authtoken) {
          setshowLoginButton(true);
        }
  }, [currentUser]);

  const handleSearch = async (e) => {
    e?.preventDefault();    
    try {
      if (searchQuery.trim()) {
        const getSerRes = await axios.get(
          `${Api_url}/searchJobs/?query=${encodeURIComponent(
            searchQuery
          )}&location=${encodeURIComponent(locationInput)}`
        );
        if (getSerRes.status == 200) {
          console.log(getSerRes.data);
            dispatch(setSearchResult(getSerRes.data))
            console.log(SearchedData)
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

  useEffect(() => {
  console.log("Redux updated:", SearchedData);
  }, [SearchedData]);

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
    navigate("/");
  };

  const condObj = (() => {
    if (["/app"].includes(pathname)) {
      return null; // fallback if condition not met
    }
    return {
      label: "Dashboard",
      path: "/app",
      icon: faHome,
    };
  })();

  const menuItems = [
    { label: "Companies", path: "/companies", icon: faBuilding },
    { label: "Freshers", path: "/freshers", icon: faUser },
    { label: "Internships", path: "/internships", icon: faGraduationCap },
    { ...condObj },
    // { label: 'Career Guidance', path: '/career', icon: faGraduationCap },
  ];

  const userMenuItems = [
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
    <NavbarContainer>
      <LogoSection onClick={() => navigate("/")}>
        <img
          src={Imagepaths.HiringstoreslogoPath}
          alt="HiringStores Logo"
          style={{ height: "60px" }}
        />
      </LogoSection>
      {shouldShowSearch && (
        <SearchSection>
          <SearchBar onSubmit={handleSearch}>
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search jobs, companies, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
            />
            <div className="location-divider"></div>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
            <input
              type="text"
              placeholder="Location"
              className="location-input"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
            />
            <button type="submit" className="search-button">
              <span>Search</span>
            </button>
          </SearchBar>
        </SearchSection>
      )}

      <MobileMenuButton onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
      </MobileMenuButton>

      <MainNavigation isMobileMenuOpen={isMobileMenuOpen}>
        {menuItems.map((item, index) => (
          <NavItem
            key={index}
            to={item.path}
            className={item.className}
            activeClassName="active"
          >
            <FontAwesomeIcon icon={item.icon} className="nav-icon" />
            {item.label}
          </NavItem>
        ))}
      </MainNavigation>

      <UserSection>
        {currentUser ? (
          <>
            <NotificationButton>
              <FontAwesomeIcon icon={faBell} />
              {notifications > 0 && (
                <NotificationBadge>{notifications}</NotificationBadge>
              )}
            </NotificationButton>

            <div style={{ position: "relative" }}>
              <UserProfile onClick={toggleUserDropdown}>
                <div className="user-avatar">
                  <img
                    className="user-avatar"
                    src={userAvtar || Imagepaths.globalProfileAvatar}
                  />
                </div>
              </UserProfile>

              {showUserDropdown && (
                <DropdownMenu>
                  {userMenuItems.map((item, index) => (
                    <DropdownItem
                      key={index}
                      onClick={() => {
                        item.action();
                        setShowUserDropdown(false);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="dropdown-icon"
                      />
                      {item.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </div>
          </>
        ) : (
          <ActionButtons>
            <AuthButton variant="login" onClick={() => navigate("/login")}>
              <FontAwesomeIcon icon={faSignInAlt} className="auth-icon" />
              Login
            </AuthButton>
            <AuthButton onClick={() => navigate("/signup")}>
              <FontAwesomeIcon icon={faUserPlus} className="auth-icon" />
              Sign Up
            </AuthButton>
          </ActionButtons>
        )}
      </UserSection>
    </NavbarContainer>
  );
}

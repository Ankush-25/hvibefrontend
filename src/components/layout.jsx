import { Outlet } from "react-router-dom";
import { LandingNavBar } from "../landingpage/LandingPageUppersec/UpperSection/Navbar/LandingPageNavBar";
import { Footerbody } from "../landingpage/LandingPageLowersec/FooterSec";

const Layout = () => {
    return (
        <>
            <LandingNavBar />
            <Outlet />
            <Footerbody />
        </>
    );
};

export default Layout;

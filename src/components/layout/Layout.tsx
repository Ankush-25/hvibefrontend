import { Outlet } from "react-router-dom";
import { LandingNavBar } from "../../modules/landingpage/LandingPageUppersec/UpperSection/Navbar/LandingPageNavBar";
import { Footerbody } from "../../modules/landingpage/LandingPageLowersec/FooterSec";
import { LayoutProps } from "../../types/components";

const Layout = ({ }: LayoutProps) => {
    return (
        <>
            <LandingNavBar />
            <Outlet />
            <Footerbody />
        </>
    );
};

export default Layout;

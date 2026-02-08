import { MidSectionParentComp } from "./LandingPageUppersec/MidSection/MidSectionParent";
import { UpperSectionParent } from "./LandingPageUppersec/UpperSection/UpperSectionSearchFeature/UpperSectionParent";
import { LandingPageParentProps } from "../../types/landingPage";

export function LandingPageParent({ }: LandingPageParentProps) {

    return (
        <>
            <UpperSectionParent />
            <MidSectionParentComp />
        </>
    )

}

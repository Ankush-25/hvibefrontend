import { CompaniesLogoPaths, SecondCompaniesLogoPaths } from "../../../../../assets/Global_Need_files/ImagesPaths";
import { CompaniesContainer, OuterSliderComCover, SingleCompanyComp, CompaniesContainerSec } from "./CompaniesSliderStyles";

export function CompaniesHelpSlider() {
    const CompaniesEntries = Object.entries(CompaniesLogoPaths);
    const SecondlistEntries = Object.entries(SecondCompaniesLogoPaths);

    return (
        <>
            <div className="text-3xl font-bold flex justify-center">
                <p>Companies We've Helped</p>
            </div>
            <div className="pb-20">
                <OuterSliderComCover>
                    <CompaniesContainer >
                        {CompaniesEntries.map(([companyName, logoPath], index) => (
                            <SingleCompanyComp key={index}>
                                <img
                                    className="CompaniesImages"
                                    src={logoPath as string}
                                    alt={companyName as string}
                                />
                            </SingleCompanyComp>
                        ))}
                    </CompaniesContainer>
                    <CompaniesContainer >
                        {CompaniesEntries.map(([companyName, logoPath], index) => (
                            <SingleCompanyComp key={index}>
                                <img
                                    className="CompaniesImages"
                                    src={logoPath as string}
                                    alt={companyName as string}
                                />
                            </SingleCompanyComp>
                        ))}
                    </CompaniesContainer>
                </OuterSliderComCover>
                <OuterSliderComCover>
                    <CompaniesContainerSec>
                        {SecondlistEntries.map(([companyName, logoPath], index) => (
                            <SingleCompanyComp key={index}>
                                <img
                                    className="CompaniesImages"
                                    src={logoPath as string}
                                    alt={companyName as string}
                                />
                            </SingleCompanyComp>
                        ))}
                    </CompaniesContainerSec>
                    <CompaniesContainerSec>
                        {SecondlistEntries.map(([companyName, logoPath], index) => (
                            <SingleCompanyComp key={index}>
                                <img
                                    className="CompaniesImages"
                                    src={logoPath as string}
                                    alt={companyName as string}
                                />
                            </SingleCompanyComp>
                        ))}
                    </CompaniesContainerSec>
                </OuterSliderComCover>
            </div>
        </>
    );
}

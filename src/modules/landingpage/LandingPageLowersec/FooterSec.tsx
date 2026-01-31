import { Imagepaths } from "../../../assets/Global_Need_files/ImagesPaths.js";
import { Footerfunctions } from "../Var";
import {
  FooterWrapper,
  SingleRowFooterLink,
  FooterColumnWrapper,
} from "./FooterSecStyles.jsx";

export function Footerbody() {
  const footerfunction = Object.entries(Footerfunctions);
  const footerfunctionlast = footerfunction.slice(0, 4);
  const footerfunctionMid = footerfunction.slice(4, 8);
  const footerfunctionFirst = footerfunction.slice(8, 12);

  return (
    <div className="pt-25">
      <FooterWrapper>
        <div className="max-w-7xl mx-auto p-2.5 flex justify-evenly flex-wrap bg-gray-800 items-center">
          <FooterSecLogo />
          <SingleFooterColumn footerfunctionArray={footerfunctionlast} />
          <SingleFooterColumn footerfunctionArray={footerfunctionMid} />
          <SingleFooterColumn footerfunctionArray={footerfunctionFirst} />
        </div>
        <div className="mx-auto border-t border-gray-600 bg-black w-full flex flex-col">
          <p className="flex flex-col items-center text-gray-400 py-4">
            &copy; All rights are reserved to Vigyapanam.pvt.ltd{" "}
            <span>(2021-2025)</span>
          </p>
        </div>
      </FooterWrapper>
    </div>
  );
}

interface FooterItem {
  name: string;
  path: string;
}

interface SingleFooterColumnProps {
  footerfunctionArray: [string, FooterItem][];
}

export function SingleFooterColumn({ footerfunctionArray }: SingleFooterColumnProps) {
  return (
    <FooterColumnWrapper>
      {footerfunctionArray.map(([index, item]) => (
        <SingleRowFooterLink to={item.path} key={index}>
          {item.name}
        </SingleRowFooterLink>
      ))}
    </FooterColumnWrapper>
  );
}
export function FooterSecLogo() {
  return (
    <div className="grid place-content-center place-items-center">
      <img
        className="pt-2.5 h-24"
        src={Imagepaths.HiringstoreslogoPath}
        alt="Hiring Store"
      />
      <h3 className="text-white font-semibold">Follow Us!</h3>
      <p className="text-gray-300">😊 Stay Ahead with Free Job Alerts 🔔</p>
    </div>
  );
}

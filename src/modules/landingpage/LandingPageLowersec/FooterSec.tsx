import { Link } from "react-router-dom";
import { Imagepaths } from "../../../assets/Global_Need_files/ImagesPaths.js";
import { Footerfunctions } from "../Var";

export function Footerbody() {
  const footerfunction = Object.entries(Footerfunctions);
  const footerfunctionlast = footerfunction.slice(0, 4);
  const footerfunctionMid = footerfunction.slice(4, 8);
  const footerfunctionFirst = footerfunction.slice(8, 12);

  return (
    <div className="pt-10">
      <div className="border-t border-primary-200 dark:border-secondary-800 pt-2.5 flex justify-evenly flex-col flex-wrap items-center bg-primary-50 dark:bg-secondary-900 transition-colors duration-300">
        <div className="max-w-7xl w-full mx-auto p-2.5 flex justify-evenly flex-wrap items-start">
          <FooterSecLogo />
          <SingleFooterColumn footerfunctionArray={footerfunctionlast} />
          <SingleFooterColumn footerfunctionArray={footerfunctionMid} />
          <SingleFooterColumn footerfunctionArray={footerfunctionFirst} />
        </div>
        <div className="mx-auto border-t border-primary-200 dark:border-secondary-800 bg-white dark:bg-black w-full flex flex-col transition-colors duration-300">
          <p className="flex flex-col items-center text-primary-500 dark:text-primary-400 py-4 text-sm">
            &copy; All rights are reserved to Vigyapanam.pvt.ltd{" "}
            <span>(2021-2025)</span>
          </p>
        </div>
      </div>
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
    <div className="flex flex-col p-5">
      {footerfunctionArray.map(([index, item]) => (
        <Link
          to={item.path}
          key={index}
          className="no-underline text-base p-2.5 text-primary-600 dark:text-primary-200 hover:text-secondary-500 dark:hover:text-secondary-400 hover:underline transition-colors duration-200"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export function FooterSecLogo() {
  return (
    <div className="grid place-content-center place-items-center p-5">
      <img
        className="h-24 object-contain mb-2"
        src={Imagepaths.HiringstoreslogoPath}
        alt="Hiring Store"
      />
      <h3 className="text-secondary-600 dark:text-primary-50 font-semibold text-lg">Follow Us!</h3>
      <p className="text-primary-500 dark:text-primary-300 text-sm mt-1">😊 Stay Ahead with Free Job Alerts 🔔</p>
    </div>
  );
}

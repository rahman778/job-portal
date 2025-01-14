import IconText from "./IconText";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";

const JobHeader = ({title, companyName, logo}) => {
   return (
      <div className="flex items-center w-full space-x-6 bg-white dark:bg-mediumGrey p-6 shadow-md rounded-md">
         <img alt="Logo" src={logo ?? "https://placehold.co/600x400/000000/FFF"} className="logo" width="65" height="65" />
         <div>
            <div className="text-xl font-medium text-stone-800 dark:text-stone-300">
               {title}
            </div>
            <div className="mt-2">
               <IconText>
                  <BuildingOfficeIcon className="text-slate-700 dark:text-slate-300 h-5 w-6 -ml-1" />
                  <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">{companyName}</span>
               </IconText>
            </div>
         </div>
      </div>
   );
};

export default JobHeader;

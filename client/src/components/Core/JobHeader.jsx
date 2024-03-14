import IconText from "./IconText";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";

const JobHeader = () => {
   return (
      <div className="flex items-center w-full space-x-6 bg-white dark:bg-mediumGrey p-6 shadow-md rounded-md">
         <img alt="Logo" className="logo" width="65" height="65" />
         <div>
            <div className="text-xl font-medium text-stone-800 dark:text-stone-300">
               Frontend Engineer
            </div>
            <div className="mt-2">
               <IconText>
                  <BuildingOfficeIcon className="text-slate-500 dark:text-slate-300 h-5 w-6 -ml-1" />
                  <span className="font-medium text-sm">Virtusa</span>
               </IconText>
            </div>
         </div>
      </div>
   );
};

export default JobHeader;

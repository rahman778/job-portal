import { useNavigate, createSearchParams, useLocation } from "react-router-dom";

import SaveButton from "../Buttons/SaveButton";
import IconText from "../Core/IconText";
import Tags from "../Core/Tags";

import {
   CurrencyDollarIcon,
   BriefcaseIcon,
   ComputerDesktopIcon,
   MapPinIcon,
} from "@heroicons/react/24/outline";

const JobCard = () => {
   const navigate = useNavigate();
   const location = useLocation();

   const openModal = () => {
      navigate({
         pathname: location.pathname,
         search: `?${createSearchParams({
            nav_type: "slider",
            jobId: 1234,
         })}`,
      });
   };
   return (
      <div
         className="w-full bg-white dark:bg-mediumGrey px-5 py-6 border dark:border-slate-600 hover:border-primary dark:hover:border-primary rounded-md hover:bg-primary/5 dark:hover:bg-primary/5 hover-transition cursor-pointer"
         onClick={openModal}
      >
         <div className="flex justify-between items-center">
            <div className="flex flex-row gap-x-3">
               <img
                  alt="Logo"
                  //src="@/assets/logo.svg?url"
                  width="45"
                  height="45"
               />
               <div className="text-stone-800 dark:text-stone-200">
                  <div className="text-base font-medium  hover:text-primary hover:underline">
                     Frontend Engineer
                  </div>
                  <div className="text-sm">Virtusa</div>
               </div>
            </div>

            <SaveButton className="w-8 h-8" />
         </div>

         <div className="flex flex-wrap gap-x-3 items-center mt-5 mb-2">
            <IconText>
               <BriefcaseIcon className="text-slate-500 dark:text-slate-300  h-8 w-4" />
               <span className="font-medium">Full-Time</span>
            </IconText>
            <IconText>
               <ComputerDesktopIcon className="text-slate-500 dark:text-slate-300  h-8 w-4" />
               <span className="font-medium">Remote</span>
            </IconText>
            <IconText>
               <CurrencyDollarIcon className="text-slate-500 dark:text-slate-300  h-8 w-4" />
               <span className="font-medium">$3,900 - $5,300 a month</span>
            </IconText>
         </div>

         <div className="flex flex-wrap items-center gap-x-3">
            <Tags name="React" />
            <Tags name="Javascript" />
            <Tags name="Laravel" />
         </div>

         <div className="flex items-center justify-between mt-3">
            <IconText>
               <MapPinIcon className="text-slate-500 dark:text-slate-300 h-8 w-4" />
               <span>Banglore, India</span>
            </IconText>

            <span className="text-xs text-slate-500 dark:text-slate-300">
               Posted 5 days ago
            </span>
         </div>
      </div>
   );
};

export default JobCard;

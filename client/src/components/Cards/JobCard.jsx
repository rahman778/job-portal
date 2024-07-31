import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import SaveButton from "../Buttons/SaveButton";
import IconText from "../Core/IconText";
import Tags from "../Core/Tags";

import {
   CurrencyDollarIcon,
   BriefcaseIcon,
   ComputerDesktopIcon,
   MapPinIcon,
} from "@heroicons/react/24/outline";

dayjs.extend(relativeTime);

const JobCard = ({ data }) => {
   const navigate = useNavigate();
   const location = useLocation();

   const openModal = () => {
      navigate({
         pathname: location.pathname,
         search: `?${createSearchParams({
            nav_type: "slider",
            jobId: data._id,
         })}`,
      });
   };

   const { currency, frequency, minSalary, maxSalary } = data.salary;
   return (
      <div
         className="w-full bg-white dark:bg-mediumGrey px-6 py-6 border dark:border-slate-600 hover:border-primary dark:hover:border-primary rounded-md hover:bg-primary/5 dark:hover:bg-primary/5 hover-transition cursor-pointer"
         onClick={openModal}
      >
         <div className="flex justify-between items-center">
            <div className="flex flex-row gap-x-3">
               <img
                  alt="Logo"
                  //src="@/assets/logo.svg?url"
                  src={"https://placehold.co/600x400/000000/FFF"}
                  width="45"
                  height="45"
               />
               <div className="text-stone-800 dark:text-stone-200">
                  <div className="text-base font-medium capitalize  hover:text-primary hover:underline">
                     {data.title}
                  </div>
                  <div className="text-sm">{data.user.companyName}</div>
               </div>
            </div>

            <SaveButton className="w-8 h-8" />
         </div>

         <div className="flex flex-wrap gap-x-3 items-center mt-3 mb-2">
            <IconText>
               <BriefcaseIcon className="text-slate-500 dark:text-slate-300  h-8 w-4" />
               <span className="font-medium">{data.jobType}</span>
            </IconText>
            <IconText>
               <ComputerDesktopIcon className="text-slate-500 dark:text-slate-300  h-8 w-4" />
               <span className="font-medium">{data.modality}</span>
            </IconText>
            {currency && frequency && minSalary && maxSalary && (
               <IconText>
                  <CurrencyDollarIcon className="text-slate-500 dark:text-slate-300  h-8 w-4" />
                  <span className="font-medium">{`${currency} ${minSalary.toLocaleString()} - ${maxSalary.toLocaleString()} / ${frequency}`}</span>
               </IconText>
            )}
         </div>

         {data.skillsets?.length ? (
            <div className="flex flex-wrap items-center gap-x-3 mb-3">
               {data.skillsets?.length > 0 &&
                  data.skillsets.map((skill) => (
                     <Tags key={skill} name={skill} />
                  ))}
            </div>
         ) : null}

         <div className="flex items-center justify-between">
            <IconText>
               <MapPinIcon className="text-slate-500 dark:text-slate-300 h-8 w-4" />
               <span>{data.location || "N/A"}</span>
            </IconText>

            <span className="text-xs text-slate-500 dark:text-slate-300">
               {`Posted ${dayjs(data.created).fromNow()}`}
            </span>
         </div>
      </div>
   );
};

export default JobCard;

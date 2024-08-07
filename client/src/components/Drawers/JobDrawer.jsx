import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Drawer from "./Drawer";
import JobHeader from "../Core/JobHeader";
import Tags from "../Core/Tags";
import SaveButton from "../Buttons/SaveButton";
import IconLabel from "../Core/IconLabel";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import JobApplyModal from "../Modals/JobApplyModal";
import { useGetJobQuery } from "../../services/jobService";

const JobDrawer = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [openJobApplyModal, setOpenJobApplyModal] = useState(false);

   let [searchParams] = useSearchParams();

   const jobId = searchParams?.get("jobId");

   const { data: job } = useGetJobQuery(
      { jobId },
      { skip: !jobId, refetchOnMountOrArgChange: true }
   );

   console.log("job", job);

   let type = searchParams?.get("nav_type");

   useEffect(() => {
      if (type !== null) {
         setIsOpen(true);
      } else {
         setIsOpen(false);
      }
   }, [type]);

   return (
      <Drawer isOpen={isOpen}>
         <div className="grid lg:grid-cols-12 grid-cols-1 gap-8 mt-4">
            <div className="lg:col-span-8">
               <JobHeader title={job?.title} companyName={job?.user.companyName}/>
               <div
                  className="text-slate-700 dark:text-slate-300 text-md mt-6"
                  dangerouslySetInnerHTML={{ __html: job?.description }}
               />
            </div>
            <div className="lg:col-span-4 ">
               <div className="sticky top-0">
                  <div className="bg-white dark:bg-mediumGrey py-6 shadow-md rounded-md space-y-4">
                     <div className="border-b border-slate-200">
                        <h6 className="text-lg font-medium px-6 mb-4">
                           Job Overview
                        </h6>
                     </div>
                     <div className="px-2">
                        <IconLabel label="Job Type" value={job?.jobType}>
                           <BookmarkIcon className="h-8 w-6 text-[#161C2D]" />
                        </IconLabel>
                     </div>
                     <div className="px-2">
                        <IconLabel label="Modality" value={job?.modality}>
                           <BookmarkIcon className="h-8 w-6 text-[#161C2D]" />
                        </IconLabel>
                     </div>
                     <div className="px-2">
                        <IconLabel
                           label="Experience level"
                           value={job?.experienceLevel}
                        >
                           <BookmarkIcon className="h-8 w-6 text-[#161C2D]" />
                        </IconLabel>
                     </div>
                  </div>
                  <div className="bg-white dark:bg-mediumGrey py-6 shadow-md rounded-md mt-6">
                     <div className="border-b border-slate-200">
                        <h6 className="text-lg font-medium px-6 mb-4">
                           Skills
                        </h6>
                     </div>
                     <div className="flex flex-wrap items-center gap-x-3 px-6 mt-5">
                        {job?.skillsets?.map((skill, idx) => (
                           <Tags name={skill} key={idx} />
                        ))}
                     </div>
                  </div>
                  <div className="flex items-center space-x-3 mt-6">
                     <button
                        className="button primary-btn"
                        onClick={() => setOpenJobApplyModal(true)}
                     >
                        Apply for job
                     </button>
                     <SaveButton size="w-7 h-7" />
                  </div>
               </div>
            </div>
         </div>
         <JobApplyModal
            open={openJobApplyModal}
            setOpen={setOpenJobApplyModal}
         />
      </Drawer>
   );
};

export default JobDrawer;

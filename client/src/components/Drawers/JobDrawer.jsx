import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Drawer from "./Drawer";
import JobHeader from "../Core/JobHeader";
import Tags from "../Core/Tags";
import SaveButton from "../Buttons/SaveButton";
import IconLabel from "../Core/IconLabel";
import { BookmarkIcon } from "@heroicons/react/24/outline";

const JobDrawer = () => {
   const [isOpen, setIsOpen] = useState(false);

   let [searchParams] = useSearchParams();

   let type = searchParams?.get("navType");

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
               <JobHeader />
               <p className="text-slate-700 dark:text-slate-400 text-md mt-6">
                  One disadvantage of Lorum Ipsum is that in Latin certain
                  letters appear more frequently than others - which creates a
                  distinct visual impression. Moreover, in Latin only words at
                  the beginning of sentences are capitalized.
               </p>
               <p className="text-slate-700 dark:text-slate-400 text-md mt-6">
                  This means that Lorem Ipsum cannot accurately represent, for
                  example, German, in which all nouns are capitalized. Thus,
                  Lorem Ipsum has only limited suitability as a visual filler
                  for German texts. If the fill text is intended to illustrate
                  the characteristics of different typefaces.
               </p>
               <p className="text-slate-700 dark:text-slate-400 text-md mt-6">
                  This means that Lorem Ipsum cannot accurately represent, for
                  example, German, in which all nouns are capitalized. Thus,
                  Lorem Ipsum has only limited suitability as a visual filler
                  for German texts. If the fill text is intended to illustrate
                  the characteristics of different typefaces.
               </p>
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
                        <IconLabel label="Employee Type" value="Full Time">
                           <BookmarkIcon className="h-8 w-6 text-[#161C2D]" />
                        </IconLabel>
                     </div>
                     <div className="px-2">
                        <IconLabel label="Employee Type" value="Full Time">
                           <BookmarkIcon className="h-8 w-6 text-[#161C2D]" />
                        </IconLabel>
                     </div>
                     <div className="px-2">
                        <IconLabel label="Employee Type" value="Full Time">
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
                        <Tags name="React" />
                        <Tags name="Javascript" />
                        <Tags name="Laravel" />
                     </div>
                  </div>
                  <div className="flex items-center space-x-3 mt-6">
                     <button className="button primary-btn">
                        Apply for job
                     </button>
                     <SaveButton size="w-7 h-7" />
                  </div>
               </div>
            </div>
         </div>
      </Drawer>
   );
};

export default JobDrawer;

import { BookmarkIcon } from "@heroicons/react/24/outline";
import IconLabel from "../../components/Core/IconLabel";
import JobHeader from "../../components/Core/JobHeader";
import Tags from "../../components/Core/Tags";
import SaveButton from "../../components/Buttons/SaveButton";
import { useParams } from "react-router-dom";
import { useGetJobQuery } from "../../services/jobService";

function JobDetailsPage() {
   const { jobId } = useParams();

   const { data: job } = useGetJobQuery({ jobId }, { skip: !jobId });

   return (
      <section className="max-w-6xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 mt-10">
         <div className="grid lg:grid-cols-12 grid-cols-1 gap-8 mt-4">
            <div className="lg:col-span-8">
               <JobHeader />
               <p className="text-slate-700 dark:text-slate-300 text-md mt-6">
                  One disadvantage of Lorum Ipsum is that in Latin certain
                  letters appear more frequently than others - which creates a
                  distinct visual impression. Moreover, in Latin only words at
                  the beginning of sentences are capitalized.
               </p>
               <p className="text-slate-700 dark:text-slate-300 text-md mt-6">
                  This means that Lorem Ipsum cannot accurately represent, for
                  example, German, in which all nouns are capitalized. Thus,
                  Lorem Ipsum has only limited suitability as a visual filler
                  for German texts. If the fill text is intended to illustrate
                  the characteristics of different typefaces.
               </p>
               <p className="text-slate-700 dark:text-slate-300 text-md mt-6">
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
                     <SaveButton size="size-7" />
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default JobDetailsPage;

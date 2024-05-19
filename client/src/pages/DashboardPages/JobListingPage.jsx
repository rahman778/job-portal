import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
   ChevronRightIcon,
   PencilSquareIcon,
   PlusIcon,
} from "@heroicons/react/24/outline";
import { useGetCompanyJobsQuery } from "../../services/jobService";

function JobListingPage() {
   const navigate = useNavigate();
   const { companyId } = useParams();

   const { isSignedIn } = useSelector((state) => state.auth);

   const { data: jobs } = useGetCompanyJobsQuery(
      {},
      { refetchOnMountOrArgChange: true, skip: !isSignedIn }
   );

   return (
      <section className="max-w-6xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 mt-10">
         <div className="flex flex-wrap">
            <div className="w-full max-w-full px-3 mb-6 mx-auto">
               <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-sm">
                  <div className="relative flex flex-col min-w-0 break-words border bg-clip-border rounded-sm border-slate-200 dark:border-slate-700">
                     <div className="p-2 xl:px-9 xl:pt-5  flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                        <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-semibold text-xl/tight">
                           All jobs from Virtusa
                        </h3>
                        <div className="relative flex flex-wrap items-center my-2">
                           <button
                              onClick={() =>
                                 navigate(`/company/${companyId}/job/create`)
                              }
                              className="button secondary-btn flex items-center justify-center gap-x-2"
                           >
                              <span>Post a job</span>
                              <PlusIcon className="w-4 h-4 stroke-2" />
                           </button>
                        </div>
                     </div>

                     <div className="flex-auto block p-2 xl:pb-2 xl:pt-6 xl:px-9">
                        <div className="overflow-x-auto">
                           <table className="w-full my-0 align-middle">
                              <thead className="align-bottom border-b border-slate-200 dark:border-slate-700">
                                 <tr>
                                    <th className="pb-3 text-start min-w-[100px] font-medium">
                                       TITLE
                                    </th>
                                    <th className="pb-3 text-center min-w-[100px] font-medium">
                                       APPLICATIONS
                                    </th>
                                    <th className="pb-3 text-start min-w-[100px] font-medium">
                                       STATUS
                                    </th>
                                    <th className="pb-3 text-center min-w-[100px] font-medium">
                                       DEADLINE
                                    </th>
                                    <th className="pb-3 text-end min-w-[60px] font-medium">
                                       DETAILS
                                    </th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {jobs?.map((job) => (
                                    <tr
                                       key={job._id}
                                       className="border-b last:border-b-0 border-slate-200 dark:border-slate-700 text-md"
                                    >
                                       <td className="py-5 pl-0">
                                          <div className="flex flex-col justify-start">
                                             <span>{job.title}</span>
                                          </div>
                                       </td>
                                       <td className="text-center">
                                          <span>{job.activeApplications}</span>
                                       </td>

                                       <td className="text-left">
                                          <span>
                                             {job.isActive
                                                ? "Active"
                                                : "Inactive"}
                                          </span>
                                       </td>
                                       <td className="text-center">
                                          <span className="">N/A</span>
                                       </td>
                                       <td className="text-end flex items-center justify-end h-[63px]">
                                          <button className="rounded-full w-8 h-8 flex items-center justify-center bg-emerald-600/10 hover-transition hover:bg-emerald-600/30 mr-2">
                                             <PencilSquareIcon className="w-5 h-5 text-gray-600 dark:text-gray-300 click-transition" />
                                          </button>
                                          <button
                                             onClick={() =>
                                                navigate("/company/job/manage")
                                             }
                                             className="rounded-full w-8 h-8 flex items-center justify-center bg-emerald-600/10 hover-transition hover:bg-emerald-600/30"
                                          >
                                             <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-300 click-transition" />
                                          </button>
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default JobListingPage;

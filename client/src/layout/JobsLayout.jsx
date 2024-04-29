import { Outlet, Navigate, useLocation } from "react-router-dom";

import { useGetCategoriesQuery } from "../services/categoryService";

import SearchFilter from "../components/Filter/SearchFilter";
import JobsTab from "../components/Tabs/JobsTab";

function JobsLayout() {
   const isLoggedIn = false;
   const location = useLocation();

   const { data: categories } = useGetCategoriesQuery();

   if (location.pathname === "/") {
      return <Navigate replace to="/recent-jobs" />;
   }

   return (
      <section>
         {/* Hero */}
         <div className="relative bg-gradient-to-b from-[#D1FAE4] to-[#E7F4FB] dark:from-[#224331] dark:to-[#123442]">
            <div className="text-center text-zinc-900 dark:text-zinc-300 px-4 lg:px-8 xl:px-16 py-10">
               <h1 className="text-4xl md:text-5xl font-medium mb-4 tracking-wide">
                  Unlock Your <span className="text-emerald-600">Dream</span>{" "}
                  Career
               </h1>
               <p className="text-lg md:text-xl mt-6 text-gray-600 dark:text-gray-300">
                  Find great job to build your career
               </p>
               <div className="max-w-3xl mx-auto mt-8">
                  <SearchFilter />
               </div>
            </div>
         </div>

         {/* Job List */}
         <div className="max-w-6xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 mt-10">
            {isLoggedIn && (
               <div className="w-3/4 ml-auto mb-5">
                  <JobsTab />
               </div>
            )}

            <div className="flex gap-x-3">
               <div className="hidden md:block divide-y w-1/4 border dark:border-slate-600 dark:divide-slate-600 rounded-md h-full sticky top-8 ">
                  {categories?.map((category) => (
                     <div
                        key={category._id}
                        className="min-h-14 flex items-center justify-between text-md  px-3 hover-transition !border-l-transparent hover:!border-l-primary border-l-[3px] hover:bg-emerald-600/10 cursor-pointer"
                     >
                        <span>{category.name}</span>
                        <span className="bg-emerald-600/20 text-primary text-xs text-center py-0.5 font-semibold rounded-full h-6 w-8 leading-relaxed">
                           {category.count}
                        </span>
                     </div>
                  ))}
               </div>
               <div className="flex-1 space-y-4">
                  <Outlet />
               </div>
            </div>
         </div>
      </section>
   );
}

export default JobsLayout;

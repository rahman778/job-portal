import SearchFilter from "../../components/Filter/SearchFilter";
import JobFilter from "../../components/Filter/JobFilter";
import JobViewFilter from "../../components/Filter/JobViewFilter";
import JobCard from "../../components/Cards/JobCard";
import Pagination from "../../components/Core/Pagination";

function JobSearchPage() {
   return (
      <section className="bg-gray-100 dark:bg-darkGrey min-h-screen">
         <div className="max-w-6xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-10">
            <div className="max-w-3xl mx-auto">
               <SearchFilter />
            </div>
            <div className="mt-12">
               <JobViewFilter />
            </div>
            <div className="flex gap-x-3 mt-4">
               <div className="hidden md:block w-1/4 sticky top-8 h-full">
                  <JobFilter />
               </div>
               <div className="flex-1">
                  <JobCard />
                  <JobCard />
                  <JobCard />
               </div>
            </div>
            <div className="mt-4 pb-16">
               <Pagination/>
            </div>
         </div>
      </section>
   );
}

export default JobSearchPage;

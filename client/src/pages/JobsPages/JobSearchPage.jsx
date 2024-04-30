import { useSearchParams } from "react-router-dom";

import { useGetJobsQuery } from "../../services/jobService";

import SearchFilter from "../../components/Filter/SearchFilter";
import JobFilter from "../../components/Filter/JobFilter";
import JobViewFilter from "../../components/Filter/JobViewFilter";
import JobCard from "../../components/Cards/JobCard";
import Pagination from "../../components/Core/Pagination";

function JobSearchPage() {
   const [searchParams, setSearchParams] = useSearchParams();

   const query = searchParams.get("query");
   const place = searchParams.get("location");

   const { data: jobs } = useGetJobsQuery(
      searchParams.toString().replace(/%2C/g, ","),
      { refetchOnMountOrArgChange: true }
   );

   const handleFilterQuery = (key, value) => {
      setSearchParams((prevParams) => {
         let values = prevParams.get(key)?.split(",");

         if (values) {
            if (values.includes(value)) {
               values = values.filter((currentValue) => currentValue !== value);
            } else {
               values.push(value);
            }

            prevParams.set(key, values);

            if (!values.length) {
               prevParams.delete(key);
            }
         } else {
            // no values for key, create new array with value
            prevParams.set(key, [value]);
         }

         return prevParams;
      });
   };

   return (
      <section className="bg-gray-100 dark:bg-darkGrey min-h-screen">
         <div className="max-w-6xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-10">
            <div className="max-w-3xl mx-auto">
               <SearchFilter
                  placeValue={place == null ? "" : place}
                  searchValue={query == null ? "" : query}
               />
            </div>
            <div className="mt-8">
               <JobViewFilter data={jobs} />
            </div>
            <div className="flex gap-x-3 mt-3">
               <div className="hidden md:block w-1/4 sticky top-8 h-full">
                  <JobFilter
                     handleJobTypeChange={handleFilterQuery}
                     handleModalityChange={handleFilterQuery}
                     jobTypes={searchParams.get("job_type")}
                     modalities={searchParams.get("modality")}
                  />
               </div>
               <div className="flex-1 space-y-4">
                  {jobs?.data.map((job) => (
                     <div key={job._id}>
                        <JobCard data={job} />
                     </div>
                  ))}
               </div>
            </div>
            <div className="mt-4 pb-16">
               <Pagination />
            </div>
         </div>
      </section>
   );
}

export default JobSearchPage;

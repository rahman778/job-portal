import { useSearchParams } from "react-router-dom";
import { useGetJobsQuery } from "../../services/jobService";

import SearchFilter from "../../components/Filter/SearchFilter";
import JobFilter from "../../components/Filter/JobFilter";
import JobViewFilter from "../../components/Filter/JobViewFilter";
import JobCard from "../../components/Cards/JobCard";
import Pagination from "../../components/Core/Pagination";
import Dropdown from "../../components/Forms/Dropdown";

const excludedParams = ["sort", "limit", "page"];

function JobSearchPage() {
   const [searchParams, setSearchParams] = useSearchParams();

   const query = searchParams.get("query");
   const place = searchParams.get("location");
   const sort = searchParams.get("sort");
   const limit = searchParams.get("limit");

   const { data: jobs } = useGetJobsQuery(
      searchParams.toString().replace(/%2C/g, ","),
      { refetchOnMountOrArgChange: true }
   );

   const handleMultiFilterQuery = (key, value) => {
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

   const handleSingleFilterQuery = (key, value) => {
      setSearchParams((prevParams) => {
         let searchVal = prevParams.get(key);

         prevParams.set(key, value);

         if (searchVal === value) {
            prevParams.delete(key);
         }

         return prevParams;
      });
   };

   const removeParams = (key, value) => {
      setSearchParams((prevParams) => {
         let values = prevParams.get(key)?.split(",");

         if (values.includes(value)) {
            values = values.filter((currentValue) => currentValue !== value);
         }
         prevParams.set(key, values);

         if (!values.length) {
            prevParams.delete(key);
         }
         return prevParams;
      });
   };

   const searchEntries = Array.from(searchParams.entries());

   return (
      <section className="bg-gray-50 dark:bg-darkGrey min-h-screen">
         <div className="max-w-6xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-10">
            <div className="max-w-3xl mx-auto">
               <SearchFilter
                  placeValue={place == null ? "" : place}
                  searchValue={query == null ? "" : query}
               />
            </div>

            {searchEntries.filter(([key]) => !excludedParams.includes(key))
               .length > 0 && (
               <div className="mt-5">
                  <JobViewFilter
                     searchEntries={searchEntries.filter(
                        ([key]) => !excludedParams.includes(key)
                     )}
                     handleRemoveQuery={removeParams}
                     limit={limit}
                  />
               </div>
            )}

            <div className="flex gap-x-3 mt-5">
               <div className="hidden md:block w-1/4 sticky top-8 h-full">
                  <JobFilter
                     handleJobTypeChange={handleMultiFilterQuery}
                     handleModalityChange={handleMultiFilterQuery}
                     handleExpLevelChange={handleMultiFilterQuery}
                     handleDateFilterChange={handleSingleFilterQuery}
                     jobTypes={searchParams.get("job_type")}
                     modalities={searchParams.get("modality")}
                     experience={searchParams.get("experience_level")}
                     datePosted={searchParams.get("date_posted")}
                     query={query}
                     category={searchParams.get("category")}
                  />
               </div>
               <div className="flex-1 space-y-4">
                  <div className="flex flex-col-reverse md:flex-row justify-between items-center shadow dark:shadow-gray-700 px-6 py-4 rounded-md bg-white dark:bg-mediumGrey">
                     <div className="mt-6 md:mt-0">
                        <p className=" text-gray-700 dark:text-gray-300 text-md font-medium">{`${jobs?.meta.count} jobs`}</p>
                     </div>
                     <div className="flex items-center gap-x-8">
                        <div className="max-w-[260px] flex gap-x-2 items-center">
                           <label
                              className="label text-md w-[210px]"
                              htmlFor="limit"
                           >
                              Posts per page
                           </label>
                           <Dropdown
                              options={[
                                 { value: "2", label: "2" },
                                 { value: "5", label: "5" },
                                 { value: "10", label: "10" },
                                 { value: "20", label: "20" },
                                 { value: "50", label: "50" },
                              ]}
                              name="limit"
                              selectedItem={limit}
                              placeholder="Limit"
                              className="py-2.5 click-transition cursor-pointer"
                              onChange={(value) => {
                                 handleSingleFilterQuery("limit", value);
                                 handleSingleFilterQuery("page", 1);
                              }}
                              position="top-[45px]"
                              hoverExpand
                           />
                        </div>
                        <div className="max-w-[240px] flex gap-x-2 items-center">
                           <label
                              className="label text-md w-[70px]"
                              htmlFor="sort"
                           >
                              Sort by
                           </label>
                           <Dropdown
                              options={[
                                 { value: "recency", label: "Newest" },
                                 { value: "salary", label: "Salary" },
                              ]}
                              name="sort"
                              selectedItem={sort}
                              placeholder="Sort By"
                              className="py-2.5 click-transition cursor-pointer"
                              onChange={(value) => {
                                 handleSingleFilterQuery("sort", value);
                                 handleSingleFilterQuery("page", 1);
                              }}
                              position="top-[45px]"
                              hoverExpand
                           />
                        </div>
                     </div>
                  </div>
                  <div className="space-y-4">
                     {jobs?.data.map((job) => (
                        <div key={job._id}>
                           <JobCard data={job} />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            <div className="mt-4 pb-16">
               <Pagination
                  metaData={jobs?.meta}
                  limit={limit}
                  page={searchParams.get("page")}
                  setPage={handleSingleFilterQuery}
               />
            </div>
         </div>
      </section>
   );
}

export default JobSearchPage;

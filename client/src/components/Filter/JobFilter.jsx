import { useGetJobStatsQuery } from "../../services/jobService";

import FilterLabel from "./FilterLabel";
import Checkbox from "../Forms/Checkbox";

const dateFilter = [
   { label: "Any time", value: "anytime" },
   { label: "Past 24 hours", value: "1" },
   { label: "Past week", value: "7" },
   { label: "Past month", value: "30" },
];

const JobFilter = (props) => {
   const {
      handleJobTypeChange,
      handleModalityChange,
      handleExpLevelChange,
      handleDateFilterChange,
      jobTypes,
      modalities,
      experience,
      datePosted,
      query,
      category,
   } = props;

   const queryString = [];

   if (category) {
      queryString.push(`category=${encodeURIComponent(category)}`);
   }

   if (query && query.trim() !== "") {
      queryString.push(`query=${encodeURIComponent(query.trim())}`);
   }

   const statsFilter = queryString.join("&");

   const { data: stats } = useGetJobStatsQuery(statsFilter);

   return (
      <div className="shadow dark:shadow-gray-700 p-6 rounded-md bg-white dark:bg-mediumGrey">
         <div className="grid grid-cols-1 gap-y-6">
            <FilterLabel label="Job Types">
               {stats?.data?.jobTypes.map((jobType) => (
                  <div key={jobType.label}>
                     <Checkbox
                        value={jobType.label}
                        label={jobType.label}
                        quantity={jobType.count}
                        name={jobType.label}
                        checked={jobTypes?.includes(jobType.label)}
                        onChange={(e) =>
                           handleJobTypeChange("job_type", e.target.value)
                        }
                     />
                  </div>
               ))}
            </FilterLabel>

            <FilterLabel label="Modality">
               {stats?.data?.modality.map((modality) => (
                  <div key={modality.label}>
                     <Checkbox
                        value={modality.label}
                        label={modality.label}
                        quantity={modality.count}
                        name={modality.label}
                        checked={modalities?.includes(modality.label)}
                        onChange={(e) =>
                           handleModalityChange("modality", e.target.value)
                        }
                     />
                  </div>
               ))}
            </FilterLabel>

            <FilterLabel label="Experience Level">
               {stats?.data?.experienceLevel.map((level) => (
                  <div key={level.label}>
                     <Checkbox
                        value={level.label}
                        label={level.label}
                        quantity={level.count}
                        name={level.label}
                        checked={experience?.includes(level.label)}
                        onChange={(e) =>
                           handleExpLevelChange(
                              "experience_level",
                              e.target.value
                           )
                        }
                     />
                  </div>
               ))}
            </FilterLabel>

            <FilterLabel label="Date Posted">
               {dateFilter.map((date) => (
                  <div key={date.value}>
                     <Checkbox
                        value={date.value}
                        label={date.label}
                        name={date.value}
                        checked={datePosted === date.value}
                        onChange={(e) =>
                           handleDateFilterChange("date_posted", e.target.value)
                        }
                     />
                  </div>
               ))}
            </FilterLabel>

            {/* <FilterLabel label="Salary">
               <div className="mt-2.5 lg:max-w-[180px]">
                  <label className="inline-block text-md mb-1">Currency</label>
                  <Dropdown
                     options={[
                        { value: 1, label: "option 1" },
                        { value: 2, label: "option 2" },
                        { value: 3, label: "option 2" },
                     ]}
                     name="currency"
                     label="currency"
                     placeholder="Currency"
                     className="py-2.5"
                  />
                  <RangeSlider />
               </div>
            </FilterLabel> */}
         </div>
      </div>
   );
};

export default JobFilter;

import { useGetJobStatsQuery } from "../../services/jobService";

import FilterLabel from "./FilterLabel";
import Checkbox from "../Forms/Checkbox";
import Dropdown from "../Forms/Dropdown";
import RangeSlider from "../Core/RangeSlider";

const JobFilter = (props) => {
   const { handleJobTypeChange, handleModalityChange, jobTypes,modalities } = props;

   const { data: stats } = useGetJobStatsQuery();

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

            <FilterLabel label="Salary">
               <div className="mt-2.5 lg:max-w-[180px]">
                  <label className="inline-block text-md mb-1">sfsfsf</label>
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
            </FilterLabel>
         </div>
      </div>
   );
};

export default JobFilter;

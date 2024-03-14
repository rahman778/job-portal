import FilterLabel from "./FilterLabel";
import Checkbox from "../Forms/Checkbox";
import Dropdown from "../Forms/Dropdown";
import RangeSlider from "../Core/RangeSlider";

const JobFilter = () => {
   return (
      <div className="shadow dark:shadow-gray-700 p-6 rounded-md bg-white dark:bg-mediumGrey">
         <div className="grid grid-cols-1 gap-y-6">
            <FilterLabel label="Job Types">
               <Checkbox value="Mike" label="Full Time" quantity="15" />
               <Checkbox value="Mike" label="Part Time" quantity="9" />
               <Checkbox value="Mike" label="Contract" />
            </FilterLabel>

            <FilterLabel label="Modality">
               <Checkbox value="Mike" label="Onsite" quantity="15" />
               <Checkbox value="Mike" label="Hyrid" quantity="9" />
               <Checkbox value="Mike" label="Remote" />
            </FilterLabel>

            <FilterLabel label="Salary">
               <div className="mt-2.5 lg:max-w-[180px]">
                  <label className="inline-block text-md mb-1">sfsfsf</label>
                  <Dropdown
                     options={[
                        { value: 1, label: "option 1" },
                        { value: 2, label: "option 2" },
                        { value: 2, label: "option 2" },
                     ]}
                     name="currency"
                     label="currency"
                     placeholder="Currency"
                  />
                  <RangeSlider />
               </div>
            </FilterLabel>
         </div>
      </div>
   );
};

export default JobFilter;

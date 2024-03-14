import Dropdown from "../Forms/Dropdown";

const JobViewFilter = () => {
   return (
      <div className="flex flex-col-reverse md:flex-row justify-between items-center shadow dark:shadow-gray-700 p-6 rounded-md bg-white dark:bg-mediumGrey">
         <div className="mt-6 md:mt-0">
            <p className=" text-gray-700 dark:text-gray-300 text-md font-medium">156 jobs</p>
         </div>
         <div className="flex items-center space-x-4 max-w-[380px]">
            <Dropdown
               options={[
                  { value: 1, label: "option 1" },
                  { value: 2, label: "option 2" },
                  { value: 2, label: "option 2" },
               ]}
               name="currency"
               placeholder="Sort By"
            />
            <Dropdown
               options={[
                  { value: 1, label: "option 1" },
                  { value: 2, label: "option 2" },
                  { value: 2, label: "option 2" },
               ]}
               name="currency"
               placeholder="All"
            />
         </div>
      </div>
   );
};

export default JobViewFilter;

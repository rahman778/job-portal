//import { useState } from "react";

import CreatableSelect from "react-select/creatable";

const MultiSelect = ({ options }) => {
   //const [selectedOption, setSelectedOption] = useState(null);
   return (
      <CreatableSelect
         isMulti
         options={options}
         classNames={{
            multiValueLabel: () =>
               "bg-emerald-600/20 dark:bg-emerald-600/60 text-black dark:text-white",
            multiValueRemove: () =>
               "bg-emerald-600/20 dark:bg-emerald-600/60 hover:!bg-emerald-600/20 hover:!text-white dark:hover:!text-black text-black dark:text-white",

            control: (state) =>
               `${
                  state.isFocused
                     ? "py-2 !ring-0 !border-primary !ring-1 !ring-primary/90"
                     : "!border-gray-500 !border-gray-300 dark:!border-gray-500"
               } py-1.5 rounded-sm text-md !bg-transparent`,
            menu: () =>
               "!bg-white dark:!bg-mediumGrey !border-gray-300 dark:!border-gray-600",
            option: (state) =>
               `${
                  state.isFocused ? "!bg-primary/20" : ""
               } text-gray-800 dark:text-gray-200`,
         }}
         classNamePrefix="react-select"
      />
   );
};

export default MultiSelect;

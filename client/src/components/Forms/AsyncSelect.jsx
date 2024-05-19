import Select from "react-select/async";

function AsyncSelect({
   isMulti = true,
   loadOptions,
   labelText,
   error,
   helperText,
   requiredMarker,
   placeholder,
   ...rest
}) {
   return (
      <>
         {labelText && (
            <label
               className={`label inline-block mb-1 ${
                  requiredMarker ? "required-marker" : ""
               }`}
            >
               {labelText}
            </label>
         )}
         <div className="relative w-full">
            <Select
               cacheOptions
               placeholder={placeholder}
               isMulti={isMulti}
               loadOptions={loadOptions}
               defaultOptions
               classNames={{
                  multiValueLabel: () =>
                     "bg-emerald-600/20 dark:bg-emerald-600/60 text-black dark:text-white",
                  multiValueRemove: () =>
                     "bg-emerald-600/20 dark:bg-emerald-600/60 hover:!bg-emerald-600/20 hover:!text-white dark:hover:!text-black text-black dark:text-white",
                  control: (state) =>
                     `${
                        state.isFocused
                           ? "!border-primary !ring-1 !ring-primary/10"
                           : "!border-gray-500 !border-gray-300 dark:!border-gray-500"
                     } ${
                        error &&
                        "border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30"
                     } py-1.5 !min-h-[53px] rounded-sm text-md !bg-transparent`,
                  menu: () =>
                     "!bg-white dark:!bg-mediumGrey !border-gray-300 dark:!border-gray-600",
                  option: (state) =>
                     `${
                        state.isFocused ? "!bg-primary/20" : ""
                     } text-gray-800 dark:text-gray-200`,
               }}
               noOptionsMessage={() => null}
               classNamePrefix="react-select"
               {...rest}
            />
            <span
               className={`absolute top-full left-0 mt-0.5 text-xs text-red-600 ${
                  error ? "visible" : "invisible"
               }`}
            >
               {helperText || " "}
            </span>
         </div>
      </>
   );
}

export default AsyncSelect;

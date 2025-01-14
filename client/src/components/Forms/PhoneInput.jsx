import { forwardRef } from "react";
import { PhoneInput as MobileInput } from "react-international-phone";

import { useController } from "react-hook-form";

import "react-international-phone/style.css";

const PhoneInput = forwardRef(
   (
      {
         labelText,
         name,
         error,
         helperText,
         placeholder,
         requiredMarker,
         control,
         ...rest
      },
      ref
   ) => {
      const { field } = useController({
         name,
         control,
      });

      return (
         <>
            {labelText && (
               <label
                  htmlFor="email"
                  className={`label inline-block mb-1 ${
                     requiredMarker ? 'required-marker' : ""
                  }`}
               >
                  {labelText}
               </label>
            )}
            <div className="relative">
               <MobileInput
                  defaultCountry="lk"
                  value={field.value}
                  ref={ref}
                  inputClassName="input !text-md !text-gray-700 dark:!text-gray-100 min-h-[50px] !border-0"
                  className={`rounded-sm border border-[#6B7280] ${
                     error &&
                     "border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30"
                  } `}
                  countrySelectorStyleProps={{
                     buttonClassName:
                        "p-4 min-h-[50px] !border-l-0 !border-t-0 !border-b-0 !border-r-1 border-r-[#6B7280]",
                  }}
                  placeholder={placeholder}
                  inputProps={{
                     name: name,
                     ...rest,
                  }}
                  name={name}
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
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;

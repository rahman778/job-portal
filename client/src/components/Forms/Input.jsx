import React from "react";

const Input = React.forwardRef(
   (
      {
         labelText,
         name,
         error,
         helperText,
         type = "text",
         placeholder,
         requiredMarker,
         ...rest
      },
      ref
   ) => {
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
               <input
                  ref={ref}
                  className={`input ${
                     error &&
                     "border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30"
                  } `}
                  type={type}
                  placeholder={placeholder}
                  id={name}
                  name={name}
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
);

Input.displayName = "Input";

export default Input;

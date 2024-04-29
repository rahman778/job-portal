import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import {
   MagnifyingGlassIcon,
   MapPinIcon,
   ArrowRightIcon,
   ClockIcon,
} from "@heroicons/react/24/outline";

const SearchFilter = () => {
   const navigate = useNavigate();

   const [placeQuery, setPlaceQuery] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");
   const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);

   const handleFormSubmit = () => {
      console.log("submit");
      navigate("/search");
   };

   return (
      <form onSubmit={handleFormSubmit}>
         <div className="flex flex-col sm:flex-row bg-white dark:dark:bg-gray-900 rounded-[30px] shadow-sm">
            <div className="relative flex-1">
               <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <MagnifyingGlassIcon className="text-amber-500 h-5 w-5" />
               </span>
               <input
                  className="w-full text-black dark:text-white text-md py-4 pl-12 pr-4 bg-white dark:bg-gray-900 border-0 rounded-r-[30px] sm:rounded-r-[0px] rounded-l-[30px] border-r border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-inherit"
                  type="text"
                  value={searchQuery}
                  placeholder="Job tilte or keywords"
                  onFocus={() => setShowSearchSuggestion(true)}
                  onBlur={() => setShowSearchSuggestion(false)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  maxLength={200}
               />

               <ul
                  className={`absolute top-full w-full text-left z-20 bg-white dark:bg-mediumGrey max-h-56 rounded-md border border-gray-300 dark:border-gray-600 mt-0.5 ease-in-out-transition ${
                     showSearchSuggestion
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                  }`}
               >
                  <li
                     onClick={() => setSearchQuery("title")}
                     className="flex items-center space-x-2 text-sm font-medium hover:bg-primary/20 dark:hover:bg-primary/20 px-3 py-2 cursor-pointer"
                  >
                     <ClockIcon className="text-black dark:text-white h-4 w-4 stroke-2" />
                     <span>adadad</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm font-medium hover:bg-primary/20 dark:hover:bg-primary/20 px-3 py-2">
                     aasasasasaa
                  </li>
                  <li className="flex items-center space-x-3 text-sm font-medium hover:bg-primary/20 dark:hover:bg-primary/20 px-3 py-2">
                     asasasas
                  </li>
               </ul>
            </div>
            <div className="relative flex-1">
               <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MapPinIcon className="text-amber-500 h-5 w-5" />
               </span>

               <GooglePlacesAutocomplete
                  apiKey={import.meta.env.VITE_REACT_APP_API_BASE}
                  minLengthAutocomplete={2}
                  selectProps={{
                     placeQuery,
                     onChange: setPlaceQuery,
                     placeholder: "Search places",
                     classNames: {
                        control: () =>
                           `!bg-transparent text-left text-md pl-10 !border-0 !focus:ring-0 !focus:outline-none !focus:border-0`,
                        singleValue: () => "!text-balck dark:!text-white",
                        menu: () =>
                           "!bg-white dark:!bg-mediumGrey text-left !border-gray-300 !dark:border-gray-600",
                        option: (state) =>
                           `${
                              state.isFocused ? "!bg-primary/20" : ""
                           } text-gray-800 dark:text-gray-200`,
                     },
                     classNamePrefix: "react-select",
                     isClearable: true,
                     styles: {
                        control: (base) => ({
                           ...base,
                           border: 0,
                           padding: "11px 10px 11px 35px",
                           boxShadow: "none",
                        }),
                     },
                     components: {
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                     },
                     noOptionsMessage: () => null,
                  }}
               />
            </div>
            <div className="flex-1 max-w-[190px] mt-3 sm:mt-0">
               <button
                  type="submit"
                  className="group py-4 bg-emerald-600 dark:bg-emerald-700 w-full rounded-[30px] hover-transition hover:bg-primary/90 flex items-center gap-x-3 justify-center"
               >
                  <span className="text-white">Find Jobs</span>
                  <ArrowRightIcon className="text-white h-4 w-4 stroke-2 group-hover:scale-x-125 transform duration-300" />
               </button>
            </div>
         </div>
      </form>
   );
};

export default SearchFilter;

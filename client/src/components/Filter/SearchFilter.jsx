import { useNavigate } from "react-router-dom";

import {
   MagnifyingGlassIcon,
   MapPinIcon,
   ArrowRightIcon,
} from "@heroicons/react/24/outline";

const SearchFilter = () => {
   const navigate = useNavigate();
   return (
      <div className="flex flex-col sm:flex-row bg-white rounded-[30px] shadow-sm">
         <div className="relative flex-1 ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
               <MagnifyingGlassIcon className="text-amber-500 h-5 w-5" />
            </span>
            <input
               className="w-full text-black text-md py-4 pl-11 pr-4 bg-white border-0 rounded-r-[30px] sm:rounded-r-[0px] rounded-l-[30px] border-r border-gray-200 focus:ring-0 focus:border-gray-200"
               type="text"
               placeholder="Search"
            />
         </div>
         <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
               <MapPinIcon className="text-amber-500 h-5 w-5" />
            </span>
            <input
               className="w-full text-black  text-md py-4 pl-10 pr-4 bg-white border-0 focus:ring-0"
               type="text"
               placeholder="Search"
            />
         </div>
         <div className="flex-1 mt-3 sm:mt-0">
            <button
               onClick={() => navigate("/search")}
               className="group py-4 bg-primary w-full rounded-[30px] hover-transition hover:bg-primary/90 flex items-center gap-x-3 justify-center"
            >
               <span className="text-white">Find Jobs</span>
               <ArrowRightIcon className="text-white h-4 w-4 stroke-2 group-hover:scale-x-125 transform duration-300" />
            </button>
         </div>
      </div>
   );
};

export default SearchFilter;

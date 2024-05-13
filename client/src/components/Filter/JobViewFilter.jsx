import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../services/categoryService";

import { XMarkIcon } from "@heroicons/react/24/outline";

const dateDictionary = {
   anytime: "any time",
   1: "Past 24 hours",
   7: "Past week",
   30: "Past month",
};

const JobViewFilter = ({ searchEntries, handleRemoveQuery, limit = 10 }) => {
   const { data: categories } = useGetCategoriesQuery();

   const modifiedArray = searchEntries
      .map(([key, value]) => {
         if (value.includes(",")) {
            const parts = value.split(",");
            return parts.map((part) => [key, part]);
         } else {
            return [[key, value]];
         }
      })
      .flat();

   const getCategoryName = (id) => {
      return categories?.find((c) => c._id === id).name;
   };

   const getLabel = (key, val) => {
      switch (key) {
         case "category":
            return getCategoryName(val);
         case "date_posted":
            return dateDictionary[val];
         default:
            return val;
      }
   };

   return (
      <div className="flex flex-wrap overflow-x-auto custom-scrollbar flex-col-reverse md:flex-row justify-between items-center shadow dark:shadow-gray-700 px-6 py-4 rounded-md bg-white dark:bg-mediumGrey">
         <div className="flex gap-x-3 items-center">
            {modifiedArray.map(([key, value]) => (
               <div
                  key={key}
                  onClick={() => handleRemoveQuery(key, value)}
                  className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center gap-x-2 border-[1.5px] border-primary rounded-2xl px-2 py-0.5"
               >
                  <span>{getLabel(key, value)}</span>
                  <XMarkIcon className="w-4 h-4 stroke-2 cursor-pointer" />
               </div>
            ))}
            <Link
               to={`/jobs?sort=recency&page=1&limit=${limit}`}
               className="text-sm font-medium text-emerald-600 hover:text-emerald-500 cursor-pointer"
            >
               Clear Filters
            </Link>
         </div>
      </div>
   );
};

export default JobViewFilter;

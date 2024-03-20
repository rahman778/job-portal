import { useNavigate } from "react-router-dom";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const BackButton = () => {
   const navigate = useNavigate();

   return (
      <span
         onClick={() => navigate(-1)}
         className="inline-block rounded-full p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 hover-transition cursor-pointer"
      >
         <ChevronLeftIcon className="w-6 h-6 stroke-2" />
      </span>
   );
};

export default BackButton;

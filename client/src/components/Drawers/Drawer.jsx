import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const Drawer = ({ isOpen, children }) => {
   const navigate = useNavigate();

   useEffect(() => {
      const toggleBackgroundScrolling = (enable) => {
         const body = document.querySelector("body");
         body.style.overflow = enable ? "hidden" : null;
      };

      toggleBackgroundScrolling(isOpen);

      return () => {
         toggleBackgroundScrolling(false);
      };
   }, [isOpen]);

   return (
      <>
         <div
            onClick={() => navigate(-1)}
            className={
               isOpen
                  ? "fixed top-0 bottom-0 right-0 bg-[#618d61] left-0 w-full z-30 opacity-30"
                  : ""
            }
         ></div>
         <div
            className={`fixed top-0 right-0 w-full md:w-[90vw] xl:w-[80vw] max-w-[1366px] h-full bg-gray-50 dark:bg-darkGrey p-8 md:rounded-l-xl overflow-auto z-40 ease-in-out duration-300 ${
               isOpen ? "translate-x-0" : "translate-x-full"
            }`}
         >
            <div
               className="inline-flex items-center font-medium text-stone-700 hover:text-gray-900 cursor-pointer hover-transition"
               type="button"
               onClick={() => navigate(-1)}
            >
               <ChevronLeftIcon className="dark:text-slate-300 stroke-[3px] h-5 w-5 -ml-1 mr-1" />
            </div>
            {children}
         </div>
      </>
   );
};

export default Drawer;

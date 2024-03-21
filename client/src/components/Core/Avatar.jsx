import { useEffect, useRef, useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Avatar = ({ children, top, right, size = "w-10 h-10" }) => {
   const avatarRef = useRef(null);

   const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
      if (isOpen) {
         document.addEventListener("mousedown", handleClickOutside);
      } else {
         document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [isOpen]);

   const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
         setIsOpen(false);
      }
   };

   const toggleDropdown = () => {
      setIsOpen(!isOpen);
   };

   return (
      <div className="w-full" ref={avatarRef} onMouseDown={handleClickOutside}>
         <div
            className="flex items-center gap-x-1 cursor-pointer"
            onClick={toggleDropdown}
         >
            <div
               className={`rounded-full ${size}  flex items-center justify-center bg-amber-600/20 p-2.5`}
            >
               <span className="font-medium text-md">AW</span>
            </div>
            {children && (
               <div className="">
                  <ChevronDownIcon
                     className={`h-5 w-5 transition-transform duration-300 text-slate-700 dark:text-slate-400 stroke-2 ${
                        isOpen ? "rotate-180" : ""
                     }`}
                  />
               </div>
            )}
         </div>

         {children && (
            <div
               className={`absolute ${top} ${right} bg-white dark:bg-mediumGrey max-h-56 rounded-md border border-gray-300 dark:border-gray-600 transform transition-all duration-300 ease-in-out shadow-md ${
                  isOpen ? "opacity-100 visible" : "opacity-0 invisible"
               }`}
               onClick={() => setIsOpen(false)}
            >
               {children}
            </div>
         )}
      </div>
   );
};

export default Avatar;

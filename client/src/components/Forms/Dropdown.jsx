import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Dropdown = (props) => {
   const { options, handleOptionClick, name, placeholder, selectedItem } =
      props;

   const dropdownRef = useRef(null);

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
         setIsOpen(false);
      }
   };

   const toggleDropdown = () => {
      setIsOpen(!isOpen);
   };

   const onSelect = (option) => {
      handleOptionClick(option);
      setIsOpen(false);
   };

   const value = options.find((opt) => opt.value === selectedItem)?.label || "";

   return (
      <div
         className="relative w-full"
         ref={dropdownRef}
         onMouseDown={handleClickOutside}
      >
         <input
            type="text"
            className="input cursor-default"
            onClick={toggleDropdown}
            placeholder={placeholder}
            value={value}
            name={name}
            readOnly
         />
         <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDownIcon
               className={`h-5 w-5 transition-transform duration-300 text-slate-500 stroke-2 ${
                  isOpen ? "rotate-180" : ""
               }`}
            />
         </div>

         <div
            className={`absolute top-[55px] min-w-full bg-white dark:bg-mediumGrey max-h-56 rounded-md border border-gray-300 dark:border-gray-600 ease-in-out-transition shadow-md z-20 overflow-auto ${
               isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
         >
            <ul>
               {options.map((option) => (
                  <li
                     className={`flex items-center space-x-3 text-sm font-medium hover:bg-primary/20 dark:hover:bg-primary/20 px-4 py-3 cursor-default ${
                        option.value === selectedItem
                           ? "text-primary"
                           : "text-gray-800 dark:text-gray-200"
                     }`}
                     key={option.value}
                     onClick={() => onSelect(option.value)}
                  >
                     <span>{option?.icon}</span>
                     <span>{option.label}</span>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default Dropdown;

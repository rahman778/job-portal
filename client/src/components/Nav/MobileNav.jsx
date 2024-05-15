import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Avatar from "../Core/Avatar";

const links = [
   {
      id: 1,
      label: "Help Center",
      path: "/",
   },
   {
      id: 2,
      label: "Guides",
      path: "/",
   },
   {
      id: 3,
      label: "Support",
      path: "/",
   },
   {
      id: 4,
      label: "About",
      path: "/",
   },
];

const MobileNav = (props) => {
   const { routes, isOpen, setIsOpen, isSignedIn, onLogout } = props;

   return (
      <div
         className={`p-2 absolute right-0 top-2 origin-top-right min-w-full ease-in-out-transition rounded z-50 ${
            isOpen
               ? "scale-100 opacity-100 visible"
               : "scale-90 opacity-0 invisible"
         }`}
      >
         <div className="rounded-lg shadow-lg ring-1 ring-gray-300 dark:ring-gray-700 bg-white dark:bg-mediumGrey divide-y-2 divide-gray-50 dark:divide-gray-700">
            <div className="pt-5 pb-6 px-5">
               <div className="flex items-center justify-between flex-row-reverse">
                  <div className="-mr-2">
                     <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="bg-white dark:bg-darkGrey rounded-md p-1.5 inline-flex items-center justify-center text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                     >
                        <XMarkIcon className="w-6 h-6" />
                        <span className="sr-only">Close menu</span>
                     </button>
                  </div>
                  <div>
                     <Link
                        to="/"
                        className="flex-shrink-0 flex items-center text-gray-900 dark:text-white"
                     >
                        Logo
                     </Link>
                  </div>
               </div>
               <div className="mt-6">
                  <nav className="grid gap-y-6">
                     {routes.map((route) => (
                        <Link
                           key={route.id}
                           to={route.path}
                           className="flex items-center capitalize -m-3 p-3  rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:bg-opacity-50"
                        >
                           {route.icon}
                           <span className="ml-3 text-base font-medium text-gray-900 dark:text-gray-200">
                              {route.label}
                           </span>
                        </Link>
                     ))}
                  </nav>
               </div>
            </div>
            <div className="py-6 px-5 space-y-6">
               <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {links.map((link) => (
                     <Link
                        key={link.id}
                        to={link.path}
                        className="text-base font-medium capitalize text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                     >
                        {link.label}
                     </Link>
                  ))}
               </div>
               <div>
                  {isSignedIn ? (
                     <Avatar top={"-bottom-[65px]"}>
                        <ul className="py-3  text-md min-w-28">
                           <li className="hover:bg-primary/20 dark:hover:bg-primary/20 px-4 py-1 cursor-pointer">
                              Profile
                           </li>
                           <li
                              onClick={onLogout}
                              className="button transparent-btn px-4 py-1 cursor-pointer"
                           >
                              Logout
                           </li>
                        </ul>
                     </Avatar>
                  ) : (
                     <>
                        <Link
                           to="/signup"
                           className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90"
                        >
                           Signup
                        </Link>
                        <p className="mt-6 text-center text-sm font-medium text-gray-500">
                           Existing user ? <Link to="/login">login</Link>
                        </p>
                     </>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default MobileNav;

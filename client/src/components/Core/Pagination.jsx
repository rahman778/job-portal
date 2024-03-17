import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = () => {
   return (
      <div className="flex items-center justify-between shadow dark:shadow-gray-700 p-6 rounded-sm bg-white dark:bg-mediumGrey px-4 py-3 sm:px-6">
         <div className="flex flex-1 justify-between sm:hidden">
            <a
               href="#"
               className="relative inline-flex items-center rounded-sm border border-gray-300 dark:border-gray-700 bg-white px-4 py-2 text-sm font-medium hover:bg-emerald-600/10"
            >
               Previous
            </a>
            <a
               href="#"
               className="relative ml-3 inline-flex items-center rounded-sm border border-gray-300 dark:border-gray-700 bg-white px-4 py-2 text-sm font-medium hover:bg-emerald-600/10"
            >
               Next
            </a>
         </div>
         <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
               <p className="text-sm">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">97</span> results
               </p>
            </div>
            <div>
               <nav
                  className="isolate inline-flex -space-x-px rounded-sm shadow-sm"
                  aria-label="Pagination"
               >
                  <a
                     href="#"
                     className="relative inline-flex items-center rounded-l-md px-2 py-2 border border-gray-300 dark:border-gray-700 hover:bg-emerald-600/10"
                  >
                     <span className="sr-only">Previous</span>
                     <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a
                     href="#"
                     aria-current="page"
                     className="relative z-10 inline-flex items-center bg-primary/80 px-4 py-2 text-sm font-semibold text-white "
                  >
                     1
                  </a>
                  <a
                     href="#"
                     className="relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 dark:border-gray-700 hover:bg-emerald-600/10"
                  >
                     2
                  </a>
                  <a
                     href="#"
                     className="relative hidden items-center px-4 py-2 text-sm font-semibold border border-gray-300 dark:border-gray-700 hover:bg-emerald-600/10 md:inline-flex"
                  >
                     3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 dark:border-gray-700 focus:outline-offset-0">
                     ...
                  </span>
                  <a
                     href="#"
                     className="relative hidden items-center px-4 py-2 text-sm font-semibold border border-gray-300 dark:border-gray-700 hover:bg-emerald-600/10 md:inline-flex"
                  >
                     8
                  </a>
                  <a
                     href="#"
                     className="relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 dark:border-gray-700 hover:bg-emerald-600/10"
                  >
                     9
                  </a>
                  <a
                     href="#"
                     className="relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 dark:border-gray-700 hover:bg-emerald-600/10"
                  >
                     10
                  </a>
                  <a
                     href="#"
                     className="relative inline-flex items-center rounded-r-md px-2 py-2 border border-gray-300 dark:border-gray-700 hover:bg-emerald-600/10"
                  >
                     <span className="sr-only">Next</span>
                     <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
               </nav>
            </div>
         </div>
      </div>
   );
};

export default Pagination;

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import ReactPaginate from "react-paginate";

const Pagination = ({ metaData, limit = 10, page = 1, setPage }) => {
   const pageCount = metaData?.totalPages;

   const handlePageClick = (event) => {
      setPage("page", event.selected + 1);
   };

   const isValidNumber = (value) => {
      return !isNaN(Number(value));
   };

   return (
      <>
         <div className="flex items-center justify-between shadow dark:shadow-gray-700 p-6 rounded-sm bg-white dark:bg-mediumGrey px-4 py-3 sm:px-6">
            <div>
               <p className="text-sm">
                  Showing{" "}
                  <span className="font-medium">
                     {isValidNumber(page) && isValidNumber(limit)
                        ? (Number(page) - 1) * Number(limit) + 1
                        : "-"}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                     {isValidNumber(page) &&
                     isValidNumber(limit) &&
                     isValidNumber(metaData?.count)
                        ? Math.min(
                             Number(page) * Number(limit),
                             Number(metaData?.count)
                          )
                        : "-"}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                     {isValidNumber(metaData?.count)
                        ? Number(metaData?.count)
                        : "-"}
                  </span>{" "}
                  results
               </p>
            </div>
            <ReactPaginate
               forcePage={Number(page) - 1}
               breakLabel="..."
               nextLabel={
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
               }
               nextLinkClassName="relative inline-flex items-center rounded-r-md px-2 py-2 border border-gray-300 dark:border-gray-700 hover:bg-emerald-600/10"
               onPageChange={handlePageClick}
               pageRangeDisplayed={4}
               pageCount={pageCount}
               previousLabel={
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
               }
               previousLinkClassName="relative inline-flex items-center rounded-l-md px-2 py-2 border border-gray-300 dark:border-gray-700 hover:bg-emerald-600/10"
               renderOnZeroPageCount={null}
               containerClassName="inline-flex -space-x-px rounded-sm shadow-sm"
               pageLinkClassName="relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 dark:border-gray-700 hover:bg-emerald-600/10"
               activeClassName="bg-primary/80 font-semibold text-white border-gray-300 dark:border-gray-700 hover:bg-emerald-600"
               disabledLinkClassName="bg-gray-200 dark:bg-gray-700 hover:bg-gray-200 hover:dark:bg-gray-700 cursor-auto"
            />
         </div>
      </>
   );
};

export default Pagination;

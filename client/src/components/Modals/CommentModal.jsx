import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import ModalWrapper from "./ModalWrapper";

const CommentModal = ({ open, setOpen }) => {
   return (
      <ModalWrapper open={open} setOpen={setOpen}>
         <div className="max-h-[92vh] xl:min-w-[768px]">
            <div className="flex flex-col lg:flex-row mt-8 border border-gray-300 dark:border-gray-700 rounded-md">
               <div className="border-r border-gray-300 dark:border-gray-700 p-4 lg:w-1/2">
                  <h3 className="font-medium text-lg mb-0">Abdul Rahman</h3>
                  <div className="mt-3">
                     <button className="button primary-outline-btn">
                        Download Resume
                     </button>
                  </div>
                  <div className="flex mt-4 text-sm text-gray-600 dark:text-gray-400">
                     <span className="min-w-[150px] flex items-center gap-x-2">
                        <CalendarDaysIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <span>Applied On</span>
                     </span>
                     <span>03.04.2022</span>
                  </div>
               </div>
               <div className="p-4 lg:w-1/2 flex flex-col">
                  <div className="h-60 overflow-y-auto custom-scrollbar  text-gray-600 dark:text-gray-400 w-full text-sm">
                     <div className="border border-gray-300 dark:border-gray-700 rounded-md p-3 w-full">
                        This is a comment
                     </div>
                     <div className="border border-gray-300 dark:border-gray-700 rounded-md p-3 w-full mt-3">
                        This is another comment
                     </div>
                     <div className="border border-gray-300 dark:border-gray-700 rounded-md p-3 w-full mt-3">
                        This is another comment
                     </div>
                  </div>
                  <div className="self-end w-full relative mt-3">
                     <input
                        type="text"
                        placeholder="add a coment"
                        className="input py-2.5 w-full pr-16"
                     />
                     <div className="absolute right-1.5 top-[50%] -translate-y-1/2 ">
                        <button className="button primary-btn py-1.5 px-2.5 text-xs rounded-sm">
                           Send
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </ModalWrapper>
   );
};

export default CommentModal;

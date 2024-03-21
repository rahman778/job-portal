import { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import PhoneInput from "../Forms/PhoneInput";

const JobApplyModal = ({ open, setOpen }) => {
   const [isResumeSelected, setIsResumeSelected] = useState(false);
   return (
      <ModalWrapper open={open} setOpen={setOpen}>
         <div className="max-h-[92vh] xl:min-w-[768px]">
            <h2 className="text-lg font-medium mb-2">Apply to Virtusa</h2>
            <div className="mt-6 border border-gray-300 dark:border-gray-700 rounded-md py-4 px-6">
               <form
                  className="space-y-5"
                  autoComplete="off"
                  //onSubmit={onSubmit}
               >
                  <div>
                     <label htmlFor="email" className="label">
                        Email
                     </label>
                     <div className="mt-1">
                        <input
                           required
                           type="email"
                           name="email"
                           //value={formValues.email}
                           //onChange={handleChange}
                           placeholder="Type your email"
                           className="input"
                        />
                     </div>
                  </div>
                  <div>
                     <label htmlFor="mobile" className="label">
                        Mobile
                     </label>
                     <div className="mt-1">
                        <PhoneInput />
                     </div>
                  </div>
                  <div>
                     <label htmlFor="mobile" className="label">
                        Resume
                     </label>
                     <div
                        onClick={() => setIsResumeSelected(true)}
                        className={`mt-1 border rounded-md py-3 px-4 flex justify-between items-center click-transition hover:border-primary hover:bg-emerald-600/10 ${
                           isResumeSelected
                              ? "border-primary bg-emerald-600/10"
                              : ""
                        }`}
                     >
                        <div>
                           <p>ABDUL RAHMAN.PDF</p>
                        </div>
                        <div className="flex items-center gap-x-6">
                           <ArrowDownCircleIcon className="w-8 h-8 text-gray-400" />
                           <span className="border-l w-1 h-8 border-gray-300"></span>
                           <div className="w-[26px] h-[26px] rounded-full border border-primary flex items-center justify-center">
                              {isResumeSelected && (
                                 <span className="w-4 h-4 rounded-full border bg-primary"></span>
                              )}
                           </div>
                        </div>
                     </div>
                     <div className="mt-4">
                        <button className="button primary-outline-btn py-2.5 px-6">
                           Upload resume
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </ModalWrapper>
   );
};

export default JobApplyModal;

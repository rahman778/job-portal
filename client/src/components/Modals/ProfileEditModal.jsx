import ModalWrapper from "./ModalWrapper";
import PhoneInput from "../Forms/PhoneInput";

const ProfileEditModal = ({ open, setOpen }) => {
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
                        First Name
                     </label>
                     <div className="mt-1">
                        <input
                           required
                           type="text"
                           name="email"
                           //value={formValues.email}
                           //onChange={handleChange}
                           placeholder="Type your email"
                           className="input"
                        />
                     </div>
                  </div>
                  <div>
                     <label htmlFor="email" className="label">
                        Last Name
                     </label>
                     <div className="mt-1">
                        <input
                           required
                           type="text"
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
                     <label htmlFor="email" className="label">
                        Address
                     </label>
                     <div className="mt-1">
                        <input
                           required
                           type="text"
                           name="email"
                           //value={formValues.email}
                           //onChange={handleChange}
                           placeholder="Type your address"
                           className="input"
                        />
                     </div>
                  </div>
                  <div className="flex justify-end">
                     <button className="button primary-btn min-w-[100px]">
                        Save
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </ModalWrapper>
   );
};

export default ProfileEditModal;

import { useState } from "react";

import {
   EnvelopeIcon,
   MapPinIcon,
   PencilIcon,
   PhoneIcon,
} from "@heroicons/react/24/outline";
import BackButton from "../../components/Buttons/BackButton";
import Avatar from "../../components/Core/Avatar";
import ProfileEditModal from "../../components/Modals/ProfileEditModal";

function CompanyProfile() {
   const [profileModalOpen, setProfileModalOpen] = useState(false);
   const [editAbout, setEditAbout] = useState(false);

   return (
      <section className="bg-lightGrey dark:bg-mediumGrey min-h-screen pb-16">
         <div className="pt-2 ml-4 xl:ml-8">
            <BackButton />
         </div>

         <div className="max-w-6xl xl:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-2">
            <div className="bg-white dark:bg-mediumGrey border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-6 px-8">
               <div className="flex items-center justify-between">
                  <Avatar size="w-20 h-20" />
                  <PencilIcon
                     onClick={() => setProfileModalOpen(true)}
                     className="w-6 h-6 stroke-2 text-gray-600 dark:text-gray-300 click-transition"
                  />
               </div>
               <h2 className="text-lg font-medium mt-4">Virtusa</h2>
               <div className="flex items-center gap-x-2 text-md mt-3">
                  <EnvelopeIcon className="w-4 h-4 stroke-2 text-gray-600 dark:text-gray-300" />
                  <p className="mb-0 text-gray-600 dark:text-gray-300">
                     careers@gmail.com
                  </p>
               </div>
               <div className="flex items-center gap-x-2 text-md mt-3">
                  <PhoneIcon className="w-4 h-4 stroke-2 text-gray-600 dark:text-gray-300" />
                  <p className="mb-0 text-gray-600 dark:text-gray-300">
                     +94719944353
                  </p>
               </div>
               <div className="flex items-center gap-x-2 text-md mt-3">
                  <MapPinIcon className="w-4 h-4 stroke-2 text-gray-600 dark:text-gray-300" />
                  <p className="mb-0 text-gray-600 dark:text-gray-300">
                     Colombo, Sri Lanka
                  </p>
               </div>
            </div>
            <div className="bg-white dark:bg-mediumGrey border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-6 px-8 mt-5">
               <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium mt-4">About</h2>
                  <PencilIcon
                     onClick={() => setEditAbout(!editAbout)}
                     className="w-6 h-6 stroke-2 text-gray-600 dark:text-gray-300 click-transition"
                  />
               </div>
               <div className="mt-5">
                  <textarea
                     className="input w-full"
                     rows={5}
                     disabled={!editAbout}
                  >
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Natus aperiam quae, delectus alias optio enim harum magnam
                     maxime nostrum officiis. Voluptates omnis culpa quisquam
                     sed unde impedit nihil illo voluptas.
                  </textarea>
               </div>

               {editAbout && (
                  <div className="flex justify-end mt-3">
                     <button className="button primary-btn min-w-[100px]">
                        Save
                     </button>
                  </div>
               )}
            </div>
         </div>
         <ProfileEditModal
            open={profileModalOpen}
            setOpen={setProfileModalOpen}
         />
      </section>
   );
}

export default CompanyProfile;

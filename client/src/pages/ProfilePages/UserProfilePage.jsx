import { useState } from "react";

import {
   ArrowDownCircleIcon,
   EnvelopeIcon,
   MapPinIcon,
   PencilIcon,
   PhoneIcon,
} from "@heroicons/react/24/outline";
import BackButton from "../../components/Buttons/BackButton";
import Avatar from "../../components/Core/Avatar";
import UserProfileEditModal from "../../components/Modals/ProfileEditModal";
import JobCard from "../../components/Cards/JobCard";

function UserProfile() {
   const [profileModalOpen, setProfileModalOpen] = useState(false);

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
               <h2 className="text-lg font-medium mt-4">Abdul Rahman</h2>
               <div className="flex items-center gap-x-2 text-md mt-3">
                  <EnvelopeIcon className="w-4 h-4 stroke-2 text-gray-600 dark:text-gray-300" />
                  <p className="mb-0 text-gray-600 dark:text-gray-300">
                     Rahman778@gmail.com
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
               <div
                  className={`mt-1 border rounded-md py-3 px-4 flex justify-between items-center click-transition border-primary bg-emerald-600/10 `}
               >
                  <div>
                     <p>ABDUL RAHMAN.PDF</p>
                  </div>
                  <div className="flex items-center gap-x-6">
                     <ArrowDownCircleIcon className="w-8 h-8 text-gray-400" />
                  </div>
               </div>
               <label className="block mt-4">
                  <span className="text-md mb-2 inline-block">
                     Replace resume
                  </span>
                  <span className="sr-only">Choose a file</span>
                  <input
                     type="file"
                     className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
      file:bg-emerald-600/10 file:text-primary
      hover:file:bg-emerald-600/20
    "
                  />
               </label>
            </div>
            <div className="bg-white dark:bg-mediumGrey border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-6 px-8 mt-5">
                  <h2 className="text-lg font-medium mb-3">Saved Jobs</h2>
                  <JobCard />
                  <JobCard />
                  <JobCard />
            </div>
         </div>
         <UserProfileEditModal
            open={profileModalOpen}
            setOpen={setProfileModalOpen}
         />
      </section>
   );
}

export default UserProfile;

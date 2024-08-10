import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  EnvelopeIcon,
  PencilIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import BackButton from "../../components/Buttons/BackButton";
import Avatar from "../../components/Core/Avatar";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateUserMutation,
} from "../../services/userService";
import CompanyEditModal from "../../components/Modals/CompanyEditModal";
import toast from "react-hot-toast";
import AnimateSpin from "../../components/Loaders/AnimateSpin";

function CompanyProfile() {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [desc, setDesc] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const { isSignedIn } = useSelector((state) => state.auth);

  const { data: profileData, refetch } = useGetProfileQuery(
    {},
    { skip: !isSignedIn }
  );

  useEffect(() => {
    if (profileData) {
      setDesc(profileData?.description);
    }
  }, [profileData]);

  const [udpateProfile] = useUpdateUserMutation();
  const [updateLogo] = useUpdateProfileMutation();

  const onSuccess = () => {
    setProfileModalOpen(false);
    refetch();
  };

  const onSubmit = async () => {
    try {
      const { data } = await udpateProfile({
        values: { description: desc },
      });

      if (data.success) {
        toast.success("Profile updated successfully");
        setEditAbout(false);
        refetch();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleLogoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      let formData = new FormData();
      formData.append("logo", file);

      try {
        setUploadingLogo(true)
        const { data } = await updateLogo({
          values: formData,
        });

        if (data?.success) {
          toast.success("Logo updated successfully!");
          refetch();
        } else {
          toast.error("Failed to update logo");
        }
      } catch (error) {
        console.log("Error: " + error.message);
      } finally {
        setUploadingLogo(false)
      }
    }
  };

  return (
    <section className="bg-lightGrey dark:bg-mediumGrey min-h-screen pb-16">
      <div className="pt-2 ml-4 xl:ml-8">
        <BackButton />
      </div>

      <div className="max-w-6xl xl:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-2">
        <div className="bg-white dark:bg-mediumGrey border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-6 px-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-x-2 items-center">
              <Avatar size="w-20 h-20" company logo={profileData?.logo}/>
              <input
                type="file"
                id="logoUpload"
                name="logo"
                accept="image/*"
                className="hidden"
                onChange={(event) => handleLogoChange(event)}
                disabled={uploadingLogo}
              />

              <label
                htmlFor="logoUpload"
                className="button primary-outline-btn py-2 px-3 w-60 text-sm cursor-pointer"
              >
                 {uploadingLogo ? <AnimateSpin /> : "Change Logo"}
                
              </label>
            </div>

            <PencilIcon
              onClick={() => setProfileModalOpen(true)}
              className="w-6 h-6 stroke-2 text-gray-600 dark:text-gray-300 click-transition"
            />
          </div>
          <h2 className="text-lg font-medium mt-4">
            {profileData?.companyName}
          </h2>
          <div className="flex items-center gap-x-2 text-md mt-3">
            <EnvelopeIcon className="w-4 h-4 stroke-2 text-gray-600 dark:text-gray-300" />
            <p className="mb-0 text-gray-600 dark:text-gray-300">
              {profileData?.user.email}
            </p>
          </div>
          <div className="flex items-center gap-x-2 text-md mt-3">
            <PhoneIcon className="w-4 h-4 stroke-2 text-gray-600 dark:text-gray-300" />
            <p className="mb-0 text-gray-600 dark:text-gray-300">
              {profileData?.user.phoneNumber}
            </p>
          </div>
          {/* <div className="flex items-center gap-x-2 text-md mt-3">
                  <MapPinIcon className="w-4 h-4 stroke-2 text-gray-600 dark:text-gray-300" />
                  <p className="mb-0 text-gray-600 dark:text-gray-300">
                     Colombo, Sri Lanka
                  </p>
               </div> */}
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
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            ></textarea>
          </div>

          {editAbout && (
            <div className="flex justify-end mt-3">
              <button
                className="button primary-btn min-w-[100px]"
                onClick={onSubmit}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
      <CompanyEditModal
        open={profileModalOpen}
        setOpen={setProfileModalOpen}
        profileData={profileData}
        successCb={onSuccess}
      />
    </section>
  );
}

export default CompanyProfile;

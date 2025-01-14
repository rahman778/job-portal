import { useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {
  ArrowDownCircleIcon,
  EnvelopeIcon,
  PencilIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import BackButton from "../../components/Buttons/BackButton";
import Avatar from "../../components/Core/Avatar";
import UserProfileEditModal from "../../components/Modals/ProfileEditModal";
import JobCard from "../../components/Cards/JobCard";
import { useGetProfileQuery } from "../../services/userService";
import { useGetWatchlistJobsQuery } from "../../services/watchlistService";
import { useGetMyApplicationsQuery } from "../../services/applicationService";
import { createSearchParams, useNavigate } from "react-router-dom";
import Tags from "../../components/Core/Tags";
import CandidateEditModal from "../../components/Modals/CandidateEditModal";

dayjs.extend(relativeTime);

function UserProfile() {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [candidateEditModalOpen, setCandidateEditModalOpen] = useState(false);

  const navigate = useNavigate();

  const { isSignedIn } = useSelector((state) => state.auth);

  const { data: profileData, refetch } = useGetProfileQuery(
    {},
    { skip: !isSignedIn }
  );

  const { data: likedJobs } = useGetWatchlistJobsQuery(
    {},
    { skip: !isSignedIn, refetchOnMountOrArgChange: true }
  );

  const { data: appliedJobs } = useGetMyApplicationsQuery(
    {},
    { skip: !isSignedIn, refetchOnMountOrArgChange: true }
  );

  const onSuccess = () => {
    setProfileModalOpen(false);
    refetch();
  };

  const onCandidateEditSuccess = () => {
    setCandidateEditModalOpen(false);
    refetch();
  };

  const fileName = profileData && profileData?.resume?.split("/").pop();

  const handleDownload = (event) => {
    event.stopPropagation();

    const link = document.createElement("a");
    link.href = profileData?.resume;
    link.download = fileName;
    link.click();
  };

  const openJobDrawer = (id) => {
    navigate({
      pathname: location.pathname,
      search: `?${createSearchParams({
        nav_type: "slider",
        jobId: id,
      })}`,
    });
  };

  return (
    <section className="bg-lightGrey dark:bg-mediumGrey min-h-screen pb-16">
      <div className="pt-2 ml-4 xl:ml-8">
        <BackButton />
      </div>

      <div className="max-w-6xl xl:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-2">
        <div className="bg-white dark:bg-mediumGrey border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-6 px-8">
          <div className="flex items-center justify-between">
            <Avatar size="w-20 h-20" profileData={profileData} />
            <PencilIcon
              onClick={() => setProfileModalOpen(true)}
              className="w-6 h-6 stroke-2 text-gray-600 dark:text-gray-300 click-transition"
            />
          </div>
          <h2 className="text-lg font-medium mt-4">{`${profileData?.user.firstName} ${profileData?.user.lastName}`}</h2>
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

        <div className="bg-white dark:bg-mediumGrey border mt-5 border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-6 px-8">
          <div className="flex items-center justify-between">
            <div></div>
            <PencilIcon
              onClick={() => setCandidateEditModalOpen(true)}
              className="w-6 h-6 stroke-2 text-gray-600 dark:text-gray-300 click-transition"
            />
          </div>
          <div>
            <h6 className="text-md font-medium mb-2">Skills</h6>
            <div className="flex flex-wrap items-center gap-x-3">
              {profileData?.skills.map(skill => (
                <Tags key={skill} name={skill} />
              ))}
            </div>
          </div>
          <div>
            <h6 className="text-md font-medium mb-2 mt-6">Experience Level</h6>
            <div className="flex flex-wrap items-center gap-x-3">
              {profileData?.experienceLevel && (
                <Tags name={profileData?.experienceLevel} />
              )}
              
            </div>
          </div>
        
        </div>

        <div className="bg-white dark:bg-mediumGrey border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-6 px-8 mt-5">
          {profileData?.resume && (
            <div
              className={`mt-1 border rounded-md py-3 px-4 flex justify-between items-center border-primary bg-emerald-600/10 `}
            >
              <div>
                <p>{fileName}</p>
              </div>
              <div className="flex items-center gap-x-6">
                <ArrowDownCircleIcon
                  className="w-8 h-8 text-gray-400 click-transition"
                  onClick={handleDownload}
                />
              </div>
            </div>
          )}

          <label className="block mt-4">
            <span className="text-md mb-2 inline-block">
              {profileData?.resume ? "Replace resume" : "Upload resume"}
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
          <h2 className="text-lg font-medium mb-3">Applied Jobs</h2>
          {appliedJobs?.map((data) => (
            <div
              key={data._id}
              className="mb-3"
              onClick={() => openJobDrawer(data.job._id)}
            >
              <div className="w-full bg-white dark:bg-mediumGrey px-6 py-6 border dark:border-slate-600 hover:border-primary dark:hover:border-primary rounded-md hover:bg-primary/5 dark:hover:bg-primary/5 hover-transition cursor-pointer">
                <div className="flex justify-between items-center">
                  <div className="flex flex-row gap-x-3">
                    <img
                      alt="Logo"
                      src={data?.job.user?.logo ?? "https://placehold.co/600x400/000000/FFF"}
                      width="45"
                      height="45"
                    />
                    <div className="text-stone-800 dark:text-stone-200">
                      <div className="text-base font-medium capitalize  hover:text-primary hover:underline">
                        {data?.job.title}
                      </div>
                      <div className="text-sm">
                        {data?.job.user?.companyName}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-x-3">
                    <div className="text-sm">{data?.status}</div>
                    <span className="text-xs text-slate-500 dark:text-slate-300">
                      {`Applied ${dayjs(data.applicationDate).fromNow()}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-mediumGrey border border-gray-300 dark:border-gray-700 rounded-md shadow-sm py-6 px-8 mt-5">
          <h2 className="text-lg font-medium mb-3">Saved Jobs</h2>
          {likedJobs?.map((data) => (
            <div key={data._id}>
              <JobCard data={data.job} />
            </div>
          ))}
        </div>
      </div>
      <UserProfileEditModal
        open={profileModalOpen}
        setOpen={setProfileModalOpen}
        profileData={profileData?.user}
        successCb={onSuccess}
      />
      <CandidateEditModal
        open={candidateEditModalOpen}
        setOpen={setCandidateEditModalOpen}
        profileData={profileData}
        successCb={onCandidateEditSuccess}
      />
    </section>
  );
}

export default UserProfile;

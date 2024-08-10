import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Drawer from "./Drawer";
import JobHeader from "../Core/JobHeader";
import Tags from "../Core/Tags";
import SaveButton from "../Buttons/SaveButton";
import IconLabel from "../Core/IconLabel";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import JobApplyModal from "../Modals/JobApplyModal";
import { useGetJobQuery } from "../../services/jobService";
import {
  useGetWatchlistJobsQuery,
  useUpdateWatchlistJobsMutation,
} from "../../services/watchlistService";
import toast from "react-hot-toast";
import { useGetMyApplicationsQuery } from "../../services/applicationService";

const JobDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openJobApplyModal, setOpenJobApplyModal] = useState(false);

  const { isSignedIn } = useSelector((state) => state.auth);

  let [searchParams] = useSearchParams();

  const jobId = searchParams?.get("jobId");

  const { data: job } = useGetJobQuery(
    { jobId },
    { skip: !jobId, refetchOnMountOrArgChange: true }
  );

  const { data: likedJobs, refetch } = useGetWatchlistJobsQuery(
    {},
    { skip: !isSignedIn }
  );

  const { data: appliedJobs, refetch: refetchApplications } =
    useGetMyApplicationsQuery({}, { skip: !isSignedIn });

  const [updateWatchlist] = useUpdateWatchlistJobsMutation();

  let type = searchParams?.get("nav_type");

  useEffect(() => {
    if (type !== null) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [type]);

  let isSavedJob =
    isSignedIn && likedJobs?.some((obj) => obj.job._id === job?._id);

  const onSave = async () => {
    if (!isSignedIn) {
      toast.error("Please login to save", {
        position: "top-center",
      });

      return;
    }

    const isLiked = !isSavedJob;

    const res = await updateWatchlist({
      values: { job: job._id, isLiked },
    });

    if (res.data.success) {
      toast.success(res.data.message);
      refetch();
    }
  };

  const handleJobApply = () => {
    if (!isSignedIn) {
      toast.error("Please login to apply", {
        position: "top-center",
      });

      return;
    }

    setOpenJobApplyModal(true);
  };

  const onJobApply = () => {
    setOpenJobApplyModal(false);
    refetchApplications();
  };

  const isAlreadyApplied =
    isSignedIn &&
    appliedJobs &&
    appliedJobs?.some((obj) => obj.job._id === jobId);

  return (
    <Drawer isOpen={isOpen}>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-8 mt-4">
        <div className="lg:col-span-8">
          <JobHeader title={job?.title} companyName={job?.user.companyName} logo={job?.user.logo}/>
          <div
            className="text-slate-700 dark:text-slate-300 text-md mt-6"
            dangerouslySetInnerHTML={{ __html: job?.description }}
          />
        </div>
        <div className="lg:col-span-4 ">
          <div className="sticky top-0">
            <div className="bg-white dark:bg-mediumGrey py-6 shadow-md rounded-md space-y-4">
              <div className="border-b border-slate-200">
                <h6 className="text-lg font-medium px-6 mb-4">Job Overview</h6>
              </div>
              <div className="px-2">
                <IconLabel label="Job Type" value={job?.jobType}>
                  <BookmarkIcon className="h-8 w-6 text-[#161C2D]" />
                </IconLabel>
              </div>
              <div className="px-2">
                <IconLabel label="Modality" value={job?.modality}>
                  <BookmarkIcon className="h-8 w-6 text-[#161C2D]" />
                </IconLabel>
              </div>
              <div className="px-2">
                <IconLabel
                  label="Experience level"
                  value={job?.experienceLevel}
                >
                  <BookmarkIcon className="h-8 w-6 text-[#161C2D]" />
                </IconLabel>
              </div>
            </div>
            <div className="bg-white dark:bg-mediumGrey py-6 shadow-md rounded-md mt-6">
              <div className="border-b border-slate-200">
                <h6 className="text-lg font-medium px-6 mb-4">Skills</h6>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 px-6 mt-5">
                {job?.skillsets?.map((skill, idx) => (
                  <Tags name={skill} key={idx} />
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-3 mt-6">
              {isAlreadyApplied ? (
                <button className="button primary-btn">Applied</button>
              ) : (
                <button className="button primary-btn" onClick={handleJobApply}>
                  Apply for job
                </button>
              )}
              {!isAlreadyApplied && (
                <SaveButton
                  size="size-7"
                  onClick={() => onSave()}
                  isSaved={isSavedJob}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <JobApplyModal
        open={openJobApplyModal}
        setOpen={setOpenJobApplyModal}
        jobId={jobId}
        jobApplyCb={onJobApply}
        company={job?.user.companyName}
      />
    </Drawer>
  );
};

export default JobDrawer;

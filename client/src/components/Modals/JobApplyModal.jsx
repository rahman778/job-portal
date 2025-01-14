import { useState } from "react";
import { useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../services/userService";
import toast from "react-hot-toast";
import AnimateSpin from "../Loaders/AnimateSpin";
import { useAddApplicationMutation } from "../../services/applicationService";

const JobApplyModal = ({ open, setOpen, jobId, jobApplyCb, company }) => {
  //const [isResumeSelected, setIsResumeSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState(null);

  const [udpateProfile] = useUpdateProfileMutation();
  const [apply] = useAddApplicationMutation();

  const { isSignedIn } = useSelector((state) => state.auth);

  const { data: profileData, refetch } = useGetProfileQuery(
    {},
    { skip: !isSignedIn }
  );

  const fileName = profileData && profileData?.resume?.split("/").pop();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      toast.error("Please upload a resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      setIsUploading(true);
      const { data } = await udpateProfile({
        values: formData,
      });

      if (!data?.success) {
        toast.error("Failed to upload resume");
        return;
      }

      toast.success("Resume uploaded successfully!");
      refetch();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleApplyJob = async (event) => {
    event.preventDefault();

    if (!profileData?.resume) {
      toast.error("Please upload a resume");
      return;
    }

    const formData = {
      resumeLink: profileData?.resume,
      coverLetter: coverLetter,
    };

    try {
      setIsApplying(true);
      const { data } = await apply({
        values: formData,
        jobId: jobId,
      });

      if (!data?.success) {
        toast.error("Failed to apply");
        return;
      }

      toast.success("Applied Successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setOpen(false);
      jobApplyCb()
    }
  };

  const handleDownload = (event) => {
    event.stopPropagation();

    const link = document.createElement("a");
    link.href = profileData?.resume;
    link.download = fileName;
    link.click();
  };


  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="max-h-[92vh] xl:min-w-[768px]">
        <h2 className="text-lg font-medium mb-2">{`Apply to ${company}`}</h2>
        <div className="mt-6 border border-gray-300 dark:border-gray-700 rounded-md py-4 px-6">
          <form
            className="space-y-5"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div>
              {profileData?.resume && (
                <>
                  <label htmlFor="mobile" className="label">
                    Resume
                  </label>
                  <div
                    //onClick={() => setIsResumeSelected(true)}
                    className={`mt-1 border rounded-md py-3 px-4 flex justify-between items-center hover:border-primary hover:bg-emerald-600/10`}
                  >
                    <div>
                      <p>{fileName}</p>
                    </div>
                    <div className="flex items-center gap-x-6">
                      <ArrowDownCircleIcon
                        className="w-8 h-8 text-gray-400 cursor-pointer"
                        onClick={handleDownload}
                      />
                      <span className="border-l w-1 h-8 border-gray-300"></span>
                      {/* <div className="w-[26px] h-[26px] rounded-full border border-primary flex items-center justify-center">
                    {isResumeSelected && (
                      <span className="w-4 h-4 rounded-full border bg-primary"></span>
                    )}
                  </div> */}
                    </div>
                  </div>
                </>
              )}

              <label className="block mt-4">
                <span className="text-md mb-2 inline-block">
                  {profileData?.resume ? "Replace resume" : "Upload resume"}
                </span>
                <span className="sr-only">Choose a file</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
      file:bg-emerald-600/10 file:text-primary
      hover:file:bg-emerald-600/20
    "
                />
              </label>
              {selectedFile !== null && (
                <div className="mt-4">
                  <button
                    type="submit"
                    className="button primary-outline-btn py-2.5 px-6"
                    disabled={isUploading}
                  >
                    {isUploading ? <AnimateSpin /> : "Upload resume"}
                  </button>
                </div>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor="coverLetter" className="label">
                Cover Letter
              </label>
              <textarea
                className="input w-full"
                rows={5}
                name="coverLetter"
                //disabled={!}
                onChange={(e) => setCoverLetter(e.target.value)}
                value={coverLetter}
              ></textarea>
            </div>

            <div className="mt-4 justify-end flex">
              <button
                type="submit"
                className="button primary-outline-btn py-2.5 px-6"
                onClick={handleApplyJob}
                disabled={isApplying}
              >
                {isApplying ? <AnimateSpin /> : "Apply"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default JobApplyModal;

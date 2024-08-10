import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CandidateCard from "../../components/Cards/CandidateDnDCard";
import { useSelector } from "react-redux";
import {
  //MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Tags from "../../components/Core/Tags";
import BackButton from "../../components/Buttons/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteJobMutation,
  useGetJobQuery,
} from "../../services/jobService";
import { useGetProfileQuery } from "../../services/userService";
import {
  useGetJobsApplicationQuery,
  useUpdateApplicationMutation,
} from "../../services/applicationService";
import toast from "react-hot-toast";
import DeleteModal from "../../components/Modals/DeleteModal";

function JobManagePage() {
  const [columns, setColumns] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");

  const { jobId } = useParams();

  const { isSignedIn } = useSelector((state) => state.auth);

  const { data: profileData } = useGetProfileQuery({}, { skip: !isSignedIn });

  const { data: appliedJobs, refetch } = useGetJobsApplicationQuery(jobId, {
    skip: !isSignedIn,
  });

  const [updateApplication] = useUpdateApplicationMutation();
  const [deleteJob] = useDeleteJobMutation();

  const navigate = useNavigate();

  const { data: job } = useGetJobQuery({ jobId }, { skip: !jobId });

  // const filteredJobs = appliedJobs?.filter(job =>
  //   `${job?.applicant?.user.firstName} ${job?.applicant?.user.lastName}`
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase())
  // );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsMounted(true);

    if (appliedJobs) {
      const columnsFromBackend = {
        Screening: {
          title: "Screening",
          items: [],
          color: "#656f7d",
        },
        Shortlisted: {
          title: "Shortlisted",
          items: [],
          color: "#7c3aed",
        },
        Interview: {
          title: "Interview",
          items: [],
          color: "#0891b2",
        },
        Rejected: {
          title: "Rejected",
          items: [],
          color: "#dc2626",
        },
      };

      appliedJobs.forEach((job) => {
        const column = columnsFromBackend[job.status];
        if (column) {
          column.items.push({
            id: job._id,
            name: `${job.applicant.user?.firstName} ${job.applicant.user?.lastName}`,
            applicationDate: job.applicationDate,
            resume: job.resume,
          });
        }
      });
      console.log("columnsFromBackend", columnsFromBackend);

      setColumns(columnsFromBackend);
    }
  }, [appliedJobs]);

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });

      const { data } = await updateApplication({
        values: { status: result.destination.droppableId },
        applicationId: result.draggableId,
      });

      if (!data?.success) {
        toast.error("Failed to update the status");
        return;
      }

      toast.success("Status updated successfully!");
      refetch();
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const handleJobDelete = async () => {
    try {
      const { data } = await deleteJob({
        jobId: jobId,
      });

      if (data.success) {
        toast.success("Job Deleted successfully 🔓");
        navigate("/company");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <section className="max-w-6xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 mt-5 mb-10">
        <BackButton />
        <div className="flex flex-wrap items-center justify-between mt-2">
          <div className="flex flex-wrap items-center gap-x-4">
            <h2 className="font-medium text-xl mb-0">{job?.title}</h2>
            <span>{job?.isActive ? "Active" : "Inactive"}</span>
            <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300  flex-shrink-0"></span>
            <span className="font-medium text-sm text-gray-600 dark:text-gray-300">
              {job?.jobType}
            </span>
            <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300  flex-shrink-0"></span>
            <span className="font-medium text-sm text-gray-600 dark:text-gray-300">
              {job?.modality}
            </span>

            {job?.salary.minSalary && (
              <>
                <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 flex-shrink-0"></span>
                <span className="font-medium text-sm text-gray-600 dark:text-gray-300">
                  {`${job?.salary.currency} ${job?.salary.minSalary} - ${job?.salary.currency} ${job?.salary.maxSalary}`}
                </span>
              </>
            )}
          </div>
          <div className="flex gap-x-3">
            <PencilSquareIcon
              className="w-6 h-6 text-gray-600 dark:text-gray-300 click-transition"
              onClick={() =>
                navigate(`/company/${profileData?.user._id}/job/${job._id}`)
              }
            />
            <TrashIcon
              className="w-6 h-6 text-red-600 click-transition"
              onClick={() => setShowDeleteAlert(true)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 mt-4">
          {job?.skillsets.map((skill) => (
            <Tags key={skill} name={skill} />
          ))}
        </div>
        <hr className="my-5 dark:border-gray-600" />
        <div className="flex flex-col lg:flex-row flex-wrap items-center justify-between">
          <h2 className="mb-0 font-medium text-lg">{`${job?.activeApplications} Candidates`}</h2>
          {/* <div className="relative lg:w-1/3 mt-3 lg:mt-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="text-gray-500 h-5 w-5" />
            </span>
            <input
              className="input pl-10 py-2 w-full"
              type="text"
              placeholder="Search candidate"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}
          {/* <div className="mt-4 lg:mt-0">
            <button className="button secondary-btn flex items-center justify-center gap-x-2 click-transition">
              <span>Add Candidate</span>
              <PlusIcon className="w-4 h-4 stroke-2" />
            </button>
          </div> */}
        </div>
        <div className="container mt-10">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-x-5 w-[92vw] overflow-x-auto custom-scrollbar">
              {Object.entries(columns).map(([columnId, column]) => {
                return isMounted ? (
                  <div
                    className="flex flex-col min-w-[290px] pb-6"
                    key={columnId}
                  >
                    <span
                      style={{ borderTopColor: column.color }}
                      className="bg-transparent font-medium shadow-sm py-2.5 px-4 rounded-sm mb-3 border-t-2 shadow-gray-300 dark:shadow-gray-700 text-md"
                    >
                      {column.title}
                    </span>
                    <Droppable key={columnId} droppableId={columnId}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <div className="h-[80vh] overflow-y-auto bg-gray-100 dark:bg-mediumGrey rounded-md p-4 custom-scrollbar">
                            {column.items.map((item, index) => (
                              <CandidateCard
                                key={item.id}
                                item={item}
                                index={index}
                                // onClick={() => setCommentModalpen(true)}
                              />
                            ))}
                            {provided.placeholder}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                ) : null;
              })}
            </div>
          </DragDropContext>
        </div>
      </section>
      <DeleteModal
        open={showDeleteAlert}
        setOpen={setShowDeleteAlert}
        onDelete={handleJobDelete}
      />
    </>
  );
}

export default JobManagePage;

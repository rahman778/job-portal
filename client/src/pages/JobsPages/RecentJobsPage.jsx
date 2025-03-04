import JobCard from "../../components/Cards/JobCard";
import { useGetJobsQuery } from "../../services/jobService";

function RecentJobsPage() {
  const {
    data: jobs,
    isLoading,
    isFetching,
  } = useGetJobsQuery({}, { refetchOnMountOrArgChange: true });

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-[15rem]">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      {jobs?.data.map((job) => (
        <div key={job._id}>
          <JobCard data={job} />
        </div>
      ))}
    </>
  );
}

export default RecentJobsPage;

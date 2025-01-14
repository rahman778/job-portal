import JobCard from "../../components/Cards/JobCard";
import { useGetSuggestedJobsQuery } from "../../services/recommendationService";

function SuggestedJobsPage() {
  const { data: jobs } = useGetSuggestedJobsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  return (
    <>
      {jobs?.bestJobMatch.map((job) => (
        <div key={job._id}>
          <JobCard data={job} />
        </div>
      ))}
    </>
  );
}

export default SuggestedJobsPage;

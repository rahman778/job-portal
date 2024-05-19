import JobCard from "../../components/Cards/JobCard";
import { useGetJobsQuery } from "../../services/jobService";

function RecentJobsPage() {
   const { data: jobs } = useGetJobsQuery(
      {},
      { refetchOnMountOrArgChange: true }
   );

   console.log('jobs', jobs)

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

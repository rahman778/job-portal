import JobCard from "../../components/Cards/JobCard";
import { useGetJobsQuery } from "../../services/jobService";

function RecentJobsPage() {

   const { data: jobs } = useGetJobsQuery();

   console.log('jobs', jobs)

   return (
      <>
         {jobs?.map((job) => (
            <div key={job._id}>
               <JobCard />
            </div>
         ))}
      </>
   );
}

export default RecentJobsPage;

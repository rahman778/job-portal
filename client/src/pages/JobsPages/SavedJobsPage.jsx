import { useSelector } from "react-redux";

import JobCard from "../../components/Cards/JobCard";
import { useGetWatchlistJobsQuery } from "../../services/watchlistService";

function SavedJobsPage() {

   const { isSignedIn } = useSelector((state) => state.auth);

   const { data: likedJobs } = useGetWatchlistJobsQuery(
      {},
      { skip: !isSignedIn }
    );

   return (
      <>
      {likedJobs?.map((data) => (
         <div key={data._id}>
            <JobCard data={data.job} />
         </div>
      ))}
   </>
   );
}

export default SavedJobsPage;

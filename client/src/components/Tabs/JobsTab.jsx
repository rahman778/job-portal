import { NavLink } from "react-router-dom";

function JobsTab() {
   const classes =
      "relative flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-700 click-transition";
   return (
      <div className="space-y-5">
         <ul className="flex items-center justify-center gap-3 text-sm font-medium">
            <li>
               <NavLink
                  to="/recent-jobs"
                  className={(navData) =>
                     navData.isActive
                        ? `${classes} bg-primary/30`
                        : `${classes} hover:bg-primary/10 hover:text-gray-700 dark:hover:text-gray-400`
                  }
               >
                  Recent Jobs
               </NavLink>
            </li>
            <li>
               <NavLink
                  to="/suggested-jobs"
                  className={(navData) =>
                     navData.isActive
                        ? `${classes} bg-primary/30`
                        : `${classes} hover:bg-primary/10 hover:text-gray-700 dark:hover:text-gray-400`
                  }
               >
                  Suggested Jobs
               </NavLink>
            </li>
            <li>
               <NavLink
                  to="/saved-jobs"
                  className={(navData) =>
                     navData.isActive
                        ? `${classes} bg-primary/30`
                        : `${classes} hover:bg-primary/10 hover:text-gray-700 dark:hover:text-gray-400`
                  }
               >
                  Saved Jobs
                  <span className="rounded-full bg-emerald-600/20 text-primary px-2 py-0.5 text-xs font-semibold">
                     {" "}
                     8
                  </span>
               </NavLink>
            </li>
         </ul>
      </div>
   );
}

export default JobsTab;

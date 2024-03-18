import { Outlet } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import JobDrawer from "../components/Drawers/JobDrawer";
// import JobCard from "../components/Cards/JobCard";

// import JobFilter from "../components/Filter/JobFilter";
// import JobViewFilter from "../components/Filter/JobViewFilter";
// import Checkbox from "../components/Forms/Checkbox";
// import Dropdown from "../components/Forms/Dropdown";

function AppLayout() {
   return (
      // <div>
      //    <Nav />
      //    <div className="px-5 mt-20">
      //       <h2>Connecting Talent with Opportunity</h2>
      //       <Checkbox label="I consent" />
      //       <Dropdown
      //          options={[
      //             {
      //                value: "unlimit",
      //                label: "unlimit",
      //             },
      //             {
      //                value: "2",
      //                label: "option 2",
      //             },
      //             {
      //                value: "3",
      //                label: "option 3",
      //             },
      //          ]}
      //          name={"time"}
      //          selectedItem={val}
      //          placeholder={"xzxzxz"}
      //          handleOptionClick={(val) => setval(val)}
      // </div>
      <>
         <Nav />

         <main>
            {/* <main className="max-w-6xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12"> */}
            <Outlet />
         </main>
         <JobDrawer />
      </>
   );
}

export default AppLayout;

import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useGetProfileQuery } from "../../services/userService";
import { authActions } from "../../state/auth";

import { BriefcaseIcon } from "@heroicons/react/24/outline";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";


const routes = [
   {
      id: 1,
      label: "jobs",
      path: "/recent-jobs",
      icon: <BriefcaseIcon className="h-5 w-5 text-primary flex-shrink" />,
   },
];

const Nav = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [isOpen, setIsOpen] = useState(false);

   const { isSignedIn } = useSelector((state) => state.auth);

   const { data: profileData } = useGetProfileQuery({}, {skip: !isSignedIn});

   const onLogout = () => {
      dispatch(authActions.logout());
      navigate(0);
   };

   return (
      <>
         <DesktopNav
            routes={routes}
            setIsOpen={setIsOpen}
            isSignedIn={isSignedIn}
            onLogout={onLogout}
            profileData={profileData}
         ></DesktopNav>
         <MobileNav
            routes={routes}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isSignedIn={isSignedIn}
            onLogout={onLogout}
            profileData={profileData}
         ></MobileNav>
      </>
   );
};

export default Nav;

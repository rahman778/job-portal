import { useState } from "react";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const routes = [
   {
      id: 1,
      label: "job",
      path: "/job",
      icon: <BriefcaseIcon className="h-5 w-5 text-primary flex-shrink" />,
   },
];

const Nav = () => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <>
         <DesktopNav routes={routes} setIsOpen={setIsOpen}></DesktopNav>
         <MobileNav
            routes={routes}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
         ></MobileNav>
      </>
   );
};

export default Nav;

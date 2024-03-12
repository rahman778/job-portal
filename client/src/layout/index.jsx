import { useState } from "react";
import Checkbox from "../components/Forms/Checkbox";
import Dropdown from "../components/Forms/Dropdown";
import Nav from "../components/Nav/Nav";

function Layout() {
   const [val, setval] = useState("2")
   return (
      <div>
         <Nav />
         <div className="px-5 mt-20">
            <Checkbox label="I consent"/>
            <Dropdown
                   options={[
                     {
                        value: "unlimit",
                        label: "unlimit",
                     },
                     {
                        value: "2",
                        label: "option 2",
                     },
                     {
                        value: "3",
                        label: "option 3",
                     },
                  ]}
                  name={'time'}
                  selectedItem={val}
                  placeholder={"xzxzxz"}
                  handleOptionClick={(val) => setval(val)}
               />
               <div className="mt-5">
               <input type="text" name="" className="input" id="" />
               </div>
               
         </div>
      </div>
   );
}

export default Layout;

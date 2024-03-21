import { useState } from "react";

import AuthLayout from "../../layout/AuthLayout";
import AnimateSpin from "../../components/Loaders/AnimateSpin";
import {
   BriefcaseIcon,
   BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

function SignupPage() {
   const [loading] = useState(false);
   const [role, setRole] = useState(null);
   const [isRoleSelected, setIsRoleSelected] = useState(false);
   const [formValues, setFormValues] = useState({
      name: "",
      email: "",
      password: "",
   });

   const onSubmit = async (e) => {
      e.preventDefault();
   };

   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
   };

   const onRoleSelect = () => {
      setIsRoleSelected(true);
   };

   return (
      <AuthLayout isLogin={false}>
         {!isRoleSelected ? (
            <div className="-mt-5">
               <h2 className="text-center text-xl font-medium text-gray-900 dark:text-white">
                  Join as a recruiter or candidate
               </h2>
               <div className="flex items-center justify-center gap-x-6 mt-5">
                  <div
                     onClick={() => setRole("recruiter")}
                     className={`border w-44 h-40 rounded-sm p-4 cursor-pointer active:scale-95 hover-transition hover:border-primary hover:bg-emerald-600/10 ${
                        role === "recruiter"
                           ? "border-primary bg-emerald-600/10"
                           : ""
                     }`}
                  >
                     <BuildingOffice2Icon className="text-slate-600 dark:text-slate-300  h-6 w-6" />
                     <span className="mt-2 inline-block font-medium">
                        Im a recruiter hiring for company
                     </span>
                  </div>
                  <div
                     onClick={() => setRole("candidate")}
                     className={`border w-44 h-40 rounded-sm p-4  cursor-pointer active:scale-95 hover-transition hover:border-primary hover:bg-emerald-600/10  ${
                        role === "candidate"
                           ? "border-primary bg-emerald-600/10"
                           : ""
                     }`}
                  >
                     <BriefcaseIcon className="text-slate-600 dark:text-slate-300  h-6 w-6" />
                     <span className="mt-2 inline-block font-medium">
                        Im a candidate looking for job
                     </span>
                  </div>
               </div>
               <div className="mt-4 text-center">
                  <button
                     disabled={role === null}
                     className="button primary-btn w-48 mt-1 py-2.5"
                     onClick={onRoleSelect}
                  >
                     Continue
                  </button>
               </div>
            </div>
         ) : (
            <form className="space-y-6" autoComplete="off" onSubmit={onSubmit}>
               <div>
                  <label htmlFor="name" className="label">
                     Name
                  </label>
                  <div className="mt-1">
                     <input
                        required
                        type="text"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        placeholder="Type your name"
                        className="input py-2.5"
                     />
                  </div>
               </div>
               <div>
                  <label htmlFor="email" className="label">
                     Email
                  </label>
                  <div className="mt-1">
                     <input
                        required
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        placeholder="Type your email"
                        className="input py-2.5"
                     />
                  </div>
               </div>
               <div>
                  <label htmlFor="password" className="label">
                     Password
                  </label>
                  <div className="mt-1">
                     <input
                        required
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                        placeholder="Type your password"
                        className="input py-2.5"
                     />
                  </div>
               </div>
               <div>
                  <button
                     type="submit"
                     className="button primary-btn w-full mt-1 py-2.5"
                     disabled={loading}
                  >
                     {loading ? <AnimateSpin /> : "Sign up"}
                  </button>
               </div>
            </form>
         )}
      </AuthLayout>
   );
}

export default SignupPage;

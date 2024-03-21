import { useState } from "react";

import AuthLayout from "../../layout/AuthLayout";
import { Link } from "react-router-dom";
import Checkbox from "../../components/Forms/Checkbox";
import AnimateSpin from "../../components/Loaders/AnimateSpin";

function LoginPage() {
   const [loading] = useState(false);
   const [formValues, setFormValues] = useState({
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
   return (
      <AuthLayout isLogin={true}>
         <form className="space-y-6" autoComplete="off" onSubmit={onSubmit}>
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
            <div className="flex items-center justify-between">
               <div>
                  <Checkbox label="Remember me" labelClass="text-sm" />
               </div>
               <Link to="/signup" className="link">
                  Forgot your password?
               </Link>
            </div>
            <div>
               <button
                  type="submit"
                  className="button primary-btn w-full py-2.5"
                  // disabled={loading}
               >
                  {loading ? <AnimateSpin /> : "Log In"}
               </button>
            </div>
         </form>
      </AuthLayout>
   );
}

export default LoginPage;

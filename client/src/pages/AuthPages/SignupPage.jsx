import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { authActions } from "../../state/auth";
import { useSignUpMutation } from "../../services/authService";

import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME, ROLES } from "../../constants";

import AuthLayout from "../../layout/AuthLayout";
import AnimateSpin from "../../components/Loaders/AnimateSpin";
import {
   BriefcaseIcon,
   BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import Input from "../../components/Forms/Input";
import PhoneInput from "../../components/Forms/PhoneInput";

function SignupPage() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [isLoading, setIsLoading] = useState(false);
   const [role, setRole] = useState(null);
   const [isRoleSelected, setIsRoleSelected] = useState(false);

   const [signUp, { error: signUpError }] = useSignUpMutation();

   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm({ mode: "onBlur" });

   useEffect(() => {
      if (signUpError) {
         toast.error(signUpError.data.message || "Something went wrong", {
            position: "top-right",
         });
      }
   }, [signUpError]);

   const onSubmit = async (values) => {
      let formValues = {
         ...values,
         role,
      };

      try {
         setIsLoading(true);
         const { data } = await signUp({
            values: formValues,
         });

         if (data.success) {
            sessionStorage.setItem(
               ACCESS_TOKEN_NAME,
               JSON.stringify(data.accessToken)
            );
            localStorage.setItem(
               REFRESH_TOKEN_NAME,
               JSON.stringify(data.refreshToken)
            );
            toast.success("Signup successful 🔓");

            dispatch(authActions.setUser(data.user));
            checkRole(data.user);
         }
      } catch (error) {
         console.log("error", error);
      } finally {
         setIsLoading(false);
      }
   };

   const checkRole = (user) => {
      if (user.role === ROLES.Candidate) {
         navigate("/");
      } else if (user.role === ROLES.Recruiter) {
         navigate(`/company/${user.id}`);
      } else if (user.role === ROLES.Admin) {
         navigate("/admin");
      }
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
                     onClick={() => setRole(ROLES.Recruiter)}
                     className={`border w-44 h-40 rounded-sm p-4 cursor-pointer active:scale-95 hover-transition hover:border-primary hover:bg-emerald-600/10 ${
                        role === ROLES.Recruiter
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
                     onClick={() => setRole(ROLES.Candidate)}
                     className={`border w-44 h-40 rounded-sm p-4  cursor-pointer active:scale-95 hover-transition hover:border-primary hover:bg-emerald-600/10  ${
                        role === ROLES.Candidate
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
            <form
               className="space-y-4"
               autoComplete="off"
               onSubmit={handleSubmit(onSubmit)}
            >
               <div>
                  <Input
                     {...register("firstName", {
                        required: "Please enter first name",
                     })}
                     name="firstName"
                     placeholder="Type your first name"
                     labelText="First Name"
                     error={errors.firstName ? true : false}
                     helperText={
                        errors.firstName ? errors.firstName.message : null
                     }
                  />
               </div>
               <div>
                  <Input
                     {...register("lastName", {
                        required: "Please enter last name",
                     })}
                     name="lastName"
                     placeholder="Type your last name"
                     labelText="Last Name"
                     error={errors.lastName ? true : false}
                     helperText={
                        errors.lastName ? errors.lastName.message : null
                     }
                  />
               </div>

               {role === ROLES.Recruiter && (
                  <div>
                     <Input
                        {...register("companyName", {
                           required: "Please enter company name",
                        })}
                        name="companyName"
                        placeholder="Type your company name"
                        labelText="Company Name"
                        error={errors.companyName ? true : false}
                        helperText={
                           errors.companyName
                              ? errors.companyName.message
                              : null
                        }
                     />
                  </div>
               )}

               <div>
                  <PhoneInput
                     {...register("phoneNumber", {
                        required: "Please enter mobile number",
                        minLength: {
                           value: 10,
                           message: "Please enter valid mobile number",
                        },
                     })}
                     control={control}
                     name="phoneNumber"
                     placeholder="Type your last name"
                     labelText="Mobile"
                     error={errors.phoneNumber ? true : false}
                     helperText={
                        errors.phoneNumber ? errors.phoneNumber.message : null
                     }
                  />
               </div>
               <div>
                  <Input
                     {...register("email", {
                        required: "Please enter email",
                        pattern: {
                           // eslint-disable-next-line no-useless-escape
                           value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
                           message: "Please enter valid email.",
                        },
                     })}
                     name="email"
                     placeholder="Type your email"
                     labelText="Email"
                     error={errors.email ? true : false}
                     helperText={errors.email ? errors.email.message : null}
                  />
               </div>
               <div>
                  <Input
                     {...register("password", {
                        required: "Please enter password",
                        minLength: {
                           value: 8,
                           message:
                              "Password minimum length should be 8 characters",
                        },
                        pattern: {
                           value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                           message:
                              "Password must contain at least one lowercase letter, one uppercase letter and one numeric digit",
                        },
                     })}
                     name="password"
                     placeholder="Type your password"
                     labelText="Password"
                     error={errors.password ? true : false}
                     helperText={
                        errors.password ? errors.password.message : null
                     }
                     type="password"
                  />
               </div>
               <div>
                  <button
                     type="submit"
                     className="button primary-btn click-transition mt-5 w-full py-3"
                     disabled={isLoading}
                  >
                     {isLoading ? <AnimateSpin /> : "Sign up"}
                  </button>
               </div>
            </form>
         )}
      </AuthLayout>
   );
}

export default SignupPage;

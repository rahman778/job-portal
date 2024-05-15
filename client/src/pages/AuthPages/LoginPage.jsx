import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { authActions } from "../../state/auth";
import { useSignInMutation } from "../../services/authService";
import { ACCESS_TOKEN_NAME, ROLES } from "../../constants";

import AuthLayout from "../../layout/AuthLayout";

import Checkbox from "../../components/Forms/Checkbox";
import AnimateSpin from "../../components/Loaders/AnimateSpin";
import Input from "../../components/Forms/Input";

function LoginPage() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [isLoading, setIsLoading] = useState(false);
   const [remember, setRemember] = useState(false);

   const [signIn] = useSignInMutation();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: "onBlur" });

   const onSubmit = async (values) => {
      const { email, password } = values;

      try {
         setIsLoading(true);
         const res = await signIn({ email, password });

         if (res.error) {
            toast.error(res.error.data.message || "Something went wrong", {
               position: "top-right",
            });
            return;
         }

         if (res.data.success) {
            if (remember) {
               localStorage.setItem(ACCESS_TOKEN_NAME, res.data.accessToken);
            } else {
               sessionStorage.setItem(ACCESS_TOKEN_NAME, res.data.accessToken);
            }

            dispatch(authActions.setUser(res.data.user));
            checkRole(res.data.user.role);
         }
      } catch (error) {
         console.log("error");
      } finally {
         setIsLoading(false);
      }
   };

   const checkRole = (role) => {
      if (role === ROLES.Candidate) {
         navigate("/");
      } else if (role === ROLES.Recruiter) {
         navigate("/company");
      } else if (role === ROLES.Admin) {
         navigate("/admin");
      }
   };

   return (
      <AuthLayout isLogin={true}>
         <form
            className="space-y-5"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
         >
            <div>
               <Input
                  {...register("email", {
                     required: "Please enter email.",
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
                     required: "Please enter password.",
                     minLength: {
                        value: 8,
                        message:
                           "Password minimum length should be 8 characters",
                     },
                  })}
                  name="password"
                  placeholder="Type your password"
                  labelText="Password"
                  error={errors.password ? true : false}
                  helperText={errors.password ? errors.password.message : null}
                  type="password"
               />
            </div>
            <div className="flex items-center justify-between">
               <div>
                  <Checkbox
                     label="Remember me"
                     name="remember"
                     labelClass="text-sm"
                     onChange={(e) => setRemember(e.target.checked)}
                  />
               </div>
               <Link to="/signup" className="link">
                  Forgot your password?
               </Link>
            </div>
            <div>
               <button
                  type="submit"
                  className="button primary-btn click-transition w-full py-3"
                  disabled={isLoading}
               >
                  {isLoading ? <AnimateSpin /> : "Log In"}
               </button>
            </div>
         </form>
      </AuthLayout>
   );
}

export default LoginPage;

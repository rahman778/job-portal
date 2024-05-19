import { useState, useEffect } from "react";
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

   const [signIn, { error: signInError }] = useSignInMutation();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: "onBlur" });

   useEffect(() => {
      if (signInError) {
         toast.error(signInError.data.message || "Something went wrong", {
            position: "top-right",
         });
      }
   }, [signInError]);

   const onSubmit = async (values) => {
      const { email, password } = values;

      try {
         setIsLoading(true);
         const { data } = await signIn({ email, password });

         if (data.success) {
            if (remember) {
               localStorage.setItem(ACCESS_TOKEN_NAME, data.accessToken);
            } else {
               sessionStorage.setItem(ACCESS_TOKEN_NAME, data.accessToken);
            }

            dispatch(authActions.setUser(data.user));
            checkRole(data.user);
            console.log('data', data)
         }
      } catch (error) {
         console.log("error");
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

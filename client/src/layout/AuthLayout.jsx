import { Link } from "react-router-dom";

import ThemeButton from "../components/Buttons/ThemeButton";

function AuthLayout(props) {
   const { isLogin, children } = props;
   return (
      <>
         <div className="hidden md:flex justify-between py-4 px-4 lg:px-10">
            <Link to="/" className="flex justify-center">
               Logo
            </Link>
            <div className="flex items-center text-sm space-x-4">
               <ThemeButton />
               <span>
                  {isLogin
                     ? "Dont't have an account yet?"
                     : "Already have an account?"}
               </span>
               <Link
                  to={isLogin ? "/signup" : "/login"}
                  className="button light-btn"
               >
                  {isLogin ? "Sign up" : "Log in"}
               </Link>
            </div>
         </div>

         <main className="text-gray-600 dark:text-gray-400 min-h-[93vh] flex flex-col justify-center mx-2 sm:mx-0">
            <div className="flex flex-col justify-center mt-0 py-6 sm:px-6 lg:px-8">
               <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900 dark:text-white">
                     {isLogin
                        ? "Log in to your account"
                        : "Create a free account"}
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                     <span>Or</span>
                     <Link
                        to={isLogin ? "/signup" : "/login"}
                        className="link ml-1.5"
                     >
                        {isLogin
                           ? "create a free account"
                           : "log in to your account"}
                     </Link>
                  </p>
               </div>

               <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md space-y-8">
                  <div>{children}</div>
               </div>
            </div>
         </main>
      </>
   );
}

export default AuthLayout;

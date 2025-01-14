import { NavLink, useParams } from "react-router-dom";
import { useConfirmEmailMutation } from "../../services/authService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AnimateSpin from "../../components/Loaders/AnimateSpin";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME, ROLES } from "../../constants";
import { authActions } from "../../state/auth";

function VerifyPage() {
   const [isVerified, setIsVerified] = useState(false);
   const [user, setUser] = useState(null);

   const { token } = useParams();
   const dispatch = useDispatch();

   const [confirmEmail, { error: emailConfirmError, isLoading }] =
      useConfirmEmailMutation();

   useEffect(() => {
      if (emailConfirmError) {
         toast.error(emailConfirmError.data.message || "Something went wrong", {
            position: "top-right",
         });
      }
   }, [emailConfirmError]);

   useEffect(() => {
      verifyEmail(token);
   }, [token]);

   const verifyEmail = async (token) => {
      try {
         const { data } = await confirmEmail({token});

         if (data.success) {
            setIsVerified(true);
            setUser(data.user);

            sessionStorage.setItem(
               ACCESS_TOKEN_NAME,
               JSON.stringify(data.accessToken)
            );
            localStorage.setItem(
               REFRESH_TOKEN_NAME,
               JSON.stringify(data.refreshToken)
            );

            dispatch(authActions.setUser(data.user));
         }
      } catch (error) {
         console.log("error", error);
      }
   };

   if (isLoading) {
      return (
         <div className="h-screen flex items-center justify-center">
            <AnimateSpin />
         </div>
      );
   }

   return (
      <div className="h-screen flex flex-col gap-5 items-center justify-center">
         {!isLoading && isVerified ? (
            <>
               <div>You have successfully verified your email</div>
               <img src="/images/success.png" className="h-20 w-20" alt="" />
               {user.role === ROLES.Candidate ? (
                  <NavLink
                     to="/recent-jobs"
                     className="button primary-outline-btn"
                  >
                     Explore Jobs
                  </NavLink>
               ) : (
                  <NavLink to="/company" className="button primary-outline-btn">
                     Dashboard
                  </NavLink>
               )}
            </>
         ) : (
            <>
               <div>Something went wrong, Please try again later.</div>
               <img src="/images/error.png" className="h-20 w-20" alt="" />
            </>
         )}
      </div>
   );
}

export default VerifyPage;

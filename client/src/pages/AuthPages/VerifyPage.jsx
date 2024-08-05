import { NavLink, useParams } from "react-router-dom";
import { useConfirmEmailMutation } from "../../services/authService";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

function VerifyPage() {
   const [isVerified, setIsVerified] = useState(false);

   const { token } = useParams();

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
      //verifyEmail();
   }, [token]);

   const verifyEmail = async (token) => {
      const { data } = await confirmEmail(token);

      if (data.success) {
         setIsVerified(true);
      }
   };

   console.log("token", token);
   return (
      <div className="h-screen flex flex-col gap-5 items-center justify-center">
         <div>You have successfully verified your email</div>
         <img src="/images/success.png" className="h-20 w-20" alt="" />
         <NavLink to="/recent-jobs" className="button primary-outline-btn">
            Explore Jobs
         </NavLink>
      </div>
   );
}

export default VerifyPage;

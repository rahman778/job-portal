import { useState } from "react";
import { PhoneInput as MobileInput } from "react-international-phone";
import "react-international-phone/style.css";

const PhoneInput = () => {
   const [phone, setPhone] = useState("");
   return (
      <div>
         <MobileInput
            defaultCountry="lk"
            value={phone}
            onChange={(phone) => setPhone(phone)}
            inputClassName="input min-h-[50px] border-gray-500 dark:border-gray-500 "
            className="border border-gray-500 dark:border-gray-800 rounded-sm"
            countrySelectorStyleProps={{
               buttonClassName: "p-4 min-h-[50px] dark:border-gray-500",
            }}
         />
      </div>
   );
};

export default PhoneInput;

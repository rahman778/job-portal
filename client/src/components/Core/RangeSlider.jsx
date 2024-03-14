import { useState } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";


const RangeSlider = () => {
    const [value, setValue] = useState(20);

    const OnChangeEventTriggerd = (newValue) => {
      console.log("new Value", newValue);
      setValue(newValue);
    };
   const didOnBeforeChangeTrigger = () => {
      console.log("OnBeforeChange event triggered");
   };

   const didOnAfterChangeTrigger = (value) => {
      console.log(`OnAfterChange event triggered at: ${value}`);
   };
   return (
      <div>
         <Slider
            range
            trackStyle={{ backgroundColor: "rgb(5 150 105 / 0.8)", height: 5 }}
            railStyle={{ backgroundColor: "rgb(5 150 105 / 0.3)", height: 5 }}
            handleStyle={{
               borderColor: "rgb(5 150 105 / .9)",
               height: 15,
               width: 15,
               marginLeft: 0,
               marginTop: -5,
               backgroundColor: "rgb(5 150 105 / 0.7)",
            }}
            defaultValue={[0, 100]}
            onBeforeChange={didOnBeforeChangeTrigger}
            onAfterChange={didOnAfterChangeTrigger}
            onChange={OnChangeEventTriggerd}
         />
         {value}
      </div>
   );
};

export default RangeSlider;

import { useState } from "react";
import { useForm } from "react-hook-form";

import BackButton from "../../components/Buttons/BackButton";
import Dropdown from "../../components/Forms/Dropdown";
import MultiSelect from "../../components/Forms/MultiSelect";
import AnimateSpin from "../../components/Loaders/AnimateSpin";
import Input from "../../components/Forms/Input";

function JobCreatePage() {
   const [isLoading, setIsLoading] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: "onBlur" });

   const onSubmit = async (values) => {
      console.log("values", values);
   };
   const [selectedOption, setSelectedOption] = useState(null);

   const options = [
      { value: "blues", label: "Blues" },
      { value: "rock", label: "Rock" },
      { value: "jazz", label: "Jazz" },
      { value: "orchestra", label: "Orchestra" },
   ];
   return (
      <section className="bg-lightGrey dark:bg-mediumGrey min-h-full pb-16">
         <div className="max-w-6xl xl:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-5 pb-16">
            <BackButton />
            <h1 className="text-center font-medium text-3xl text-darkGreen dark:text-ligherGreen">
               Post a New Job
            </h1>
            <div className="max-w-5xl bg-white dark:bg-darkGrey mx-auto p-2 lg:py-6 lg:px-10 rounded-lg mt-5">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                     <Input
                        {...register("ttile", {
                           required: "Please enter ttile",
                        })}
                        name="title"
                        placeholder="Type your job title"
                        labelText="Job Title"
                        error={errors.password ? true : false}
                        helperText={
                           errors.password ? errors.password.message : null
                        }
                        requiredMarker
                     />
                  </div>
                  <div className="mt-5">
                     <label htmlFor="" className="inline-block mb-1.5 text-lg">
                        Job Description*
                     </label>
                     <textarea className="input" rows={5}></textarea>
                  </div>
                  <div className="flex flex-col xl:flex-row mt-5 gap-x-5">
                     <div className="w-full xl:w-1/2">
                        <label className="inline-block mb-1.5 text-lg">
                           Job Category
                        </label>
                        <Dropdown
                           options={[
                              { value: 1, label: "option 1" },
                              { value: 2, label: "option 2" },
                              { value: 4, label: "option 4" },
                           ]}
                           name="currency"
                           label="currency"
                           placeholder="Currency"
                           defaultValue={selectedOption}
                           onChange={setSelectedOption}
                        />
                     </div>
                     <div className="w-full xl:w-1/2">
                        <label className="inline-block mb-1.5 text-lg">
                           Job Type
                        </label>
                        <Dropdown
                           options={[
                              { value: 1, label: "option 1" },
                              { value: 2, label: "option 2" },
                              { value: 3, label: "option 3" },
                           ]}
                           name="currency"
                           label="currency"
                           placeholder="Currency"
                        />
                     </div>
                  </div>
                  <div className="mt-5">
                     <label className="inline-block mb-1.5 text-lg">
                        Skills
                     </label>
                     <MultiSelect options={options} />
                  </div>

                  <div className="mt-5">
                     <label className="inline-block mb-1.5 text-lg">
                        Salary
                     </label>
                     <div className="flex flex-col lg:flex-row  gap-x-5">
                        <div className="w-full lg:w-1/2">
                           <Dropdown
                              options={[
                                 { value: 1, label: "option 1" },
                                 { value: 2, label: "option 2" },
                              ]}
                              name="currency"
                              label="currency"
                              placeholder="Monthly"
                              defaultValue={selectedOption}
                              onChange={setSelectedOption}
                           />
                        </div>
                        <div className="w-full lg:w-1/4">
                           <input
                              type="text"
                              name=""
                              id=""
                              className="input"
                              placeholder="min"
                           />
                        </div>
                        <div className="w-full lg:w-1/4">
                           <input
                              type="text"
                              name=""
                              id=""
                              className="input"
                              placeholder="max"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                     <button
                        type="submit"
                        className="button primary-btn click-transition w-full max-w-md py-3"
                        disabled={isLoading}
                     >
                        {isLoading ? <AnimateSpin /> : "submit"}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </section>
   );
}

export default JobCreatePage;

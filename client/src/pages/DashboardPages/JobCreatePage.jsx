import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { EditorState } from "draft-js";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";

import { useGetCategoriesQuery } from "../../services/categoryService";
import { useGetSkillsQuery } from "../../services/skillService";
import {
   useAddJobMutation,
   useGetJobQuery,
   useUpdateJobMutation,
} from "../../services/jobService";

import currencies from "../../data/currency.json";

import BackButton from "../../components/Buttons/BackButton";
import Dropdown from "../../components/Forms/Dropdown";
import AnimateSpin from "../../components/Loaders/AnimateSpin";
import Input from "../../components/Forms/Input";
import DraftEditor from "../../components/Editors/DraftEditor";
import AsyncSelect from "../../components/Forms/AsyncSelect";
import MultiSelect from "../../components/Forms/MultiSelect";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function JobCreatePage() {
   const navigate = useNavigate();

   const [editorState, setEditorState] = useState(EditorState.createEmpty());
   const [isLoading, setIsLoading] = useState(false);
   const [skillSearchTerm, setSkillSearchTerm] = useState("");

   const { data: categories } = useGetCategoriesQuery();
   const { data: skills } = useGetSkillsQuery(skillSearchTerm, {
      skip: skillSearchTerm === "" || skillSearchTerm.length < 1,
   });

   const { jobId } = useParams();

   const { data: jobData } = useGetJobQuery(
      { jobId },
      { skip: !jobId, refetchOnMountOrArgChange: true }
   );

   const [addJob] = useAddJobMutation();
   const [updateJob] = useUpdateJobMutation();

   const {
      register,
      handleSubmit,
      control,
      setError,
      clearErrors,
      reset,
      formState: { errors },
   } = useForm({ mode: "onBlur" });

   useEffect(() => {
      if (jobData) {
         const data = {
            ...jobData,
            category: jobData?.category?._id,
            skillsets: jobData?.skillsets.map((skill) => ({
               label: skill,
               value: skill,
            })),
            location: {
               label: jobData?.location,
               value: jobData?.location,
            },
         };
         reset(data);

         const blocksFromHtml = htmlToDraft(jobData.description);
         const { contentBlocks, entityMap } = blocksFromHtml;
         const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
         );
         setEditorState(EditorState.createWithContent(contentState));
      }
   }, [jobData, reset]);

   const onSubmit = async (values) => {
      try {
         setIsLoading(true);

         if (values.description === "<p></p>\n") {
            setError("description", {
               type: "required",
               message: "Please enter description",
            });

            return;
         }

         const skills = values.skillsets?.map((skill) => skill.label) || [];

         const jobData = {
            ...values,
            skillsets: skills,
            location: values.location.label,
            salary: {
               ...values?.salary,
               frequency: values.salary?.frequency?.value || "",
               currency: values.salary?.currency?.value || "",
            },
         };

         let jobRes;

         if (jobId) {
            jobRes = await updateJob({
               values: { ...jobData},
               jobId: jobId
            });
         } else {
            jobRes = await addJob({
               values: { ...jobData },
            });
         }

         if (jobRes.error) {
            toast.error("Something went wrong", {
               position: "top-right",
            });

            return;
         }

         if (jobRes.data) {
            toast.success("Job added successfully");
            navigate(`/company`);
         }
      } catch (error) {
         console.log("error", error);
      } finally {
         setIsLoading(false);
      }
   };

   const skillLoadOption = async (inputValue, callback) => {
      setSkillSearchTerm(inputValue);

      if (skills) {
         callback(
            skills.map((skill) => ({
               value: skill?._id,
               label: skill.name,
            }))
         );
      } else {
         callback([]);
      }
   };

   return (
      <section className="bg-lightGrey dark:bg-mediumGrey min-h-full pb-16">
         <div className="max-w-6xl xl:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-5 pb-16">
            <BackButton />
            <h1 className="text-center font-medium text-3xl text-darkGreen dark:text-ligherGreen">
              {jobId ? "Update Job" : "Post a New Job"} 
            </h1>
            <div className="max-w-5xl bg-white dark:bg-darkGrey mx-auto p-2 lg:py-6 lg:px-10 rounded-lg mt-5">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                     <Input
                        {...register("title", {
                           required: "Please enter title",
                        })}
                        name="title"
                        placeholder="Type your job title"
                        labelText="Job Title"
                        error={errors.title ? true : false}
                        helperText={errors.title ? errors.title.message : null}
                        requiredMarker
                     />
                  </div>
                  <div className="mt-5">
                     <DraftEditor
                        editorState={editorState}
                        setEditorState={setEditorState}
                        control={control}
                        rules={{ required: "Please enter description" }}
                        name="description"
                        labelText="Job Description"
                        error={errors.description ? true : false}
                        helperText={
                           errors.description
                              ? errors.description.message
                              : null
                        }
                        requiredMarker
                     />
                  </div>
                  <div className="flex flex-col xl:flex-row mt-5 gap-x-5">
                     <div className="w-full xl:w-1/2">
                        <Controller
                           name="category"
                           control={control}
                           rules={{ required: "Please select a category" }}
                           render={({ field }) => (
                              <Dropdown
                                 options={categories?.map((category) => ({
                                    value: category._id,
                                    label: category.name,
                                 }))}
                                 placeholder="Category"
                                 selectedItem={field.value}
                                 onChange={field.onChange}
                                 labelText="Job Category"
                                 error={errors.category ? true : false}
                                 helperText={
                                    errors.category
                                       ? errors.category.message
                                       : null
                                 }
                                 requiredMarker
                              />
                           )}
                        />
                     </div>
                     <div className="w-full xl:w-1/2">
                        <Controller
                           name="jobType"
                           control={control}
                           rules={{ required: "Please select a job type" }}
                           render={({ field }) => (
                              <Dropdown
                                 options={[
                                    { value: "Full-Time", label: "Full Time" },
                                    { value: "Part-Time", label: "Part Time" },
                                    {
                                       value: "Internship",
                                       label: "Internship",
                                    },
                                    { value: "Contract", label: "Contract" },
                                 ]}
                                 placeholder="Job Type"
                                 selectedItem={field.value}
                                 onChange={field.onChange}
                                 labelText="Job Type"
                                 error={errors.jobType ? true : false}
                                 helperText={
                                    errors.jobType
                                       ? errors.jobType.message
                                       : null
                                 }
                                 requiredMarker
                              />
                           )}
                        />
                     </div>
                  </div>

                  <div className="flex flex-col xl:flex-row mt-5 gap-x-5">
                     <div className="w-full xl:w-1/2">
                        <Controller
                           name="experienceLevel"
                           control={control}
                           rules={{
                              required: "Please select a experience level",
                           }}
                           render={({ field }) => (
                              <Dropdown
                                 options={[
                                    { value: "Beginner", label: "Beginner" },
                                    {
                                       value: "Intermediate",
                                       label: "Intermediate",
                                    },
                                    {
                                       value: "Expert",
                                       label: "Expert",
                                    },
                                 ]}
                                 placeholder="Experience Level"
                                 selectedItem={field.value}
                                 onChange={field.onChange}
                                 labelText="Experience Level"
                                 error={errors.experienceLevel ? true : false}
                                 helperText={
                                    errors.experienceLevel
                                       ? errors.experienceLevel.message
                                       : null
                                 }
                                 requiredMarker
                              />
                           )}
                        />
                     </div>
                     <div className="w-full xl:w-1/2">
                        <Controller
                           name="modality"
                           control={control}
                           render={({ field }) => (
                              <Dropdown
                                 options={[
                                    { value: "Remote", label: "Remote" },
                                    { value: "On-Site", label: "On Site" },
                                    { value: "Hybrid", label: "Hybrid" },
                                 ]}
                                 placeholder="Modality"
                                 selectedItem={field.value}
                                 onChange={field.onChange}
                                 labelText="Job Modality"
                              />
                           )}
                        />
                     </div>
                  </div>

                  <div className="mt-5">
                     <Controller
                        name="skillsets"
                        control={control}
                        render={({ field }) => (
                           <AsyncSelect
                              loadOptions={skillLoadOption}
                              placeholder="Type here..."
                              value={field.value}
                              onChange={field.onChange}
                              labelText="Skills"
                           />
                        )}
                     />
                  </div>

                  <div className="mt-5">
                     <label
                        htmlFor="location"
                        className={`label inline-block mb-1 required-marker `}
                     >
                        Location
                     </label>
                     <div className="relative w-full">
                        <Controller
                           name="location"
                           control={control}
                           rules={{
                              required: "Please select a location",
                           }}
                           render={({ field }) => (
                              <GooglePlacesAutocomplete
                                 apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
                                 minLengthAutocomplete={2}
                                 autocompletionRequest={{
                                    types: ["(cities)"],
                                 }}
                                 selectProps={{
                                    ...field,
                                    placeholder: "Search places",
                                    classNames: {
                                       control: (state) =>
                                          `${
                                             state.isFocused
                                                ? "!border-primary !ring-1 !ring-primary/10"
                                                : "!border-gray-500 !border-gray-300 dark:!border-gray-500"
                                          } ${
                                             errors.location &&
                                             "!border-rose-400 focus:!border-rose-500 focus:!ring-1 focus:!ring-rose-500/30"
                                          } !border !border-solid !p-0 !min-h-[53px] rounded-sm text-md !bg-transparent`,
                                       menu: () =>
                                          "!bg-white dark:!bg-mediumGrey !border-gray-300 dark:!border-gray-600",
                                       option: (state) =>
                                          `${
                                             state.isFocused
                                                ? "!bg-primary/20"
                                                : ""
                                          } text-gray-800 dark:text-gray-200`,
                                    },
                                    classNamePrefix: "react-select",
                                    isClearable: true,
                                    styles: {
                                       control: (base) => ({
                                          ...base,
                                          border: 0,
                                          padding: "11px 10px 11px 35px",
                                          boxShadow: "none",
                                       }),
                                    },
                                    components: {
                                       DropdownIndicator: () => null,
                                       IndicatorSeparator: () => null,
                                    },
                                    noOptionsMessage: () => null,
                                 }}
                              />
                           )}
                        />
                        <span
                           className={`absolute top-full left-0 mt-0.5 text-xs text-red-600 ${
                              errors.location ? "visible" : "invisible"
                           }`}
                        >
                           {errors?.location?.message}
                        </span>
                     </div>
                  </div>

                  <div className="mt-5">
                     <label className="label inline-block mb-1">Salary</label>
                     <div className="flex flex-col lg:flex-row  gap-x-5 relative">
                        <div className="w-full lg:w-1/4">
                           <Controller
                              name="salary.frequency"
                              control={control}
                              render={({ field }) => (
                                 <MultiSelect
                                    placeholder="Frequency"
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={[
                                       { value: "hour", label: "Hour" },
                                       { value: "day", label: "Day" },
                                       { value: "month", label: "Month" },
                                       { value: "year", label: "year" },
                                    ]}
                                 />
                              )}
                           />
                        </div>
                        <div className="w-full lg:w-1/4">
                           <Controller
                              name="salary.currency"
                              control={control}
                              render={({ field }) => (
                                 <MultiSelect
                                    placeholder="Currency"
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={currencies.map((currency) => ({
                                       value: currency,
                                       label: currency,
                                    }))}
                                    isSearchable
                                 />
                              )}
                           />
                        </div>
                        <div className="w-full lg:w-1/4">
                           <Input
                              {...register("salary.minSalary", {
                                 validate: (val) => {
                                    if (val && !/^[0-9]+$/.test(val)) {
                                       setError("salary", {
                                          type: "custom",
                                          message:
                                             "Min salary should be a number",
                                       });
                                    }
                                 },
                              })}
                              name="salary.minSalary"
                              placeholder="Min salary"
                              onFocus={() => clearErrors("salary")}
                           />
                        </div>
                        <div className="w-full lg:w-1/4">
                           <Input
                              {...register("salary.maxSalary", {
                                 validate: (val, formValues) => {
                                    if (val && !/^[0-9]+$/.test(val)) {
                                       setError("salary", {
                                          type: "custom",
                                          message:
                                             "Max salary should be a number",
                                       });
                                    }

                                    if (
                                       parseInt(formValues.salary.minSalary) >
                                       parseInt(val)
                                    ) {
                                       setError("salary", {
                                          type: "custom",
                                          message:
                                             "Max salary should be greater than min salary",
                                       });
                                    }
                                 },
                              })}
                              name="salary.maxSalary"
                              placeholder="Max salary"
                              onFocus={() => clearErrors("salary")}
                           />
                        </div>
                        <span
                           className={`absolute top-full left-0 mt-0.5 text-xs text-red-600 ${
                              errors.salary ? "visible" : "invisible"
                           }`}
                        >
                           {errors?.salary?.message}
                        </span>
                     </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                     <button
                        type="submit"
                        className="button primary-btn click-transition w-full max-w-md py-3"
                        disabled={isLoading}
                     >
                        {isLoading ? (
                           <AnimateSpin />
                        ) : jobId ? (
                           "Update"
                        ) : (
                           "Submit"
                        )}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </section>
   );
}

export default JobCreatePage;

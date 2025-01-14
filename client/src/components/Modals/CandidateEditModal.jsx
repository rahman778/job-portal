import ModalWrapper from "./ModalWrapper";
import AnimateSpin from "../Loaders/AnimateSpin";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "../../services/userService";
import toast from "react-hot-toast";
import { useEffect } from "react";
import AsyncSelect from "../Forms/AsyncSelect";
import { useGetSkillsQuery } from "../../services/skillService";
import Dropdown from "../Forms/Dropdown";

const CandidateEditModal = ({ open, setOpen, successCb, profileData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [skillSearchTerm, setSkillSearchTerm] = useState("");

  const [udpateProfile] = useUpdateProfileMutation();

  const { data: skills } = useGetSkillsQuery(skillSearchTerm, {
    skip: skillSearchTerm === "" || skillSearchTerm.length < 1,
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {

    const data = {
        ...profileData,
        skills: profileData?.skills.map((skill) => ({
           label: skill,
           value: skill,
        })),
     };
     reset(data);
  }, [profileData, reset]);

  const onSubmit = async (values) => {
    // let formValues = {
    //   ...values,
    // };

    let formData = new FormData();
    formData.append("profile[experienceLevel]", values.experienceLevel);
    if (values.skills.length) {
        values.skills.forEach((skill, index) => {
          formData.append(`profile[skills][${index}]`, skill.label);
        });
      }

    try {
      setIsLoading(true);
      const { data } = await udpateProfile({
        values: formData,
      });

      if (data.success) {
        toast.success("Profile updated successfully 🔓");
        successCb();
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
          value: skill._id,
          label: skill.name,
        }))
      );
    } else {
      callback([]);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div className="max-h-[92vh] xl:min-w-[768px]">
        <h2 className="text-lg font-medium mb-2">Edit</h2>
        <div className="mt-6 border border-gray-300 dark:border-gray-700 rounded-md py-4 px-6">
          <form
            className="space-y-5"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Controller
                name="skills"
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
            <div>
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

            <div className="flex justify-end">
              <button
                type="submit"
                className="button primary-btn click-transition mt-5 w-full py-3"
                disabled={isLoading}
              >
                {isLoading ? <AnimateSpin /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CandidateEditModal;

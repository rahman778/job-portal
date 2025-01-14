import ModalWrapper from "./ModalWrapper";
import PhoneInput from "../Forms/PhoneInput";
import AnimateSpin from "../Loaders/AnimateSpin";
import Input from "../Forms/Input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../services/userService";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ProfileEditModal = ({ open, setOpen, successCb, profileData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [udpateProfile] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    reset(profileData);
  }, [profileData, reset]);

  const onSubmit = async (values) => {
    let formValues = {
      ...values,
    };

    try {
      setIsLoading(true);
      const { data } = await udpateProfile({
        values: formValues,
      });

      if (data.success) {
        toast.success("Profile updated successfully 🔓");
        successCb()
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
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
              <Input
                {...register("firstName", {
                  required: "Please enter first name",
                })}
                name="firstName"
                placeholder="Type your first name"
                labelText="First Name"
                error={errors.firstName ? true : false}
                helperText={errors.firstName ? errors.firstName.message : null}
              />
            </div>
            <div>
              <Input
                {...register("lastName", {
                  required: "Please enter last name",
                })}
                name="lastName"
                placeholder="Type your last name"
                labelText="Last Name"
                error={errors.lastName ? true : false}
                helperText={errors.lastName ? errors.lastName.message : null}
              />
            </div>
            <div>
              <PhoneInput
                {...register("phoneNumber", {
                  required: "Please enter mobile number",
                  minLength: {
                    value: 10,
                    message: "Please enter valid mobile number",
                  },
                })}
                control={control}
                name="phoneNumber"
                placeholder="Type your last name"
                labelText="Mobile"
                error={errors.phoneNumber ? true : false}
                helperText={
                  errors.phoneNumber ? errors.phoneNumber.message : null
                }
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

export default ProfileEditModal;

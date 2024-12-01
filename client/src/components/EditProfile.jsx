/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import { UpdateProfile, UserLogin } from "../redux/userSlice";
import { apiRequest, handleFileUpload } from "../utils";

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [picture, setPicture] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrMsg("");

    try {
      const uri = picture && (await handleFileUpload(picture));

      const {firstName, lastName, location, profession} = data;

      const res = await apiRequest({
        url: "/users/update-user",
        data:{
          firstName,
          lastName,
          location,
          profession,
          profileUrl: uri ? uri : user?.profileUrl,
        },
        method: "PUT",
        token: user?.token,
      })

      if(res?.status === "failed"){
        setErrMsg(res);
      }
      else{
        setErrMsg(res);
        const newUser = {token: res?.token, ...res?.user};
        dispatch(UserLogin(newUser));

        setTimeout(() => {
          dispatch(UpdateProfile(false));
        }, 3000);
      }
      setIsSubmitting(false);
      
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    dispatch(UpdateProfile(false));
  };

  const handleSelect = (e) => {
    setPicture(e.target.files[0]);
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-[#000] bg-opacity-70">
      <div className="bg-primary rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex justify-between items-center p-6 border-b border-[#66666645]">
          <h2 className="text-xl font-semibold text-ascent-1">Edit Profile</h2>
          <button
            className="text-ascent-1 hover:text-red-500 transition duration-200"
            onClick={handleClose}
          >
            <MdClose size={22} />
          </button>
        </div>

        <form
          className="p-6 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            name="firstName"
            label="First Name"
            placeholder="Enter your first name"
            type="text"
            styles="w-full"
            register={register("firstName", {
              required: "First Name is required!",
            })}
            error={errors.firstName ? errors.firstName.message : ""}
          />

          <TextInput
            name="lastName"
            label="Last Name"
            placeholder="Enter your last name"
            type="text"
            styles="w-full"
            register={register("lastName", {
              required: "Last Name is required!",
            })}
            error={errors.lastName ? errors.lastName.message : ""}
          />

          <TextInput
            name="profession"
            label="Profession"
            placeholder="Enter your profession"
            type="text"
            styles="w-full"
            register={register("profession", {
              required: "Profession is required!",
            })}
            error={errors.profession ? errors.profession.message : ""}
          />

          <TextInput
            name="location"
            label="Location"
            placeholder="Enter your location"
            type="text"
            styles="w-full"
            register={register("location", {
              required: "Location is required!",
            })}
            error={errors.location ? errors.location.message : ""}
          />

          <label
            className="block text-sm font-medium text-ascent-1"
            htmlFor="imgUpload"
          >
            Upload Profile Picture
          </label>
          <input
            type="file"
            className="block w-full text-sm text-ascent-1 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
            id="imgUpload"
            onChange={handleSelect}
            accept=".jpg, .png, .jpeg"
          />

          {errMsg && (
            <span
              role="alert"
              className={`text-sm mt-1 ${
                errMsg.status === "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"
              }`}
            >
              {errMsg.message}
            </span>
          )}

          <div className="flex justify-end border-t border-[#66666645] pt-4">
            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                containerStyles="inline-flex justify-center px-6 py-2 bg-blue text-white text-sm font-medium rounded-md shadow-sm hover:opacity-80"
                title="Save"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

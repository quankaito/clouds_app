/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CustomButton, Loading, TextInput } from "../components";

const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Implement actual reset password logic here
    setIsSubmitting(false);
  };

  return (
    <div className="w-full h-screen bg-bgColor flex items-center justify-center p-6">
      <div className="bg-primary w-full max-w-md px-6 py-8 shadow-md rounded-lg">
        <h2 className="text-2xl text-[#065ad8] font-semibold mb-4">
          Reset Password
        </h2>
        <p className="text-ascent-1 text-lg font-semibold">Email Address</p>
        <span className="text-sm text-ascent-2 mb-4 block">
          Enter the email address used during registration
        </span>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextInput
            name="email"
            placeholder="email@example.com"
            type="email"
            register={register("email", {
              required: "Email Address is required!",
            })}
            styles="w-full rounded-lg"
            error={errors.email ? errors.email.message : ""}
          />

          {errMsg && (
            <span
              role="alert"
              className={`text-sm ${
                errMsg.status === "failed"
                  ? "text-[#f64949fe]"
                  : "text-[#2ba150fe]"
              }`}
            >
              {errMsg.message}
            </span>
          )}

          {isSubmitting ? (
            <Loading />
          ) : (
            <CustomButton
              type="submit"
              containerStyles="w-full inline-flex justify-center rounded-full bg-[#065ad8] py-3 text-white text-sm font-medium outline-none transition-all hover:bg-[#054bb1]"
              title="Submit"
            />
          )}
        </form>

        <div className="flex justify-center space-x-4 mt-6">
          <Link
            to="/login"
            className="text-sm text-[#065ad8] font-semibold hover:underline"
          >
            Back to Login
          </Link>
          <span className="text-ascent-2">|</span>
          <Link
            to="/register"
            className="text-sm text-[#065ad8] font-semibold hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

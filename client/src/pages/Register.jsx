/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/img-redundant-alt */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TbSocial } from "react-icons/tb";
import { CustomButton, Loading, TextInput } from "../components";
import { apiRequest } from "../utils";

const Register = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const res = await apiRequest({
        url: "/auth/register",
        data: data,
        method: "POST",
      })

      if (res.status === "failed") {
        setErrMsg(res);
      }
      else{
        setErrMsg(res);
        setTimeout(() => {
          window.location.href = "/login";
        }, 5000);
      }
      setIsSubmitting(false);

    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bgColor w-full h-screen flex items-center justify-center p-6">
      <div className="bg-primary w-full max-w-lg rounded-xl shadow-xl p-8 space-y-6">
        {/* Logo and Header */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="p-2 bg-[#065ad8] rounded text-white">
            <TbSocial size={28} />
          </div>
          <h2 className="text-3xl font-semibold text-[#065ad8]">Clouds</h2>
        </div>

        <h3 className="text-lg font-medium text-ascent-1 text-center">
          Create your account
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <TextInput
              name="firstName"
              label="First Name"
              placeholder="First Name"
              type="text"
              styles="w-full rounded-full"
              register={register("firstName", {
                required: "First Name is required!",
              })}
              error={errors.firstName ? errors.firstName.message : ""}
            />

            <TextInput
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              type="text"
              styles="w-full rounded-full"
              register={register("lastName", {
                required: "Last Name is required!",
              })}
              error={errors.lastName ? errors.lastName.message : ""}
            />
          </div>

          <TextInput
            name="email"
            placeholder="email@example.com"
            label="Email Address"
            type="email"
            register={register("email", {
              required: "Email Address is required",
            })}
            styles="w-full rounded-full"
            error={errors.email ? errors.email.message : ""}
          />

          <div className="w-full flex flex-col lg:flex-row gap-4">
            <TextInput
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              styles="w-full rounded-full"
              register={register("password", {
                required: "Password is required!",
              })}
              error={errors.password ? errors.password.message : ""}
            />

            <TextInput
              name="cPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              styles="w-full rounded-full"
              register={register("cPassword", {
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords do not match";
                },
              })}
              error={errors.cPassword ? errors.cPassword.message : ""}
            />
          </div>

          {errMsg && (
            <span
              className={`text-sm ${
                errMsg.status === "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"
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
              title="Create Account"
            />
          )}
        </form>

        <p className="text-ascent-2 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#065ad8] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

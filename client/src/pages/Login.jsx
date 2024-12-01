/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TbSocial } from "react-icons/tb";
import { CustomButton, Loading, TextInput } from "../components";
import { UserLogin } from "../redux/userSlice";
import { apiRequest } from "../utils";

const Login = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const res = await apiRequest({
        url: "/auth/login",
        data: data,
        method: "POST",
      })

      if (res?.status === "failed") {
        setErrMsg(res);
      }
      else{
        setErrMsg("");

        const newData = {token: res?.token, ...res?.user};
        dispatch(UserLogin(newData));
        window.location.href = "/";
      }

    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bgColor w-full h-screen flex items-center justify-center p-4">
      <div className="bg-primary shadow-lg rounded-lg w-full max-w-md p-6 space-y-6">
        {/* Logo and Header */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="p-2 bg-[#065ad8] rounded text-white">
            <TbSocial size={28} />
          </div>
          <h2 className="text-3xl font-semibold text-[#065ad8]">Clouds</h2>
        </div>

        <h3 className="text-lg font-medium text-ascent-1 text-center">
          Log in to your account
        </h3>
        <p className="text-sm text-ascent-2 text-center">Welcome back!</p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextInput
            name="email"
            placeholder="email@example.com"
            label="Email Address"
            type="email"
            register={register("email", {
              required: "Email Address is required",
            })}
            styles="w-full rounded-full"
            labelStyle="ml-2 text-ascent-1"
            error={errors.email ? errors.email.message : ""}
          />

          <TextInput
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            styles="w-full rounded-full"
            labelStyle="ml-2 text-ascent-1"
            register={register("password", {
              required: "Password is required!",
            })}
            error={errors.password ? errors.password.message : ""}
          />

          {/* <div className="flex justify-between items-center">
            <Link
              to="/reset-password"
              className="text-sm text-blue font-semibold hover:underline"
            >
              Forgot Password?
            </Link>
          </div> */}

          {errMsg && (
            <span
              className={`text-sm ${
                errMsg?.status === "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"
              }`}
            >
              {errMsg?.message}
            </span>
          )}

          {isSubmitting ? (
            <Loading />
          ) : (
            <CustomButton
              type="submit"
              containerStyles="w-full inline-flex justify-center rounded-full bg-[#065ad8] py-3 text-white text-sm font-medium outline-none transition-all hover:bg-[#054bb1]"
              title="Login"
            />
          )}
        </form>

        <p className="text-ascent-2 text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#065ad8] font-semibold hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

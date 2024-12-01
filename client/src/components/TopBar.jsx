/* eslint-disable no-unused-vars */
import React from "react";
import { TbSocial } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SetTheme } from "../redux/theme";
import { Logout } from "../redux/userSlice";
import { fetchPosts } from "../utils";

const TopBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";

    dispatch(SetTheme(themeValue));
  };

  const handleSearch = async (data) => {
    await fetchPosts(user.token, dispatch, "", data)
  };

  return (
    <div className='topbar w-full flex items-center justify-between py-3 md:py-6 px-6 bg-primary shadow-lg'>
      {/* Logo and Brand Name */}
      <Link to='/' className='flex gap-2 items-center'>
        <div className='p-2 bg-[#065ad8] rounded-full text-white flex items-center justify-center'>
          <TbSocial size={24} />
        </div>
        <span className='text-xl md:text-2xl text-[#065ad8] font-bold tracking-wide'>
          Clouds
        </span>
      </Link>

      {/* Search Bar */}
      <form
        className='hidden md:flex items-center justify-center'
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder='Search...'
          styles='w-[18rem] lg:w-[38rem]  rounded-l-full py-3 focus:border-[#065ad8]'
          register={register("search")}
        />
        <CustomButton
          title='Search'
          type='submit'
          containerStyles='bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full transition-all duration-200 hover:bg-[#065ad8]'
        />
      </form>

      {/* Icons and User Controls */}
      <div className='flex gap-6 items-center text-ascent-1 text-lg'>
        <button onClick={() => handleTheme()} className="focus:outline-none hover:text-[#065ad8] transition duration-200">
          {theme ? <BsMoon size={20} /> : <BsSunFill size={20} />}
        </button>

        {/* <div className='hidden lg:flex'>
          <IoMdNotificationsOutline size={24} className="hover:text-[#065ad8] transition duration-200" />
        </div> */}

        {/* Log Out Button */}
        <div>
          <CustomButton
            onClick={() => dispatch(Logout())}
            title='Log Out'
            containerStyles='text-sm text-ascent-1 px-6 py-2 border border-[#666] rounded-full transition-all duration-200 hover:bg-[#0444a4] hover:text-white'
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

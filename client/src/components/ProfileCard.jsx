import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LiaEditSolid } from "react-icons/lia";
import {
  BsBriefcase,
  BsFacebook,
  BsInstagram,
  BsPersonFillAdd,
} from "react-icons/bs";
import { FaTwitterSquare } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import moment from "moment";

import { NoProfile } from "../assets";
import { UpdateProfile } from "../redux/userSlice";

const ProfileCard = ({ user }) => {
  const { user: data } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className='w-full bg-primary shadow-sm rounded-xl px-6 py-5'>
      {/* Header Section */}
      <div className='flex items-center justify-between border-b border-[#66666645] pb-4'>
        <Link to={`/profile/${user?._id}`} className='flex gap-3 items-center'>
          <img
            src={user?.profileUrl ?? NoProfile}
            alt={user?.email}
            className='w-16 h-16 object-cover rounded-full hover:opacity-80'
          />
          <div>
            <p className='text-xl font-semibold text-ascent-1 hover:opacity-80'>
              {user?.firstName} {user?.lastName}
            </p>
            <p className='text-sm text-ascent-2 hover:opacity-80'>
              {user?.profession ?? "No Profession"}
            </p>
          </div>
        </Link>
        {user?._id === data?._id ? (
          <LiaEditSolid
            size={22}
            className='text-blue cursor-pointer hover:text-ascent-1'
            onClick={() => dispatch(UpdateProfile(true))}
          />
        ) : (
          <button className='bg-[#0444a430] text-white p-2 rounded-full'>
            <BsPersonFillAdd size={18} className='text-[#0f52b6]' />
          </button>
        )}
      </div>

      {/* Info Section */}
      <div className='py-5 border-b border-[#66666645]'>
        <div className='flex gap-3 items-center text-sm text-ascent-2 mb-2'>
          <CiLocationOn className='text-xl text-ascent-1' />
          <span>{user?.location ?? "Add Location"}</span>
        </div>
        <div className='flex gap-3 items-center text-sm text-ascent-2'>
          <BsBriefcase className='text-lg text-ascent-1' />
          <span>{user?.profession ?? "Add Profession"}</span>
        </div>
      </div>

      {/* Stats Section */}
      <div className='py-5 border-b border-[#66666645]'>
        <p className='text-xl font-semibold text-ascent-1'>
          {user?.friends?.length} Friends
        </p>
        <div className='flex justify-between items-center mt-3 text-sm text-ascent-2'>
          <span>Who viewed your profile</span>
          <span className='text-lg text-ascent-1'>
            {user?.views?.length ?? 0}
          </span>
        </div>
        <p className='text-sm text-blue mt-3 hover:text-ascent-1'>
          {user?.verified ? "Verified Account" : "Not Verified"}
        </p>
        <div className='flex justify-between items-center mt-3 text-sm text-ascent-2'>
          <span>Joined</span>
          <span className='text-ascent-1'>
            {moment(user?.createdAt).fromNow()}
          </span>
        </div>
      </div>

      {/* Social Profile Section */}
      <div className='py-5'>
        <p className='text-lg font-semibold text-ascent-1'>Social Profiles</p>
        <div className='flex flex-col gap-3 mt-3'>
          <div className='flex gap-3 items-center text-sm text-ascent-2'>
            <BsInstagram className='text-xl text-ascent-1' />
            <span>Instagram</span>
          </div>
          <div className='flex gap-3 items-center text-sm text-ascent-2'>
            <FaTwitterSquare className='text-xl text-ascent-1' />
            <span>Twitter</span>
          </div>
          <div className='flex gap-3 items-center text-sm text-ascent-2'>
            <BsFacebook className='text-xl text-ascent-1' />
            <span>Facebook</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

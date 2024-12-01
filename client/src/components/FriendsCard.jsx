import React from "react";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";

const FriendsCard = ({ friends }) => {
  return (
    <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
      {/* Header Section */}
      <div className='flex justify-between items-center text-lg text-ascent-1 border-b border-[#66666645] pb-3'>
        <span>Friends</span>
        <span>{friends?.length ?? 0}</span>
      </div>

      {/* Friends List Section */}
      <div className='flex flex-col gap-4 pt-4'>
        {friends?.map((friend) => (
          <Link
            to={`/profile/${friend?._id}`}
            key={friend?._id}
            className='flex items-center gap-4'
          >
            <img
              src={friend?.profileUrl ?? NoProfile}
              alt={friend?.firstName}
              className='w-12 h-12 object-cover rounded-full hover:opacity-80'
            />
            <div className='flex-1'>
              <p className='text-base font-medium text-ascent-1 hover:opacity-80'>
                {friend?.firstName} {friend?.lastName}
              </p>
              <span className='text-sm text-ascent-2 hover:opacity-80'>
                {friend?.profession ?? "No Profession"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FriendsCard;

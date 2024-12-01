/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomButton,
  EditProfile,
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TextInput,
  TopBar,
} from "../components";

import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { MdOutlineDeleteOutline } from "react-icons/md";

import { deletePost, handleFileUpload, sendFriendRequest } from "../utils";
import { apiRequest } from "../utils";
import { fetchPosts } from "../utils/index";
import { likePost } from "../utils";
import { getUserInfo } from "../utils";
import { UserLogin } from "../redux/userSlice";

const Home = () => {
  const { user, edit } = useSelector((state) => state.user);
  const { posts } = useSelector(state => state.posts);
  const [friendRequest, setFriendRequest] = useState([]);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handlePostSubmit = async (data) => {
    setPosting(true);
    setErrMsg("");

    try {
      const uri = file && (await handleFileUpload(file));

      const newData = uri ? {...data, image: uri} : data;

      const res = await apiRequest({
        url: "/posts/create-post",
        data: newData,
        token: user?.token,
        method: "POST",
      })

      if(res?.status === "failed"){
        setErrMsg(res);
      }
      else{
        reset({
          description: "",
        })
        setFile(null);
        setErrMsg("");
        await fetchPost();
      }
      setPosting(false);
      
    } catch (error) {
      console.log(error);
      setPosting(false);
    }
  };

  const fetchPost = async () => {
    await fetchPosts(user?.token, dispatch) 

    setLoading(false);
  };

  const handleLikePost = async (uri) => {
    await likePost({uri: uri, token: user?.token});

    await fetchPost();
  };

  const handleDelete = async (id) => {
    await deletePost(id, user.token);
    await fetchPost();
  };

  const fetchFriendRequests = async () => {
    try {
      const res = await apiRequest({
        url: "/users/get-friend-request",
        token: user?.token,
        method: "POST",
      });
      setFriendRequest(res?.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchSuggestedFriends = async () => {
    try {
      const res = await apiRequest({
        url: "/users/suggested-friends",
        token: user?.token,
        method: "POST",
      });
      setSuggestedFriends(res?.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleFriendRequest = async (id) => {
    try{
      const res = await sendFriendRequest(user.token, id);
      await fetchSuggestedFriends();
    }

    catch(error){
      console.log(error);
    }
  };

  const acceptFriendRequest = async (id, status) => {
    try {
      const res = await apiRequest({
        url: "/users/accept-request",
        token: user?.token,
        method: "POST",
        data: {rid: id, status},
      });
      setFriendRequest(res?.data);

    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    const res = await getUserInfo(user?.token);
    const newData = {token: user?.token, ...res};
    dispatch(UserLogin(newData));
  };

  useEffect(() => {
    setLoading(true);
    getUser();
    fetchPost();
    fetchFriendRequests();
    fetchSuggestedFriends();
  }, []);

  return (
    <>
      <div className='w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
        <TopBar />

        <div className='w-full flex gap-6 pt-5 pb-10 h-full'>
          {/* LEFT */} 
          <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />
          </div>

          {/* CENTER */}
          <div className='flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg'>
            <form
              onSubmit={handleSubmit(handlePostSubmit)}
              className='bg-primary px-6 py-4 rounded-lg shadow-lg'
            >
              <div className='flex items-center gap-3 py-4 border-b border-[#66666645]'>
                <img
                  src={user?.profileUrl ?? NoProfile}
                  alt='User Image'
                  className='w-12 h-12 rounded-full object-cover shadow-md hover:opacity-80'
                />
                <TextInput
                  styles='w-full rounded-lg py-4 px-5'
                  placeholder="What's on your mind...."
                  name='description'
                  register={register("description", {
                    required: "Write something about post",
                  })}
                  error={errors.description ? errors.description.message : ""}
                />
              </div>
              {errMsg?.message && (
                <span
                  role='alert'
                  className={`text-sm ${
                    errMsg?.status === "failed" ? "text-red-500" : "text-green-500"
                  } mt-1`}
                >
                  {errMsg?.message}
                </span>
              )}

              {/* Preview section with remove button */}
              {file && (
                <div className='relative my-4'>
                  <button
                    type='button'
                    onClick={() => setFile(null)}
                    className='absolute top-2 right-2 bg-primary text-ascent-1 p-1 rounded-full text-xs hover:opacity-80 flex items-center gap-1'
                  >
                    <MdOutlineDeleteOutline size={18} />
                    <span className='sr-only'>Remove</span>
                  </button>
                  {file.type.startsWith("image") ? (
                    <img src={URL.createObjectURL(file)} alt='Preview' className='w-full h-auto rounded-lg shadow-md' />
                  ) : file.type.startsWith("video") ? (
                    <video controls className='w-full h-auto rounded-lg shadow-md'>
                      <source src={URL.createObjectURL(file)} type={file.type} />
                    </video>
                  ) : file.type.endsWith("gif") ? (
                    <img src={URL.createObjectURL(file)} alt='GIF Preview' className='w-full h-auto rounded-lg shadow-md' />
                  ) : null}
                </div>
              )}

              <div className='flex items-center justify-between py-4'>
                <label
                  htmlFor='imgUpload'
                  className='flex items-center gap-2 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                >
                  <input
                    type='file'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='imgUpload'
                    data-max-size='5120'
                    accept='.jpg, .png, .jpeg'
                  />
                  <BiImages />
                  <span>Image</span>
                </label>

                <label
                  className='flex items-center gap-2 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                  htmlFor='videoUpload'
                >
                  <input
                    type='file'
                    data-max-size='5120'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='videoUpload'
                    accept='.mp4, .wav'
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>

                <label
                  className='flex items-center gap-2 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer'
                  htmlFor='vgifUpload'
                >
                  <input
                    type='file'
                    data-max-size='5120'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='vgifUpload'
                    accept='.gif'
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                </label>

                <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type='submit'
                      title='Post'
                      containerStyles='bg-[#0444a4] text-white py-1 px-6 rounded-full shadow-lg text-sm transition-all duration-200 hover:bg-[#065ad8]'
                    />
                  )}
                </div>
              </div>
            </form>

            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className='flex w-full h-full items-center justify-center'>
                <p className='text-lg text-ascent-2'>No Post Available</p>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className='hidden w-1/4 h-full lg:flex flex-col gap-6 overflow-y-auto'>
            {/* FRIEND REQUEST */}
            <div className='w-full bg-primary shadow-md rounded-lg px-6 py-5'>
              <div className='flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]'>
                <span>Friend Requests</span>
                {friendRequest?.length}
              </div>

              <div className='w-full flex flex-col gap-4 pt-4'>
                {friendRequest?.map(({ _id, requestFrom: from }) => (
                  <div key={_id} className='flex items-center justify-between'>
                    <Link
                      to={"/profile/" + from._id}
                      className='w-full flex gap-4 items-center cursor-pointer'
                    >
                      <img
                        src={from?.profileUrl ?? NoProfile}
                        alt={from?.firstName}
                        className='w-12 h-12 rounded-full object-cover shadow-sm hover:opacity-80'
                      />
                      <div>
                        <p className='text-base font-semibold text-ascent-1 hover:opacity-80'>
                          {from?.firstName} {from?.lastName}
                        </p>
                        <span className='text-sm text-ascent-2 hover:opacity-80'>
                          {from?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className='flex gap-2'>
                      <CustomButton
                        title='Accept'
                        onClick={() => acceptFriendRequest(_id, "Accepted")}
                        containerStyles='bg-[#0444a4] text-xs text-white px-3 py-1 rounded-full shadow-lg transition-all duration-200 hover:bg-[#065ad8] hover:text-white'
                      />
                      <CustomButton
                        title='Deny'
                        onClick={() => acceptFriendRequest(_id, "Denied")}
                        containerStyles='border border-gray-400 text-xs text-ascent-1 px-3 py-1 rounded-full shadow-lg transition-all duration-200 hover:bg-[#b2b2b2] hover:text-white'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUGGESTED FRIENDS */}
            <div className='w-full bg-primary shadow-md rounded-lg px-6 py-5'>
              <div className='text-xl text-ascent-1 border-b border-[#66666645] pb-2'>
                Friend Suggestions
              </div>
              <div className='w-full flex flex-col gap-4 pt-4'>
                {suggestedFriends?.map((friend) => (
                  <div className='flex items-center justify-between' key={friend._id}>
                    <Link
                      to={"/profile/" + friend?._id}
                      key={friend?._id}
                      className='w-full flex gap-4 items-center cursor-pointer'
                    >
                      <img
                        src={friend?.profileUrl ?? NoProfile}
                        alt={friend?.firstName}
                        className='w-12 h-12 rounded-full object-cover shadow-sm hover:opacity-80'
                      />
                      <div>
                        <p className='text-base font-semibold text-ascent-1 hover:opacity-80'>
                          {friend?.firstName} {friend?.lastName}
                        </p>
                        <span className='text-sm text-ascent-2 hover:opacity-80'>
                          {friend?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <CustomButton
                      title={<BsPersonFillAdd size={20} />}
                      containerStyles='bg-[#0444a4] text-xs text-white px-3 py-1 rounded-full shadow-lg transition-all duration-200 hover:bg-[#065ad8] hover:text-white'
                      onClick={() => handleFriendRequest(friend?._id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {edit && <EditProfile />}
    </>
  );
};

export default Home;

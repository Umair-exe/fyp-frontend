import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../services/profileService";
import { setUser, start, stop } from "../features/appSlice";
import Input from "./Input";
import { toast } from "react-hot-toast";
import Spinner from "./Spinner";

const EditProfileForm = ({ user }) => {
  const [isEditable, setIsEditable] = useState(false);
  const { isLoading } = useSelector((state) => state.app);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.name || user.mobileNumber) {
      setName(user.name);
      setMobile(user.mobileNumber);
    }
  }, [user.name, user.mobileNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      mobileNumber: mobile,
    };
    dispatch(start());
    return updateProfile(data)
      .then((res) => {
        dispatch(setUser(res.data));
        toast.success("Profile has been succesfully updated");
        dispatch(stop());
      })
      .catch((err) => toast.error(err.response));
  };

  if (isLoading) {
    return (
      <div className="mt-5">
        <Spinner />;
      </div>
    );
  }

  return (
    <div className="">
      <button
        className={`bg-slate-600 p-2 px-6 rounded-md text-white mt-5 flex ml-10 mb-5 ${isEditable && 'bg-zinc-600'} `}
        onClick={() => setIsEditable((prev) => !prev)}
      >
        Edit Details
      </button>
      <form className="mx-10 disabled:cursor-wait">
        <Input
          label={"Name"}
          value={name}
          setValue={setName}
          disabled={!isEditable}
          className="disabled:cursor-not-allowed disabled:bg-slate-100"
        />
        <Input
          label={"Mobile"}
          className="disabled:cursor-not-allowed disabled:bg-slate-100"
          value={mobile}
          setValue={setMobile}
          disabled={!isEditable}
        />
        <Input
          label={"Email"}
          value={user.email}
          disabled={true}
          className="disabled:cursor-not-allowed disabled:bg-slate-100"
        />
        {isEditable && (
          <button
            type="submit"
            className="p-2 px-9 bg-slate-600 text-white rounded-md transition-all ease duration-300"
            onClick={handleSubmit}
          >
            Update
          </button>
        )}
      </form>
    </div>
  );
};

export default EditProfileForm;

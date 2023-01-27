import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import EditProfileForm from "../components/EditProfileForm";
import ProfilePIcture from "../components/ProfilePIcture";
import { setUser } from "../features/appSlice";

const Profile = () => {
  const { user, isLoading } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userName: user.name,
    };
    const formData = new FormData();
    if (file) {
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      data.imgUrl = "uploads/" + filename;

      try {
        const res = await axios.post(
          process.env.REACT_APP_URL + "/api/upload",
          formData,
          {
            "Content-type": "multipart/form-data ",
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res2 = await axios.put(
        process.env.REACT_APP_URL + "/api/users/uploadProfile",
        data,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );

      setFile("");
      if (res2) dispatch(setUser(res2?.data));
      toast.success('Profile Picture Updated')
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <ProfilePIcture user={user} file={file} setFile={setFile} handleSubmit={handleSubmit} />
      <EditProfileForm user={user}/>
    </div>
  );
};

export default Profile;

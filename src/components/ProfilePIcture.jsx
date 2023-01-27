import React from "react";
import { useState } from "react";

const ProfilePIcture = ({ user, file, setFile, handleSubmit }) => {
  const [isUpload, setIsUpload] = useState(false);

  return (
    <div>
      <div className="flex flex-col items-center">
        {file ? (
          <img
            className="rounded-full object-cover w-60 h-60"
            src={URL.createObjectURL(file)}
            alt='profile'
          />
        ) : !user?.profileimg ? (
          <img
            className="rounded-full object-cover w-60 h-60"
            src={"https://cdn-icons-png.flaticon.com/512/147/147142.png"}
            alt="profile"
          />
        ) : (
          <img
            className="rounded-full object-cover w-60 h-60"
            src={`${process.env.REACT_APP_URL}/${user.profileimg}`}
            alt="profile"
          />
        )}
        {isUpload && (
          <div className="flex items-center gap-x-3">
            <label htmlFor="file" className="flex mt-4">
              <input
                type="file"
                name="file"
                className={`block w-full file:mr-4 file:p-2 file:px-6 file:rounded-full file:border-0 file:font-bold file:bg-blue-200 file:text-blue-600`}
                onChange={(e) => setFile(e.target.files[0])}
                accept=".png,.jpg,.jpeg"
              />
            </label>
            {file && (
              <button
                onClick={handleSubmit}
                className="p-2 px-9 bg-slate-600 text-white rounded-full"
              >
                Upload Post
              </button>
            )}
          </div>
        )}
        <button className="p-2 px-9 rounded-md shadow-md bg-slate-600 text-white mt-3" onClick={() => setIsUpload(prev => !prev)}>Edit Profile Picture</button>
      </div>
    </div>
  );
};

export default ProfilePIcture;

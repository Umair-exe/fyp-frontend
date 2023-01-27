import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/appSlice";
import Badge from "./Badge";

const Navbar = () => {
  const { user } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  return (
    <div className="p-6 shadow-lg m-6 rounded-lg flex items-center justify-between bg-gray-100">
      <Link to="/profile" className="flex items-center gap-x-2">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={
            !user.profileimg
              ? "https://cdn-icons-png.flaticon.com/512/147/147142.png"
              : process.env.REACT_APP_URL + "/" + user.profileimg
          }
        />
        <div className="flex flex-col md:flex-row gap-x-2">
          <span className="text-xl text-gray-600 capitalize">{user.name}</span>
          {user.role === "admin" && (
            <Badge text={"Admin"} color={"bg-green-400"} />
          )}
        </div>
      </Link>
      <button
        onClick={() => dispatch(logout())}
        className="bg-slate-600 text-white rounded-lg p-2 px-7"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

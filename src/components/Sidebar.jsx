import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = useSelector((state) => state.app);
  return (
    <div className="mt-8">
      <div>
        <Link to="/" className="text-white text-5xl">
          FYP
        </Link>
      </div>
      <div className="text-white flex flex-col items-center gap-y-10 mt-20">
        {user.role === "admin" && (
          <>
            <Link to="/rules" className="focus:border-b-2 ">
              Rules
            </Link>

            <Link to="/users" className="focus:border-b-2 ">
              Users
            </Link>
          </>
        )}
        <Link to="/history" className="focus:border-b-2 ">
          View History
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

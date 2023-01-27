import React from "react";
import { Link } from "react-router-dom";
import Badge from "./Badge";

const Button = ({ to, text, styles, isBadge }) => {
  return (
    <Link to={to} className={`p-4 px-9 relative rounded-md shadow-md ${styles} mt-5`}>
      {text}
      {isBadge && (
        <div className="absolute top-[-15px] right-[-50px]">
          <Badge text="In Progress" color="bg-blue-200 rounded-full text-blue-600 px-3" />
        </div>
      )}
    </Link>
  );
};

export default Button;

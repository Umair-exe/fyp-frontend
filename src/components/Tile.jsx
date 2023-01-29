import React from "react";

const Tile = ({number, text}) => {
  return (
    <div
      className="rounded-sm grid grid-cols-12 w-full border bg-white shadow p-3 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform"
      href="#"
    >
      <div className="col-span-12 md:col-span-1">
    
      </div>
      
      <div className="col-span-11 xl:-ml-5">
        <p className="text-blue-600 font-semibold">
          {" "}
          Recommendation {number ? number : " "}{" "}
        </p>
      </div>

      <div className="md:col-start-2 col-span-11 xl:-ml-5">
        <p className="text-lg text-gray-800 font-light">
          {" "}
          {text}{" "}
        </p>
      </div>
    </div>
  );
};

export default Tile;

import React from "react";
import Button from "../components/Button";

const Home = () => {

  return (
    <div>
      <h1 className="text-2xl text-stone-600 font-bold">Recommendation System for small sample educational datasets</h1>
      <div className="flex gap-x-5 justify-center mt-5">
        <Button text="Low to Medium" to="/low-recommendations" styles="bg-red-600 text-white" />
        <Button text="Medium to high" styles="bg-blue-600 text-white" isBadge={true} />
      </div>
    </div>
  );
};

export default Home;

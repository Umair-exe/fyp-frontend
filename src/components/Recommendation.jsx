import React from "react";
import Tile from "./Tile";

const Recommendation = ({ recommendations }) => {
  return (
    <div className="bg-white mt-10 text-xl font-light">
      {recommendations && recommendations.remarks && (
        <div className="flex flex-col items-center">
          <div className="flex justify-center gap-5 flex-wrap">
            {recommendations.recommendations.map((data, i) => (
              <Tile key={i} number={i+1} text={data} />
            ))}
          </div>
          <span className="mt-5 font-bold text-zinc-600">{recommendations.remarks}</span>
        </div>
      )}
    </div>
  );
};

export default Recommendation;

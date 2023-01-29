import React from "react";
import Tile from "./Tile";

const Recommendation = ({ recommendations }) => {
  return (
    <div className="p-10 mt-10 text-xl font-light">
      {recommendations.recommendations && (
        <div className="flex flex-col items-center">
          <div className="flex justify-center gap-5 flex-wrap w-full">
            {recommendations.recommendations.map((data, i) => (
              <Tile key={i} number={recommendations.recommendations.length > 1 ? i+1 : null} text={data} />
            ))}
          </div>
          <span className="mt-5 font-bold text-zinc-600">{recommendations.remarks}</span>
        </div>
      )}
    </div>
  );
};

export default Recommendation;

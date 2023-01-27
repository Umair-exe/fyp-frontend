import React from "react";

const Rules = ({ rules, SetActiveRule, activeRule }) => {
  return (
    <>
      <div className="mt-5 flex gap-2 justify-center">
        <button
          onClick={() => SetActiveRule("Low")}
          className={`p-2 px-9 rounded-md shadow-md bg-red-700 text-white ${
            activeRule === "Low" && "shadow-xl"
          }`}
        >
          Low Rules
        </button>
        <button
          onClick={() => SetActiveRule("Medium")}
          className={`bg-blue-600 p-2 px-9 rounded-md shadow-md text-white ${
            activeRule === "Medium" && "shadow-xl"
          }`}
          text="Medium Rules"
        >
          Medium Rules
        </button>
        <button
          onClick={() => SetActiveRule("High")}
          className={`bg-green-600 p-2 px-9 rounded-md shadow-md text-white ${
            activeRule === "High" && "shadow-xl"
          }`}
          text="High Rules"
        >
          High Rules
        </button>
      </div>
      <div>
        {rules.length > 0 && (
          <h1 className="text-zinc-600 text-3xl font-bold text-left ml-3">
            {activeRule} Rules
          </h1>
        )}
        {rules.length > 0 ? (
          rules.map((data, i) => (
            <div
              key={i}
              className="flex flex-col bg-white p-2 m-2 shadow-md rounded text-left"
            >
              {i + 1}. {data.condition}
            </div>
          ))
        ) : (
          <div className="text-center text-3xl font-bold text-zinc-600 mt-4">
            Click to see the Recommendation Rules
          </div>
        )}
      </div>
    </>
  );
};

export default Rules;

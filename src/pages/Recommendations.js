import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Recommendation from "../components/Recommendation";
import { start, stop } from "../features/appSlice";
import { getToken } from "../helpers/getToken";

const Recommendations = () => {
  const { isLoading } = useSelector((state) => state.app);
  const [question1, setQuestion1] = useState(null);
  const [question2, setQuestion2] = useState(null);
  const [question3, setQuestion3] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const dispatch = useDispatch();

  console.log(recommendations);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question1 && question2 && question3) {
      const data = {
        first: question1,
        second: question2,
        third: question3,
      };
      setRecommendations(null);
      dispatch(start());
      axios
        .post(`${process.env.REACT_APP_URL}/api/recommendations`, data, {
          headers: {
            access_token: getToken(),
          },
        })
        .then((res) => {
          setRecommendations(res.data);
          axios
            .post(`${process.env.REACT_APP_URL}/api/history`, res.data, {
              headers: {
                access_token: getToken(),
              },
            })
            .catch((err) => toast.error(err.response.data.message));
        })
        .catch((err) => {
          dispatch(stop());
          toast.error(err.response.data.message);
        });
      return dispatch(stop());
    }
    return toast.error("All fields must be selected");
  };

  return (
    <div>
      <span className="text-2xl text-stone-600 font-bold">
        Low to Medium Recommendations
      </span>
      <div className="bg-white shadow-lg w-[90vw] md:w-[50vw] rounded-lg ml-auto mr-auto mt-5">
        <form
          onSubmit={handleSubmit}
          className="p-10 text-left flex flex-col gap-y-5"
        >
          <div>
            <label className="text-zinc-700">
              Q1- How many times you raise hands in a course?
            </label>
            <select
              defaultValue={"Select-Option"}
              onChange={(e) => setQuestion1(e.target.value)}
              className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none mt-2"
            >
              <option value={"Select-Option"} disabled>
                Select Option
              </option>
              <option value="A">More than 69 times</option>
              <option value="B">Less than 69 times above 35</option>
              <option value="C">Less than 35</option>
            </select>
          </div>

          <div>
            <label className="text-zinc-700">
              Q2- What is your place of birth ?
            </label>
            <select
              defaultValue={"Select-Option"}
              onChange={(e) => setQuestion2(e.target.value)}
              className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none mt-2"
            >
              <option value={"Select-Option"} disabled>
                Select Option
              </option>
              <option value="A">Kuwait</option>
              <option value="B">Iraq</option>
              <option value="C">Other</option>
            </select>
          </div>

          <div>
            <label className="text-zinc-700">
              Q3- What is your School Level?
            </label>
            <select
              defaultValue={"Select-Option"}
              onChange={(e) => setQuestion3(e.target.value)}
              className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none mt-2"
            >
              <option value={"Select-Option"} disabled>
                Select Option
              </option>
              <option value="A">Low</option>
              <option value="B">Middle</option>
              <option value="C">High</option>
            </select>
          </div>

          <button
            type="submit"
            className="p-2 w-full bg-slate-600 text-white disabled:cursor-not-allowed"
            // disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-bounce text-xl">...</div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
      {!isLoading &&
        (recommendations?.recommendations.length > 0 ?(
          <Recommendation recommendations={recommendations} />
        ) : (
          <p className="mt-5 text-2xl text-zinc-600">
            {recommendations?.recommendations}
          </p>
        ))}
    </div>
  );
};

export default Recommendations;

import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { getToken } from "../helpers/getToken";
import Recommendation from "./Recommendation";
import Spinner from "./Spinner";
import moment from 'moment';

const RecommendationTiles = ({ data, getHistory }) => {
  const [active, setActive] = useState(null);
  const { isLoading } = useSelector((state) => state.app);

  const handleActive = (id) => {
    setActive(null);
    setActive(() => data.find((d) => d._id === id));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/api/history/${id}`, {
        headers: {
          access_token: getToken(),
        },
      });
      getHistory();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="m-10">
      <span className="text-4xl text-stone-600 font-bold">History</span>

      <p className="text-right text-gray-600">Total: {data.length}</p>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="h-[300px] scroll-auto overflow-scroll scrollbar-hide mt-5">
          {data.map((item, i) => (
            <div
              key={i}
              className="p-4 bg-white shadow-lg mb-2 text-left hover:bg-gray-100 flex justify-between border focus:bg-gray-200"
            >
              <span
                className="cursor-pointer capitalize"
                onClick={() => handleActive(item._id)}
              >
                {moment(item.createdAt).fromNow()}
              </span>
              <button
                onClick={() => handleDelete(item._id)}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      {active? (
        <Recommendation recommendations={active} />
      ) : (
        <p className="mt-5 text-2xl text-zinc-600">{active?.recommendations}</p>
      )}
    </div>
  );
};

export default RecommendationTiles;

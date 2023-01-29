import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import RecommendationTiles from "../components/RecommendationTiles";
import Spinner from "../components/Spinner";
import { setHistory, start, stop } from "../features/appSlice";
import { getToken } from "../helpers/getToken";

const History = () => {
  const dispatch = useDispatch();
  const { history, isLoading } = useSelector((state) => state.app);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    dispatch(start());
    axios
      .get(`${process.env.REACT_APP_URL}/api/history`, {
        headers: {
          access_token: getToken(),
        },
      })
      .then((res) => {
        dispatch(setHistory(res.data));
        dispatch(stop());
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        dispatch(stop());
      });
  };

  return (
    <div>
      <div>
        {history?.length > 0 && !isLoading ? (
          <RecommendationTiles data={history} getHistory={getHistory} />
        ) : (
          isLoading ? <Spinner /> : <span className="text-4xl text-stone-600 font-bold">No History</span>
        )}
      </div>
    </div>
  );
};

export default History;

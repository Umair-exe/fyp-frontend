import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, setError, start, stop } from "../features/appSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.app);
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      emailRef.current.value === "" ||
      passwordRef.current.value === ""
    ) {
      return toast.error("All fields are mandatory!");
    }
    if(!emailReg.test(emailRef.current.value)) return toast.error("Email should be a correct format");

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      dispatch(start())
      
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/api/auth/`,
        data
      );
      dispatch(
        login({
          user: res?.data.user,
          token: res?.data.token,
        })
      );
      localStorage.setItem("access_token", res?.data.token);
      dispatch(stop());
    } catch (error) {
      dispatch(stop());
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="bg-gray md:p-14 md:w-[500px] w-100 shadow-xl bg-white rounded-md">
        <form className="flex justify-center items-center flex-col p-6 gap-5 ">
          <h1 className="font-bold text-2xl text-slate-600">Login</h1>
          <input
            type="email"
            name="email"
            ref={emailRef}
            className=" p-2 w-full border border-slate-400 "
            placeholder="Enter Email"
          />
          <input
            type="password"
            name="password"
            ref={passwordRef}
            required
            className=" p-2 w-full border border-slate-400"
            placeholder="Enter password"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="p-2 w-full bg-slate-600 text-white disabled:cursor-not-allowed"
            disabled={isLoading}
          >
           {isLoading ? <div className="animate-bounce text-xl">...</div> : "Login"}
          </button>
          <Link className="text-slate-600" to="/password-reset">
            Forgot Password?
          </Link>
          <h1>
            Don't have an account?{" "}
            <Link to="/register">
              <span className="font-bold text-slate-600">Register</span>
            </Link>
          </h1>
        </form>
        {error && <div className="text-xl text-red-700">{error.message}</div>}
      </div>
    </div>
  );
};

export default Login;

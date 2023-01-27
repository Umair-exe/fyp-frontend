import axios from "axios";
import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { start,stop } from "../features/appSlice";

const Register = () => {
  const { error, isLoading } = useSelector((state) => state.app);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const mobileNumberRef = useRef(0);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      nameRef.current.value === "" ||
      emailRef.current.value === "" ||
      passwordRef.current.value === "" || 
      mobileNumberRef.current.value.toString() === ""
    ) {
      return toast.error("All fields are mandatory!");
    }

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      mobileNumber: mobileNumberRef.current.value,
    };

    try {
      dispatch(start());
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/api/auth/register`,
        data
      );
      emailRef.current.value = "";
      nameRef.current.value = "";
      passwordRef.current.value = "";
      mobileNumberRef.current.value = "";
      dispatch(stop());

      toast.success(res.data);
    } catch (error) {
      toast.error(error?.response?.data.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="flex justify-center items-center mt-20 ">
      <div className="bg-gray md:p-14 md:w-[500px] w-100 shadow-xl bg-white rounded-md">
        <form className="flex justify-center items-center flex-col p-6 gap-5 ">
          <h1 className="font-bold text-2xl text-slate-600">Register</h1>
          <input
            type="text"
            name="sname"
            ref={nameRef}
            className=" p-2 w-full border border-slate-400 "
            placeholder="Enter Full Name"
          />
          <input
            type="email"
            name="email"
            ref={emailRef}
            className=" p-2 w-full border border-slate-400 "
            placeholder="Enter Email"
          />
          <input
            type="number"
            name="number"
            ref={mobileNumberRef}
            className=" p-2 w-full border border-slate-400 "
            placeholder="Enter Mobile Number"
          />
          <input
            type="password"
            name="password"
            ref={passwordRef}
            className=" p-2 w-full border border-slate-400"
            placeholder="Enter password"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="p-2 w-full bg-slate-600 text-white"
          >
           {isLoading ? <div className="animate-bounce text-xl">...</div> : "Register"}
          </button>
          <h1>
            Don't have an account?{" "}
            <Link to="/">
              <span className="font-bold text-slate-600">Login</span>
            </Link>
          </h1>
        </form>
        {error && <div className="text-xl text-red-700">{error.message}</div>}
      </div>
    </div>
  );
};

export default Register;

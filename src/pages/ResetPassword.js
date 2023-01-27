import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { passwordReset, resetPassword } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { start, stop } from "../features/appSlice";
import Spinner from "../components/Spinner";

const ResetPassword = () => {
  const { isLoading } = useSelector((state) => state.app);
  const [step, setStep] = useState(0);
  const [userId, setUserId] = useState(null);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 0 && emailReg.test(emailRef.current.value)) {
      dispatch(start());
      return resetPassword(emailRef.current.value, dispatch).then((res) => {
        if (res?.data?.user) {
          emailRef.current.value = "";
          setStep((prev) => prev + 1);
          setUserId(res.data.user);
          dispatch(stop());
        }
      }).catch(error => {
        dispatch(stop());
        toast.error(error?.response?.data?.message);
      });
    }
    return toast.error("email cannot be empty and should be correct format");
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const data = {
      password: passwordRef.current.value,
    };
    if (
      passwordRef.current.value === confirmPasswordRef.current.value &&
      passwordRef.current.value.length >= 8
    ) {
      dispatch(start());
      return await passwordReset(data, userId, dispatch)
        .then((res) => {
          if (res?.data?.message) {
            toast.success("Your password has successfully updated!");
            dispatch(stop());
            navigate("/");
          }
        })
        .catch((error) => {
          dispatch(stop());
          toast.error(error?.response?.data?.message);
        });
    }
    return toast.error(
      "Passwords must match and length should be 8 characters"
    );
  };

  if (step === 0) {
    return (
      <div className="flex justify-center items-center mt-20 ">
        <div className="bg-gray md:p-14 md:w-[500px] w-100 shadow-xl bg-white rounded-md">
          <form className="flex justify-center items-center flex-col p-6 gap-5 ">
            <h1 className="font-bold text-2xl text-slate-600">Enter Email</h1>

            <input
              type="text"
              name="email"
              ref={emailRef}
              className=" p-2 w-full border border-slate-400"
              placeholder="Enter Email"
            />

            <button
              type="submit"
              onClick={handleSubmit}
              className="p-2 w-full bg-slate-600 text-white"
            >
              Confirm
            </button>
            {isLoading && <Spinner />}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center mt-20 ">
      <div className="bg-gray md:p-14 md:w-[500px] w-100 shadow-xl bg-white rounded-md">
        <form className="flex justify-center items-center flex-col p-6 gap-5 ">
          <h1 className="font-bold text-2xl text-slate-600">Reset Password</h1>

          <input
            type="password"
            name="new_password"
            ref={passwordRef}
            className=" p-2 w-full border border-slate-400"
            placeholder="New password"
          />
          <input
            type="password"
            name="confirm_password"
            ref={confirmPasswordRef}
            className=" p-2 w-full border border-slate-400"
            placeholder="Confirm password"
          />
          <button
            type="submit"
            onClick={handleResetPassword}
            className="p-2 w-full bg-slate-600 text-white"
          >
            Reset
          </button>
          {isLoading && <Spinner />}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

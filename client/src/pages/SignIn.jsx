import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Stage 1: while submitting, disable the 'Sign In' button by setting 'loading = true'
    dispatch(signInStart());
    const res = await fetch("http://localhost:3333/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "failed") {
      // Stage 2 (failed branch): if sign in failed, set the data.message to 'error' and enable 'Sign Up' button by setting 'loading = false'
      dispatch(signInFailure(data.message));
      return;
    }
    // Stage 2 (success branch): if sign in success, set the data to 'currentUser' and enable 'Sign Up' button by setting 'loading = false'
    dispatch(signInSuccess(data));
    navigate("/");
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl text-center font-semibold my-7">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg
        font-extralight hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className=" text-blue-500 hover:underline">Sign Up</span>
        </Link>
      </div>
      {error ? <p className="text-red-500 mt-5">{error}</p> : ""}
    </div>
  );
}

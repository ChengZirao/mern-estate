import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function Forgot() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  // const { loading } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Stage 1: while submitting, disable the 'Sign In' button by setting 'loading = true'
    setLoading(true);
    const res = await fetch(
      `http://localhost:3333/api/auth/resetPassword/${formData.token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.status === "failed") {
      // Stage 2 (failed branch): if sign in failed, set the data.message to 'error' and enable 'Sign Up' button by setting 'loading = false'
      setLoading(false);
      setError(data.message);
      return;
    }
    // Stage 2 (success branch): if sign in success, set the data to 'currentUser' and enable 'Sign Up' button by setting 'loading = false'
    setLoading(false);
    navigate("/sign-in");
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-xl text-center font-semibold my-7 text-red-500">
        Type in both your new password and password reset token!
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="reset token"
          className="border p-3 rounded-lg"
          id="token"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="new password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg
        font-extralight hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Loading..." : "Reset"}
        </button>
      </form>
      <div className="flex gap-2 mt-5 text-red-400">
        <p>(The token will be expired in 10 min!)</p>
      </div>
      {error ? <p className="text-red-500 mt-5">{error}</p> : ""}
    </div>
  );
}

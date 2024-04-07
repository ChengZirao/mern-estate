import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  // When visit "/profile", if user has logged in, navigate to <Outlet /> (<Profile />)
  // Else, redirect to "/sign-in"
  return currentUser ? <Outlet /> : <Navigate to={"/sign-in"} />;
}

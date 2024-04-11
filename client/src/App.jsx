// Create App.jsx template by type 'rfc'
// (To use this shortcut, need to download 'Tailwind CSS IntelliSense' extension first)

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Forgot from "./pages/Forgot";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      {/* The Header component will be at the top of all pages */}
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/sign-in"
          element={<SignIn />}
        />
        <Route
          path="/sign-up"
          element={<SignUp />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        {/* When visit "/profile", if user has logged in, navigate to <Outlet /> (<Profile />)
            Else, redirect to "/sign-in" */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/profile"
            element={<Profile />}
          />
        </Route>
        <Route
          path="/forgot"
          element={<Forgot />}
        />
      </Routes>
    </BrowserRouter>
  );
}

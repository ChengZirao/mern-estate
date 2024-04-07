import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      // console.log(result);
      const res = await fetch("http://localhost:3333/api/auth/googleAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      // When sign in/up successfuly, navigate to home page
      navigate("/");
    } catch (error) {
      console.log("Could not sign in with Google:");
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      // Default type is 'submit', change it to 'button' to prevent submitting
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg
  font-extralight hover:opacity-90 disabled:opacity-60"
    >
      Continue With Google
    </button>
  );
}

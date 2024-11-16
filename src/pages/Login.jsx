import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/ide");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/ide");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/ide"); // Redirect to IDEAzman after Google login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-full max-w-md p-8 rounded-lg bg-transparent border-white border-2 shadow-lg">
        <h2 className="text-3xl text-center pb-2 text-white font-bold mb-4 cursor-pointer">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg"
            required
          />
          <button
            type="submit"
            className="font-semibold text-base w-full p-3 bg-black border-2 border-white rounded-full text-white hover:bg-gray-900"
          >
            Sign In
          </button>
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="font-semibold text-base w-full p-3 bg-black border-2 border-white rounded-full text-white hover:bg-gray-900"
          >
            Google Login
          </button>
          <p className="text-white font-medium text-sm">
            Dont have an account?{" "}
            <Link to="/signup">
              <span className="text-blue-600 ml-2">Sign Up</span>
            </Link>
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;

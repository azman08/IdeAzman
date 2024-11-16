import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/ide");
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-full max-w-md p-8 rounded-lg bg-transparent border-white border-2 shadow-lg">
        <h2 className="text-3xl text-center pb-2 text-white font-bold mb-4 cursor-pointer">
          Sign Up
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 rounded-lg"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 rounded-lg"
          />
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
            Sign Up
          </button>
          <p className="text-white font-medium text-sm">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-blue-600 ml-2">Login</span>
            </Link>
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;

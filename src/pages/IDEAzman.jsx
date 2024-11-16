import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Code from "../components/code";

const IDEAzman = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-full">
      <Code />
    </div>
  );
};

export default IDEAzman;

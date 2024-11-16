import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const code = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };
  const [tab, setTab] = useState("html");

  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  const run = () => {
    const html = htmlCode;
    const css = "<style>" + cssCode + "</style>";
    const js = "<script>" + jsCode + "</script>";
    const iframe = document.getElementById("iframe");

    if (iframe) {
      iframe.srcdoc = html + css + js;
    }
  };

  useEffect(() => {
    run();
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    run();
  }, []);

  return (
    <>
      <div className="w-full bg-black h-screen">
        <div className="flex items-center bg-black h-[70px] justify-between px-[50px]">
          <div className="left">
            <h2 className=" text-white font-bold text-2xl">IDEAZMAN</h2>
          </div>
          <div className="right_side">
            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div
          className="con flex items-center justify-between w-screen"
          style={{ minHeight: "calc(100vh - 70px)" }}
        >
          <div className="w-[60%] h-full">
            <div className="tabs pt-[10px] ml-[30px] flex items-center gap-[10px] w-full">
              <div
                onClick={() => {
                  setTab("html");
                }}
                className="tab p-[5px] bg-slate-400 cursor-pointer font-semibold rounded-full px-[20px]"
              >
                HTML
              </div>
              <div
                onClick={() => {
                  setTab("css");
                }}
                className="tab p-[5px] bg-gray-400 cursor-pointer font-semibold rounded-full px-[20px]"
              >
                CSS
              </div>
              <div
                onClick={() => {
                  setTab("js");
                }}
                className="tab p-[5px] bg-gray-400  font-semibold rounded-full cursor-pointer px-[20px]"
              >
                JavaScript
              </div>
            </div>
            {tab === "html" ? (
              <Editor
                height="90vh"
                className="pt-4"
                language="html"
                theme="vs-dark"
                value={`
<h1>Welcome to IdeAzman</h1>
                `}
                onChange={(e) => {
                  setHtmlCode(e || "");
                }}
              />
            ) : tab === "css" ? (
              <Editor
                height="90vh"
                className="pt-4"
                language="css"
                theme="vs-dark"
                value={`
body{
  background: #fff !important;
  color: #000;
}
                `}
                onChange={(e) => {
                  setCssCode(e || "");
                }}
              />
            ) : tab === "js" ? (
              <Editor
                height="90vh"
                className="pt-4"
                language="javascript"
                theme="vs-dark"
                value="console.log('Hello Buddy!');"
                onChange={(e) => {
                  setJsCode(e || "");
                }}
              />
            ) : (
              ""
            )}
          </div>
          <div className="w-[50%]" style={{ minHeight: "calc(100vh - 70px)" }}>
            <iframe
              id="iframe"
              className="w-full bg-white"
              style={{ minHeight: "calc(100vh - 70px)" }}
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default code;

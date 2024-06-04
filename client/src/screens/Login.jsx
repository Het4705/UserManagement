import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";

function Login({ setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function setCookie(name, value, hoursToExpire, path = "/", sameSite = "Lax") {
    const expires = hoursToExpire
      ? new Date(Date.now() + 3600000 * 10).toUTCString()
      : "";
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; path=${path}; expires=${expires}; SameSite=${sameSite}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setMessage("Login successful");
        setCookie("login", "true", 10);
        setLogin(true);
      } else {
        setMessage(response.data.msg || "Login failed");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 400) {
          setMessage("Incorrect email or password");
        } else {
          setMessage(
            error.response.data.msg || "An error occurred. Please try again."
          );
        }
      } else if (error.request) {
        // The request was made but no response was received
        setMessage("No response from the server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className=" text-white h-[80vh] w-[100vw] bg-[#000000] flex flex-col justify-start items-center ">
        <h2 className=" mt-[7vh] text-4xl">
          <span className=" text-fuchsia-500">USER</span> MANAGEMENT
        </h2>
        <form
          onSubmit={handleSubmit}
          className="shadow-lg mb-10 rounded-md  flex mt-[10vh] flex-col justify-around items-center bg-gray-900 p-5    "
        >
          <h2 className="text-2xl mb-5">Admin Login </h2>
          <div>
            <label className="text-xl block">Email: </label>

            <input
              className="rounded-md text-white bg-slate-800 mt-1 p-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <br></br>
            <label className="text-xl block">Password:</label>
            <input
              className="rounded-md text-white mt-1 bg-slate-800 p-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="bg-blue-800 p-2 rounded-lg mt-3" type="submit">
            Login
          </button>

          <span className="text-red-300 mt-2 mb-1">
            {message && <p>{message}</p>}
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import axios from "axios";


function Login({ setLogin }) {
  console.log(import.meta.env.HOST)
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
        "https://usermanagement-jmlw.onrender.com"+"/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setMessage("Login successful");
        setCookie("login", "true", 10);
        console.log(response)
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
          className="shadow-md shadow-slate-700  border-slate-500 border-2  mb-10 rounded-md  flex mt-[10vh] flex-col justify-around items-center bg-slate-900 p-5    "
        >
          <h2 className="text-2xl mb-2">Admin Login </h2>
          <hr className="w-[80%] mb-3"></hr>
          <div>
            <label className="text-xl block">Email: </label>

            <input
              className="  rounded-md text-white bg-black opacity-[70%] mt-1 p-1"
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
              className="rounded-md text-white mt-1 bg-black opacity-[70%]  p-1"
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

import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import search_icon from "../assets/search-icon.svg";

function Navbar({ setLogin }) {
  const handleLogout = () => {
    axios
      .post("https://usermanagement-jmlw.onrender.com/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log("Logout successful, removing cookie");
        Cookies.remove("login", { path: "/" });
        setLogin(false);
      })
      .catch((err) => {
        console.error("Error logging out:", err);
      });
  };

  return (
    <div className="text-white flex p-3 w-[100vw]  bg-slate-950 border-b-2  border-slate-400 shadow-slate-700 items-center justify-around h-[15vh]">
      <div>
        <h1 className="text-xl">
          <span className="text-3xl text-fuchsia-500">SOME</span>Company
        </h1>
      </div>
      <div></div>
      <div className="flex flex-col justify-center items-center">
        <span className="mb-1 text-xl gradient-text ">USER OPERATIONS</span>
        <ul className="flex p-1 justify-center items-center bg-slate-700 rounded-lg gap-1">
          <li className="mx-[5px] cursor-pointer">
            <NavLink
              to="/viewUsers"
              className="hover:border-b-2 border-fuchsia-500"
              style={({ isActive }) =>
                isActive ? { borderBottom: "2px solid #d946ef" } : undefined
              }
            >
              View
            </NavLink>
          </li>

          <li className="mx-[5px] cursor-pointer">
            <NavLink
              to="/addUsers"
              className="hover:border-b-2 border-fuchsia-500"
              style={({ isActive }) =>
                isActive
                  ? { borderBottom: "2px solid #d946ef", marginTop: "2px" }
                  : undefined
              }
            >
              Add
            </NavLink>
          </li>
          <li className="mx-[5px] cursor-pointer">
            <NavLink
              to="/updateUsers"
              className="hover:border-b-2 border-fuchsia-500"
              style={({ isActive }) =>
                isActive ? { borderBottom: "2px solid #d946ef" } : undefined
              }
            >
              Update
            </NavLink>
          </li>
          <li className="mx-[5px] cursor-pointer">
            <NavLink
              to="/deleteUsers"
              className="hover:border-b-2 border-fuchsia-500"
              style={({ isActive }) =>
                isActive ? { borderBottom: "2px solid #d946ef" } : undefined
              }
            >
              Delete
            </NavLink>
          </li>

          <li className="mx-[5px] flex items-center">
            <input
              type="text"
              placeholder="Search By FirstName"
              className="opacity-[0.3] p-1 rounded bg-black text-white"
            />
          </li>
          <li
            className="mx-[5px] cursor-pointer hover:border-b-2 border-fuchsia-500"
            onClick={handleLogout}
          >
            LogOut
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

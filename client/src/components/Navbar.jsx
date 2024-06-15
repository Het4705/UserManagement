import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdLogOut, IoMdSearch } from "react-icons/io";

function Navbar(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [names, setNames] = useState([]);

  useEffect(() => {
    // Fetch user data on component mount
    axios
      .get("https://usermanagement-jmlw.onrender.com/api/users", { withCredentials: true })
      .then((res) => {
        // Map the user data to an array of objects containing both first and last names
        const userData = res.data.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
        }));
        setNames(userData);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  // Handle Logout
  const handleLogout = () => {
    axios
      .post("https://usermanagement-jmlw.onrender.com/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log("Logout successful, removing cookie");
        Cookies.remove("login", { path: "/" });
        props.setLogin(false);
      })
      .catch((err) => {
        console.error("Error logging out:", err);
      });
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    const rawQuery = event.target.value;
    const trimmedQuery = rawQuery.trim();
    setSearchQuery(rawQuery); // Set the search query without trimming to allow spaces

    if (trimmedQuery.length > 0) {
      //  trimmed query for filtering, allowing internal spaces
      const filteredNames = names.filter(
        (name) =>
          name.firstName.toLowerCase().startsWith(trimmedQuery.toLowerCase()) ||
          name.lastName.toLowerCase().startsWith(trimmedQuery.toLowerCase())
      );

      if (filteredNames.length > 0) {
        setSuggestions(filteredNames);
      } else {
        setSuggestions([{ firstName: "User", lastName: "Not Found" }]);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle name selection
  const handleNameClick = (name) => {
    setSearchQuery(`${name.firstName} ${name.lastName}`);
    setSuggestions([]);
    // Navigate to the person's details page
    navigate(`/user?firstName=${name.firstName}`);
  };

  // Handle search button click

  return (
    <div className="text-white flex p-3 w-[100vw] bg-slate-950 border-b-2 border-slate-400 shadow-slate-700 items-center justify-around h-[15vh]">
      <div>
        <h1 className="text-xl">
          <span className="text-3xl text-fuchsia-500">SOME</span>Company
        </h1>
      </div>
      <div></div>
      <div className="flex flex-col justify-center items-center">
        <span className="mb-1 text-xl gradient-text">USER OPERATIONS</span>
        {props.isLogin ? (
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
            <li className="mx-[5px] flex items-center relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search By FirstName"
                  className="pl-4 pr-8 p-1 rounded bg-black text-white opacity-80"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <IoMdSearch className="absolute right-2 text-gray-400 cursor-pointer" />
                {suggestions.length > 0 && (
                  <div className="absolute rounded-md opacity-90 top-full left-0 right-0 bg-gray-300 text-slate-800 z-10 max-h-40 overflow-y-auto hover:opacity-100 ">
                    {suggestions.map((name, index) => (
                      <div
                        key={index}
                        className="cursor-pointer p-2 bg-slate-900 text-slate-400 hover:bg-gray-800 "
                        onClick={() => handleNameClick(name)}
                      >
                        {name.firstName} {name.lastName}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </li>
            <li
              className="mx-[5px] cursor-pointer flex items-center justify-center tooltip-container"
              onClick={handleLogout}
            >
              <IoMdLogOut className="text-3xl hover:text-red-500" />
              <span className="tooltip-text">Logout</span>
            </li>
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Navbar;

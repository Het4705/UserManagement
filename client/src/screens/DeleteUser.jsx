import React, { useState, useEffect } from "react";
import UserCard2 from "../components/UserCard2";

export const DeleteUser = () => {
  const [msg, setMsg] = useState("");
  const [userSelected, setUserSelected] = useState(false);
  const [user, setUser] = useState({});
  const [userSearchData, setUserSearchData] = useState({
    email: "",
    name: "",
  });

  const handleSearch = async () => {
    if (!userSearchData.email && !userSearchData.name) {
      alert("Please provide either email or name");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/search", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userSearchData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data) {
          setUserSelected(true);
          setUser(data[0]);
        } else {
          setMsg("No user data returned");
        }
      } else {
        setMsg(data.msg || "Unknown error");
      }
    } catch (error) {
      setMsg("Error fetching user");
      console.error("Error fetching user:", error);
    }
  };

  const onParamChange = (e) => {
    const { name, value } = e.target;
    setUserSearchData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users?emailId=${user.email}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMsg("User deleted successfully");
        setUserSelected(false);
        setUser({});
        setUserSearchData({ email: "", name: "" });
      } else {
        setMsg(data.msg || "Delete failed");
      }
    } catch (error) {
      setMsg("Error deleting user");
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(""), 2500);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  return (
    <div className="min-h-[80vh] text-white flex justify-center items-center flex-col">
      {!userSelected ? (
        <div className="flex gap-3 shadow-md border-2 border-slate-700 shadow-slate-800 rounded-md h-[20pc] p-10 justify-center items-center flex-col">
          <h3 className="text-slate-200 mb-5 text-3xl gradient-text">
            Search User
          </h3>
          <input
            className="bg-transparent border-b-2 mb-4 focus:outline-none focus:border-blue-400 text-xl"
            placeholder="Enter Name"
            onChange={onParamChange}
            name="name"
            value={userSearchData.name}
          />
          <h3 className="gradient-text2 text-2xl">OR</h3>
          <input
            className="bg-transparent mb-3 border-b-2 focus:outline-none focus:border-blue-400 text-xl"
            type="email"
            placeholder="Enter Email"
            onChange={onParamChange}
            name="email"
            value={userSearchData.email}
          />
          <div
            className="gradient2 p-1 mt-3 rounded-md text-lg cursor-pointer hover:scale-95"
            onClick={handleSearch}
          >
            Search
          </div>
          <p>{msg}</p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center  w-[70%]">
          <UserCard2 user={user} />
          <div className="">
              <div
                className="gradient2 p-2 rounded-md text-lg cursor-pointer hover:scale-95 transition-all ease-out duration-500 custom-ease-out hover:shadow-md hover:shadow-[rgba(139,94,190,0.7)]"
                onClick={handleDelete}
              >
                Delete
              </div>
          </div>
              <p>{msg}</p>
        </div>
      )}
      {!userSelected ? (
        <p className="text-slate-300 mt-4">Search using email is preferable</p>
      ) : null}
    </div>
  );
};

export default DeleteUser;

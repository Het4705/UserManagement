import React, { useState, useEffect } from "react";
import UserCard2 from "../components/UserCard2";

export const UpdateUser = () => {
  const [msg, setMsg] = useState("");
  const [userSelected, setUserSelected] = useState(false);
  const [user, setUser] = useState({});
  const [updateData, setUpdateData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
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
      const response = await fetch( "https://usermanagement-jmlw.onrender.com"+"/api/users/search", {
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
          setUpdateData(data[0]);
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

  const onUserChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    for (const key in updateData) {
      formData.append(key, updateData[key]);
    }
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      const response = await fetch(
        `https://usermanagement-jmlw.onrender.com/api/users?emailId=${user.email}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMsg("User updated successfully");
      } else {
        setMsg(data.msg || "Update failed");
      }
    } catch (error) {
      setMsg("Error updating user");
      console.error("Error updating user:", error);
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
        <div className="flex justify-evenly  w-[70%] gap-5">
          <UserCard2 user={user} />
          <div className="user-card">
            <div className="flex flex-col justify-center items-center">
              <h3>
                <strong>UPDATE USER</strong>
              </h3>
              <span className="text-slate-400">{user.firstName}</span>
            </div>
            <hr className="mt-2 mb-2"></hr>
            <div className="flex gap-2 flex-col">
              <input
                type="text"
                name="firstName"
                placeholder="Enter Firstname"
                className="p-1 bg-black rounded-md focus:bg-opacity-100 bg-opacity-70"
                value={updateData.firstName}
                onChange={onUserChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Enter Lastname"
                className="p-1 bg-black rounded-md focus:bg-opacity-100 bg-opacity-70"
                value={updateData.lastName}
                onChange={onUserChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="p-1 bg-black rounded-md focus:bg-opacity-100 bg-opacity-70"
                value={updateData.email}
                onChange={onUserChange}
              />
              <input
                type="number"
                name="mobile"
                placeholder="Enter Mobile"
                className="p-1 bg-black rounded-md focus:bg-opacity-100 bg-opacity-70"
                value={updateData.mobile}
                onChange={onUserChange}
              />
              <input
                type="text"
                name="status"
                placeholder="Enter Status"
                className="p-1 bg-black rounded-md focus:bg-opacity-100 bg-opacity-70"
                value={updateData.status}
                onChange={onUserChange}
              />
              <div>
                <label className="mr-2">Gender:</label>
                <label className="mr-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={updateData.gender === "male"}
                    onChange={onUserChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={updateData.gender === "female"}
                    onChange={onUserChange}
                  />
                  Female
                </label>
              </div>
              <input
                type="text"
                name="location"
                placeholder="Enter Location"
                className="p-1 bg-black rounded-md focus:bg-opacity-100 bg-opacity-70"
                value={updateData.location}
                onChange={onUserChange}
              />
              <div>
                <label className="mr-2">Role:</label>
                <label className="mr-2">
                  <input
                    type="radio"
                    name="role"
                    value="Admin"
                    checked={updateData.role === "Admin"}
                    onChange={onUserChange}
                  />
                  Admin
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="User"
                    checked={updateData.role === "User"}
                    onChange={onUserChange}
                  />
                  User
                </label>
              </div>
              <input
                type="file"
                name="profilePicture"
                className="p-1 bg-black rounded-md focus:bg-opacity-100 bg-opacity-70"
                onChange={onProfilePictureChange}
              />
              <div
                className="gradient2 p-1 mt-3 rounded-md text-lg cursor-pointer hover:scale-95 transition-all ease-out duration-500 custom-ease-out hover:shadow-md hover:shadow-[rgba(139,94,190,0.7)]"
                onClick={handleUpdate}
              >
                Update
              </div>
              <p>{msg}</p>
            </div>
          </div>
        </div>
      )}
      {!userSelected ? (
        <p className="text-slate-300 mt-4">Search using email is preferable</p>
      ) : null}
    </div>
  );
};

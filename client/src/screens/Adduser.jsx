
import axios from "axios";
import React, { useState, useEffect } from "react";



const AddUser = () => {
  const [imageFile, setImageFile] = useState(null); // Change to store File object
  const [msg, setMessage] = useState(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
    role: "user",
    password: "",
    dob: "", // Add dob to the initial state
  });

  useEffect(() => {
    let timeoutId;

    if (msg) {
      timeoutId = setTimeout(() => {
        setMessage(null);
      }, 3000);
    }

    // Cleanup function
    return () => {
      // Clear the timeout if component unmounts or `msg` changes
      clearTimeout(timeoutId);
    };
  }, [msg]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessage("Image uploaded successfully!"); // Set message for successful upload
      setImageFile(file); // Store the File object
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile); // Append the File object
      }
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("email", userData.email);
      formData.append("mobile", userData.mobile);
      formData.append("gender", userData.gender);
      formData.append("location", userData.location);
      formData.append("role", userData.role);
      formData.append("password", userData.password);
      formData.append("dob", userData.dob);

      await axios.post( "https://usermanagement-jmlw.onrender.com/api/users", formData, {
        withCredentials: true,
      });
      setMessage("User data submitted successfully!"); // Set success message
      
    } catch (error) {
      console.error("Error submitting user data:", error);
      setMessage("Error submitting user data. Please try again."); // Set error message
    }
  };

  const handleImageRemove = () => {
    setImageFile(null); // Change to remove the File object
    setMessage("");
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="text-white justify-around flex flex-col items-center min-h-[80vh] w-[100vw]">
      <h1 className="text-3xl gradient-text">
      <strong>
      Add User
        </strong> 
      </h1>
      <div className="flex p-2 gap-3  h-[70vh] w-[80%] glassmorphism rounded-md justify-center">
        <div className="flex rounded-md flex-col justify-around items-center h-[100%] w-[30%] glassmorphismBlue">
          <h2 className="text-white text-2xl text-center">Upload Image</h2>
          <div
            id="imageShow"
            className="h-[50%] w-[90%] bg-slate-950 border-slate-400 border-[2px] rounded-md flex justify-center items-center"
          >
            {imageFile ? (
              <img
                src={URL.createObjectURL(imageFile)} // Use URL.createObjectURL for preview
                alt="Uploaded"
                className="h-full w-full object-cover rounded-md"
              />
            ) : (
              <span className="text-center">Image not uploaded</span>
            )}
          </div>
          <input type="file" className="w-[90%]" onChange={handleImageUpload} />
          {imageFile && (
            <button
              onClick={handleImageRemove}
              className="bg-red-500 p-1 mt-2  rounded-md"
            >
              Cancel Upload
            </button>
          )}
        </div>
        <div className="w-[90%] bg-slate-950 border-slate-400 border-[2px] rounded-md flex justify-around items-center gap-2 flex-col">
          <h2 className="mt-2 text-2xl">Personal Details </h2>
          <hr className="text-white w-[90%]" />
          <form
            className="h-[95%] w-[95%] gap-5 flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="mt-2 h-[95%] w-[95%] flex text-lg gap-1 flex-wrap p-1 justify-center items-center">
              <div className="h-max flex">
                <label htmlFor="firstName">Firstname </label>
                <input
                  type="text"
                  name="firstName"
                  onChange={handleOnChange}
                  className="mx-2 bg-transparent border-b focus:outline-none focus:border-blue-300 text-slate-200"
                  placeholder="Het"
                  required
                />
              </div>
              <div className="h-max flex">
                <label htmlFor="lastName">Lastname </label>
                <input
                  type="text"
                  name="lastName"
                  onChange={handleOnChange}
                  className="mx-2 bg-transparent border-b focus:outline-none focus:border-blue-300 text-slate-200"
                  placeholder="Patel"
                  required
                />
              </div>
              <div className="h-max flex">
                <label htmlFor="email">Email </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleOnChange}
                  className="mx-2 bg-transparent border-b focus:outline-none focus:border-blue-300 text-slate-200"
                  placeholder="Het@gmail.com"
                  required
                />
              </div>
              <div className="h-max flex">
                <label htmlFor="mobile">Mobile </label>
                <input
                  type="number"
                  name="mobile"
                  onChange={handleOnChange}
                  className="mx-2 bg-transparent border-b focus:outline-none focus:border-blue-300 text-slate-200"
                  placeholder="7373653522"
                  required
                />
              </div>
              <div className="h-max flex">
                <label htmlFor="dob">D.O.B. </label>
                <input
                  type="date"
                  name="dob"
                  onChange={handleOnChange}
                  className="mx-2  bg-slate-700 p-[1px] rounded-sm  focus:outline-none "
                  required
                />
              </div>
              <div className="h-max flex justify-start items-center">
                <label htmlFor="gender">Gender </label>
                <span className="mx-1 text-gray-400">
                  <input
                    type="radio"
                    name="gender"
                    onChange={handleOnChange}
                    className="mx-2 bg-transparent border-b focus:outline-none focus:border-blue-300 text-slate-200"
                    required
                    value="male"
                  />
                  Male
                </span>
                <span className="mx-1 text-gray-400">
                  <input
                    type="radio"
                    value="female"
                    name="gender"
                    onChange={handleOnChange}
                    className="mx-2 bg-transparent border-b focus:outline-none focus:border-blue-300 text-slate-200"
                    required
                  />
                  Female
                </span>
              </div>
              <div className="h-max flex mx-2">
                <label htmlFor="location">Location </label>
                <input
                  type="text"
                  name="location"
                  onChange={handleOnChange}
                  className="mx-2 bg-transparent border-b focus:outline-none focus:border-blue-300 text-slate-200"
                  placeholder="Vadodara"
                  required
                />
              </div>
              <div>
                <label htmlFor="role">Role </label>
                <select
                  name="role"
                  onChange={handleOnChange}
                  className="bg-transparent mx-2 border-2 rounded-md"
                >
                  <option value="user" className="text-red-500 bg-slate-900">
                    User
                  </option>
                  <option value="Admin" className="text-green-500 bg-slate-900">
                    Admin
                  </option>
                </select>
              </div>
              {userData.role === "Admin" && (
                <div className="h-max flex">
                  <label htmlFor="password">
                    <span className="text-fuchsia-500 font-bold">Admin</span>{" "}
                    Password{" "}
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleOnChange}
                    className="mx-2 bg-transparent border-b focus:outline-none focus:border-blue-300 text-slate-200"
                    required
                  />
                </div>
              )}
            </div>
            <div className="mb-2">
              <button
                type="submit"
                className="mx-2 bg-blue-500 p-1 text-xl w-[10vw] rounded-lg delay-100 hover:scale-95"
              >
                Submit
              </button>
              <button
                type="reset"
                className="bg-blue-500 p-1 text-xl w-[10vw] rounded-lg delay-100 hover:scale-95"
              >
                Reset
              </button>
            </div>
          </form>
          <span className="my-1 text-amber-400">{msg}</span> {/* Use msg for displaying messages */}
        </div>
      </div>
    </div>
  );
};

export default AddUser;

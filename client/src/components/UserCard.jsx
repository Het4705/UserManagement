import axios from "axios";
import { useState } from "react";

function UserCard({ user }) {
  const [update, setUpdate] = useState(false);
  const [message, setMessage] = useState("");

  const [updatedUser, setUpdatedUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    email: user.email,
    mobile: user.mobile,
    gender: user.gender,
    role: user.role,
  });

  const handleDelete = () => {
    try {
      axios
        .delete("http://localhost:3000/api/users?emailId=" + user.email, {
          withCredentials: true,
        })
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);

          setMessage("Deleted");
        })
        .catch((err) => console.error(err));
    } catch (error) {
      setMessage(error);
    }
  };

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://usermanagement-jmlw.onrender.com/api/users?emailId=" + user.email,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        console.log("Update successful");
        setMessage("Update successful reloading users");
        setUpdate(false);

        // Reload the page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Adjust the delay as needed
      } else {
        const result = await response.json();
        console.error("Update failed:", result);
        setMessage(result.message || "Update failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred");
    }
  };

  return (
    <div className=" min-w-[25%] bg-slate-900 gradientCard  p-2 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
      <img
        src={user.profilePicture}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-32 h-32 mx-auto rounded-full border-4 border-slate-700 shadow-lg "
      />
      {!update ? (
        <>
          <h2 className="text-2xl text-white text-center mt-4 font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <div className="mt-1">
            <p className="text-center text-gray-400">{user.location}</p>
            <p className="text-center text-gray-400">{user.email}</p>
            <p className="text-center text-gray-400">{user.mobile}</p>
            <p className="text-center text-gray-400">{user.gender}</p>
            <p className="text-center text-gray-400">{user.role}</p>
          </div>

          <div className="w-full flex justify-center gap-2 mt-2">
            <button
              className="transform transition duration-500 hover:scale-105 mt-1 p-1 bg-blue-500 bg-black rounded-md"
              onClick={handleUpdate}
            >
              {update ? "Cancel" : "Update"}
            </button>

            <button
              className="transform transition duration-500 hover:scale-105 mt-1 p-1 bg-blue-500 bg-black rounded-md"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          {message && (
            <div className="mt-2 text-white text-center">{message}</div>
          )}
        </>
      ) : (
        <div className="flex mt-2 flex-col h-full justify-start items-center w-full">
          <h2 className="text-2xl text-white text-center mt-4 font-semibold">
            Update User Information
          </h2>
          <div className="w-full mt-2">
            <input
              type="text"
              name="firstName"
              value={updatedUser.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full bg-black rounded-md"
            />
          </div>
          <div className="w-full mt-2">
            <input
              type="text"
              name="lastName"
              value={updatedUser.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full bg-black rounded-md"
            />
          </div>
          <div className="w-full mt-2">
            <input
              type="text"
              name="location"
              value={updatedUser.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full bg-black rounded-md"
            />
          </div>
          <div className="w-full mt-2">
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-black rounded-md"
            />
          </div>
          <div className="w-full mt-2">
            <input
              type="text"
              name="mobile"
              value={updatedUser.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              className="w-full bg-black rounded-md"
            />
          </div>
          <div className="w-full mt-2">
            <input
              type="text"
              name="gender"
              value={updatedUser.gender}
              onChange={handleChange}
              placeholder="Gender"
              className="w-full bg-black rounded-md"
            />
          </div>
          <div className="w-full mt-2">
            <input
              type="text"
              name="role"
              value={updatedUser.role}
              onChange={handleChange}
              placeholder="Role"
              className="w-full bg-black rounded-md"
            />
          </div>
          <div className="flex justify-around mt-4 gap-2">
            <button
              className="transform transition duration-500 hover:scale-105 mt-1 p-1 bg-red-500 bg-black rounded-md"
              onClick={handleUpdate}
            >
              Cancel
            </button>
            <button
              className="transform transition duration-500 hover:scale-105 mt-1 p-1 bg-blue-500 bg-black rounded-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          {message && (
            <div className="mt-2 text-white text-center">
              {setTimeout(() => {
                setMessage("");
              }, 3000)}
              message
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserCard;

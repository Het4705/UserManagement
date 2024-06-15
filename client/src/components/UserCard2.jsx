import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

const UserCard2 = ({ user }) => {
  // Manage the enlarge state within the component
  const [enlarge, setEnlarge] = useState(false);

  // Function to toggle the enlarge state
  const handleImageEnlarge = () => {
    setEnlarge(true);
  };

  // Function to close the enlarged view
  const handleCloseEnlarge = () => {
    setEnlarge(false);
  };

  return (
    <div className="user-card w-[100vw] border-2 p-4 rounded shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out relative overflow-hidden">
      <div className={`relative z-10 ${enlarge ? "blur-sm" : ""}`}>
        <div className="user-card__header flex items-center">
          <img
            src={user.profilePicture}
            className="user-card__image rounded-full w-16 h-16 cursor-pointer"
            alt="Profile"
            onClick={handleImageEnlarge}
          />
          <div className="ml-4">
            <h2 className="user-card__name text-xl font-bold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="user-card__email text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="user-card__details mt-4">
          <div className="user-card__detail">
            <strong>ID:</strong> {user._id}
          </div>
          <div className="user-card__detail">
            <strong>Mobile:</strong> {user.mobile}
          </div>
          <div className="user-card__detail">
            <strong>Status:</strong> {user.status}
          </div>
          <div className="user-card__detail">
            <strong>Gender:</strong> {user.gender}
          </div>
          <div className="user-card__detail">
            <strong>Location:</strong> {user.location}
          </div>
          <div className="user-card__detail">
            <strong>Created At:</strong>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </div>
          <div className="user-card__detail">
            <strong>Updated At:</strong>{" "}
            {new Date(user.updatedAt).toLocaleString()}
          </div>
          <div className="user-card__detail">
            <strong>Role:</strong> {user.role}
          </div>
        </div>
      </div>

      {enlarge && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="relative p-4 bg-white rounded shadow-lg">
            <img
              src={user.profilePicture}
              className="w-64 h-64  rounded cursor-pointer"
              alt="Profile"
            />
            <IoIosCloseCircle
              className="absolute top-1 right-2  text-3xl p-0 bg-red-500 p-2 rounded-full hover:bg-red-900"
              onClick={handleCloseEnlarge}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard2;

import axios from "axios";
import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard";

function Display() {
  const welcomeMessage = "Welcome Admin";
  const [typedMessage, setTypedMessage] = useState("");
  const [index, setIndex] = useState(0);
  const [showUsers, setShowUsers] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Typing effect for "Welcome Admin"
    const typingTimeout = setTimeout(() => {
      if (index < welcomeMessage.length) {
        setTypedMessage(
          (prevTypedMessage) => prevTypedMessage + welcomeMessage[index]
        );
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        setShowUsers(true); // After typing, show users
      }
    }, 100); // typing speed

    return () => clearTimeout(typingTimeout);
  }, [index]);

  useEffect(() => {
    if (showUsers) {
      axios
        .get("http://localhost:3000/api/users", { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          setUserData(res.data); // Update state with fetched user data
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [showUsers]);

  return (
    <div className="w-[70] h-[80vh] bg-black text-white flex justify-around items-center">
      {showUsers ? (
        <div className="flex h-[75vh] w-[70%] justify-around mt-10 shadow-lg  gap-5 flex-wrap  overflow-scroll  hide-scrollbar">
          {userData.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      ) : (
        <h1 className="text-4xl">
          {typedMessage} <span className="text-fuchsia-600">|</span>
        </h1>
      )}
    </div>
  );
}

export default Display;

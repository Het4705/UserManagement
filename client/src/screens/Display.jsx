import axios from "axios";
import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard";


function Display() {
  const welcomeMessage = "Welcome Admin";
  const [typedMessage, setTypedMessage] = useState("");
  const [index, setIndex] = useState(0);
  const [showUsers, setShowUsers] = useState(false);
  const [userData, setUserData] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc"); // ascending or descending

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
        .get("https://usermanagement-jmlw.onrender.com/api/users", { withCredentials: true })
        .then((res) => {
          console.log(res.data);
          setUserData(res.data); // Update state with fetched user data
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [showUsers]);

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedUserData = [...userData].sort((a, b) => {
    const compare = (a, b, key) => {
      let aValue, bValue;
      if (key === "name") {
        aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
        bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
      } else {
        aValue = a[key];
        bValue = b[key];
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    };

    return compare(a, b, sortCriteria);
  });

  return (
    <div className="w-[70] h-[80vh] bg-black text-white flex gap-2 justify-center items-center">
      {showUsers ? (
        <>
          <div className="flex gap-4 flex-col gradient3 bg-[#0616277b] h-[50%] mx-1 p-2 rounded-md">
            <label className="text-xl">Sort by:</label>
            <select
              className="p-2 bg-gray-800 text-white rounded"
              value={sortCriteria}
              onChange={handleSortChange}
            >
              <option value="name">Name</option>
              <option value="role">Role</option>
              <option value="createdAt">Date of Creation</option>
              <option value="updatedAt">Last Updated</option>
            </select>
            <button
              className="p-2 bg-gray-800 text-white rounded"
              onClick={handleSortOrderChange}
            >
              <table>
                <tr>
                  <td>Order: &nbsp;</td>
                  <td>{sortOrder === "asc" ? "Ascending" : "Descending"}</td>
                </tr>
              </table>
            </button>
          </div>
          <div className="flex h-[75vh] w-[100%] justify-around mt-10 shadow-lg gap-5 flex-wrap overflow-scroll hide-scrollbar">
            {sortedUserData.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        </>
      ) : (
        <h1 className="text-4xl">
          {typedMessage} <span className="text-fuchsia-600">|</span>
        </h1>
      )}
    </div>
  );
}

export default Display;

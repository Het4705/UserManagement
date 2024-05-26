import { useState } from "react";

function UpdateForm({ user, setUpdate }) {
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const url = "http://localhost:3000/api/Users?emailId=" + updatedUser.email;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('User updated successfully:', result);
        setUpdate(false);
        setMessage(result.message || 'User updated successfully');
      } else {
        console.error('Failed to update user:', result);
        setMessage(result.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred');
    }
  };

  return (
    <div className="mt-2">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2">
          <h3 className="text-xl text-white">Update Values</h3>
          <input
            type="text"
            name="location"
            value={updatedUser.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full mt-1 p-1 rounded bg-black text-white"
          />
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mt-1 p-1 rounded bg-black text-white"
          />
          <input
            type="text"
            name="mobile"
            value={updatedUser.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="w-full mt-1 p-1 rounded bg-black text-white"
          />
          <input
            type="text"
            name="gender"
            value={updatedUser.gender}
            onChange={handleChange}
            placeholder="Gender"
            className="w-full mt-1 p-1 rounded bg-black text-white"
          />
          <input
            type="text"
            name="role"
            value={updatedUser.role}
            onChange={handleChange}
            placeholder="Role"
            className="w-full mt-1 p-1 rounded bg-black text-white"
          />
          <button
            className="transform transition duration-500 hover:scale-105 mt-2 bg-blue-500 p-1 rounded-md text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
          {message && (
            <div className="mt-2 text-white">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateForm;

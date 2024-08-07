import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Display from "./screens/Display";
import NotFound from "./components/NotFound"; // Import the NotFound component
import Cookies from "js-cookie";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddUser from "./screens/Adduser";
import { UpdateUser } from "./screens/UpdateUser";
import DeleteUser from "./screens/DeleteUser";
import UserPage from "./screens/UserPage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const login = Cookies.get("login");
    if (login) {
      console.log(login);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    setIsLoading(false); // Mark the authentication check as completed
  }, [isLogin]);

  // Show a loading indicator while authentication check is in progress
  if (isLoading) {
    return <div className="text-4xl text-red-400">Loading...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <Navbar isLogin={isLogin} setLogin={setIsLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/viewUsers"
            element={isLogin ? <Display /> : <Login setLogin={setIsLogin} />}
          />
          <Route
            path="/addUsers"
            element={isLogin ? <AddUser /> : <Login setLogin={setIsLogin} />}
          />
          <Route
            path="/addUsers"
            element={isLogin ? <Display /> : <Login setLogin={setIsLogin} />}
          />
          <Route
            path="/updateUsers"
            element={isLogin ? <UpdateUser /> : <Login setLogin={setIsLogin} />}
          />
          <Route
            path="/deleteUsers"
            element={isLogin ? <DeleteUser /> : <Login setLogin={setIsLogin} />}
          />
          <Route
            path="/user"
            element={isLogin ? <UserPage /> : <Login setLogin={setIsLogin} />}
          />

          {/* Route for handling pages not explicitly defined */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer company="SomeCompany" />
      </BrowserRouter>
    </>
  );
}

export default App;

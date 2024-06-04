import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Display from "./screens/Display";
import Cookies from "js-cookie";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddUser from "./screens/Adduser";
import { UpdateUser } from "./screens/UpdateUser";
import DeleteUser from "./screens/DeleteUser";

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
        <Navbar setLogin={setIsLogin} />
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
        </Routes>
        <Footer company="SomeCompany" />
      </BrowserRouter>
    </>
  );
}

export default App;

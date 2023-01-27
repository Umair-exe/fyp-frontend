import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import { Toaster } from "react-hot-toast";
import RulesPage from "./pages/RulesPage";
import Users from "./pages/Users";
import Recommendations from './pages/Recommendations';

function App() {
  const { user } = useSelector((state) => state.app);

  return (
    <div className="App">
      <Toaster />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              {user.role === "admin" && (
                <>
                  <Route path="/rules" element={<RulesPage />} />
                  <Route path="/users" element={<Users />} />
                </>
              )}
              <Route path="/low-recommendations" element={<Recommendations />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password-reset" element={<ResetPassword />} />
          </>
        )}
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </div>
  );
}

export default App;

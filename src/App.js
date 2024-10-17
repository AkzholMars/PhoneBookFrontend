// App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import FooterComponent from "./components/common/Footer";
import UserService from "./components/service/UserService";
import UpdateUser from "./components/userspage/UpdateUser";
import UserManagementPage from "./components/userspage/UserManagementPage";
import ProfilePage from "./components/userspage/ProfilePage";
import HomePage from "./components/userspage/HomePage";
import ResetPasswordPage from "./components/userspage/ResetPasswordPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App ">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<LoginPage />} />

            {UserService.authenticatedOnly() && (
              <>
                <Route path="/profile" element={<ProfilePage />} />
              </>
            )}

            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {UserService.adminOnly() && (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route
                  path="/admin/user-management"
                  element={<UserManagementPage />}
                />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route
                  path="/reset-password/:userId"
                  element={<ResetPasswordPage />}
                />
              </>
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;

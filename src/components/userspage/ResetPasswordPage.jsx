import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [profileInfo, setProfileInfo] = useState({});

  const [userData, setUserData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({
    confirmPasswordMsg: "",
  });

  useEffect(() => {
    fetchUserDataById(userId);
  }, [userId]);

  const fetchUserDataById = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getUserById(userId, token); // Pass userId to getUserById
      setProfileInfo(response.ourUsers);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      setFormError({
        confirmPasswordMsg: "Пароли не совпадают",
      });
      return;
    }

    try {
      const confirmDelete = window.confirm(
        "Are you sure want to reset password?"
      );
      if (confirmDelete) {
        const token = localStorage.getItem("token");
        const res = await UserService.resetPassword(userId, userData, token);
        console.log(res);
        // Redirect to profile page or display a success message
        navigate("/admin/user-management");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert(error);
    }
  };

  return (
    <section className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
              Сброс пароля
            </h1>
            <div>
              <h2>ФИО: {profileInfo.name}</h2>
              <h2>Почта: {profileInfo.email}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Новый пароль
                </label>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  required=""
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Потвердите пароль
                </label>
                <input
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <h3 className="error-msg text-red-500">
                {formError.confirmPasswordMsg}
              </h3>

              <button
                type="submit"
                className="w-full border rounded-lg border-blue-500 text-blue-500 hover:bg-blue-600 focus:ring-blue-900 font-bold py-2 px-4 rounded-lg hover:border-white hover:text-white"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    // <div className="auth-container">
    //     <h2>Сброс пороля</h2>
    //     <p>ФИО: {profileInfo.name}</p>
    //     <p>Почта: {profileInfo.email}</p>
    //     <br></br>
    //     <form onSubmit={handleSubmit}>
    //         <div className="form-group">
    //         <label>Новый пароль:</label>
    //         <input type="text" name="password" value={userData.password} onChange={handleInputChange} required/>
    //         </div>
    //         <div className="form-group">
    //         <label>Потвердите пароль:</label>
    //         <input type="text" name="confirmPassword" value={userData.confirmPassword} onChange={handleInputChange} required/>
    //         <p className='error-msg' style={{ color: 'red' }}>{formError.confirmPasswordMsg}</p>
    //         </div>
    //         <button type="submit">Обновить пароль </button>
    //     </form>
    // </div>
  );
}

export default ResetPasswordPage;

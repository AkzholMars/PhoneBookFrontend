import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../service/UserService";

function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({});
  const isAdmin = UserService.isAdmin();

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.ourUsers);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  return (
    <section className="bg-gray-200 dark:bg-gray-800 h-screen">
      <div className="max-w-2xl py-5 mx-auto">
        <div className="flex flex-col mb-4 text-xl font-bold text-gray-900 dark:text-white items-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
            Профиль сотрудника
          </h2>
          <div className="grid grid-cols-1 gap-4 bg-white dark:bg-gray-700 px-10 py-10 rounded-2xl">
            <div className="px-2 flex rounded-lg ">
              <p className="dark:text-white font-medium">
                ФИО: {profileInfo.name}
              </p>
            </div>

            <div className="px-2  rounded-lg ">
              <p className="font-medium dark:text-white">
                Почта: {profileInfo.email}
              </p>
            </div>
            <div className="px-2  rounded-lg ">
              <p className="font-medium dark:text-white">
                Управление/Представительство: {profileInfo.department}
              </p>
            </div>
            <div className="px-2  rounded-lg ">
              <p className="font-medium dark:text-white">
                Должность: {profileInfo.position}
              </p>
            </div>
            <div className="px-2 rounded-lg ">
              <p className="font-medium dark:text-white">
                Телефон: {profileInfo.phone}
              </p>
            </div>
            {isAdmin && (
              <div className="flex items-center space-x-4">
                <button className="w-ull h-10 px-2 border rounded-lg border-blue-500 text-blue-500 hover:border-white hover:text-white hover:bg-blue-600 focus:ring-blue-900">
                  <Link to={`/update-user/${profileInfo.id}`}>Обновить</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;

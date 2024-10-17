// components/UserManagementPage.js
import React, { useState, useEffect } from "react";
import UserService from "../service/UserService";

function HomePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await UserService.getUsers();
      //   console.log(response);
      setUsers(response.ourUsersList); // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div class="bg-gray-200 dark:bg-gray-800 flex flex-col">
      <br />
      <h2 class="self-center text-gray-800 text-2xl font-semibold whitespace-nowrap dark:text-white">
        Телефонный справочник
      </h2>
      <br />
      <div class="h-full  px-6 py-8 mx-auto lg:py-0">
        <table class="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-300">
          <thead class="text-xs text-gray-100 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                ФИО
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">Почта</div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">
                  Управление/Представительство
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">Должность</div>
              </th>
              <th scope="col" class="px-6 py-3">
                <div class="flex items-center">Телефон</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                class="border-b border-gray-900 dark:bg-gray-800 dark:border-gray-700"
              >
                <td class="px-6 py-4">{user.name}</td>
                <td class="px-6 py-4">{user.email}</td>
                <td class="px-6 py-4">{user.department}</td>
                <td class="px-6 py-4">{user.position}</td>
                <td class="px-6 py-4">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;

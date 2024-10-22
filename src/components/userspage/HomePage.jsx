// components/UserManagementPage.js
import React, { useState, useEffect } from "react";
import UserService from "../service/UserService";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState("");

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

  const filterUsers = users.filter((ouruser) => {
    return (
      ouruser.name.toLowerCase().includes(value.toLowerCase()) ||
      ouruser.department.toLowerCase().includes(value.toLowerCase()) ||
      ouruser.position.toLowerCase().includes(value.toLowerCase())
    );
  });

  return (
    <div className="h-full bg-gray-200 dark:bg-gray-800 flex flex-col">
      <br />
      <h2 className="self-center text-gray-800 text-2xl font-semibold whitespace-nowrap dark:text-white">
        Телефонный справочник
      </h2>
      <br />
      <form class="max-w-md mx-auto">
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            onChange={(event) => setValue(event.target.value)}
            required
          />
        </div>
      </form>

      <div className="px-6 py-8 mx-auto lg:py-0">
        <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-300">
          <thead className="text-xs text-gray-100 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ФИО
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Почта</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Управление/Представительство
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Должность</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Телефон</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-900 dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.department}</td>
                <td className="px-6 py-4">{user.position}</td>
                <td className="px-6 py-4">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;

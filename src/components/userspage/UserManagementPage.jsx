// components/UserManagementPage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../service/UserService";

function UserManagementPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await UserService.getAllUsers(token);
      setUsers(response.ourUsersList); // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const deleteUser = async (userId) => {
    try {
      // Prompt for confirmation before deleting the user
      const confirmDelete = window.confirm(
        "Вы действительно хотите удалить этого пользователя?"
      );

      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
        // After deleting the user, fetch the updated list of users
        fetchUsers();
        return;
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div class="bg-gray-200  dark:bg-gray-800 items-center px-6 mx-auto md:bg-contain lg:py-0 ">
      <br />
      <h2 class="text-center text-2xl font-semibold whitespace-nowrap text-gray-800 dark:text-white">
        Панел администатора
      </h2>

      <div class="h-full relative overflow-x-auto shadow-md ">
        <button
          class="border
        rounded-lg border-blue-500 text-blue-500 hover:bg-blue-600
        focus:ring-blue-900 font-bold py-2 px-4 rounded-lg hover:border-white hover:text-white"
        >
          <Link to="/register">Добавить пользовател</Link>
        </button>
        <table class="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-300">
          <thead class="text-xs uppercase dark:bg-gray-700 bg-gray-500 bg-gray-200 text-gray-100">
            <tr>
              <th scope="col" class="px-6 py-3 ">
                <div class="flex items-center">ID</div>
              </th>
              <th scope="col" class="px-6 py-3 ">
                <div class="flex items-center">ФИО</div>
              </th>
              <th scope="col" class="px-6 py-3 ">
                <div class="flex items-center">Почта</div>
              </th>
              <th scope="col" class="px-6 py-3 ">
                <div class="flex items-center">
                  Управление/Представительство
                </div>
              </th>
              <th scope="col" class="px-6 py-3 ">
                <div class="flex items-center">Должность</div>
              </th>
              <th scope="col" class="px-6 py-3 ">
                <div class="flex items-center">Телефон</div>
              </th>
              <th scope="col" class="px-6 py-3 ">
                <div class="flex items-center">Роль</div>
              </th>
              <th scope="col" class="px-6 py-3 ">
                <div class="flex items-center">Действия</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                class="border-b border-gray-900 dark:bg-gray-800 dark:border-gray-700"
              >
                <td class="px-3 py-1">{user.id}</td>
                <td class="px-3 py-1">{user.name}</td>
                <td class="px-3 py-1">{user.email}</td>
                <td class="px-3 py-1">{user.department}</td>
                <td class="px-3 py-1">{user.position}</td>
                <td class="px-3 py-1">{user.phone}</td>
                <td class="px-3 py-1">{user.role}</td>
                <td>
                  <div class="rof flex">
                    <button class="w-10 h-10 justify-center inline-flex items-center border rounded-lg border-green-500 text-green-500 hover:border-white hover:text-white hover:bg-green-600 focus:ring-green-900">
                      <Link to={`/update-user/${user.id}`}>
                        <svg
                          class="w-5 h-5 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16.555 16.555"
                        >
                          <path d="M6.409,7.421c0.034,0.207,0.114,0.337,0.193,0.42C6.789,9.084,7.83,10.24,8.781,10.24 c1.11,0,2.12-1.25,2.314-2.397c0.08-0.082,0.16-0.213,0.195-0.422c0.063-0.233,0.146-0.639,0.002-0.828 c-0.007-0.01-0.017-0.019-0.022-0.028c0.133-0.489,0.303-1.501-0.303-2.19C10.912,4.306,10.572,3.9,9.846,3.686L9.5,3.566 C8.928,3.39,8.568,3.35,8.553,3.349c-0.026-0.002-0.053,0-0.078,0.006C8.454,3.361,8.387,3.379,8.334,3.372 c-0.137-0.02-0.342,0.05-0.378,0.064C7.909,3.455,6.802,3.898,6.466,4.93C6.435,5.013,6.3,5.452,6.479,6.527 c-0.027,0.018-0.05,0.041-0.071,0.067C6.264,6.783,6.345,7.188,6.409,7.421z"></path>
                          <path d="M12.33,10.637c0,0-0.045-0.015-0.114-0.037c-0.478-0.224-0.929-0.367-0.929-0.367 c-0.098-0.033-0.182-0.067-0.26-0.103c-0.322-0.159-0.592-0.34-0.648-0.51c0,0,0.188,1.81-1.395,1.851l-0.219-0.01 c-1.433-0.127-1.528-1.845-1.528-1.845c-0.15,0.471-1.952,1.019-1.952,1.019c-0.536,0.204-0.762,0.514-0.762,0.514 c-0.792,1.176-0.885,3.789-0.885,3.789c0.01,0.598,0.268,0.66,0.268,0.66c1.821,0.812,4.679,0.955,4.679,0.955 c0.154,0.004,0.298-0.004,0.441-0.013l0.003,0.015c0,0,2.858-0.145,4.679-0.957c0,0,0.258-0.063,0.269-0.658 c0,0-0.094-2.614-0.886-3.789C13.092,11.148,12.865,10.841,12.33,10.637z"></path>
                          <path d="M10.316,9.698c0.021-0.026,0.041-0.052,0.063-0.078c-0.004-0.017-0.005-0.026-0.005-0.026 C10.356,9.632,10.336,9.661,10.316,9.698z"></path>
                          <path d="M7.246,9.614L7.241,9.595L7.237,9.616c0.001-0.004,0.004-0.009,0.006-0.011 C7.243,9.605,7.244,9.607,7.246,9.614z"></path>
                          <path d="M8.732,0C4.436,0,0.94,3.496,0.94,7.792c0,0.849,0.148,1.692,0.417,2.492l-0.702-0.157 c-0.277-0.065-0.55,0.111-0.612,0.388c-0.062,0.275,0.111,0.549,0.388,0.611l2.332,0.523c0.038,0.008,0.075,0.012,0.112,0.012 c0.234,0,0.446-0.162,0.5-0.399l0.499-2.221c0.062-0.276-0.112-0.55-0.387-0.612C3.208,8.368,2.937,8.54,2.875,8.816L2.706,9.571 C2.537,8.998,2.441,8.404,2.441,7.792c0-3.47,2.823-6.292,6.292-6.292s6.292,2.823,6.292,6.292c0,1.047-0.262,2.082-0.758,2.992 l1.318,0.717c0.614-1.131,0.939-2.412,0.939-3.709C16.524,3.496,13.028,0,8.732,0z"></path>
                        </svg>
                      </Link>
                    </button>

                    <button
                      onClick={() => deleteUser(user.id)}
                      class="w-10 h-10 justify-center inline-flex items-center border rounded-lg border-red-500 text-red-500 hover:border-white hover:text-white hover:bg-red-600 focus:ring-red-900"
                    >
                      <svg
                        class="w-5 h-5 fill-current"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                    <button class="w-10 h-10 justify-center inline-flex items-center border rounded-lg border-blue-500 hover:border-white hover:text-white text-blue-500  hover:bg-blue-600 focus:ring-blue-900">
                      <Link to={`/reset-password/${user.id}`}>
                        <svg
                          class="w-5 h-5 fill-current"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 200 200"
                        >
                          <path d="M153.976,73.236h-3.308V49.115C150.669,22.033,128.634,0,101.549,0C74.465,0,52.43,22.033,52.43,49.115v24.121H49.12 c-9.649,0-17.5,7.851-17.5,17.5v94.859c0,9.649,7.851,17.5,17.5,17.5h104.856c9.649,0,17.5-7.851,17.5-17.5V90.736 C171.476,81.087,163.626,73.236,153.976,73.236z M67.43,49.115C67.43,30.304,82.736,15,101.549,15 c18.813,0,34.119,15.304,34.119,34.115v24.121H67.43V49.115z M156.476,185.596c0,1.355-1.145,2.5-2.5,2.5H49.12 c-1.355,0-2.5-1.145-2.5-2.5V90.736c0-1.355,1.145-2.5,2.5-2.5H59.93h83.238h10.808c1.355,0,2.5,1.145,2.5,2.5V185.596z"></path>{" "}
                          <path d="M101.547,116.309c-4.142,0-7.5,3.357-7.5,7.5v28.715c0,4.143,3.358,7.5,7.5,7.5c4.142,0,7.5-3.357,7.5-7.5v-28.715 C109.047,119.666,105.689,116.309,101.547,116.309z"></path>{" "}
                        </svg>
                      </Link>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagementPage;

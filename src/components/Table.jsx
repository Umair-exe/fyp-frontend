import React from "react";
import Badge from "./Badge";
import Spinner from "./Spinner";

const Table = ({ users, handleDelete }) => {
  if (users.length === 0) return <div className="mt-10"><Spinner /></div>;
  return (
    <div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg m-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Mobile Number
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Role
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={i} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  scope="row"
                  className="py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.name}
                </th>
                <td className="py-4 px-6">{user.mobileNumber}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="">{user.role && <Badge text={user.role} color={'bg-blue-500 w-20 text-center'} />}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import { User, useUser } from '../../app/contexts/user.context';
import Layout from '../../components/Layout';
import { deleteUser, getUsers } from '../../api/users';
import BackButton from '../../components/BackButton';

export const UsersPage = () => {
  const { user } = useUser();
  const [usersData, setUsersData] = useState<User[]>([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsersData(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (userId: string) => {
    navigate(`/admin/user_modify/${userId}`);
  };

const handleDelete = async (userId: string) => {
  try {
    const userToDelete = usersData.find(user => user.userId === userId);
    if (userToDelete) {
    await deleteUser(userToDelete?.id, user?.token || '');
    console.log(`User with ID: ${userId} deleted successfully.`);
    
      setUsersData(usersData.filter(user => user.id !== userId));
      await fetchUsers();
    }
  } catch (error) {
    console.error(`Error deleting user with ID: ${userId}`, error);
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <BackButton />
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-4xl bg-gradient-to-r from-red-800 to-red-500 rounded-xl shadow-2xl p-8 mb-10">
          <h1 className="text-center text-4xl font-bold text-white mb-10">
            Gestion des utilisateurs
          </h1>
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tl-xl">
                    Id
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Prénom
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tr-xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersData.sort((a, b) => parseInt(a.id) - parseInt(b.id)).map((user) => (
                  <tr key={user.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.id}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.email}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.firstName}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.lastName}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.role}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center">
                      <button
                        onClick={() => handleEdit(user.userId)}
                        className="text-indigo-600 hover:text-indigo-900 mx-2"
                      >
                        <i className="ri-pencil-line"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(user.userId)}
                        className="text-red-600 hover:text-red-900 mx-2"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

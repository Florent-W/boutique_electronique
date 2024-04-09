import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import BackButton from '../../components/BackButton';
import { User, useUser } from '../../app/contexts/user.context';
import { getUser } from '../../api/users';
import { useParams } from 'react-router-dom';

function UsersModify() {
  const { user } = useUser();
  const [userData, setUserData] = useState<User>();
  const { id = ''} = useParams();

  const fetchUser = async () => {
    try {
      console.log(id)
      const response = await getUser(id);
      setUserData(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
   /* const { name, value } = e.target;
    setUser((prevUser: any) => ({
      ...prevUser,
      [name]: value,
    })); */
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(user); 
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Layout>
    <BackButton />
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md m-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          name="name"
          id="name"
          value={user?.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="rôle" className="block text-sm font-medium text-gray-700">Rôle</label>
        <select name="role" id="role" value={user?.role} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
        Modifier
      </button>
    </form>
    </Layout>
  );
}

export default UsersModify;
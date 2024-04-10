import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import BackButton from '../../components/BackButton';
import { User, useUser } from '../../app/contexts/user.context';
import { getUser, updateUser } from '../../api/users';
import { useNavigate, useParams } from 'react-router-dom';

function UsersModify() {
  const { user } = useUser();
  const [userData, setUserData] = useState<User>();
  const { id = '' } = useParams();

  const fetchUser = async () => {
    try {
      console.log(id);
      const response = await getUser(id);
      setUserData(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => {
      if (prevUserData) {
        console.log(prevUserData)
        return {
          ...prevUserData,
          [name]: value,
        } as User;
      }
      return prevUserData;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData)
    console.log(id)
    if (!userData || !id) {
      console.log("Aucun utilisateur à mettre à jour ou ID manquant");
      return;
    }
  
    try {
      await updateUser(userData?.id, userData, user?.token || '');
      console.log("L'utilisateur a été mis à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]); // Ajout de `id` comme dépendance pour recharger l'utilisateur si l'ID change

  return (
    <Layout>
      <BackButton />
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md m-auto">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={userData?.firstName || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            name="lastName" // Correction ici
            id="lastName"
            value={userData?.lastName || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email" // Changement du type en `email` pour validation automatique des e-mails
            name="email"
            id="email"
            value={userData?.email || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rôle</label>
          <select
            name="role"
            id="role"
            value={userData?.role || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={!userData}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Modifier
        </button>
      </form>
    </Layout>
  );
}

export default UsersModify;

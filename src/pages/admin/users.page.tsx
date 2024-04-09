import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import 'remixicon/fonts/remixicon.css';
import { User, useUser } from '../../app/contexts/user.context';
import Layout from '../../components/Layout';
import { getUsers } from '../../api/users';
import BackButton from '../../components/BackButton';

export const UsersPage = () => {
  const { user } = useUser();
  const [usersData, setUsersData] = useState<User[]>([]);
// console.log(user);
const fetchUsers = async () => {
  try {
    const response = await getUsers();
    setUsersData(response);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

  const navigate = useNavigate();

  const handleEdit = (userId: string) => {
    navigate(`/admin/users_modify/${userId}`); 
  };

  const handleDelete = (userId: string) => {
    console.log(`Delete user with ID: ${userId}`);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Layout>
      <BackButton />
    <div className="mx-auto max-w-2xl">
        <Card>
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Gestion des utilisateurs</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Id</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Rôle</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-indigo-600 hover:text-indigo-900 px-4 py-2 rounded"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-900 px-4 py-2 rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Card>
    </div>
    </Layout>
  );
};

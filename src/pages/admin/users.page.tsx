import React from 'react';
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

const usersData = [
  {
    id: 1,
    name: "John Doe",
    region: "The Wildlands",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    region: "Northern Isles",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Will Turner",
    region: "Eastern Kingdoms",
    status: "Active",
  },
];

export const UsersPage = () => {
  const navigate = useNavigate();

  const handleEdit = (userId: number) => {
    navigate(`/edit-user/${userId}`); 
  };

  const handleDelete = (userId: number) => {
    console.log(`Delete user with ID: ${userId}`);
  };

  return (
    <div className="mx-auto max-w-2xl">
        <Card>
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Gestion des utilisateurs</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Region</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.region}</TableCell>
              <TableCell>{user.status}</TableCell>
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
  );
};

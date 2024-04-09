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

const commandsData = [
  {
    id: 1,
    name: "John Doe",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Will Turner",
    status: "Active",
  },
];

export const CommandsPage = () => {
  const navigate = useNavigate();

  const handleEdit = (commandId: number) => {
    navigate(`/edit-commands/${commandId}`); 
  };

  const handleDelete = (commandId: number) => {
    console.log(`Delete user with ID: ${commandId}`);
  };

  return (
    <div className="mx-auto max-w-2xl">
        <Card>
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Gestion des commandes</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commandsData.map((commands) => (
            <TableRow key={commands.id}>
              <TableCell>{commands.name}</TableCell>
              <TableCell>{commands.status}</TableCell>
              <TableCell>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(commands.id)}
                    className="text-indigo-600 hover:text-indigo-900 px-4 py-2 rounded"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(commands.id)}
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

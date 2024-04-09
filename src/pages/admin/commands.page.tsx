import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, useOrder } from '../../app/contexts/order.context';
import { getOrders } from '../../api/order';
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
import Layout from '../../components/Layout';
import BackButton from '../../components/BackButton';

export const CommandsPage = () => {
  const navigate = useNavigate();
  const { order } = useOrder();
  const [ordersData, setOrdersData] = useState<Order[]>([]);
const fetchOrders = async () => {
  try {
    const response = await getOrders();
    setOrdersData(response);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

  const handleEdit = (commandId: string) => {
    navigate(`/edit-commands/${commandId}`); 
  };

  const handleDelete = (commandId: string) => {
    console.log(`Delete user with ID: ${commandId}`);
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <Layout>
    <BackButton />
    <div className="mx-auto max-w-2xl">
        <Card>
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Gestion des commandes</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Id</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Quantité</TableHeaderCell>
            <TableHeaderCell>Statut</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordersData.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.totalAmount}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(order.id)}
                    className="text-indigo-600 hover:text-indigo-900 px-4 py-2 rounded"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Order, useOrder } from "../../app/contexts/order.context";
import { deleteOrder, getOrders } from "../../api/order";
import Layout from "../../components/Layout";
import BackButton from "../../components/BackButton";
import moment from "moment-timezone";
import "moment/locale/fr";

export const CommandsPage = () => {
  const navigate = useNavigate();
  const { order } = useOrder();
  const [ordersData, setOrdersData] = useState<Order[]>([]);

  moment.locale("fr");

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
    navigate(`/admin/command_modify/${commandId}`);
  };

  const handleDelete = async (commandId: string) => {
    try {
      const orderToDelete = ordersData.find(order => order.id === commandId);
      if (orderToDelete) {
      await deleteOrder(orderToDelete?.id);
      console.log(`Delete command with ID: ${commandId}`);
      
       // setUsersData(usersData.filter(user => user.id !== userId));
        await fetchOrders();
      }
    } catch (error) {
      console.error(`Error deleting user with ID: ${commandId}`, error);
    }
  };

  const formatDate = (dateString: moment.MomentInput) => {
    return moment(dateString).tz("UTC").format("D MMMM YYYY à HH:mm:ss");
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Layout>
      <BackButton />
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-4xl bg-gradient-to-r from-red-800 to-red-500 rounded-xl shadow-2xl p-8 mb-10">
          <h1 className="text-center text-4xl font-bold text-white mb-10">
            Gestion des commandes
          </h1>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tl-xl">
                      Id
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Quantité
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider rounded-tr-xl">
                    Actions
                  </th>
                  </tr>
                </thead>
                <tbody>
                  {ordersData.map((order) => (
                    <tr key={order.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {order.id}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {formatDate(order.date)}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {order.totalAmount}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {order.status}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() => handleEdit(order.id)}
                          className="text-indigo-600 hover:text-indigo-900 mx-2"
                        >
                          <i className="ri-pencil-line"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(order.id)}
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
      </div>
    </Layout>
  );
};

export default CommandsPage;

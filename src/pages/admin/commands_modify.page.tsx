import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import BackButton from '../../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import { Order, useOrder } from '../../app/contexts/order.context';
import { getOrder, updateOrder } from '../../api/order';
import moment from 'moment';

function CommandModify() {
  const { order } = useOrder();
  const [orderData, setOrderData] = useState<Order>();
  const { id = '' } = useParams();

  const fetchOrders = async () => {
    try {
      const response = await getOrder(id);
      setOrderData(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderData((prevOrderData) => {
      if (prevOrderData) {
        console.log(prevOrderData)
        return {
          ...prevOrderData,
          [name]: value,
        } as Order;
      }
      return prevOrderData;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!orderData || !id) {
      console.log("Aucune commande à mettre à jour ou ID manquant");
      return;
    }
  
    // Préparation de l'objet de commande avec la date au format DateTime
    const updatedOrderData = {
      ...orderData,
      // Convertir la date au format ISO 8601 DateTime complet
      // Vous pouvez ajuster le format selon les besoins de votre backend
      date: moment(orderData.date).toISOString(),
    };
  
    try {
      await updateOrder(id, updatedOrderData);
      console.log("La commande a été mise à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la commande", error);
    }
  };  

  const formattedDate = moment(orderData?.date).format('YYYY-MM-DD');

  useEffect(() => {
    fetchOrders();
  }, [id]);

  return (
    <Layout>
      <BackButton />
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md m-auto">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={formattedDate || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            id="status"
            value={orderData?.status || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          >
            <option value="pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={!orderData}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Modifier
        </button>
      </form>
    </Layout>
  );
}

export default CommandModify;

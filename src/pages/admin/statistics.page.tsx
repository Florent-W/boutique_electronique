import React, { useEffect, useState } from 'react';
import { AreaChart } from '@tremor/react';
import Layout from '../../components/Layout';
import BackButton from '../../components/BackButton';
import { getOrders } from '../../api/order';
import { Order } from '../../app/contexts/order.context';

// Formatteur de données pour les valeurs du graphique
const dataFormatter = (number: number | bigint) => `${Intl.NumberFormat('fr').format(number)}`;

export function StatisticsPage() {
  const [ordersData, setOrdersData] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrdersData(response);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const prepareChartData = (orders: Order[]) => {
    const salesData: Record<string, number> = {};
  
    orders.forEach(order => {
      const date = new Date(order.date);
      // Utilisez le format ISO 8601 pour le mois et l'année (YYYY-MM), ce qui facilite le tri.
      const monthYearISO = date.toISOString().slice(0, 7);
  
      const amount = typeof order.totalAmount === 'number' ? order.totalAmount : 0;
      salesData[monthYearISO] = (salesData[monthYearISO] || 0) + amount;
    });
  
    // Convertit et trie les données. La conversion en date est maintenant uniforme et interprétable.
    return Object.entries(salesData).sort((a, b) => a[0].localeCompare(b[0])).map(([monthYearISO, totalAmount]) => {
      const date = new Date(monthYearISO);
      // Reconvertit le format ISO en format lisible "mois année" pour l'affichage
      const monthYear = date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
      return {
        date: monthYear,
        Ventes: totalAmount,
      };
    });
  };  

  const dynamicChartData = prepareChartData(ordersData);

  return (
    <Layout>
      <BackButton />
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-4xl bg-gradient-to-r from-red-800 to-red-500 rounded-xl shadow-2xl p-8 mb-10">
          <h1 className="text-center text-4xl font-bold text-white mb-10">Statistiques des ventes</h1>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <AreaChart
              className="h-80"
              data={dynamicChartData}
              index="date"
              categories={['Ventes']}
              colors={['indigo']}
              valueFormatter={dataFormatter}
              yAxisWidth={60}
              onValueChange={(v) => console.log(v)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default StatisticsPage;
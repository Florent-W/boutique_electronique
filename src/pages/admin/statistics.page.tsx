import React from 'react';
import { AreaChart } from '@tremor/react';
import Layout from '../../components/Layout';
import BackButton from '../../components/BackButton';

const chartdata = [
  { date: 'Jan 22', Ventes: 12000 },
  { date: 'Feb 22', Ventes: 15000 },
  { date: 'Mar 22', Ventes: 18000 },
  { date: 'Apr 22', Ventes: 16000 },
  { date: 'May 22', Ventes: 19000 },
  { date: 'Jun 22', Ventes: 17000 },
  { date: 'Jul 22', Ventes: 21000 },
  { date: 'Aug 22', Ventes: 15000 },
  { date: 'Sep 22', Ventes: 22000 },
  { date: 'Oct 22', Ventes: 20000 },
  { date: 'Nov 22', Ventes: 23000 },
  { date: 'Dec 22', Ventes: 24000 },
];

// Formatteur de données pour les valeurs du graphique
const dataFormatter = (number: number | bigint) => `€${Intl.NumberFormat('fr').format(number)}`;

export function StatisticsPage() {
  return (
    <Layout>
      <BackButton />
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-4xl bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-2xl p-8 mb-10">
          <h1 className="text-center text-4xl font-bold text-white mb-10">Statistiques des ventes</h1>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <AreaChart
              className="h-80"
              data={chartdata}
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

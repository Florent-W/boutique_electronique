import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

const cardData = [
  {
    title: "Gestion des utilisateurs",
    action: "Créer, modifier, supprimer des utilisateurs",
    icon: "ri-user-settings-line", 
    link: "/admin/users"
  },
  {
    title: "Liste des commandes en cours",
    action: "Accès à la liste des commandes",
    icon: "ri-file-list-line",
    link: "/admin/commands"
  },
  {
    title: "Page de statistiques",
    action: "Accéder aux statistiques des ventes",
    icon: "ri-bar-chart-line",
    link: "/admin/statistics"
  },
];

export function AdminPage() {
    return (
      <Layout>
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-4xl bg-gradient-to-r from-red-800 to-red-500 rounded-xl shadow-2xl p-8 mb-10">
            <h1 className="text-center text-4xl font-bold text-white mb-10">Page d'Administration</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cardData.map((data, index) => (
                <Link
                  key={index}
                  to={data.link}
                  className="transform hover:scale-105 transition duration-500 ease-in-out bg-white rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4 p-6 text-black font-bold text-lg hover:shadow-2xl"
                >
                  <div className="text-4xl text-red-700">
                    <i className={data.icon}></i>
                  </div>
                  <div className="text-center">
                    <p>{data.title}</p>
                    <p className="text-sm text-gray-600">{data.action}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
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
      <div className="flex flex-wrap justify-around items-start mt-10">
        {cardData.map((data, index) => (
          <Link
            key={index}
            to={data.link}
            className="w-full sm:w-5/12 md:w-1/3 lg:w-1/4 xl:w-1/5 p-6 mx-1 my-2 bg-white hover:bg-gray-100 text-black font-bold text-lg rounded-lg shadow-lg flex flex-col items-center justify-center space-y-4"
          >
            <div className="text-3xl">
              <i className={data.icon}></i>
            </div>
            <div>
              <p>{data.title}</p>
              <p className="text-sm">{data.action}</p>
            </div>
          </Link>
        ))}
      </div>
      </Layout>
    );
  }
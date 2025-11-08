import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Sitemap() {
  const routes = [
    { path: '/', name: 'Accueil', description: 'Page d\'accueil avec sélection aléatoire' },
    { path: '/homepage1', name: 'Homepage 1', description: 'Première variante de la page d\'accueil' },
    { path: '/homepage2', name: 'Homepage 2', description: 'Deuxième variante de la page d\'accueil' },
    { path: '/homepage3', name: 'Homepage 3', description: 'Troisième variante de la page d\'accueil' },
    { path: '/homepage4', name: 'Homepage 4', description: 'Quatrième variante de la page d\'accueil' },
    { path: '/homepage5', name: 'Homepage 5', description: 'Cinquième variante de la page d\'accueil' },
    { path: '/bg-video', name: 'Background Video', description: 'Page avec vidéo en arrière-plan' },
    { path: '/hotels', name: 'Liste des Hôtels', description: 'Page de recherche et liste des hôtels' },
    { path: '/details', name: 'Détails Hôtel', description: 'Page de détails d\'un hôtel' },
    { path: '/profile', name: 'Profil', description: 'Page de profil utilisateur' },
    { path: '/voiceai', name: 'Assistant Vocal IA', description: 'Visualiseur vocal avec IA' },
    { path: '/bg', name: 'Background', description: 'Page de test pour les arrière-plans' },
    { path: '/images', name: 'Galerie d\'Images', description: 'Affichage d\'images' },
    { path: '/img-details', name: 'Détails Images', description: 'Détails des images' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar logoColor="normal" background="white" iconVariant="transparent" />
      
      <div className="pt-[10%] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-4 font-outfit">
              Plan du Site
            </h1>
            <p className="text-lg text-slate-600 font-outfit">
              Explorez toutes les pages disponibles sur NexaStay
            </p>
          </div>

          {/* Routes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route, index) => (
              <Link
                key={index}
                to={route.path}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200 hover:border-sky-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-slate-800 font-outfit group-hover:text-sky-600 transition-colors">
                    {route.name}
                  </h3>
                  <svg
                    className="w-5 h-5 text-slate-400 group-hover:text-sky-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <p className="text-sm text-slate-600 font-outfit mb-2">
                  {route.description}
                </p>
                <p className="text-xs text-slate-400 font-outfit">
                  {route.path}
                </p>
              </Link>
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 font-outfit">
              Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sitemap;


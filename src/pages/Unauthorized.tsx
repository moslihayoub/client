import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Unauthorized: React.FC = () => {
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl rounded-3xl bg-white border border-slate-100 shadow-2xl shadow-slate-200/60 p-8 sm:p-10 text-center"
      >
        <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-teal-400 via-sky-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-sky-500/30">
          !
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Accès restreint</h1>
        <p className="text-slate-600 mb-6">
          Vous devez être connecté pour accéder à cette ressource.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/login"
            state={{ from }}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:brightness-110 transition"
          >
            Se connecter
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-slate-800 font-semibold bg-white hover:border-sky-400 transition"
          >
            Créer un compte
          </Link>
        </div>
        <div className="mt-6 text-sm text-slate-500">
          <Link to="/" className="text-cyan-600 hover:text-cyan-700">Retour à l’accueil</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;



import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-800 via-blue-900 to-slate-900 p-2 sm:p-4 lg:p-6 font-sans text-white">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl text-center">
        
        <div className="mb-6 sm:mb-8">
          <div className="mx-auto h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 relative">
            <svg className="h-full w-full text-white" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="45" fill="currentColor" stroke="#374151" strokeWidth="2" />
              <path d="M50 5 L65 25 L85 15 L75 35 L95 50 L75 65 L85 85 L65 75 L50 95 L35 75 L15 85 L25 65 L5 50 L25 35 L15 15 L35 25 Z" 
                    fill="none" stroke="#374151" strokeWidth="2" />
              <polygon points="35,25 50,5 65,25 50,40" fill="#374151" />
              <polygon points="25,35 5,50 25,65 40,50" fill="#374151" />
              <polygon points="75,35 95,50 75,65 60,50" fill="#374151" />
              <polygon points="35,75 50,95 65,75 50,60" fill="#374151" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">404</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
          Fora de Jogo!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-200 mb-3 sm:mb-4">
          Página Não Encontrada
        </p>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed px-2 sm:px-4">
          Oops! Parece que o árbitro apitou e esta página está fora de jogo.<br/>
          Que tal voltar ao campo principal?
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg sm:rounded-xl
                     focus:outline-none focus:ring-4 focus:ring-blue-500/50
                     transition-all duration-300 transform hover:scale-[1.05] text-sm sm:text-base md:text-lg shadow-lg"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;


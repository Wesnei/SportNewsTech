import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full shadow-md bg-white overflow-x-hidden">
      <div className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-12 sm:h-14 md:h-16 px-3 sm:px-4 md:px-6 lg:px-8 overflow-x-hidden">
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="menu-dropdown"
              className="flex items-center space-x-2 text-sm sm:text-base md:text-lg font-semibold hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white transition cursor-pointer px-2 sm:px-3"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
              <span className="hidden sm:inline text-sm sm:text-base md:text-lg font-semibold">Menu</span>
            </button>
          </div>

          <div className="flex justify-end flex-1 max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[190px] ml-4 sm:ml-6 md:ml-8">
            <label htmlFor="search" className="sr-only">
              Pesquisar
            </label>
            <div className="relative w-full">
              <input
                id="search"
                type="text"
                placeholder="Pesquisar"
                className="w-full pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 rounded-lg text-sm
                  bg-white placeholder-gray-400 text-gray-900 border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
              />
              <svg
                className="w-4 h-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div
        id="menu-dropdown"
        className={`bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-40 opacity-100 mt-0" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 py-3 sm:py-4 min-w-max">
            {["Natação", "Futebol", "Vôlei", "Basquete", "Tênis", "Corrida"].map(
              (item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 px-3 sm:px-4 md:px-5 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer whitespace-nowrap flex-shrink-0 border-b-2 border-transparent hover:border-blue-500"
                >
                  {item}
                </Link>
              )
            )}
        </div>
      </div>
    </div>
    </header>
  );
};

export default Header;

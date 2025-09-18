import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    clearHighlights();
    
    if (term.trim() && term.length >= 2) {
      highlightSearchTerm(term);
    }
  };
  
  const clearHighlights = () => {
    const existingHighlights = document.querySelectorAll('.search-highlight');
    existingHighlights.forEach(highlight => {
      const parent = highlight.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(highlight.textContent || ''), highlight);
        parent.normalize();
      }
    });
  };
  
  const highlightSearchTerm = (term: string) => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent || 
              parent.closest('input') || 
              parent.closest('textarea') || 
              parent.closest('script') || 
              parent.closest('style') ||
              parent.classList.contains('search-highlight')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );
    
    const textNodes: Text[] = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node as Text);
    }
    
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    
    textNodes.forEach(textNode => {
      const text = textNode.textContent || '';
      if (regex.test(text)) {
        const parent = textNode.parentElement;
        if (parent) {
          const highlightedHTML = text.replace(regex, '<span class="search-highlight bg-yellow-300 px-1 rounded font-semibold">$1</span>');
          const wrapper = document.createElement('div');
          wrapper.innerHTML = highlightedHTML;
          
          while (wrapper.firstChild) {
            parent.insertBefore(wrapper.firstChild, textNode);
          }
          parent.removeChild(textNode);
        }
      }
    });
  };

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

          <div className="flex items-center justify-end flex-1 gap-3 ml-4 sm:ml-6 md:ml-8">
            <div className="flex justify-end max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[190px]">
              <label htmlFor="search" className="sr-only">
                Pesquisar
              </label>
              <div className="relative w-full">
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Pesquisar na página"
                  className="w-full pl-8 sm:pl-9 pr-8 py-1.5 sm:py-2 rounded-lg text-sm
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
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      clearHighlights();
                    }}
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Limpar busca"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
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
          <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 py-3 sm:py-4 min-w-max">
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
            
            <Link
              to="/login"
              className="group relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 border border-blue-400 hover:border-blue-500 flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Entrar
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/register"
              className="group relative bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 border border-emerald-400 hover:border-emerald-500 flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="w-4 h-4 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Cadastrar
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
            </Link>
        </div>
      </div>
    </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { IconProps } from '../../types';
import { useAuth } from '../../context/AuthContext';

const Icon: React.FC<IconProps> = ({ children, className = "h-5 w-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    {children}
  </svg>
);

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      name: 'Novo Artigo',
      href: '/journalist',
      icon: (
        <Icon className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </Icon>
      )
    },
    {
      name: 'Meus Artigos',
      href: '/journalist/articles',
      icon: (
        <Icon className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </Icon>
      )
    }
  ];

  const isActive = (href: string) => {
    if (href === '/journalist') {
      return location.pathname === '/journalist';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0771BA] shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0 lg:z-0 lg:h-screen
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <div>
              <h1 className="text-xl font-bold text-white">SportNewsTech</h1>
              <p className="text-sm text-blue-100">Área do Jornalista</p>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-600"
            >
              <Icon className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </Icon>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                  ${isActive(item.href)
                    ? 'bg-white text-[#0771BA] shadow-sm'
                    : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                  }
                `}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Icon className="h-5 w-5 text-[#0771BA]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </Icon>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.username || user?.name || 'Usuário'}</p>
                <p className="text-xs text-blue-100 truncate">{user?.email || 'email@exemplo.com'}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="mt-3 flex items-center px-3 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors w-full cursor-pointer font-semibold"
            >
              <Icon className="h-4 w-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H3" />
              </Icon>
              Sair
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

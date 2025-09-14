import React, { useState, useCallback } from 'react';
import type { IconProps } from '../../../types';
import Sidebar from '../../../components/sidebar';

const Icon: React.FC<IconProps> = ({ children, className = "h-5 w-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    {children}
  </svg>
);

interface Article {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  category: string;
  publishedAt: string;
  status: 'published' | 'draft';
  views: number;
  likes: number;
}

const MyArticlesPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - em produção viria da API
  const [articles] = useState<Article[]>([
    {
      id: '1',
      title: 'Guto Miguel avança às semifinais do US Open juvenil',
      subtitle: 'Tenista goiano garante melhor desempenho da carreira no Grand Slam americano; próximo confronto será nesta sexta-feira',
      coverImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop',
      category: 'Tênis',
      publishedAt: 'Há 20 horas',
      status: 'published',
      views: 1250,
      likes: 89
    },
    {
      id: '2',
      title: 'N° 5 do mundo fica surpresa após interação bizarra com fã no US Open',
      subtitle: 'Mirra Andreeva, de 18 anos, foi abordada por um homem quando estava sentada no banco ao lado da parceira Diana Shnaider durante intervalo da partida',
      coverImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop',
      category: 'Tênis',
      publishedAt: 'Ontem',
      status: 'published',
      views: 2100,
      likes: 156
    },
    {
      id: '3',
      title: 'Alcaraz precisa de feito inédito contra Djokovic para chegar à final',
      subtitle: 'Espanhol vai disputar semifinal contra o sérvio, que soma exatamente 100 títulos em sua trajetória',
      coverImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop',
      category: 'Tênis',
      publishedAt: 'Ontem',
      status: 'published',
      views: 3200,
      likes: 234
    },
    {
      id: '4',
      title: 'Santos recebe torneio de tênis nesta semana',
      subtitle: '1ª edição da Business Cup é disputada na sede da Santos Tennis Academy.',
      coverImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop',
      category: 'Tênis',
      publishedAt: 'Há 4 horas',
      status: 'published',
      views: 890,
      likes: 67
    }
  ]);

  const categories = ['all', 'Futebol', 'Basquete', 'Tênis', 'Natação', 'Atletismo', 'Outros'];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = filterCategory === 'all' || article.category === filterCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEdit = useCallback((articleId: string) => {
    console.log('Editar artigo:', articleId);
    // Implementar navegação para edição
  }, []);

  const handleDelete = useCallback((articleId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este artigo?')) {
      console.log('Excluir artigo:', articleId);
      // Implementar exclusão
    }
  }, []);

  const handleView = useCallback((articleId: string) => {
    console.log('Visualizar artigo:', articleId);
    // Implementar visualização
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden lg:block lg:w-64 lg:fixed lg:inset-y-0 lg:z-50">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Top Navigation */}
        <header className="bg-[#0771BA] shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-600"
                >
                  <Icon className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </Icon>
                </button>
                <h1 className="ml-2 lg:ml-0 text-xl font-semibold text-white">Meus Artigos</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-blue-100 hover:text-white hover:bg-blue-600 rounded-md transition-colors">
                  <Icon className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </Icon>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-6xl mx-auto">
              {/* Filters */}
              <div className="bg-white rounded-lg p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <Icon className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </Icon>
                      </span>
                      <input
                        type="text"
                        placeholder="Buscar artigos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0771BA] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="sm:w-48">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0771BA] focus:border-transparent"
                    >
                      <option value="all">Todas as categorias</option>
                      {categories.slice(1).map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Articles Grid */}
              <div className="space-y-6">
                {filteredArticles.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon className="mx-auto h-12 w-12 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </Icon>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum artigo encontrado</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm || filterCategory !== 'all' 
                        ? 'Tente ajustar os filtros de busca.' 
                        : 'Comece criando seu primeiro artigo.'
                      }
                    </p>
                  </div>
                ) : (
                  filteredArticles.map((article) => (
                    <div key={article.id} className="bg-white rounded-lg overflow-hidden">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Article Image */}
                        <div className="sm:w-80 h-48 sm:h-48">
                          <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Article Content */}
                        <div className="flex-1 p-6">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {article.category}
                            </span>
                            <span className="text-sm text-gray-500">{article.publishedAt}</span>
                          </div>

                          <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                            {article.title}
                          </h2>
                          
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {article.subtitle}
                          </p>

                          {/* Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleView(article.id)}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0771BA] focus:ring-offset-2"
                              >
                                <Icon className="h-4 w-4 mr-1">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </Icon>
                                Visualizar
                              </button>
                              
                              <button
                                onClick={() => handleEdit(article.id)}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0771BA] focus:ring-offset-2"
                              >
                                <Icon className="h-4 w-4 mr-1">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </Icon>
                                Editar
                              </button>
                            </div>

                            <button
                              onClick={() => handleDelete(article.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              <Icon className="h-4 w-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </Icon>
                              Excluir
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyArticlesPage;

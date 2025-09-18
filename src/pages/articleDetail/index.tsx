import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Article, IconProps } from '../../types';
import { getArticleBySlug } from '../../services/articleService';
import Sidebar from '../../components/sidebar';

const Icon: React.FC<IconProps> = ({ children, className = "h-5 w-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    {children}
  </svg>
);

const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchArticle = useCallback(async () => {
    if (!slug) {
      setError('Slug do artigo não fornecido.');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const fetchedArticle = await getArticleBySlug(slug);
      setArticle(fetchedArticle);
    } catch (err: any) {
      console.error('Erro ao buscar artigo:', err);
      if (err.response && err.response.status === 404) {
        setError('Artigo não encontrado.');
      } else {
        setError('Erro ao carregar o artigo. Tente novamente mais tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);


  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-600">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
          <span>Carregando artigo...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Erro</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-[#0771BA] text-white rounded-lg hover:bg-[#0663A3] transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Artigo não disponível</h2>
          <p className="text-gray-700 mb-6">O artigo que você tentou acessar não foi encontrado.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-[#0771BA] text-white rounded-lg hover:bg-[#0663A3] transition-colors"
          >
            Ir para a Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden lg:block lg:w-64 lg:fixed lg:inset-y-0 lg:z-50">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>
      
      <div className="lg:hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      
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
                <h1 className="ml-2 lg:ml-0 text-xl font-semibold text-white">{article.title}</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {article.coverImage && (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-80 object-cover rounded-lg mb-6"
                />
              )}

              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{article.title}</h1>
              {article.subtitle && (
                <h2 className="text-xl text-gray-700 mb-6 font-medium leading-relaxed">{article.subtitle}</h2>
              )}

              <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                {article.author && (
                  <span>Por <span className="font-medium text-gray-700">@{article.author.username}</span></span>
                )}
                {article.category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {article.category.name}
                  </span>
                )}
              </div>

              <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                <p>{article.content}</p>
              </div>

              {article.tags && article.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0771BA] focus:ring-offset-2"
                >
                  <Icon className="h-5 w-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </Icon>
                  Voltar para Meus Artigos
                </button>
              </div>
            </article>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ArticleDetailPage;

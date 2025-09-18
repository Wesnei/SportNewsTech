import React, { useEffect, useState } from 'react';
import { getArticles } from '../../services/articleService';
import type { Article } from '../../types';

const FormIndicator = ({ result }: { result: 'W' | 'L' | 'D' }) => {
  const colorClass = {
    W: 'bg-green-500', 
    L: 'bg-red-500',   
    D: 'bg-gray-400',  
  }[result];

  return <div className={`w-2.5 h-2.5 rounded-full ${colorClass}`}></div>;
};

const standingsData = [
    { position: 1, teamCode: 'ARG', countryCode: 'ar', points: 38, gamesPlayed: 18, wins: 12, form: ['W', 'W', 'L', 'W', 'W'] as const },
    { position: 2, teamCode: 'EQU', countryCode: 'ec', points: 29, gamesPlayed: 18, wins: 8, form: ['D', 'D', 'W', 'W', 'L'] as const },
    { position: 3, teamCode: 'COL', countryCode: 'co', points: 28, gamesPlayed: 18, wins: 7, form: ['W', 'D', 'L', 'W', 'D'] as const },
    { position: 4, teamCode: 'URU', countryCode: 'uy', points: 28, gamesPlayed: 18, wins: 8, form: ['L', 'W', 'W', 'D', 'W'] as const },
    { position: 5, teamCode: 'BRA', countryCode: 'br', points: 28, gamesPlayed: 18, wins: 8, form: ['W', 'D', 'W', 'W', 'L'] as const },
    { position: 6, teamCode: 'PAR', countryCode: 'py', points: 28, gamesPlayed: 18, wins: 7, form: ['D', 'W', 'L', 'D', 'W'] as const },
    { position: 7, teamCode: 'BOL', countryCode: 'bo', points: 20, gamesPlayed: 18, wins: 6, form: ['L', 'L', 'W', 'L', 'W'] as const },
    { position: 8, teamCode: 'VEN', countryCode: 've', points: 18, gamesPlayed: 18, wins: 5, form: ['W', 'L', 'D', 'L', 'L'] as const },
    { position: 9, teamCode: 'PER', countryCode: 'pe', points: 12, gamesPlayed: 18, wins: 2, form: ['D', 'L', 'L', 'D', 'L'] as const },
    { position: 10, teamCode: 'CHI', countryCode: 'cl', points: 11, gamesPlayed: 18, wins: 2, form: ['L', 'W', 'L', 'L', 'D'] as const },
];


const ArticleCard = ({ article }: { article: Article }) => {
  const displayCategory = article.category?.name || 'Geral';
  const displayDescription = article.subtitle || (article.content.length > 150 ? article.content.substring(0, 150) + '...' : article.content);
  const displayTimestamp = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('pt-BR') : new Date(article.createdAt).toLocaleDateString('pt-BR');

  return (
    <a href={`/article/${article.slug}`} className="block group">
        <article className="bg-white border-t first:border-t-0 py-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-shrink-0 w-full sm:w-48 h-40 sm:h-28 overflow-hidden">
                    <img src={article.coverImage || 'https://via.placeholder.com/192x112?text=Sem+Imagem'} alt={article.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex flex-col">
                    <p className="text-sm font-semibold text-green-700">{displayCategory}</p>
                    <h2 className="mt-1 text-xl font-bold leading-tight text-gray-900 group-hover:text-blue-700 transition-colors">
                        {article.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">{displayDescription}</p>
                    <p className="mt-auto pt-2 text-xs text-gray-500">{displayTimestamp}</p>
                </div>
            </div>
        </article>
    </a>
  );
};

const StandingsSidebar = () => {
  const getPositionClass = (pos: number): string => {
    if (pos <= 6) return 'bg-green-500 text-white'; 
    if (pos === 7) return 'bg-sky-500 text-white'; 
    return 'bg-gray-200 text-gray-800'; 
  };

  return (
    <aside className="bg-white border">
      <div className="p-3 border-b bg-green-600">
        <h3 className="text-sm font-bold text-white">ELIMINATÓRIAS DA COPA</h3>
        <p className="text-xs text-green-100">América do Sul</p>
      </div>
      
      <div className="flex justify-between px-3 py-2 text-xs font-bold text-gray-500 bg-gray-50 border-b">
        <div className="flex-grow">CLASSIFICAÇÃO</div>
        <div className="flex w-28 justify-between">
            <span title="Pontos">P</span>
            <span title="Jogos">J</span>
            <span title="Vitórias">V</span>
            <span className='hidden sm:block' title="Últimos Jogos">U</span>
        </div>
      </div>
      <div>
        {standingsData.map(({ position, teamCode, countryCode, points, gamesPlayed, wins, form }) => (
          <div key={teamCode} className="flex items-center justify-between px-3 py-2.5 text-sm border-b last:border-b-0 hover:bg-gray-50">
            <div className="flex items-center gap-3 flex-grow">
              <span className={`w-6 h-6 text-xs font-bold rounded-full flex items-center justify-center ${getPositionClass(position)}`}>
                {position}
              </span>
              <img 
                src={`https://flagcdn.com/w40/${countryCode}.png`}
                alt={`Bandeira do ${teamCode}`} 
                className="w-7 h-auto rounded-sm shadow-sm"
              />
              <span className="font-bold text-gray-800">{teamCode}</span>
            </div>
            <div className="flex w-28 justify-between items-center text-xs">
                <span className="font-bold text-base text-gray-800">{points}</span>
                <span>{gamesPlayed}</span>
                <span>{wins}</span>
                <div className="hidden sm:flex gap-0.5">
                    {form.map((result, index) => (
                    <FormIndicator key={index} result={result} />
                    ))}
                </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t bg-gray-50">
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-semibold">
          Ver tabela completa
        </a>
      </div>
    </aside>
  );
};

const NewsPageReplication: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await getArticles();
        setArticles(response.articles);
      } catch (err) {
        console.error("Erro ao buscar artigos:", err);
        setError("Não foi possível carregar os artigos.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="flex items-center space-x-2 text-gray-600">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
          <span>Carregando artigos...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <main className="max-w-screen-xl p-4 mx-auto lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">          
          <section className="bg-white px-4">
            {articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <p className="text-center py-8 text-gray-500">Nenhum artigo encontrado.</p>
            )}
          </section>
          <section>
            <StandingsSidebar />
          </section>
        </div>
      </main>
    </div>
  );
};

export default NewsPageReplication;
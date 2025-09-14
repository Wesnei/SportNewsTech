import React from 'react';

const FormIndicator = ({ result }: { result: 'W' | 'L' | 'D' }) => {
  const colorClass = {
    W: 'bg-green-500', 
    L: 'bg-red-500',   
    D: 'bg-gray-400',  
  }[result];

  return <div className={`w-2.5 h-2.5 rounded-full ${colorClass}`}></div>;
};

const newsData = [
  {
    id: 'news-1',
    category: 'Futebol',
    title: 'Máfia do Apito ajudou a criar a lei sobre fraudes esportivas, mas causou frustração a investigadores',
    description: 'Série sobre o submundo do apito que abalou o esporte em 2005 estreia no sportv nesta sexta-feira e ficará disponível também no globoplay.',
    timestamp: 'há 56 minutos — Em Futebol',
    imageUrl: 'https://s2-ge.glbimg.com/Sf55vorsl_m-SuyYLea363BomLE=/1080x608/top/smart/https://i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2025/o/U/xpJSiFT8akTfyplvIW0A/claudinei-oliveira.jpg',
    isVideo: false,
  },
  {
    id: 'news-2',
    category: 'Futebol',
    title: 'STJD libera três jogadores eliminados por manipulação a voltar ao futebol',
    description: 'Após dois anos, Igor Cariús, Gabriel Tota e Romário, réus da Operação Penalidade Máxima, estão reabilitados e podem voltar ao futebol.',
    timestamp: 'há 14 minutos — Em Futebol',
    imageUrl: 'https://www.estadao.com.br/resizer/v2/E7AIQUS6NZGJVIQ5DX3ULU7P7Q.jpeg?quality=80&auth=51b1fbd86f9b416ee22a35e6714d545193b50891adb4485439a68ba77df9b488&width=1200&height=675&smart=true',
    isVideo: false,
  },
  {
    id: 'news-3',
    category: 'Seleção brasileira',
    title: 'Análise: Ancelotti ganha opções e mostra como quer que a Seleção atue',
    description: '• Análise: Brasil reencontra o frágil Chile em momento de evolução • "Até que enfim": trio mais experiente vibra com a volta à Seleção.',
    timestamp: 'há 28 minutos — Em Raphael Zarko',
    imageUrl: 'https://s2-cbn.glbimg.com/AKFVsCziJlZsE7YKtBABZycE42g=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_d975fad146a14bbfad9e763717b09688/internal_photos/bs/2025/n/I/ZlondNQhW30UwsQv6ZAA/esp2675574.jpg',
    isVideo: false,
  },
  {
    id: 'news-4',
    category: 'eliminatórias da copa 2026',
    title: 'Com belos gols, Brasil deslancha no 2º tempo e vence o Chile; veja os lances',
    description: 'Casemiro e Raphinha, de pênalti, marcam; argentinos param em Alisson • Bruno Guimarães: "Fui exaltado para o Atlético-PR ou Vasco?"',
    timestamp: 'há 1 hora — Em Tempo Real',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgm3rlsTP7aAGlctPbeETkil4VyWCornctc1kxhLm1Y0b1Z-zKSwnmFicTcbL_5io6PaI&usqp=CAU',
    isVideo: false,
  },
];

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


type Article = {
  id: string;
  category: string;
  title: string;
  description: string;
  timestamp: string;
  imageUrl: string;
  isVideo?: boolean;
};


const ArticleCard = ({ article }: { article: Article }) => (
    <a href="#" className="block group">
        <article className="bg-white border-t first:border-t-0 py-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-shrink-0 w-full sm:w-48 h-40 sm:h-28 overflow-hidden">
                    <img src={article.imageUrl} alt={article.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex flex-col">
                    <p className="text-sm font-semibold text-green-700">{article.category}</p>
                    <h2 className="mt-1 text-xl font-bold leading-tight text-gray-900 group-hover:text-blue-700 transition-colors">
                        {article.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">{article.description}</p>
                    <p className="mt-auto pt-2 text-xs text-gray-500">{article.timestamp}</p>
                </div>
            </div>
        </article>
    </a>
);


const StandingsSidebar = () => {
  const getPositionClass = (pos: number): string => {
    if (pos <= 6) return 'bg-green-500 text-white'; 
    if (pos === 7) return 'bg-sky-500 text-white'; 
    return 'bg-gray-200 text-gray-800'; 
  };

  return (
    <aside className="bg-white border">
      <div className="p-3 border-b">
        <h3 className="text-sm font-bold text-gray-800">ELIMINATÓRIAS DA COPA</h3>
        <p className="text-xs text-gray-500">América do Sul</p>
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
    </aside>
  );
};

const NewsPageReplication: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <main className="max-w-screen-xl p-4 mx-auto lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">          
          <section className="bg-white px-4">
            {newsData.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
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
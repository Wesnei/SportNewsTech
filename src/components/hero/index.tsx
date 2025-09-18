const Hero = () => {
  const imgEsquerda =
    "https://cdn.midiamax.com.br/wp-content/uploads/2025/09/Novo-Projeto-23.webp";
  const imgTopoDireita =
    "https://viagemegastronomia.cnnbrasil.com.br/wp-content/uploads/sites/5/2022/10/BA_RA-HOTEL-4.jpg?w=1024";
  const imgBaixoDireita =
    "https://sportbuzz.com.br/wp-content/uploads/2025/07/6903630545_97b1d82be8_o-1-1-e1751914009132.jpg";

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 to-blue-50 py-12 md:py-16 lg:py-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12">
          
          <div
            className="lg:col-span-3 relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointerh-[550px] md:h-[650px] lg:h-[700px]" 
          >
            <img
              src={imgEsquerda}
              alt="Jogador em ação"
              className="w-full h-full object-cover object-top md:object-center transition-all duration-500 group-hover:scale-110"
              loading="eager"
              style={{ imageRendering: "crisp-edges" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            {/* CONTEÚDO SOBREPOSTO */}
            <div className="absolute inset-0 p-6 md:p-8 lg:p-10 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="bg-red-600 text-white text-xs md:text-sm font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-2">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"></span>
                    URGENTE
                  </div>
                  <div className="bg-black/50 text-white text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-sm">
                    Há 5 min
                  </div>
                </div>
                <button className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight group-hover:text-blue-200 transition-colors duration-300">
                  CHAMADO DE EMERGÊNCIA
                </h2>
                <p className="text-sm md:text-base lg:text-lg text-gray-200 leading-relaxed max-w-2xl">
                  André Pereira, do Brasil, foi convocado para substituir um
                  jogador lesionado. Agora, ganha oportunidade inédita de mostrar
                  seu talento no cenário internacional.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 text-sm md:text-base">
                    Leia Mais
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5"
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
                  </button>
                  <div className="flex items-center gap-4 md:gap-6 text-white/80">
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span className="text-sm md:text-base font-medium">
                        2.4k
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0v10a2 2 0 002 2h6a2 2 0 002-2V8"
                        />
                      </svg>
                      <span className="text-sm md:text-base font-medium">
                        Futebol
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA (sem alterações) */}
          <div className="lg:col-span-2 grid grid-rows-2 gap-6 md:gap-8">
            {/* Card topo direita */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer transform hover:scale-[1.02] transition-all duration-300">
              <img
                src={imgTopoDireita}
                alt="Interior de hotel luxuoso"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
              <div className="absolute inset-0 p-4 md:p-6 lg:p-8 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="bg-blue-600 text-white text-xs md:text-sm font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-1.5">
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    CONFORTO
                  </div>
                  <div className="bg-black/40 text-white text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5 rounded-full backdrop-blur-sm">
                    15 min
                  </div>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight group-hover:text-blue-200 transition-colors">
                    LUXO E REGALIAS
                  </h3>
                  <p className="text-xs md:text-sm lg:text-base text-gray-200 leading-relaxed">
                    Seleção terá hotel cinco estrelas em Rondonópolis. Quartos
                    de luxo garantem conforto total.
                  </p>
                  <div className="flex items-center gap-3 md:gap-4 text-white/70">
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-xs md:text-sm font-medium">
                        890
                      </span>
                    </div>
                    <span className="text-xs md:text-sm">•</span>
                    <span className="text-xs md:text-sm font-medium">
                      Hotel
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card baixo direita */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer transform hover:scale-[1.02] transition-all duration-300">
              <img
                src={imgBaixoDireita}
                alt="Torcida animada no estádio"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
              <div className="absolute inset-0 p-4 md:p-6 lg:p-8 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="bg-orange-600 text-white text-xs md:text-sm font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-1.5">
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92z"
                        clipRule="evenodd"
                      />
                    </svg>
                    RIVALIDADE
                  </div>
                  <div className="bg-black/40 text-white text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5 rounded-full backdrop-blur-sm">
                    30 min
                  </div>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight group-hover:text-orange-200 transition-colors">
                    TENSÃO DE RIVALIDADE
                  </h3>
                  <p className="text-xs md:text-sm lg:text-base text-gray-200 leading-relaxed">
                    Torcedores rivais aumentam tensão. Mais de 100 seguranças
                    estarão presentes.
                  </p>
                  <div className="flex items-center gap-3 md:gap-4 text-white/70">
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-xs md:text-sm font-medium">
                        1.2k
                      </span>
                    </div>
                    <span className="text-xs md:text-sm">•</span>
                    <span className="text-xs md:text-sm font-medium">
                      Segurança
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
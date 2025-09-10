import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold text-white mb-2">SportTechNews</h3>
            <p className="text-xs text-blue-200 mb-4">Notícias em Tempo Real</p>
            <p className="text-blue-100 text-sm leading-relaxed mb-6 max-w-xs">
              Sua fonte confiável para as últimas notícias esportivas. Cobertura completa, análises profundas e atualizações em tempo real dos principais eventos esportivos.
            </p>

            <div className="flex space-x-4 justify-center md:justify-start">
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-6 text-blue-200">Links Rápidos</h4>
            <ul className="space-y-2">
              {[
                { name: "Início", href: "/" },
                { name: "Notícias", href: "/noticias" },
                { name: "Esportes", href: "/esportes" },
                { name: "Ao Vivo", href: "/ao-vivo" },
                { name: "Vídeos", href: "/videos" },
                { name: "Contato", href: "/contato" }
              ].map(link => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-blue-200 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-6 text-blue-200">Modalidades</h4>
            <ul className="space-y-2">
              {[
                { name: "Futebol", href: "/futebol" },
                { name: "Basquete", href: "/basquete" },
                { name: "Tênis", href: "/tenis" },
                { name: "Vôlei", href: "/volei" },
                { name: "Fórmula 1", href: "/formula1" },
                { name: "MMA", href: "/mma" }
              ].map(sport => (
                <li key={sport.name}>
                  <Link
                    to={sport.href}
                    className="text-sm text-blue-200 hover:text-white transition-colors duration-300"
                  >
                    {sport.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-6 text-blue-200">Newsletter</h4>
            <p className="text-blue-100 text-sm mb-4 text-center md:text-left">
              Receba as principais notícias esportivas diretamente no seu email.
            </p>
            
            <form className="w-full space-y-3 mb-6">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="w-full bg-blue-600/50 border border-blue-500 rounded-lg px-4 py-3 text-sm text-white placeholder-blue-200 focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-400/50"
              >
                Inscrever-se
              </button>
            </form>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

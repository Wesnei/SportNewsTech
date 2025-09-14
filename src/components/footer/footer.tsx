import { Link } from "react-router-dom";

const FooterLinkColumn = ({ title, links }: { title: string; links: { name: string; href: string }[] }) => (
  <div className="flex flex-col items-center md:items-start">
    <h4 className="text-lg font-semibold mb-6 text-blue-200">{title}</h4>
    <ul className="space-y-3">
      {links.map(link => (
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
);

const socialLinks = [
  { name: 'Facebook', href: '#', icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /> },
  { name: 'Twitter', href: '#', icon: <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /> },
  { name: 'Instagram', href: '#', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" /></> },
  { name: 'LinkedIn', href: '#', icon: <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></> },
];

const footerSections = [
  {
    title: "Links Rápidos",
    links: [
      { name: "Início", href: "/" },
      { name: "Notícias", href: "/noticias" },
      { name: "Esportes", href: "/esportes" },
      { name: "Ao Vivo", href: "/ao-vivo" },
      { name: "Vídeos", href: "/videos" },
      { name: "Contato", href: "/contato" },
    ],
  },
  {
    title: "Modalidades",
    links: [
      { name: "Futebol", href: "/futebol" },
      { name: "Basquete", href: "/basquete" },
      { name: "Tênis", href: "/tenis" },
      { name: "Vôlei", href: "/volei" },
      { name: "Fórmula 1", href: "/formula1" },
      { name: "MMA", href: "/mma" },
    ],
  }
];

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-xl font-bold text-white">SportTechNews</h3>
            <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
              Sua fonte confiável para as últimas notícias, análises e atualizações do mundo esportivo.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={`Visite nosso ${social.name}`}
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {footerSections.map(section => (
            <FooterLinkColumn key={section.title} title={section.title} links={section.links} />
          ))}

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-6 text-blue-200">Newsletter</h4>
            <p className="text-blue-100 text-sm mb-4">
              Receba as principais notícias diretamente no seu email.
            </p>
            <form className="w-full max-w-sm space-y-3">
              <label htmlFor="email-newsletter" className="sr-only">Seu melhor email</label>
              <input
                id="email-newsletter"
                type="email"
                placeholder="Seu melhor email"
                className="w-full bg-blue-700/60 border border-blue-600 rounded-lg px-4 py-3 text-sm text-white placeholder-blue-200 focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-400/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
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
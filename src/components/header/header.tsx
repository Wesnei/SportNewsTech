import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <nav className="flex gap-6 justify-center">
        <Link 
          to="/" 
          className="hover:text-blue-400 transition-colors"
        >
          Login
        </Link>
        <Link 
          to="/register" 
          className="hover:text-blue-400 transition-colors"
        >
          Cadastre-se
        </Link>
      </nav>
    </header>
  );
};

export default Header;

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import type { RegisterFormData, IconProps } from '../../types';
import { useFormValidation } from '../../hooks';
import api from '../../services/api';

const Icon: React.FC<IconProps> = ({ children, className = "h-5 w-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
    {children}
  </svg>
);

const RegisterCard: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Jornalista' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      custom: (value: string) => {
        if (!value.trim()) return 'O campo nome é obrigatório.';
        if (value.length < 2) return 'O nome deve ter pelo menos 2 caracteres.';
        return undefined;
      }
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      custom: (value: string) => {
        if (!value.trim()) return 'O campo de email é obrigatório.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Por favor, insira um email válido.';
        return undefined;
      }
    },
    password: {
      required: true,
      minLength: 6,
      custom: (value: string) => {
        if (!value.trim()) return 'O campo de senha é obrigatório.';
        if (value.length < 6) return 'A senha deve ter no mínimo 6 caracteres.';
        return undefined;
      }
    },
    confirmPassword: {
      required: true,
      custom: (value: string) => {
        if (!value.trim()) return 'Confirme sua senha.';
        if (value !== formData.password) return 'As senhas não coincidem.';
        return undefined;
      }
    }
  };

  const { errors, validateForm, clearError } = useFormValidation(validationRules);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearError(name);
  }, [clearError]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    })) return;

    setIsLoading(true);
    try {
      const emailPrefix = formData.email.split('@')[0];
      const uniqueUsername = `${emailPrefix}_${Date.now()}`;
      
      const response = await api.post('/auth/register', {
        username: uniqueUsername,
        email: formData.email,
        password: formData.password,
        role: formData.role === 'Jornalista' ? 'JOURNALIST' : 
        formData.role === 'Editor' ? 'EDITOR' : 'JOURNALIST' 
      });

      console.log('Cadastro bem-sucedido:', response.data);

      const userRole = formData.role.toLowerCase();
      switch (userRole) {
        case 'jornalista':
          navigate('/login'); 
          break;
        case 'editor':
          navigate('/login'); 
          break;
        default:
          navigate('/login');
          break;
      }

    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      
      let errorMessage = 'Erro ao realizar cadastro. Tente novamente.';
      
      if (error.response?.data?.message) {
        if (error.response.data.message.includes('username')) {
          errorMessage = 'Este nome de usuário já está em uso. Tente com um email diferente.';
        } else if (error.response.data.message.includes('email')) {
          errorMessage = 'Este email já está cadastrado. Tente fazer login ou use outro email.';
        } else {
          errorMessage = 'Erro no servidor. Tente novamente em alguns minutos.';
        }
      }
      
      alert(errorMessage);
      
      if (error.response) {
        console.error('Detalhes do erro:', error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm, navigate]);

  const togglePassword = useCallback(() => setShowPassword(prev => !prev), []);
  const toggleConfirmPassword = useCallback(() => setShowConfirmPassword(prev => !prev), []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-6 sm:px-8 py-8 sm:py-12 font-sans">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0771BA] tracking-tight font-sans">SportNewsTech</h1>
          <p className="mt-2 text-slate-600">Cadastro</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="role" className="block text-base font-medium text-gray-700 mb-2">Qual tipo de usuário você é?</label>
            <div className="relative">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full h-12 pl-4 pr-12 border rounded-md bg-gray-100 text-gray-900 appearance-none
                           focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400
                           transition-all border-gray-200 cursor-pointer"
              >
                <option value="Jornalista">Jornalista</option>
                <option value="Editor">Editor</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
                <Icon className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></Icon>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-2">Nome Completo</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                <Icon className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></Icon>
              </span>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Digite seu nome completo:"
                className={`w-full h-12 pl-11 pr-4 border rounded-md bg-gray-100 text-gray-900 placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400
                            transition-all
                            ${errors.name ? 'border-red-500 focus:ring-red-300' : 'border-gray-200'}`}
              />
            </div>
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                <Icon className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></Icon>
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite seu email:"
                className={`w-full h-12 pl-11 pr-4 border rounded-md bg-gray-100 text-gray-900 placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400
                            transition-all
                            ${errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-200'}`}
              />
            </div>
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>



          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">Senha</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                <Icon className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></Icon>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Digite sua senha:"
                className={`w-full h-12 pl-11 pr-12 border rounded-md bg-gray-100 text-gray-900 placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400
                            transition-all
                            ${errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-200'}`}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? (
                  <Icon>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.774 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" />
                  </Icon>
                ) : (
                  <Icon>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </Icon>
                )}
              </button>
            </div>
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-700 mb-2">Confirmar Senha</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                <Icon className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></Icon>
              </span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme sua senha:"
                className={`w-full h-12 pl-11 pr-12 border rounded-md bg-gray-100 text-gray-900 placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400
                            transition-all
                            ${errors.confirmPassword ? 'border-red-500 focus:ring-red-300' : 'border-gray-200'}`}
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showConfirmPassword ? (
                  <Icon>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.774 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" />
                  </Icon>
                ) : (
                  <Icon>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </Icon>
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="h-12 bg-[#0771BA] text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm font-semibold text-gray-600">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-[#0771BA] hover:underline font-semibold cursor-pointer">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
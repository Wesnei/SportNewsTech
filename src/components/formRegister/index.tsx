import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { RegisterFormData, IconProps } from '../../types';
import { useFormValidation } from '../../hooks';

const Icon: React.FC<IconProps> = ({ children, className = "h-5 w-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    {children}
  </svg>
);

const RegisterCard: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Visitante',
    journalistId: ''
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
    },
    journalistId: {
      custom: (value: string) => {
        if (formData.role === 'Jornalista' && !value.trim()) {
          return 'O código de jornalista é obrigatório.';
        }
        return undefined;
      }
    }
  };

  const { errors, validateForm, clearError } = useFormValidation(validationRules);

  const mockAuthService = {
    register: async (data: RegisterFormData) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { ...data, id: Math.random().toString(36).substr(2, 9) };
    }
  };

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
      confirmPassword: formData.confirmPassword,
      journalistId: formData.journalistId || ''
    })) return;
    
    setIsLoading(true);
    try {
      const user = await mockAuthService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
        journalistId: formData.journalistId || undefined
      });
      
      console.log('Cadastro bem-sucedido:', user);
      
    } catch (error) {
      console.error('Erro no cadastro:', error);
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm]);

  const togglePassword = useCallback(() => setShowPassword(prev => !prev), []);
  const toggleConfirmPassword = useCallback(() => setShowConfirmPassword(prev => !prev), []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-green-800 p-2 sm:p-4 lg:p-6 font-sans">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl bg-white shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
        
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">SportTechNews</h1>
          <p className="font-bold text-gray-600 text-sm sm:text-lg">Crie sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 md:gap-5">
          
          <div>
            <label htmlFor="role" className="block text-xs sm:text-sm font-bold text-gray-700 mb-1 sm:mb-2 text-left">Tipo de Usuário</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full h-12 sm:h-14 px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl bg-gray-50 text-gray-900 text-left
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                         transition-all duration-300 text-sm sm:text-lg shadow-sm border-gray-300 cursor-pointer"
            >
              <option value="Visitante">Visitante</option>
              <option value="Jornalista">Jornalista</option>
              <option value="Editor">Editor</option>
            </select>
          </div>

          <div>
            <label htmlFor="name" className="block text-xs sm:text-sm font-bold text-gray-700 mb-1 sm:mb-2 text-left">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              className={`w-full h-12 sm:h-14 px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 text-left
                          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                          transition-all duration-300 text-sm sm:text-lg shadow-sm
                          ${errors.name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'}`}
            />
            {errors.name && <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 text-left">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-gray-700 mb-1 sm:mb-2 text-left">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seunome@empresa.com.br"
              className={`w-full h-12 sm:h-14 px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 text-left
                          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                          transition-all duration-300 text-sm sm:text-lg shadow-sm
                          ${errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'}`}
            />
            {errors.email && <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 text-left">{errors.email}</p>}
          </div>

          {formData.role === 'Jornalista' && (
            <div>
              <label htmlFor="journalistId" className="block text-xs sm:text-sm font-bold text-gray-700 mb-1 sm:mb-2 text-left">Código de Jornalista</label>
              <input
                type="text"
                id="journalistId"
                name="journalistId"
                value={formData.journalistId}
                onChange={handleChange}
                placeholder="Digite seu código de jornalista"
                className={`w-full h-12 sm:h-14 px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 text-left
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                            transition-all duration-300 text-sm sm:text-lg shadow-sm
                            ${errors.journalistId ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'}`}
              />
              {errors.journalistId && <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 text-left">{errors.journalistId}</p>}
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-xs sm:text-sm font-bold text-gray-700 mb-1 sm:mb-2 text-left">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full h-12 sm:h-14 px-3 sm:px-4 pr-10 sm:pr-12 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 text-left
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                            transition-all duration-300 text-sm sm:text-lg shadow-sm
                            ${errors.password ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'}`}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-500 hover:text-gray-800 transition-colors duration-300 cursor-pointer"
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </Icon>
                ) : (
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </Icon>
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 text-left">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-bold text-gray-700 mb-1 sm:mb-2 text-left">Confirmar Senha</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full h-12 sm:h-14 px-3 sm:px-4 pr-10 sm:pr-12 py-2 sm:py-3 border-2 rounded-lg sm:rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 text-left
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                            transition-all duration-300 text-sm sm:text-lg shadow-sm
                            ${errors.confirmPassword ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'}`}
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-500 hover:text-gray-800 transition-colors duration-300 cursor-pointer"
                aria-label={showConfirmPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showConfirmPassword ? (
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </Icon>
                ) : (
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </Icon>
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 text-left">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg sm:rounded-xl
                       focus:outline-none focus:ring-4 focus:ring-blue-500/50
                       disabled:bg-blue-400 disabled:cursor-not-allowed
                       transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-lg shadow-md hover:shadow-lg cursor-pointer"
          >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white"></div>
                  Criando conta...
                </div>
            ) : 'Criar Conta'}
            </button>
        </form>

        <div className="mt-4 sm:mt-6 text-center">
          <p className="font-bold text-gray-600 text-sm sm:text-base">
            Já tem uma conta?{" "}
            <Link to="/" className="text-blue-600 hover:underline font-medium transition-colors cursor-pointer">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
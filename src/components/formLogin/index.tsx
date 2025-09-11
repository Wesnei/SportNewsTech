import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { LoginFormData, IconProps } from '../../types';
import { useFormValidation } from '../../hooks/useFormValidation';

const Icon: React.FC<IconProps> = ({ children, className = "h-5 w-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    {children}
  </svg>
);

const LoginCard: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ 
    email: '', 
    password: '', 
    role: 'Jornalista', 
    journalistId: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationRules = {
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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearError(name);
  }, [clearError]);

  const mockAuthService = {
    login: async (email: string, password: string, role: string, journalistId?: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (email === "user@example.com" && password === "password123") {
        return { id: "mockUserId", email, role, journalistId };
      }
      throw new Error("Credenciais inválidas");
    }
  };
  
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
      e.preventDefault();
      
      const stringFormData: Record<string, string> = {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        journalistId: formData.journalistId ?? ''
      };
      if (!validateForm(stringFormData)) return;
      
      setIsLoading(true);
      try {
        const user = await mockAuthService.login(
          formData.email, 
          formData.password, 
          formData.role, 
          formData.journalistId
        );
        
        localStorage.setItem('currentUserId', user.id);
        console.log('Login bem-sucedido:', user);
        
      } catch (error) {
        console.error('Erro no login:', error);
      } finally {
        setIsLoading(false);
      }
    }, [formData, validateForm]);

  const togglePassword = useCallback(() => setShowPassword(prev => !prev), []);

  return (
    <div className="h-screen overflow-y-hidden w-full flex items-start justify-center bg-white px-6 sm:px-8 pt-12 sm:pt-16 md:pt-20 font-sans">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0771BA] tracking-tight font-sans">SportNewsTech</h1>
          <p className="mt-3 text-lg font-bold text-[#0771BA] font-sans">Login</p>
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
                className="w-full h-12 pl-4 pr-12 border rounded-md bg-gray-100 text-gray-900 appearance-none bg-none
                           focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400
                           transition-all border-gray-200 cursor-pointer"
              >
                <option value="Visitante">Visitante</option>
                <option value="Jornalista">Jornalista</option>
                <option value="Editor">Editor</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">
                <Icon className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></Icon>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                <Icon className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></Icon>
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
                <Icon className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c.5304 0 1.039-.21 1.414-.586A2 2 0 0014 9a2 2 0 00-3.414-1.414A2 2 0 0010 9c0 .53.21 1.039.586 1.414.375.376.884.586 1.414.586zm6-3V7a4 4 0 10-8 0v1H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2h-2z" /></Icon>
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
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <Icon className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /></Icon>
                ) : (
                  <Icon className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></Icon>
                )}
              </button>
            </div>
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
          </div>

          {formData.role === 'Jornalista' && (
            <div>
              <label htmlFor="journalistId" className="block text-base font-medium text-gray-700 mb-2">Código:</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                  <Icon className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2h11" /></Icon>
                </span>
                <input
                  type="text"
                  id="journalistId"
                  name="journalistId"
                  value={formData.journalistId}
                  onChange={handleChange}
                  placeholder="Digite seu código:"
                  className={`w-full h-12 pl-11 pr-4 border rounded-md bg-gray-100 text-gray-900 placeholder-gray-400
                              focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400
                              transition-all
                              ${errors.journalistId ? 'border-red-500 focus:ring-red-300' : 'border-gray-200'}`}
                />
              </div>
              {errors.journalistId && <p className="mt-2 text-sm text-red-600">{errors.journalistId}</p>}
            </div>
          )}

          <div className="flex justify-end">
            <Link to="/recovery-password" className="text-sm font-semibold text-[#0771BA] hover:underline cursor-pointer">
              Esqueci minha senha
            </Link>
          </div>

          {errors.form && (
            <div className="text-sm text-red-600 text-center font-semibold bg-red-100 p-3 rounded-md">
              {errors.form}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#0771BA] hover:bg-[#0663A3] text-white font-bold rounded-md text-sm
                       focus:outline-none focus:ring-4 focus:ring-[#0771BA]/40 disabled:bg-blue-400 disabled:cursor-not-allowed
                       transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Entrando...
              </div>
            ) : 'Entrar'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm font-semibold text-gray-600">
            Não tem uma conta?{" "}
            <Link to="/register" className="text-[#0771BA] hover:underline font-semibold cursor-pointer">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;

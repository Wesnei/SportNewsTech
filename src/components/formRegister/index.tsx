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
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-6 sm:px-8 py-8 sm:py-12 font-sans">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0771BA] tracking-tight font-sans">SportNewsTech</h1>
          <p className="mt-3 text-lg font-bold text-[#0771BA] font-sans">Cadastro</p>
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
            <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-2">Nome Completo</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                <Icon className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></Icon>
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

          <div>
            <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-700 mb-2">Confirmar Senha</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                <Icon className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c.5304 0 1.039-.21 1.414-.586A2 2 0 0014 9a2 2 0 00-3.414-1.414A2 2 0 0010 9c0 .53.21 1.039.586 1.414.375.376.884.586 1.414.586zm6-3V7a4 4 0 10-8 0v1H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2h-2z" /></Icon>
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
                aria-label={showConfirmPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showConfirmPassword ? (
                  <Icon className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /></Icon>
                ) : (
                  <Icon className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></Icon>
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
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
                Criando conta...
              </div>
            ) : 'Criar Conta'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm font-semibold text-gray-600">
            Já tem uma conta?{" "}
            <Link to="/" className="text-[#0771BA] hover:underline font-semibold cursor-pointer">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
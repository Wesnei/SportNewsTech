import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { LoginFormData as LoginCredentials } from '../../types';


interface LocalLoginFormData {
  email: string;
  password: string;
}

interface IconProps {
  children: React.ReactNode;
  className?: string;
}

const useFormValidation = (rules: Record<string, { custom: (value: string) => string | undefined }>) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = (formData: LocalLoginFormData): boolean => {
    const newErrors: Record<string, string> = {};
    for (const key in rules) {
      const rule = rules[key];
      const value = formData[key as keyof LocalLoginFormData];
      
      if (typeof value === 'string') {
        const error = rule.custom(value);
        if (error) {
          newErrors[key] = error;
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const clearError = (name: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  return { errors, validateForm, clearError, setErrors };
};

const Icon: React.FC<IconProps> = ({ children, className = "h-5 w-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

const AnimatedError: React.FC<{ message?: string, id: string }> = ({ message, id }) => (
  <div
    className="transition-all duration-300 ease-in-out overflow-hidden"
    style={{ maxHeight: message ? '20px' : '0', opacity: message ? 1 : 0 }}
  >
    {message && <p id={id} className="mt-2 text-xs text-red-600 font-medium">{message}</p>}
  </div>
);

const Notification: React.FC<{ message: string; type: 'success' | 'error' }> = ({ message, type }) => {
  const baseClasses = "w-full p-4 mb-6 text-sm font-bold text-center rounded-lg transition-opacity duration-300";
  const typeClasses = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
  };

  if (!message) return null;

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert" aria-live="assertive">
      {message}
    </div>
  );
};

const LoginCard: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<LocalLoginFormData>({ 
    email: '', password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const validationRules = {
    email: { custom: (v: string) => !v.trim() ? 'O campo de email é obrigatório.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Por favor, insira um email válido.' : undefined },
    password: { custom: (v: string) => !v.trim() ? 'O campo de senha é obrigatório.' : v.length < 6 ? 'A senha deve ter no mínimo 6 caracteres.' : undefined }
  };
  
  const { errors, validateForm, clearError } = useFormValidation(validationRules);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: LocalLoginFormData) => ({ ...prev, [name]: value }));
    clearError(name);
    if (notification) setNotification(null);
  }, [clearError, notification]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    if (!validateForm(formData)) return;

    setIsLoading(true);
    try {
      const credentials: LoginCredentials = {
        email: formData.email,
        password: formData.password,
        role: 'Visitante' 
      };

      await login(credentials);
      setNotification({ message: 'Login bem-sucedido! Redirecionando...', type: 'success' });
    } catch (error: any) {
      console.error('Erro completo:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao conectar com o servidor. Verifique a conexão ou tente novamente.';
      setNotification({ message: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm, login]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4 font-sans">
      <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700 tracking-tight">SportNewsTech</h1>
          <p className="mt-2 text-slate-600">Acesse sua plataforma de notícias.</p>
        </div>

        <Notification message={notification?.message ?? ''} type={notification?.type ?? 'error'} />
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
                    
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 pointer-events-none"><Icon><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></Icon></span>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu.email@exemplo.com" aria-invalid={!!errors.email} aria-describedby="email-error" className={`w-full h-12 pl-12 pr-4 border rounded-lg bg-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500 ring-red-300' : 'border-slate-300 focus:ring-blue-500'}`} />
            </div>
            <AnimatedError message={errors.email} id="email-error" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">Senha</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 pointer-events-none"><Icon><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></Icon></span>
              <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" aria-invalid={!!errors.password} aria-describedby="password-error" className={`w-full h-12 pl-12 pr-12 border rounded-lg bg-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${errors.password ? 'border-red-500 ring-red-300' : 'border-slate-300 focus:ring-blue-500'}`} />
              <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-blue-600 transition-colors cursor-pointer" aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}>
                {showPassword ? <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></Icon> : <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></Icon>}
              </button>
            </div>
            <AnimatedError message={errors.password} id="password-error" />
          </div>

          <div className="text-right -mt-2">
            <Link to="/recovery-password" className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">Esqueceu sua senha?</Link>
          </div>

          <button type="submit" disabled={isLoading} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer">
            {isLoading ? (<><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>Processando...</>) : 'Entrar'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600">
            Não tem uma conta? <Link to="/register" className="text-blue-600 hover:underline font-bold cursor-pointer">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
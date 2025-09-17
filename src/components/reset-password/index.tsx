import React, { useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../services/api';

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

interface IconProps {
  children: React.ReactNode;
  className?: string;
}

const useFormValidation = (rules: Record<string, { custom: (value: string) => string | undefined }>) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = (formData: ResetPasswordFormData): boolean => {
    const newErrors: Record<string, string> = {};
    for (const key in rules) {
      const rule = rules[key];
      const value = formData[key as keyof ResetPasswordFormData];
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
    {message && <p id={id} className="mt-2 text-sm text-red-600 font-medium">{message}</p>}
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

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [formData, setFormData] = useState<ResetPasswordFormData>({ newPassword: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const validationRules = {
    newPassword: {
      custom: (value: string) =>
        !value.trim()
          ? 'O campo de senha é obrigatório.'
          : value.length < 6
          ? 'A senha deve ter no mínimo 6 caracteres.'
          : undefined,
    },
    confirmPassword: {
      custom: (value: string) =>
        !value.trim()
          ? 'O campo de confirmação de senha é obrigatório.'
          : value !== formData.newPassword
          ? 'As senhas não coincidem.'
          : undefined,
    },
  };

  const { errors, validateForm, clearError } = useFormValidation(validationRules);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      clearError(name);
      if (notification) setNotification(null);
    },
    [clearError, notification],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setNotification(null);

      if (!token) {
        setNotification({ message: 'Token de redefinição inválido ou ausente.', type: 'error' });
        return;
      }

      if (!validateForm(formData)) return;

      setIsLoading(true);
      try {
        console.log('Enviando requisição para:', api.getUri() + '/auth/reset-password', 'com payload:', { token, newPassword: formData.newPassword });
        const response = await api.post('/auth/reset-password', {
          token,
          newPassword: formData.newPassword,
        });
        console.log('Resposta da API:', response.data);

        setPasswordReset(true);
        setNotification({ message: 'Senha redefinida com sucesso!', type: 'success' });
      } catch (error: any) {
        console.error('Erro na redefinição de senha:', error);
        console.error('Resposta do servidor:', error.response?.data);
        console.error('Status HTTP:', error.response?.status);
        const errorMessage = error.response?.data?.message || 'Erro ao redefinir a senha. Tente novamente.';
        setNotification({ message: errorMessage, type: 'error' });
      } finally {
        setIsLoading(false);
      }
    },
    [formData, validateForm, token],
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-green-800 p-4 font-sans">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-6 sm:p-10 transition-all duration-500">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">SportNewsTech</h1>
          <p className="text-gray-600 text-lg">Redefinir Senha</p>
        </div>

        <Notification message={notification?.message ?? ''} type={notification?.type ?? 'error'} />

        {passwordReset ? (
          <div className="text-center p-4">
            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="font-bold text-2xl text-gray-800 mt-4">Senha Redefinida</h2>
            <p className="text-gray-600 mt-2">
              Sua senha foi redefinida com sucesso. Você pode agora fazer login com sua nova senha.
            </p>
            <div className="mt-8">
              <Link to="/" className="font-medium text-blue-600 hover:underline transition-colors cursor-pointer">
                Voltar para o Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">Nova Senha</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 pointer-events-none">
                  <Icon>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </Icon>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  aria-invalid={!!errors.newPassword}
                  aria-describedby="newPassword-error"
                  className={`w-full h-14 px-4 py-3 pl-12 border-2 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-lg shadow-sm ${
                    errors.newPassword ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                >
                  {showPassword ? (
                    <Icon>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </Icon>
                  ) : (
                    <Icon>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </Icon>
                  )}
                </button>
              </div>
              <AnimatedError message={errors.newPassword} id="newPassword-error" />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirmar Nova Senha</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 pointer-events-none">
                  <Icon>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </Icon>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby="confirmPassword-error"
                  className={`w-full h-14 px-4 py-3 pl-12 border-2 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-lg shadow-sm ${
                    errors.confirmPassword ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                >
                  {showPassword ? (
                    <Icon>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </Icon>
                  ) : (
                    <Icon>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </Icon>
                  )}
                </button>
              </div>
              <AnimatedError message={errors.confirmPassword} id="confirmPassword-error" />
            </div>

            <button
              type="submit"
              disabled={isLoading || !token}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] text-lg shadow-md hover:shadow-lg cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Enviando...
                </div>
              ) : (
                'Redefinir Senha'
              )}
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="font-bold text-gray-600 text-base">
            Lembrou sua senha?{' '}
            <Link to="/" className="font-bold text-blue-600 hover:underline font-medium transition-colors cursor-pointer">
              Fazer Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
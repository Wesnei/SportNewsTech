import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

interface RecoveryFormData {
  email: string;
}

const useFormValidation = (rules: Record<string, { custom: (value: string) => string | undefined }>) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = (formData: RecoveryFormData): boolean => {
    const newErrors: Record<string, string> = {};
    for (const key in rules) {
      const rule = rules[key];
      const value = formData[key as keyof RecoveryFormData];
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

const Recovery: React.FC = () => {
  const [formData, setFormData] = useState<RecoveryFormData>({ email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const validationRules = {
    email: {
      custom: (value: string) =>
        !value.trim()
          ? 'O campo de email é obrigatório.'
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? 'Por favor, insira um email válido.'
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

      if (!validateForm(formData)) return;

      setIsLoading(true);
      try {
        console.log('Enviando requisição para:', api.getUri() + '/auth/forgot-password', 'com payload:', { email: formData.email });
        const response = await api.post('/auth/forgot-password', { email: formData.email });
        console.log('Resposta da API:', response.data);

        setEmailSent(true);
        setNotification({ message: 'Link de recuperação enviado com sucesso!', type: 'success' });
      } catch (error: any) {
        console.error('Erro na recuperação de senha:', error);
        console.error('Resposta do servidor:', error.response?.data);
        console.error('Status HTTP:', error.response?.status);
        const errorMessage = error.response?.data?.message || 'Erro ao enviar o link de recuperação. Tente novamente.';
        setNotification({ message: errorMessage, type: 'error' });
      } finally {
        setIsLoading(false);
      }
    },
    [formData, validateForm],
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white from-blue-900 via-gray-900 to-green-800 p-4 font-sans">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-6 sm:p-10 transition-all duration-500">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-2">SportNewsTech</h1>
          <p className="text-gray-600 text-lg">Recuperação de Senha</p>
        </div>

        <Notification message={notification?.message ?? ''} type={notification?.type ?? 'error'} />

        {emailSent ? (
          <div className="text-center p-4">
            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="font-bold text-2xl text-gray-800 mt-4">Verifique seu Email</h2>
            <p className="text-gray-600 mt-2">
              Se uma conta associada a <strong>{formData.email}</strong> existir, enviamos um link para redefinir sua senha.
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 pointer-events-none">
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seunome@empresa.com.br"
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                  className={`w-full h-14 px-4 py-3 border-2 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-300 text-lg shadow-sm ${
                    errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'
                  }`}
                />
              </div>
              <AnimatedError message={errors.email} id="email-error" />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] text-lg shadow-md hover:shadow-lg cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Enviando...
                </div>
              ) : (
                'Enviar Link de Recuperação'
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

export default Recovery;
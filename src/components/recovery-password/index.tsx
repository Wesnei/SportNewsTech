import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../../hooks/useFormValidation';
import type { ValidationRules } from '../../types';

const mockAuthService = {
  /**
   * @param {string} email 
   * @returns {Promise<{success: boolean}>}
   */
  sendPasswordResetEmail: async (email: string): Promise<{ success: boolean }> => {
    console.log(`Simulating password recovery request for: ${email}`);
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (email.toLowerCase() === "error@test.com") {
        throw new Error("Simulated server error.");
    }
    return { success: true };
  },
};

const Recovery: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, string>>({ email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validationRules: ValidationRules = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      custom: (value: string) => {
        if (!value.trim()) return 'O campo de email é obrigatório.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Por favor, insira um email válido.';
        return undefined;
      }
    }
  };
  
  const { errors, validateForm, clearError } = useFormValidation(validationRules);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearError(name);
  }, [clearError]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    
    setIsLoading(true);
    try {
      await mockAuthService.sendPasswordResetEmail(formData.email);
      setEmailSent(true);
    } catch (error) {
      console.error('Erro na recuperação de senha:', error);
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-green-800 p-4 font-sans">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-6 sm:p-10 transition-all duration-500">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">SportTechNews</h1>
          <p className="text-gray-600 text-lg">Recuperação de Senha</p>
        </div>

        {emailSent ? (
          <div className="text-center p-4">
             <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="font-bold text-2xl font-semibold text-gray-800 mt-4">Verifique seu Email</h2>
            <p className="text-gray-600 mt-2">
              Se uma conta associada a <strong>{formData.email}</strong> existir,
              enviamos um link para redefinir sua senha.
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
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seunome@empresa.com.br"
                className={`w-full h-14 px-4 py-3 border-2 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400
                            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                            transition-all duration-300 text-lg shadow-sm
                            ${errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'}`}
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            {errors.form && (
              <div className="text-sm text-red-600 text-center font-semibold bg-red-100 p-3 rounded-lg">
                {errors.form}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl
                         focus:outline-none focus:ring-4 focus:ring-blue-500/50
                         disabled:bg-blue-400 disabled:cursor-not-allowed
                         transition-all duration-300 transform hover:scale-[1.02] text-lg shadow-md hover:shadow-lg cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="font-bold animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Enviando...
                </div>
              ) : 'Enviar Link de Recuperação'}
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="font-bold text-gray-600 text-base">
            Lembrou sua senha?{" "}
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
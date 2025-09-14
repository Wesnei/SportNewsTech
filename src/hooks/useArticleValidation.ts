import { useState, useCallback } from 'react';
import type { ValidationRules, ArticleFormErrors } from '../types';

export const useArticleValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<ArticleFormErrors>({});

  const validateField = useCallback((name: string, value: string): string | undefined => {
    const rule = rules[name];
    if (!rule) return undefined;

    if (rule.required && !value.trim()) {
      return `${name} é obrigatório`;
    }

    if (rule.minLength && value.length < rule.minLength) {
      return `${name} deve ter pelo menos ${rule.minLength} caracteres`;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return `${name} deve ter no máximo ${rule.maxLength} caracteres`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return `${name} inválido`;
    }

    if (rule.custom) {
      return rule.custom(value);
    }

    return undefined;
  }, [rules]);

  const validateForm = useCallback((formData: Record<string, string>): boolean => {
    const newErrors: ArticleFormErrors = {};

    Object.keys(rules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName] || '');
      if (error) {
        newErrors[fieldName as keyof ArticleFormErrors] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [rules, validateField]);

  const clearError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName as keyof ArticleFormErrors];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setError = useCallback((fieldName: string, message: string) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: message
    }));
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearError,
    clearAllErrors,
    setError
  };
};

import React, { useState, useCallback, useEffect } from 'react';
import type { ArticleFormData, IconProps } from '../../types';
import { useArticleValidation } from '../../hooks/useArticleValidation';
import Sidebar from '../../components/sidebar';
import { createArticle } from '../../services/articleService';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Icon: React.FC<IconProps> = ({ children, className = "h-5 w-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
    {children}
  </svg>
);

const JournalistPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    subtitle: '',
    content: '',
    coverImage: '',
    categoryId: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data.map((cat: any) => ({ value: cat.id, label: cat.name })));
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
    fetchCategories();
  }, []);

  const validationRules = {
    title: {
      required: true,
      minLength: 5,
      custom: (value: string) => {
        if (!value.trim()) return 'O título é obrigatório.';
        if (value.length < 5) return 'O título deve ter pelo menos 5 caracteres.';
        return undefined;
      }
    },
    subtitle: {
      required: true,
      minLength: 10,
      custom: (value: string) => {
        if (!value.trim()) return 'O subtítulo é obrigatório.';
        if (value.length < 10) return 'O subtítulo deve ter pelo menos 10 caracteres.';
        return undefined;
      }
    },
    content: {
      required: true,
      minLength: 50,
      custom: (value: string) => {
        if (!value.trim()) return 'O conteúdo é obrigatório.';
        if (value.length < 50) return 'O conteúdo deve ter pelo menos 50 caracteres.';
        return undefined;
      }
    },
    coverImage: {
      required: true,
      custom: (value: string) => {
        if (!value.trim()) return 'A imagem de capa é obrigatória.';
        if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(value)) {
          return 'Por favor, insira uma URL válida de imagem.';
        }
        return undefined;
      }
    },
    categoryId: {
      required: true,
      custom: (value: string) => {
        if (!value.trim()) return 'A categoria é obrigatória.';
        return undefined;
      }
    }
  };

  const { errors, validateForm, clearError } = useArticleValidation(validationRules);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearError(name);
  }, [clearError]);

  const handleTagAdd = useCallback(() => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  }, [tagInput, formData.tags]);

  const handleTagRemove = useCallback((tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTagAdd();
    }
  }, [handleTagAdd]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm({
      title: formData.title,
      subtitle: formData.subtitle,
      content: formData.content,
      coverImage: formData.coverImage,
      categoryId: formData.categoryId
    })) return;
    
    setIsLoading(true);
    try {
      if (!user?.id) {
        console.error("ID do usuário não disponível. O usuário pode não estar autenticado.");
        setIsLoading(false);
        return;
      }
      await createArticle({ ...formData, authorId: user.id });
      console.log('Artigo criado com sucesso:', formData.title);
      
      setFormData({
        title: '',
        subtitle: '',
        content: '',
        coverImage: '',
        categoryId: '',
        tags: []
      });
      setTagInput('');

      navigate('/journalist/articles');
      
    } catch (error) {
      console.error('Erro ao salvar artigo:', error);
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm, user?.id, navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden lg:block lg:w-64 lg:fixed lg:inset-y-0 lg:z-50">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Top Navigation */}
        <header className="bg-[#0771BA] shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-blue-100 hover:text-white hover:bg-blue-600"
                >
                  <Icon className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </Icon>
                </button>
                <h1 className="ml-2 lg:ml-0 text-xl font-semibold text-white">Novo Artigo</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Article Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Informações do Artigo</h2>
                  
                  <div className="space-y-6">
                    {/* Título */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Título do Artigo *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Digite o título do seu artigo..."
                        className={`w-full h-12 px-4 border rounded-lg text-gray-900 placeholder-gray-400
                                    focus:outline-none focus:ring-2 focus:ring-[#0771BA] focus:border-transparent
                                    transition-all
                                    ${errors.title ? 'border-red-300 focus:ring-red-200' : 'border-gray-300'}`}
                      />
                      {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    {/* Subtítulo */}
                    <div>
                      <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                        Subtítulo *
                      </label>
                      <input
                        type="text"
                        id="subtitle"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                        placeholder="Digite um subtítulo interessante..."
                        className={`w-full h-12 px-4 border rounded-lg text-gray-900 placeholder-gray-400
                                    focus:outline-none focus:ring-2 focus:ring-[#0771BA] focus:border-transparent
                                    transition-all
                                    ${errors.subtitle ? 'border-red-300 focus:ring-red-200' : 'border-gray-300'}`}
                      />
                      {errors.subtitle && <p className="mt-2 text-sm text-red-600">{errors.subtitle}</p>}
                    </div>

                    {/* Categoria e Imagem */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                          Categoria *
                        </label>
                        <div className="relative">
                          <select
                            id="categoryId"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="w-full h-12 pl-4 pr-10 border rounded-lg text-gray-900 appearance-none
                                       focus:outline-none focus:ring-2 focus:ring-[#0771BA] focus:border-transparent
                                       transition-all border-gray-300 cursor-pointer"
                          >
                            <option value="">Selecione uma categoria</option>
                            {categories.map((category) => (
                              <option key={category.value} value={category.value}>
                                {category.label}
                              </option>
                            ))}
                          </select>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                            <Icon className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></Icon>
                          </span>
                        </div>
                        {errors.categoryId && <p className="mt-2 text-sm text-red-600">{errors.categoryId}</p>}
                      </div>

                      <div>
                        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">
                          URL da Imagem de Capa *
                        </label>
                        <input
                          type="url"
                          id="coverImage"
                          name="coverImage"
                          value={formData.coverImage}
                          onChange={handleChange}
                          placeholder="https://example.com/imagem.jpg"
                          className={`w-full h-12 px-4 border rounded-lg text-gray-900 placeholder-gray-400
                                      focus:outline-none focus:ring-2 focus:ring-[#0771BA] focus:border-transparent
                                      transition-all
                                      ${errors.coverImage ? 'border-red-300 focus:ring-red-200' : 'border-gray-300'}`}
                        />
                        {errors.coverImage && <p className="mt-2 text-sm text-red-600">{errors.coverImage}</p>}
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                        Tags
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Digite uma tag e pressione Enter"
                          className="flex-1 h-12 px-4 border rounded-lg text-gray-900 placeholder-gray-400
                                     focus:outline-none focus:ring-2 focus:ring-[#0771BA] focus:border-transparent
                                     transition-all border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={handleTagAdd}
                          className="px-6 py-3 bg-[#0771BA] text-white rounded-lg hover:bg-[#0663A3] transition-colors font-medium"
                        >
                          Adicionar
                        </button>
                      </div>
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-2 px-3 py-1 bg-[#0771BA]/10 text-[#0771BA] rounded-full text-sm font-medium"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => handleTagRemove(tag)}
                                className="text-[#0771BA] hover:text-[#0663A3]"
                              >
                                <Icon className="h-4 w-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </Icon>
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Conteúdo do Artigo</h2>
                  
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                      Conteúdo *
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      rows={12}
                      placeholder="Escreva o conteúdo completo do seu artigo aqui..."
                      className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400
                                  focus:outline-none focus:ring-2 focus:ring-[#0771BA] focus:border-transparent
                                  transition-all resize-none
                                  ${errors.content ? 'border-red-300 focus:ring-red-200' : 'border-gray-300'}`}
                    />
                    {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content}</p>}
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-500">
                        {formData.content.length}/50 caracteres mínimos
                      </p>
                      <p className="text-sm text-gray-400">
                        {formData.content.length} caracteres
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image Preview */}
                {formData.coverImage && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview da Imagem</h3>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                      <img
                        src={formData.coverImage}
                        alt="Preview da imagem de capa"
                        className="max-w-full h-64 object-cover rounded-lg mx-auto"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {errors.form && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-600 font-medium">{errors.form}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          title: '',
                          subtitle: '',
                          content: '',
                          coverImage: '',
                          categoryId: '',
                          tags: []
                        });
                        setTagInput('');
                      }}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Limpar Formulário
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-3 bg-[#0771BA] text-white rounded-lg hover:bg-[#0663A3] 
                               disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium
                               focus:outline-none focus:ring-2 focus:ring-[#0771BA] focus:ring-offset-2"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Publicando...
                        </div>
                      ) : 'Publicar Artigo'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JournalistPage;

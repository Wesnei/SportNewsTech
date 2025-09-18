# SportTechNews

Uma plataforma moderna de notícias esportivas construída com React, TypeScript e Tailwind CSS.

## 📋 Índice

- [🚀 Tecnologias](#-tecnologias)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🎯 Funcionalidades](#-funcionalidades)
- [👥 Tipos de Usuário](#-tipos-de-usuário)
- [🛠️ Como Executar](#️-como-executar)
- [📝 Dados Mockados](#-dados-mockados)
- [🎨 Design System](#-design-system)
- [🔧 Configuração](#-configuração)
- [📱 Responsividade](#-responsividade)
- [🚀 Próximos Passos](#-próximos-passos)

## 🚀 Tecnologias

- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS 4** - Framework CSS utilitário
- **React Router DOM** - Roteamento para aplicações React
- **Vite** - Build tool e servidor de desenvolvimento
- **Framer Motion** - Biblioteca de animações
- **Axios** - Cliente HTTP para requisições
- **JWT Decode** - Decodificação de tokens JWT
- **Lucide React** - Ícones para React

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── editArticleModal/ # Modal para edição de artigos
│   ├── feed/           # Feed de notícias
│   ├── footer/         # Rodapé da aplicação
│   ├── formLogin/      # Formulário de login
│   ├── formRegister/   # Formulário de cadastro
│   ├── header/         # Cabeçalho da aplicação
│   ├── hero/           # Seção hero da homepage
│   ├── notFound/       # Componente página não encontrada
│   ├── recovery-password/ # Recuperação de senha
│   ├── reset-password/ # Reset de senha
│   └── sidebar/        # Barra lateral
├── pages/              # Páginas da aplicação
│   ├── articleDetail/  # Página de detalhes do artigo
│   ├── home/           # Página inicial
│   ├── journalist/     # Área do jornalista
│   │   └── articles/   # Gestão de artigos
│   ├── login/          # Página de login
│   ├── register/       # Página de cadastro
│   ├── recovery-password/ # Página de recuperação
│   ├── reset-password/ # Página de reset de senha
│   └── notFoundPage/   # Página 404
├── context/            # Contextos React (AuthContext)
├── hooks/              # Hooks customizados
│   ├── useFormValidation.ts # Validação de formulários
│   └── useArticleValidation.ts # Validação de artigos
├── routes/             # Configuração de rotas
│   ├── index.tsx       # Configuração principal de rotas
│   └── PrivateRoute.tsx # Rotas protegidas
├── services/           # Serviços e APIs
│   ├── api.tsx         # Configuração da API
│   └── articleService.ts # Serviços de artigos
├── types/              # Definições de tipos TypeScript
├── utils/              # Funções utilitárias
└── assets/             # Recursos estáticos
```

## 🎯 Funcionalidades

### ✅ Implementadas
- **Autenticação**: Login e cadastro com Context API
- **Sistema de Artigos**: CRUD completo de notícias
- **Área do Jornalista**: Dashboard para criação/edição de artigos
- **Tipagem**: TypeScript com interfaces bem definidas
- **Validação**: Validação de formulários e artigos com feedback visual
- **Responsividade**: Design responsivo para todos os dispositivos
- **Roteamento Protegido**: Rotas privadas baseadas em autenticação
- **Feed de Notícias**: Exibição de artigos na homepage
- **Categorização**: Sistema de categorias e tags para artigos
- **Mock Data**: Dados simulados para desenvolvimento

### 🔄 Em Desenvolvimento
- Integração com API real
- Sistema de comentários
- Busca avançada de artigos
- Perfil detalhado do usuário
- Sistema de notificações

## 👥 Tipos de Usuário

- **Visitante**: Acesso para ler notícias
- **Jornalista**: Pode criar e editar notícias
- **Editor**: Acesso completo ao sistema

## 🛠️ Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Build para produção**:
   ```bash
   npm run build
   ```

## 📝 Dados Mockados

A aplicação utiliza dados simulados para desenvolvimento:

- **Usuários**: 3 usuários de exemplo (visitante, jornalista, editor)
- **Notícias**: 3 notícias de exemplo em diferentes categorias
- **Serviços**: Funções mockadas para simular API

### Credenciais de Teste

**Visitante:**
- Email: `user@example.com`
- Senha: `password123`
- Acesso: Leitura de artigos

**Jornalista:**
- Email: `journalist@example.com`
- Senha: `password123`
- Acesso: Criação e edição de artigos

**Editor:**
- Email: `editor@example.com`
- Senha: `password123`
- Acesso: Gestão completa do sistema

## 🎨 Design System

- **Cores**: Gradientes azul, verde e roxo
- **Tipografia**: Fontes modernas e legíveis
- **Componentes**: Design consistente e acessível
- **Animações**: Transições suaves e feedback visual

## 🔧 Configuração

### Variáveis de Ambiente
```env
VITE_APP_NAME=SportTechNews
VITE_API_URL=http://localhost:3000/api
VITE_MOCK_MODE=true
```

### Configurações TypeScript
- Strict mode habilitado
- Verificação de tipos rigorosa
- Importações de tipos otimizadas

## 📱 Responsividade

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Próximos Passos

1. **Backend Integration**: Conectar com API real
2. **Advanced Features**: Sistema de comentários e reações
3. **Search & Filter**: Busca avançada com filtros
4. **User Profiles**: Perfis detalhados de usuários
5. **Real-time**: Notificações em tempo real
6. **Testing**: Testes automatizados (Jest/Testing Library)
7. **Performance**: Otimizações e lazy loading
8. **Deploy**: CI/CD e deploy em produção

---

*Versão 1.0.0 - Setembro 2025*

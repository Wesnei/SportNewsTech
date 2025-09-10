# SportNewsTech

Uma plataforma moderna de notícias esportivas construída com React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento para aplicações React
- **Vite** - Build tool e servidor de desenvolvimento

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── formLogin/      # Formulário de login
│   └── formRegister/   # Formulário de cadastro
├── pages/              # Páginas da aplicação
│   ├── login/          # Página de login
│   └── register/       # Página de cadastro
├── types/              # Definições de tipos TypeScript
├── hooks/              # Hooks customizados
├── data/               # Dados mockados para desenvolvimento
├── config/             # Configurações da aplicação
├── utils/              # Funções utilitárias
├── routes/             # Configuração de rotas
└── assets/             # Recursos estáticos
```

## 🎯 Funcionalidades

### ✅ Implementadas
- **Autenticação**: Login e cadastro de usuários
- **Tipagem**: TypeScript com interfaces bem definidas
- **Validação**: Validação de formulários com feedback visual
- **Responsividade**: Design responsivo para todos os dispositivos
- **Mock Data**: Dados simulados para desenvolvimento
- **Roteamento**: Navegação entre páginas

### 🔄 Em Desenvolvimento
- Dashboard do usuário
- Sistema de notícias
- Perfil do usuário
- Integração com API real

## 👥 Tipos de Usuário

- **Leitor**: Acesso para ler notícias
- **Jornalista**: Pode criar e editar notícias
- **Admin**: Acesso completo ao sistema

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

- **Usuários**: 3 usuários de exemplo (leitor, jornalista, admin)
- **Notícias**: 3 notícias de exemplo em diferentes categorias
- **Serviços**: Funções mockadas para simular API

### Credenciais de Teste

**Visitante:**
- Email: `joao@email.com`
- Senha: `123456`

**Jornalista:**
- Email: `maria@email.com`
- Senha: `123456`
- Código: `JOR001`

**Editor:**
- Email: `pedro@email.com`
- Senha: `123456`

## 🎨 Design System

- **Cores**: Gradientes azul, verde e roxo
- **Tipografia**: Fontes modernas e legíveis
- **Componentes**: Design consistente e acessível
- **Animações**: Transições suaves e feedback visual

## 🔧 Configuração

### Variáveis de Ambiente
```env
VITE_APP_NAME=SportNewsTech
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

1. Implementar dashboard
2. Sistema de notícias completo
3. Integração com API real
4. Testes automatizados
5. Deploy em produção

## 👨‍💻 Desenvolvido por

**Wesnei** - Desenvolvedor Full Stack

---

*Versão 1.0.0 - Janeiro 2025*
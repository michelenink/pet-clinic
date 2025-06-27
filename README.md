# 🐾 Pet Clinic - Sistema de Gestão Veterinária

Um sistema completo de gestão para clínicas veterinárias, desenvolvido com **Next.js 15**, **TypeScript** e **PostgreSQL**. Oferece uma interface moderna e intuitiva para gerenciar pacientes, pets, veterinários, agendamentos e pagamentos.

![Pet Clinic Dashboard](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-UI-38B2AC)

## 🎯 Sobre o Projeto

Este sistema foi desenvolvido para modernizar a gestão de clínicas veterinárias, oferecendo:

- **Gestão Completa**: Pacientes, pets, veterinários e agendamentos
- **Dashboard Analítico**: Gráficos e métricas em tempo real
- **Sistema de Pagamentos**: Integração com Stripe
- **Autenticação Segura**: Better Auth com verificação de e-mail
- **Interface Responsiva**: Design moderno com Tailwind CSS
- **Tema Dark/Light**: Experiência personalizada do usuário

## 🚀 Tecnologias Utilizadas

### Frontend

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/ui** - Componentes UI reutilizáveis
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **Recharts** - Gráficos e visualizações
- **React Query** - Gerenciamento de estado servidor

### Backend & Database

- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM type-safe para TypeScript
- **Better Auth** - Sistema de autenticação
- **Next Safe Action** - Server Actions tipadas

### Payments & Subscription

- **Stripe** - Processamento de pagamentos
- **Webhooks** - Sincronização de assinaturas

### Deploy & Development

- **Vercel** - Plataforma de deploy
- **ESLint + Prettier** - Linting e formatação
- **TypeScript** - Desenvolvimento type-safe

## ✨ Funcionalidades

### 📊 Dashboard

- Métricas gerais da clínica (receita, agendamentos, pacientes)
- Gráficos de agendamentos por período
- Top médicos e especialidades
- Agendamentos do dia

### 👥 Gestão de Pacientes

- Cadastro completo de proprietários
- Histórico de pets por paciente
- Informações de contato e documentos

### 🐕 Gestão de Pets

- Cadastro detalhado (espécie, raça, idade, sexo)
- Vinculação com proprietários
- Histórico médico

### 👨‍⚕️ Gestão de Veterinários

- Cadastro de profissionais
- Especialidades médicas
- Horários de disponibilidade
- Preços de consulta

### 📅 Sistema de Agendamentos

- Agenda dinâmica por veterinário
- Verificação de disponibilidade
- Histórico de consultas
- Gestão completa de horários

### 💳 Sistema de Pagamentos (Opcional)

- Integração completa com Stripe
- Planos de assinatura opcionais
- Webhooks para sincronização
- Modo demonstração gratuito
- Histórico de transações

### 🔐 Autenticação & Segurança

- Login com e-mail/senha ou Google
- Sessões seguras
- OAuth com Google

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+
- PostgreSQL 12+
- Conta Stripe (para pagamentos)
- Conta Google Cloud (para OAuth)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/pet-clinic.git
cd pet-clinic
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/pet_clinic"

# Auth
BETTER_AUTH_SECRET="seu_secret_muito_seguro"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="seu_google_client_id"
GOOGLE_CLIENT_SECRET="seu_google_client_secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 4. Configure o banco de dados

```bash
# Execute as migrações
npx drizzle-kit push

# (Opcional) Popule com dados de exemplo
npm run seed
```

### 5. Execute o projeto

```bash
npm run dev
```

Acesse `http://localhost:3000` no seu navegador.

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── (protected)/       # Rotas protegidas
│   │   ├── dashboard/     # Dashboard principal
│   │   ├── appointments/  # Gestão de agendamentos
│   │   ├── patients/      # Gestão de pacientes
│   │   ├── pets/         # Gestão de pets
│   │   ├── doctors/      # Gestão de veterinários
│   │   └── settings/     # Configurações
│   ├── authentication/   # Páginas de auth
│   └── api/              # API Routes
├── components/           # Componentes reutilizáveis
│   └── ui/              # Componentes base (Shadcn)
├── db/                  # Configuração e schemas do DB
├── lib/                 # Utilitários e configurações
├── actions/             # Server Actions
└── hooks/               # Custom React Hooks
```

## 🚦 Scripts Disponíveis

```bash
npm run dev          # Executa em modo desenvolvimento
npm run build        # Build para produção
npm run start        # Executa build de produção
npm run lint         # Executa linting
npm run db:push      # Aplica mudanças no schema do DB
npm run db:studio    # Interface visual do DB
```

## 🎨 Design System

O projeto utiliza um design system baseado em:

- **Cores**: Paleta moderna com suporte a tema escuro/claro
- **Tipografia**: Inter font para melhor legibilidade
- **Componentes**: Baseados no Radix UI com customizações
- **Responsividade**: Mobile-first design
- **Acessibilidade**: Seguindo padrões WCAG

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

[Visite meu linkedin](https://www.linkedin.com/in/michelenink/)

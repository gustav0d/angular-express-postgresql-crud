# Angular express pgsql crud

## Sobre o projeto

A aplicação será um Sistema de Gerenciamento de Tarefas Colaborativas que permitirá a múltiplos usuários criarem, visualizar e gerenciar tarefas.

## Tecnologias utilizadas

- **Frontend:** Angular 20
- **Backend:** Node.js 22 com Express 5
- **Banco de Dados:** PostgreSQL
- **ORM:** Sequelize
- **Validação:** Zod
- **Autenticação:** JWT
- **Gerenciamento de pacotes:** pnpm
- **Monorepo:** Turborepo
- **Containerização:** Docker e Docker Compose

## Instalação e execução

### Pré-requisitos

- Node.js >= 22
- pnpm >= 10
- Docker e Docker Compose

### Passos para rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/gustav0d/angular-express-postgresql-crud
   cd angular-express-pgsql-crud
   ```
2. **Instale as dependências:**
   ```bash
   pnpm install
   ```
3. **Configure variáveis de ambiente:**
   - Copie os arquivos `.env.example` para `.env` em `apps/backend` e `apps/frontend` se necessário.
   - Ajuste as variáveis conforme seu ambiente.
   - Isto pode ser feito de forma automatizada:
   ```bash
   pnpm config:local
   ```
4. **Suba o banco de dados com Docker Compose:**

   ```bash
   pnpm compose:up
   ```

   Isso criará os containers do PostgreSQL para desenvolvimento e testes (ainda não implementados).

5. **Inicie o BE+FE com Turborepo:**
   ```bash
   pnpm dev
   ```
6. **Acesse a aplicação:**
   - Frontend: http://localhost:4200
   - Backend (API): http://localhost:3001

### Outros comandos úteis

- Parar os containers:
  ```bash
  pnpm compose:down
  ```

## Arquitetura e principais decisões

- **Monorepo:** O projeto utiliza TurboRepo para gerenciar frontend e backend em um único repositório, facilitando scripts compartilhados e integração.
- **Separação de responsabilidades:**
  - `apps/frontend`: Aplicação Angular (SPA) para interface do usuário.
  - `apps/backend`: API RESTful em Node.js/Express, responsável pela lógica de negócio e persistência.
- **Banco de dados:** PostgreSQL, com containers separados para desenvolvimento e testes.
- **ORM:** Sequelize para abstração do banco relacional.
- **Validação e segurança:** Uso de Zod para validação de dados e JWT para autenticação.
- **Containerização:** Docker Compose para facilitar o setup do banco de dados e ambientes isolados.
- **Scripts padronizados:** Uso de pnpm scripts para padronizar comandos de build, dev e configuração.

## Referências utilizadas

- https://dev.to/this-is-angular/my-favorite-angular-setup-in-2025-3mbo

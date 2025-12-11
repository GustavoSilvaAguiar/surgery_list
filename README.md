# FinX – Case Técnico Front-end

Este projeto foi desenvolvido como parte do processo seletivo para a vaga de Desenvolvedor Front-end na Fin-X.
O objetivo é criar uma interface moderna, responsiva e performática para listagem e análise de agendamentos cirúrgicos, consumindo dados mockados via API (json-server).

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando o ecossistema Vue 3 com as melhores práticas modernas.

### Front-end:

- Vue 3 (Composition API)

- TypeScript

- Vite

- Vuetify 3 – UI components

- Vue Router – Rotas

- Axios – Requisições HTTP

- Vue-ChartJS + Chart.js 4 – Gráficos do dashboard

### Backend Mock:

- json-server – Mock API para simular o endpoint GET com paginação, filtros e ordenação.

## 📦 Instalação e Configuração

### 1. Clone o repositório

git clone https://github.com/GustavoSilvaAguiar/surgery_list.git

cd seu-repo

### 2. Instale as dependências

npm install

### 3. Inicie o mock da API (json-server)

npm run backend

O JSON das cirurgias está localizado em:

db/db.json

A API ficará disponível em:

http://localhost:3000

### 4. Inicie o ambiente de desenvolvimento

npm run dev

A aplicação abre em:

http://localhost:5173

## 🗂 Estrutura de Pastas

Estrutura limpa inspirada em boas práticas e separação de responsabilidades:

```shell
.
src/
|   App.vue
|   main.ts
|
+---assets
|
+---components # componentes compartilhados por toda a aplicação
|
+---interfaces
|
+---modules
|   +---dashboard
|   |   |   dashboard.routes.ts # configuração de rota para o módulo
|   |   |
|   |   +---composable # composable para o respectivo módulo
|   |   |       dashboardComposable.ts 
|   |   |
|   |   \---views # pasta contendo as telas do respectivo módulo
|   |           dashboardView.vue
|   |
|   \---surgery_list
|       |   surgery_list.routes.ts
|       |
|       +---composable
|       |       surgeryListComposable.ts
|       |
|       \---views
|               surgeryListMainView.vue
|
+---plugins # configuração de blibliotecas
|       chartjs.ts
|       vuetifyPlugin.ts
|       vuetoastificationPlugin.ts
|
+---router # configuração de rotas da aplicação
|       index.ts
|
+---services
|   |   api.ts # configuração geral da api
|   |
|   \---Surgery # configuração de rotas especificas para consumo da api
|           surgeryService.ts 
|
+---stores
|       counter.ts
|
\---views # tela em que há a configuração do layout principal
        HomeView.vue

```

## 📊 Funcionalidades Implementadas

✔ 1. Listagem de Agendamentos

Tabela responsiva

Paginação real (\_page e \_limit)

Ordenação (\_sort, \_order)

Busca global por paciente/médico

Botão "Limpar Filtros"

Drawer lateral com filtros avançados

Lista totalmente dinamizada via params do Axios

✔ 2. Filtros Avançados

Nome do paciente

Nome do médico

Data de nascimento

Intervalo de datas de criação

Todos combináveis entre si.

✔ 3. Modal de Detalhes

Ao clicar no botão “Visualizar”, um modal é aberto com:

ID

Nome do paciente

Idade

Médico responsável

Data de cadastro

UX projetada para evitar troca de página desnecessária.

✔ 4. Dashboard Analítica
Gráficos incluídos:

Percentual por faixa etária (Doughnut)

Agendamentos dos últimos 12 meses (Line)

Agendamentos por médico (últimos 12 meses) (Bar)

Percentual de agendamentos por médico (Doughnut)

Todos os gráficos são alimentados com dados da API mockada e processados no composable.

## 🛠 Comandos Disponíveis

Comando e descrição:

- npm run dev Inicia a aplicação Vue

- npm run build Gera build para produção

- npm run backend Sobe o json-server na porta 3000

## 🧪 Boas Práticas Aplicadas

Arquitetura modular com serviços + composables

Separação total entre UI e camada de dados

Código limpo (Clean Code)

Uso consistente de TypeScript

Componentização eficiente

Responsividade total

Commits semânticos (Conventional Commits)

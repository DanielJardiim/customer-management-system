# Customer Management System

Este é um projeto de sistema de gerenciamento de clientes para uma empresa de limpeza de residências. O objetivo é proporcionar uma solução eficiente para o cadastro e visualização das informações dos clientes, atualmente controladas em planilhas. A plataforma foi desenvolvida para centralizar essas informações e facilitar a expansão da empresa.

## Tecnologias Utilizadas

- **Backend:**
  - Node.js
  - Fastify
  - PostgreSQL
- **Frontend:**
  - React
  - Vite (ferramenta de build)

## Versões das Ferramentas Utilizadas

- Node.js: v18.15.0
- PostgreSQL: v16.2
- React: v18.2.0
- Vite: v5.1.4
- Fastify: v4.26.2

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

- **customer-management-system**: Pasta principal do projeto.
  - **back-end**: Pasta contendo o código do backend.
  - **front-end**: Pasta contendo o código do frontend.

## Funcionalidades

- Cadastro de novos clientes.
- Visualização e edição das informações dos clientes cadastrados.
- Pesquisa rápida e eficiente dos clientes.
- Gerenciamento completo das informações dos clientes.
- Rota calculada para ter a menor distância possível.
- Deletar um cliente específico.

## Configuração e Execução

### Backend

1. Navegue até o diretório `back-end`.
2. Instale as dependências usando `npm install`.
3. Configure as variáveis de ambiente, incluindo as credenciais do banco de dados PostgreSQL.
4. Execute o servidor usando `npm start`.

### Frontend

1. Navegue até o diretório `front-end`.
2. Instale as dependências usando `npm install`.
3. Execute o frontend usando `npm run dev`.

## Rotas da API

- `GET /customers`: Retorna todos os clientes cadastrados.
- `POST /customers`: Cria um novo cliente.
- `GET /customers/filter?filterKey=filterKey&filterValue=filterValue`: Retorna informações filtradas sobre um cliente específico.
- `GET /customers/calculate-optimal-route`: Calcula a rota com a menor distância possível.
- `DELETE /customers?id=idValue`: Deleta um cliente específico.

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões para melhorar este projeto, fique à vontade para abrir uma issue ou enviar um pull request.

## Autores

- [Daniel Jardim Nunes](https://github.com/DanielJardiim) - Desenvolvedor Full Stack

---

Este README foi criado com base nas necessidades do projeto, fornecendo uma visão geral clara e concisa, juntamente com instruções de configuração e execução.

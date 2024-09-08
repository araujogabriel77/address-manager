# Gerenciador de Endereços
A aplicação web permite ao usuário realizar login e gerenciar um CRUD de endereços,
ele poderá inserir o endereço manualmente ou informar um CEP para aplicação buscar os dados do
endereço através da integração com a API do ViaCEP (<https://viacep.com.br/>), além disso ele também
poderá exportar os seus endereços salvos para um arquivo CSV.

## Requisitos do Sistema

#### Tela de Login

- **Autenticação de usuário.**
- **Validação de credenciais.**
- **Redirecionamento para a página de endereços após login bem-sucedido.**

#### CRUD de Endereços

- **Permitir que o usuário adicione, visualize, edite e exclua endereços.**
- **Cada endereço deve conter: cep, logradouro, complemento (opcional), bairro, cidade, uf, numero.**
- **Permitir que o usuário exporte seus endereços salvos para um arquivo CSV.**

#### Banco de dados

- **Criação da tabela Usuários contendo: Id, nome, usuário e senha.**
- **Criação da tabela de Endereços contendo: Id, cep, logradouro, complemento (opcional), bairro, cidade,
uf, numero e id do usuário.**

# Pré-requisitos

- Docker
- Docker Compose
- Node ^20.15.1 para desenvolvimento local (se necessário)

# Rodando projeto

## Docker

| Um aquivo docker-compose.yml foi disponibilizado com todas as imagens necessárias e já conectadas entre si.

```bash
  $ cp .env.example .env
  $ docker compose up -d --build
```

----
A api estará disponível no endereço <http://localhost:3000/api>
A documentação dos endpoints com todos os exemplos de entrada e de resposta estará disponível no endereço <http://localhost:3000/docs>

O front estará disponível no endereço <http://localhost> ou <http://localhost:80>

----

## Local

Se preferir pode rodar a aplicação locamente
Será necessário:
- uma instância do postgresql:16
- Node ^20.15.1

### Api

Dentro do diretório **api/**

será necessário criar um arquivo .env com o mesmo conteúdo do arquivo .env.example disponibilizado

execute os comandos:

- ```$ npm i```
- ```$ npm run start```

O servidor será iniciado na rota <http://localhost:3000/api>

### Front

Dentro do diretório **front/** execute os comandos:

- ```$ npm i```
- ```$ npm dev```

O frontend será iniciado na rota <http://localhost:5173>

----

### Estrutura do banco de dados

O script de criação das tabelas está localizado no diretório:

| **api/src/infra/database/migrations/1706664681010-initial-structure.ts**

----

## Conceitos técnicos API

Nestjs foi escolhido como ferramenta pela capacidade de encapsulamento e por ser o mais completo framework nodejs.

Foi pensada de uma maneira que possibilite o escalamento da aplicação.

A api foi desenvolvida aplicando conceitos de DDD e SOLID.
As entidades da aplicação estão contidas dentro do diretório domain e para a representação das tabelas do banco de dados a nomenclatura "Model" foi utilizada.

| As entidades se encontram no diretório src/domain/

| Os models estão no diretório src/infra/repositories/ junto da implementação do repositório

A arquitetura foi construída de forma que a nossa camada de negócio seja agnóstica a banco de dados, assim tendo a função apenas de lidar com as regras.

## Frontend

O client foi desenvolvido com React utilizando NexUI components + tailwindcss

A biblioteca MUI também foi utilizada para suprir a falta de alguns componentes (Snackbar, Alert) das bibliotecas citadas acima. 

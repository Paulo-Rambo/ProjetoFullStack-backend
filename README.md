## Começando:
Digite no git bash:
```
 yarn install
```
No terminal do seu psql:
```
 CREATE DATABASE NOME_DO_BANCO;
```
Renomeio o arquivo .env para env e preencha os dados do banco de dados.\
Faça as migrations: 
```
 yarn typeorm migration:generate -d ./src/data-source ./src/migrations/firstMigration
 yarn typeorm migration:run -d ./src/data-source
```
Para rodar:
```
 yarn dev
```

## Rotas:
  http://127.0.0.1:3001/clients/login
  http://127.0.0.1:3001/clients
  http://127.0.0.1:3001/clients/contacts
  http://127.0.0.1:3001/clients/contacts_left
  http://127.0.0.1:3001/clients/<:nome do contato>
  
  http://127.0.0.1:3001/contacts/login
  http://127.0.0.1:3001/contacts
  
  

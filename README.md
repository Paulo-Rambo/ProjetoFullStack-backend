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
```
  http://127.0.0.1:3001/clients/login
  http://127.0.0.1:3001/clients
  http://127.0.0.1:3001/clients/contacts
  http://127.0.0.1:3001/clients/contacts_left
  http://127.0.0.1:3001/clients/<:nome do contato>
  
  http://127.0.0.1:3001/contacts/login
  http://127.0.0.1:3001/contacts
```
  
## Cria usuario - status 201
###POST
/contacts
ou
/clients

Exemplo:
```
{
	"name": "User foda",
	"email": "sopa@kenzie.com",
	"password": "1212##dsds",
	"telephone": "13998867654"
}
```
### Response OK:
```
{
	"data": {
		"createdAt": "2023-04-03T11:43:50.318Z",
		"telephone": "33434",
		"email": "sffopag@kenzie.com",
		"name": "usergfffsd23",
		"id": "ffd82a21-2067-4a1a-973a-a44009c55f9b"
	},
	"message": "Criado com sucesso"
}
```

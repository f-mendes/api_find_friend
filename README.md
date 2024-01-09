# API Find a Friend

Bem-vindo à API Find a Friend, desenvolvida como parte do Desafio 03 da trilha de API Node.js com SOLID do Ignite. Esta API oferece funcionalidades para criar, listar, atualizar, excluir pets e organizações.
## Como Usar
### Pré-requisitos
*Certifique-se de ter o Node.js instalado em seu ambiente.*

### Instalação

* Clone este repositório:

```
    git clone https://github.com/f-mendes/api_find_friend.git

```

* Acesse o diretório do projeto:

```

    cd api_find_friend 

```

* Instale as dependências:

```
    npm install
```

* Inicie o container postgresql

```

    docker container up -d

```

* Inicie o servidor:

```

    npm run start:dev

```

### Testes Unitário

```

    npm run test

```

### Testes e2e

```

    npm run test:e2e

```

__A API estará acessível em http://localhost:3333 por padrão. Certifique-se de que a porta 3333 esteja disponível.__

## Uso da API

### A API oferece as seguintes rotas:

### User

* POST - /users: Cria um novo usuário.

* POST - /sessions: Faz autenticação de um usuário.

* PATCH - /token/refresh: Renova autenticação do usuário logado.

### Org

* POST - /orgs: Cria uma nova organização.

### Pets

* POST - /pets: Cria um novo pet.

* GET - /pets?page=2&city=Recife: Filtra os pets

* GET - /pets/:id : Busca um pet pelo id




### Considerações Adicionais

__Work in progress__
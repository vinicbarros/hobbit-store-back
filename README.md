<div align="center"><img src="https://i.imgur.com/qcmHJz1.png"></img></div>
<hr>
<h2 align=center>Hobbit Store</h2>
<h3 align=center>Aplicativo Web de um E-Commerce | Projeto Back-End</h3>
<hr>
<h4 align=center>Um projeto completo de E-Commerce feito com React.js baseado no universo de Senhor dos Anéis!</h4>
<h4 align=center>Esse repositório é apenas o front-end, você pode encontrar o back-end no meu perfil.</h4>
<br>
Esse projeto é parte de um processo seletivo da MyPharma para a vaga de Engenheiro de Software.

O objetivo do projeto técnico era criar um E-Commerce full stack com React + Node + MongoDB.

## Requisitos do case:

- [x] Search por nome do produto
- [x] Tela de detalhes do produto
- [x] Filtro por categoria
- [x] Ordenação (ex: Menor preço, maior preço)
- [x] Botão de adicionar e remover do carrinho de comprar
- [x] Carrinho de compras   
- [x] Testes unitários

## Funcionalidades da API:

- [x] Retornar todos os produtos
- [x] Retornar um único produto de acordo com o id passado
- [x] Search por produtos
- [x] Filtragem de produtos por categorias
- [x] Adicionar produto ao carrinho
- [x] Remover produto do carrinho
- [x] Retornar o carrinho do usuário
- [x] Adicionar um produto (rota de desenvolvimento)
- [x] Salvar uma fingerprint de identificação do usuário no banco
- [x] Testes unitários para as funções de services

### Como rodar a aplicação

<hr>

1. Clone o projeto

```bash
  git clone https://github.com/vinicbarros/hobbit-store-back.git
```

2. Vá para o diretório do projeto

```bash
  cd hobbit-store-back0
```

3. Instale as dependências

```bash
  npm install
```

4. Crie e popule o arquivo `.env.prod` de acordo com a instrução passada no `.env.example`, se você não popular o `.env.prod`, sua aplicação 
*NÃO* vai rodar. Se você tem dúvidas de como preencher a connection string do MongoDB, confira este artigo: 
<a href="https://naiveskill.com/mongodb-connection-string/">Connection String.</a>

```bash
  PORT= por padrão, a porta é 4000, mas fique à vontade para colocar qual quiser
  
  MONGODB_URL= url com a porta que o mongo está aberto
  MONGODB_USERNAME= username
  MONGODB_PASSWORD= senha
  MONGODB_DATABASE= nome do banco
  // se você está usando o MongoDB Atlas, desconsidere as variáveis acima e troque
  // o valor da variável abaixo pela connection string do seu MongoDB Atlas.

  MONGODB_URI=mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DATABASE}
```

5. Se caso você estiver usando MongoDB Atlas, apenas copie a connection string e cole na variável `MONGODB_URI` do `.env.prod`.

6. Após certificar que preencheu todas as variáveis corretamente, rode a aplicação: 

```bash
  npm run dev
```

### Como rodar a aplicação COM DOCKER

<hr>

1. Clone o projeto

```bash
  git clone https://github.com/vinicbarros/hobbit-store-back.git
```

2. Vá para o diretório do projeto

```bash
  cd hobbit-store-back0
```

3. Instale as dependências

```bash
  npm install
```

4. Com o Docker e Docker-Compose instalados, rode o seguinte comando na raiz do projeto:

```bash
  docker compose up -d
  //OU (depende da versão)
  docker-compose up -d
```

5. Crie e popule o arquivo `.env.prod` de acordo com a instrução passada no `.env.example`, se você não popular o `.env.prod`, sua aplicação 
*NÃO* vai rodar. Se você tem dúvidas de como preencher a connection string do MongoDB, confira este artigo: 
<a href="https://naiveskill.com/mongodb-connection-string/">Connection String.</a>

```bash
  PORT= por padrão, a porta é 4000, mas fique à vontade para colocar qual quiser
  
  MONGODB_URL=localhost:27017
  MONGODB_USERNAME=root
  MONGODB_PASSWORD=password
  MONGODB_DATABASE= nome do banco
  
  MONGODB_URI=mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DATABASE}
```

6. Rode a aplicação:

```bash
  npm run dev
```

## Documentação da API

<br>

### Cria um novo produto

<hr>

```http
  POST /products
```

Body:

```json
  {
    "name": "Lápis-Lazúli",
    "image": "https://exemplo.com/imagem29.jpg",
    "details": "Uma pedra preciosa azul usada para fazer joias e outros itens de luxo",
    "price": 19999,
    "category": "Suprimentos"
  }
```

Response:

- Body inválido

```json
"status": 400
```

- O nome já foi utilizado

```json
"status": 400
```

- Produto criado

```json
"status": 201
```

<br>

### Retorna todos os produtos

<hr>

```http
  GET /products
```

Response body:

```json
[
    {    
        "_id": "a1s2d4f5g6h7j8k9l0a2d5g7n4",
        "name": "O Anel do Poder de Barad-dûr",
        "image": "https://image.com/image.png",
        "details": "O anel criado por Sauron em Barad-dûr para controlar a Terra-média",
        "category": "Anéis",
        "price": 99999
    },
    {
        "_id": "a1s2d4f5g6h7j8k9l0a2d5g7n4",
        "name": "Anel de Durin",
        "image": "https://image.com/image.png",
        "details": "Anel pertencente a Durin III, o mais poderoso rei dos anões de Moria",
        "category": "Anéis",
        "price": 199999
    },
]
```

<br>

### Retorna todos os produtos filtrados por categoria

<hr>

```http
  GET /products/:category
```

| Parâmetro  | Tipo     | Descrição                            |
| :--------- | :------- | :----------------------------------- |
| `category` | `string` | **Precisa ser uma categoria válida** |

Response:

```json
[
    {
        "_id": "a1s2d4f5g6h7j8k9l0a2d5g7n4",
        "name": "Lápis-Lazúli",
        "image": "https://exemplo.com/imagem29.jpg",
        "details": "Uma pedra preciosa azul usada para fazer joias e outros itens de luxo",
        "price": 19999,
        "category": "Suprimentos"
    }
]
```

<br>

### Retorna o produto de acordo com o id passado

<hr>

```http
  GET /products/product/:productId
```

| Parâmetro   | Tipo     | Descrição                     |
| :---------- | :------- | :---------------------------- |
| `productId` | `string` | **Precisa ser um id válido**  |

Response:

```json
[
    {
        "_id": "a1s2d4f5g6h7j8k9l0a2d5g7n4",
        "name": "Lápis-Lazúli",
        "image": "https://exemplo.com/imagem29.jpg",
        "details": "Uma pedra preciosa azul usada para fazer joias e outros itens de luxo",
        "price": 19999,
        "category": "Suprimentos"
    }
]
```

<br>

### Search por nome do produto, retorna todos os produtos encontrados

<hr>

```http
  GET /search/:product
```

| Parâmetro  | Tipo     | Descrição                            |
| :--------- | :------- | :----------------------------------- |
| `product`  | `string` |                                      |

Response:

```json
[
    {
        "_id": "a1s2d4f5g6h7j8k9l0a2d5g7n4",
        "name": "Lápis-Lazúli",
        "image": "https://exemplo.com/imagem29.jpg",
        "details": "Uma pedra preciosa azul usada para fazer joias e outros itens de luxo",
        "price": 19999,
        "category": "Suprimentos"
    }
]
```

<br>

### Retorna uma string de identificação do usuário

<hr>

```http
  GET /cart/fingerprint
```

Response:

```json
{
  "fingerprint": "fiodsgsirtrijakmfslk"
}
```

<br>

### **Todas as rotas abaixo são rotas autenticadas e utilizam um "Authorization Header" como mostrado a seguir**

Ao invés de "fingerprint", use sua própria fingerptint adquirida através da rota `GET /cart/fingerprint`.

```json
{
  "headers": {
    "Authorization": "Bearer fingerprint"
  }
}
```

<br>

### Adicionar produto ao carrinho

<hr>

```http
  POST /cart/:productId
```

| Parâmetro   | Tipo     | Descrição                     |
| :---------- | :------- | :---------------------------- |
| `productId` | `string` | **Precisa ser um id válido**  |

Response:

- Parâmetro inválido

```json
"status": 400
```

- Produto não existe

```json
"status": 404
```

- Produto adicionado ao carrinho

```json
"status": 200
```

<br>

### Remover produto do carrinho

<hr>

```http
  DELETE /cart/:itemId
```

| Parâmetro   | Tipo     | Descrição                     |
| :---------- | :------- | :---------------------------- |
| `itemId`    | `string` | **Precisa ser um id válido**  |

Response:

- Parâmetro inválido

```json
"status": 400
```

- Fingerprint recebida pelo Header não é igual a fingerprint de quem adicionou ao carrinho

```json
"status": 401
```

- Produto removido do carrinho

```json
"status": 200
```

<br>

### Retorna todos os produtos no carrinho

<hr>

```http
  GET /cart
```

Response:

```json
 [
    {    
        "_id": "a1s2d4f5g6h7j8k9l0a2d5g7n4",
        "productId": "cvbgfdertyujhg567834zx23",
        "fingerprint": "geirongosdbnrfy",
        "productName": "O Anel do Poder de Barad-dûr",
        "productImg": "https://image.com/image.png",
        "productPrice": 99999
    },
    {
        "_id": "a1s2d4f5g6h7j8k9l0a2d5g7n4",
        "productId": "cvbgfdertyujjhy678hgx235",
        "fingerprint": "fsdijownelsnfseij",
        "productName": "Anel de Durin",
        "productImg": "https://image.com/image.png",
        "productPrice": "34670"
    },
]
```

<br>

### Tecnologias Utilizadas

![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Eslint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)


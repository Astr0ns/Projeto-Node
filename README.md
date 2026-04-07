# MeuProjeto — Node.js + Express + MySQL

## Estrutura

```
project/
├── src/
│   ├── config/
│   │   └── database.js        # Conexão MySQL (pool)
│   ├── controllers/
│   │   ├── HomeController.js
│   │   ├── AuthController.js  # Login, register, logout
│   │   └── UserController.js  # CRUD de usuários
│   ├── middlewares/
│   │   └── auth.js            # authMiddleware / guestMiddleware
│   ├── models/
│   │   └── User.js            # Queries do banco
│   ├── routes/
│   │   ├── index.js
│   │   ├── home.js
│   │   ├── auth.js
│   │   └── users.js
│   ├── views/
│   │   ├── partials/          # header.ejs, footer.ejs
│   │   ├── auth/              # login.ejs, register.ejs
│   │   ├── users/             # index.ejs, show.ejs, edit.ejs
│   │   ├── home.ejs
│   │   ├── about.ejs
│   │   ├── dashboard.ejs
│   │   ├── 404.ejs
│   │   └── 500.ejs
│   ├── public/
│   │   ├── css/style.css
│   │   └── js/main.js
│   └── server.js
├── database.sql               # Script para criar tabela
├── .env.example
├── .gitignore
└── package.json
```

## Como rodar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env
# Edite o .env com seus dados do MySQL
```

### 3. Criar banco e tabela no MySQL
```bash
mysql -u root -p < database.sql
```

### 4. Iniciar o servidor
```bash
# Produção
npm start

# Desenvolvimento (com auto-reload)
npm run dev
```

Acesse: http://localhost:3000

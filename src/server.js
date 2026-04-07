require('dotenv').config();
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── View Engine ────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ─── Middlewares ─────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method')); // suporte a PUT/DELETE via formulário HTML
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'segredo123',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 dia
}));

// ─── Rotas ───────────────────────────────────────────────────────
app.use('/', routes);

// ─── 404 ─────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).render('404', { title: 'Página não encontrada', user: req.session.user || null });
});

// ─── Error Handler ────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Erro interno', user: req.session.user || null });
});

// ─── Start ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

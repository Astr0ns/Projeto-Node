const User = require('../models/User');
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const AuthController = {
  // GET /login
  showLogin(req, res) {
    res.render('auth/login', { title: 'Entrar', error: null, user: null });
  },

  // POST /login
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.render('auth/login', { title: 'Entrar', error: 'E-mail não encontrado.', user: null });
      }
      const valid = await User.checkPassword(password, user.password);
      if (!valid) {
        return res.render('auth/login', { title: 'Entrar', error: 'Senha incorreta.', user: null });
      }
      const isAdmin = user.email === ADMIN_EMAIL;
      req.session.userId = user.id;
      req.session.user = { id: user.id, name: user.name, email: user.email, isAdmin };
      const redirectTo = req.session.returnTo || '/dashboard';
      delete req.session.returnTo;
      req.session.save(() => {
        res.redirect(redirectTo);
      });
    } catch (err) {
      console.error(err);
      res.render('auth/login', { title: 'Entrar', error: 'Erro interno. Tente novamente.', user: null });
    }
  },

  // GET /register
  showRegister(req, res) {
    res.render('auth/register', { title: 'Cadastrar', error: null, user: null });
  },

  // POST /register
  async register(req, res) {
    const { name, email, password } = req.body;
    try {
      const existing = await User.findByEmail(email);
      if (existing) {
        return res.render('auth/register', { title: 'Cadastrar', error: 'E-mail já cadastrado.', user: null });
      }
      const id = await User.create({ name, email, password });
      const isAdmin = email === ADMIN_EMAIL;
      req.session.userId = id;
      req.session.user = { id, name, email, isAdmin };
      req.session.save(() => {
        res.redirect('/dashboard');
      });
    } catch (err) {
      console.error(err);
      res.render('auth/register', { title: 'Cadastrar', error: 'Erro ao criar conta.', user: null });
    }
  },

  // POST /logout
  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  },
};

module.exports = AuthController;

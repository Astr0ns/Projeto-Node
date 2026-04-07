const User = require('../models/User');

const UserController = {
  // GET /dashboard
  async dashboard(req, res) {
    res.render('dashboard', {
      title: 'Dashboard',
      user: req.session.user,
    });
  },

  // GET /users
  async index(req, res) {
    const users = await User.findAll();
    res.render('users/index', { title: 'Usuários', users, user: req.session.user });
  },

  // GET /users/:id
  async show(req, res) {
    const found = await User.findById(req.params.id);
    if (!found) return res.status(404).render('404', { title: 'Não encontrado', user: req.session.user });
    res.render('users/show', { title: found.name, found, user: req.session.user });
  },

  // GET /users/:id/edit
  async edit(req, res) {
    const found = await User.findById(req.params.id);
    if (!found) return res.status(404).render('404', { title: 'Não encontrado', user: req.session.user });
    res.render('users/edit', 
      { title: 'Editar', found, error: null, user: req.session.user });
  },

  // PUT /users/:id
  async update(req, res) {
    const { name, email } = req.body;
    try {
      await User.update(req.params.id, { name, email });
      // Atualiza sessão se for o próprio usuário
      if (req.session.userId == req.params.id) {
        req.session.user = { ...req.session.user, name, email };
      }
      res.redirect('/users');
    } catch (err) {
      const found = await User.findById(req.params.id);
      res.render('users/edit', { title: 'Editar', found, error: 'Erro ao atualizar.', user: req.session.user });
    }
  },

  // DELETE /users/:id
  async destroy(req, res) {
    await User.delete(req.params.id);
    res.redirect('/users');
  },
};

module.exports = UserController;

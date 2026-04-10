const User = require('../models/User');
const { validateCPF } = require('../helpers/cpfValidator');

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
    if (!req.session.user?.isAdmin) {
      return res.status(403).render('403', { title: 'Acesso negado', user: req.session.user });
    }
    const users = await User.findAll();
    res.render('users/index', { title: 'Usuários', users, user: req.session.user });
  },

  // GET /users/:id
  async show(req, res) {
    const found = await User.findById(req.params.id);
    if (!found) return res.status(404).render('404', { title: 'Não encontrado', user: req.session.user });
    if (!req.session.user?.isAdmin && String(req.session.userId) !== String(req.params.id)) {
      return res.status(403).render('403', { title: 'Acesso negado', user: req.session.user });
    }
    res.render('users/show', { title: found.name, found, user: req.session.user });
  },

  // GET /users/:id/edit
  async edit(req, res) {
    const found = await User.findById(req.params.id);
    if (!found) return res.status(404).render('404', { title: 'Não encontrado', user: req.session.user });
    if (!req.session.user?.isAdmin && String(req.session.userId) !== String(req.params.id)) {
      return res.status(403).render('403', { title: 'Acesso negado', user: req.session.user });
    }
    res.render('users/edit', { title: 'Editar', found, error: null, user: req.session.user });
  },

  // PUT /users/:id
  async update(req, res) {
    const found = await User.findById(req.params.id);
    if (!found) return res.status(404).render('404', { title: 'Não encontrado', user: req.session.user });
    if (!req.session.user?.isAdmin && String(req.session.userId) !== String(req.params.id)) {
      return res.status(403).render('403', { title: 'Acesso negado', user: req.session.user });
    }

    const { name, email, nasc_data, telefone, sobrenome } = req.body;
    const num_cpf = req.body.num_cpf ?? req.body['num-cpf'];

    const cpfResult = await validateCPF(num_cpf);
    if (!cpfResult.valid) {
      return res.render('users/edit', {
        title: 'Editar',
        found: { ...found, name, email, nasc_data, num_cpf, telefone },
        error: 'CPF inválido. Corrija o CPF para continuar.',
        cpfValid: false,
        user: req.session.user,
      });
    }

    try {
      await User.update(req.params.id, { name, email, nasc_data, num_cpf, telefone });
      if (req.session.userId == req.params.id) {
        req.session.user = { ...req.session.user, name, email, nasc_data, num_cpf, telefone };
      }
      res.redirect('/users');
    } catch (err) {
      res.render('users/edit', {
        title: 'Editar',
        found: { ...found, name, email, nasc_data, num_cpf, telefone },
        error: 'Erro ao atualizar.',
        cpfValid: true,
        user: req.session.user,
      });
    }
  },

  // DELETE /users/:id
  async destroy(req, res) {
    if (!req.session.user?.isAdmin) {
      return res.status(403).render('403', { title: 'Acesso negado', user: req.session.user });
    }
    await User.delete(req.params.id);
    res.redirect('/users');
  },
};

module.exports = UserController;

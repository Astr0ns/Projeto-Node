function adminMiddleware(req, res, next) {
  if (req.session && req.session.user?.isAdmin) {
    return next();
  }
  res.status(403).render('403', { title: 'Acesso negado', user: req.session.user });
}

module.exports = { adminMiddleware };

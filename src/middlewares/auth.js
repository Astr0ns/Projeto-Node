// Middleware de autenticação: redireciona para login se não estiver logado
function authMiddleware(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect('/login');
}

// Middleware para redirecionar usuário logado (ex: não deixar entrar no /login)
function guestMiddleware(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect('/dashboard');
  }
  next();
}

module.exports = { authMiddleware, guestMiddleware };

const HomeController = {
  index(req, res) {
    res.render('home', {
      title: 'Início',
      user: req.session.user || null,
    });
  },

  about(req, res) {
    res.render('about', {
      title: 'Sobre',
      user: req.session.user || null,
    });
  },
};

module.exports = HomeController;

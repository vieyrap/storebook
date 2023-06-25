import express from 'express'
const router=express.Router()
import passport from 'passport'

//Vista Pagina de Registro
router.get('/registrar', (req, res, next) => {
    res.render('users/registrar');
});
//Obtener datos de Registro
router.post("/registrar",passport.authenticate("local-signup", {
    successRedirect: '/favoritos',
    failureRedirect: '/registrar',
    failureFlash: true,
}));

//Vista Pagina de Login
router.get("/login", (req, res, next) => {
    res.render("users/login");
});

//Obtener datos de login
router.post("/login",passport.authenticate("local-signin", {
    successRedirect: "/favoritos",
    failureRedirect: "/login",
    failureFlash:'email o password invalidos. Intente nuevamente!!'
}));

//Cerrar sesion
router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
  
  function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/')
  }

export default router
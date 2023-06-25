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
    failureFlash: true,
}));

//Cerrar sesion
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success_msg','Se cerro la sesion')
        res.redirect('/login');
    });
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}

export default router
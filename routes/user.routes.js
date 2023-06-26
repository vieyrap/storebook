import express from 'express'
const router=express.Router()
import passport from 'passport'
import Cart from '../models/cart.js';
import Libro from '../models/libro.js';

//Vista Pagina de Registro
router.get('/registrar', (req, res, next) => {
    res.render('users/registrar',{listTitle: 'BookStore | Registrar'});
});
//Obtener datos de Registro
router.post("/registrar",passport.authenticate("local-signup", {
    successRedirect: '/favoritos',
    failureRedirect: '/registrar',
    failureFlash: true,
}));

//Vista Pagina de Login
router.get("/login", (req, res, next) => {
    res.render("users/login",{listTitle: 'BookStore | Login'});
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
//Recuperar contraseña
router.get('/recuperar',isAuthenticated,(req,res,next)=>{
    res.render('users/recuperar.ejs',{listTitle: 'BookStore | Recuperar'})
})

//Favortios
router.get('/favoritos',isAuthenticated,(req,res,next)=>{
    res.render('users/favoritos.ejs',{listTitle: 'BookStore | Favoritos'})
})

//Agregar carrito
router.get('/agregar-carrito/:canonical_isbn',async (req,res)=>{
    try {
        const libro = await Libro.findOne({canonical_isbn:req.params.canonical_isbn})
        // console.log(libro + 'desde carritp')
        const cart = new Cart(req.session.cart ? req.session.cart : {})
        cart.add(libro, libro.id)
        req.session.cart = cart
        console.log(req.session.cart)
        res.redirect('/login')
        
    } catch (error) {
        console.log(error.mensaje)
        res.status(500).json({mensaje:"error interno del sistema"})
    }
})

//Checkout
router.get('/checkout',isAuthenticated,(req,res,next)=>{
    res.render('users/checkout.ejs')
})



function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg','Por favor, logueate para ver la pagina')
    res.redirect('/login')
}


export default router
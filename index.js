import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import morgan from "morgan"
import './config/mongodb.js'
import './config/passport.js'
import config from "./config/index.js"
import passport from 'passport'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import LocalStrategy from 'passport-local'
import flash from 'connect-flash'
import routerUser from './routes/user.routes.js'

const app=express()

//Middleware
app.use(morgan('dev'))//muestra el tiempo q tarda el req
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))// Activo para poder analizar datos del URL / formularios
app.set('view engine', 'ejs')//Plantilla
app.use(express.static('public'))//Archivos estáticos
app.use(cookieParser('secreto'))//Para poder administrar las cookies
app.use(session({
    secret:'secreto',
    resave:true,
    saveUninitialized:true
}))//Express-session
//Passport
app.use(passport.initialize())
app.use(passport.session())

//Mensajes Flash
app.use(flash())
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash(('success_msg'))
    res.locals.error_msg=req.flash(('error_msg'))
    res.locals.error=req.flash(('error'))
    res.locals.currentUser=req.user
    next()
})

//Rutas

//Index 
app.get('/',(req,res)=>{
    res.render('pages/home.ejs')
})

//Buscar
app.get('/buscar',(req,res)=>{
    res.render('pages/buscar.ejs')
})

//Catalogo
app.get('/catalogo',(req,res)=>{
    res.render('pages/catalogo.ejs')
})

//Catalogo
app.get('/nosotros',(req,res)=>{
    res.render('pages/nosotros.ejs')
})

// Rutas usuarios
app.use(routerUser)

//Recuperar
app.get('/recuperar',(req,res)=>{
    res.render('users/recuperar.ejs')
})

//Favortios
app.get('/favoritos',(req,res)=>{
    res.render('users/favoritos.ejs')
})

//Checkout
app.get('/checkout',(req,res)=>{
    res.render('users/checkout.ejs')
})


//Cualquier url no definida envia este mensaje
app.get('/*', (req,res)=>{
    res.status(404).json({mensaje:'La pagina no funciona'})
})//(http://localhost:3030/pedro)


//Ejecuto servidor
app.listen(config.PORT,()=>{
    console.log('servidor ejecutandose')
})


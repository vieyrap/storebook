import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import './mongodb.js'
import morgan from "morgan"
import config from "./config/index.js"
import passport from 'passport'

const app=express()
//Middleware
app.use(morgan('dev'))//muestra el tiempo q tarda el req
app.use(express.json())

// Activo para poder analizar datos del URL / formularios
app.use(bodyParser.urlencoded({extended:true}))

//Passport???
app.use(session({
    secret:'secreto',
    resave:true,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy({usernameField:'email'},User.authenticate()))
//en la base esta la persona con email pepe@gmail.com es true

//Mensajes Flash
app.use(flash())
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash(('success_msg'))
    res.locals.error_msg=req.flash(('error_msg'))
    res.locals.error=req.flash(('error'))
    res.locals.currentUser=req.user
    next()
})

//Plantilla
app.set('view engine', 'ejs')
app.use(express.static('public'))



//Cualquier url no definida envia este mensaje
app.get('/*', (req,res)=>{
    res.status(404).json({mensaje:'La pagina no funciona'})
})//(http://localhost:3030/pedro)


//Ejecuto servidor
app.listen(config.PORT,()=>{
    console.log('servidor ejecutandose')
})


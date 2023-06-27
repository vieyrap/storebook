import express from 'express'
import Libro from '../models/libro.js'
const router=express.Router()

//Index 
// router.get('/',(req,res)=>{
//     res.render('pages/home.ejs')
// })

//Mostrar todos los Items
router.get('/',async (req,res)=>{
    try {
        const libros = await Libro.find({})
        // console.log(libros)
        res.render('pages/home.ejs',{listTitle: 'BookStore', libros:libros})
    } catch (error) {
        console.log(error.mensaje)
        res.status(500).json({mensaje:"Error interno del sistema"})
    }

})

//Libros
router.get('/libros/:canonical_isbn',async (req,res)=>{
    try {
        const libro = await Libro.findOne({canonical_isbn:req.params.canonical_isbn})
        console.log(libro)
        res.render('pages/articulo.ejs',{listTitle: libro.title , libro:libro})
    } catch (error) {
        console.log(error.mensaje)
        res.status(500).json({mensaje:"error interno del sistema"})
    }
})

//Buscar
router.get('/buscador',(req,res)=>{
    res.render('pages/buscador.ejs',{listTitle: 'BookStore | Buscador'})
})

router.post('/buscador',(req,res)=>{
    res.render('pages/buscador.ejs',{listTitle: 'BookStore | Buscador'})
})

//Catalogo
router.get('/catalogo',(req,res)=>{
    res.render('pages/catalogo.ejs',{listTitle: 'BookStore | Catalogo'})
})

//Nosotros
router.get('/nosotros',(req,res)=>{
    res.render('pages/nosotros.ejs',{listTitle: 'BookStore | Nosotros'})
})

export default router
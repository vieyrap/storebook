import express from 'express'
const router=express.Router()

//Index 
router.get('/',(req,res)=>{
    res.render('pages/home.ejs')
})

//Buscar
router.get('/buscar',(req,res)=>{
    res.render('pages/buscar.ejs')
})

//Catalogo
router.get('/catalogo',(req,res)=>{
    res.render('pages/catalogo.ejs')
})

//Catalogo
router.get('/nosotros',(req,res)=>{
    res.render('pages/nosotros.ejs')
})

export default router
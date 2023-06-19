import express from 'express';
import ProductManager from "../daos/productsManager.Mongo.js";
import __dirname from "../utils.js";

const productManagerMongo = new ProductManager()

const router = express.Router();



router.get('/', async (req, res) => {
    let allProducts = await productManagerMongo.getProducts()
    res.render('home.handlebars', {
        title: "Products",
        products: allProducts
    })
})


router.get('/realtimeproducts', async (req, res) => {
    let allProducts = await productManagerMongo.getProducts()
    res.render('realTimeProducts.handlebars', {
        title: "Products",
        products: allProducts
    })
})


export default router;
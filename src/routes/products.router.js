import { Router } from "express";
import ProductManager from "../daos/productsManager.Mongo.js";
import __dirname from "../utils.js";

const productManagerMongo = new ProductManager()
const router = Router();

router.get('/', async (req, res) => {
    try{
        let products = await productManagerMongo.getProducts()
        res.send({products})
    } catch (error) {
        console.log('Productos no encontrados: ' +error)
    }
})

router.get('/:pid', async(req, res)=>{
    const product = await productManagerMongo.getProductById(req.params.pid)
    res.send(product)
})

router.post('/', async (req, res) => {
    const nProduct = req.body
    await productManagerMongo.addProduct(nProduct)
    const products = await productManagerMongo.getProducts();

    req.socketServer.sockets.emit("updatedProducts", products)
    res.send({status: "success"})
})

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid
    res.send(await productManagerMongo.deleteProduct(pid))
})

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid;
    const updateProduct = req.body;
    res.send(await productManagerMongo.updateProduct(pid, updateProduct))
})

export default router;
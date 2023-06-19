import { Router } from "express";
import CartsManager from "../daos/cartsManager.Mongo.js";

const router = Router();
const cart = new CartsManager();

router.get('/', async (req, res) => {
    const limit = req.query.limit;
    if (!limit) return res.send(await cart.getCarts());
    const carts = await cart.getCarts();
    const cartLimit = carts.slice(0, limit)
    res.send(cartLimit)
})

router.get('/:cid', async (req, res) => {
    res.send(await cart.getCartById(req.params.cid))
})

router.post('/', async (req, res) => {
    await cart.addCart();
    res.send({status: "success"})
})

router.post('/:cid/product/:pid', async (req, res) => {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    res.send(await cart.addProductInCart(idCart, idProduct))    
})

export default router;



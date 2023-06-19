import fs from 'fs';
import { v4 as uuid } from 'uuid';
import ProductsManager from './productsManager.js';

const productManager = new ProductsManager();

export default class CartsManager{
    constructor(){
        this.path = "./daos/clases/files/carts.json"
    }

    getCarts = async () => {
        try {
            const view = await fs.promises.readFile(this.path, 'utf-8');
            const viewCarts = JSON.parse(view);
            return viewCarts;
        } catch (error) {
            return []
        }
    }

    getCartById = async (id) => {
        const carts = await this.getCarts();
        const cart = carts.find((cart) => cart.id === id);
        return cart ? cart : `El carrito con id: ${id} no existe.`;
      }      

    addCarts = async () => {
        const view = await this.getCarts();
        const cartId = uuid();
        const cartsAll = [{id: cartId, products: []}, ...view]
        await fs.promises.writeFile(this.path, JSON.stringify(cartsAll, null, '\t'))
        return "Se ha agregado un nuevo carrito"
    }

    addProductInCart = async (idCart, idProduct) => {
        const existCart = await this.getCartById(idCart);
        if(existCart === `El carrito con id: ${idCart} no existe.`) return `El carrito con id: ${idCart} no existe.`
        const productById = await productManager.getProductById(idProduct)
        if(productById === `El producto con id: ${idProduct} no existe.`){ 
            return `El producto con id: ${idProduct} no existe.`
        }else{ 
            const allCarts = await this.getCarts();
            const filterCarts = allCarts.filter((cart) => cart.id != idCart);
            const existProduct = existCart['products'].find(products => products.id === idProduct);
            const allProductsInCart = existCart['products'].filter(products => products.id != idProduct);
            if(existProduct === undefined){
                const newCart = [{id: idCart, products: [{id: idProduct, quantity: 1,}, ...(allProductsInCart.length > 0 ? allProductsInCart : [])]}, ...filterCarts]
                await fs.promises.writeFile(this.path, JSON.stringify(newCart, null, '\t'))
            } else {
                const quantity = existProduct.quantity
                const newCart = [{id: idCart, products: [{id: idProduct, quantity: quantity + 1}, ...(allProductsInCart.length > 0 ? allProductsInCart : [])]}, ...filterCarts]
                await fs.promises.writeFile(this.path, JSON.stringify(newCart, null, '\t'))
            }
            return `Producto agregado al carrito ${idCart}`
        }
    } 
}
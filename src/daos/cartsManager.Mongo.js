import mongoose from "mongoose";
import { cartsModel } from "./models/carts.model.js";
import ProductManager from "./productsManager.Mongo.js";

const productManagerMongo = new ProductManager()

export default class CartManager {
    connection = mongoose.connect('mongodb+srv://valdeznoelia26:coderhouse@cluster0.vxwlhyd.mongodb.net/ecommerce?retryWrites=true&w=majority')
  
    addCart = async () => {
        const result = await cartsModel.create({products: []})
        return result
    }
    
    getCarts = async () => {
      const result = await cartsModel.find({})
      return result
    }
  
    getCartById = async (id) => {
        try {
            if (!mongoose.isValidObjectId(id)) {
              return `El carrito con id: '${id}' no existe.`;
            }
            const result = await cartsModel.findOne({ _id: id });
            if (!result) return `El carrito con id: '${id}' no existe.`
            return result;
        } catch (error) {
            console.log(error);
        }
    };
  
    addProductInCart = async (cid, pid) => {
        try {
          const cart = await this.getCartById(cid);
          if (typeof cart === 'string') {
            return cart; // El carrito no existe, retornar el mensaje de error
          }
      
          const product = await productManagerMongo.getProductById(pid);
          if (typeof product === 'string') {
            return product; // El producto no existe, retornar el mensaje de error
          }
          let productInCart = cart.products.find((product) => product.product.equals(pid))
          console.log(productInCart)
          if (productInCart === undefined) {
            cart.products.push({ product: product, quantity: 1 });
          } else {
            await cartsModel.findOneAndUpdate(
              { _id: cart._id, "products.product": pid }, // Filtro para encontrar el carrito y el producto específico
              { $inc: { "products.$.quantity": 1 } } // Incremento la cantidad del producto en 1
            );
          }
          await cart.save();
          return "Status: success."
        } catch (error) {
          console.log(error);
        }
    };      
}
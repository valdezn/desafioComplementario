import mongoose from 'mongoose'
import { productModel } from './models/products.model.js';


export default class ProductManager {
  connection = mongoose.connect('mongodb+srv://valdeznoelia26:coderhouse@cluster0.vxwlhyd.mongodb.net/ecommerce?retryWrites=true&w=majority')
  
  getProducts = async () => {
    const result = await productModel.find().lean()
    return result
  }

  getProductById = async (id) => {
    if (!mongoose.isValidObjectId(id)) {  //verifica que el id sea valido 
      return `El producto con id: '${id}' no existe.`;
    }
    const result = await productModel.findOne({_id: id})
    if (!result) return `El producto con id: '${id}' no existe.`
    return result
  }

  addProduct = async (product) => {
    const result = await productModel.create(product)
    return result
  }

  updateProduct = async (id, updatedProduct) => {
    const productId = await this.getProductById(id)
    if (productId === `El producto con id: '${id}' no existe.`) return `El producto con id: '${id}' no existe.`
    const result = await productModel.updateOne({_id: id}, {$set: updatedProduct})
    return result;
  }

  deleteProduct = async (id) => {
    const productId = await this.getProductById(id)
    if (productId === `El producto con id: '${id}' no existe.`) return `El producto con id: '${id}' que intenta eliminar no existe.`
    const result = await productModel.deleteOne({_id: id})
    return result
  }
}
import fs, { readFile } from 'fs';
import {v4 as uuid} from 'uuid';

export default class ProductsManager{
    constructor(){
        this.products = [] 
        this.path = './daos/clases/files/products.json'
    }

    getProducts = async () => {
        try {
            const read = await fs.promises.readFile(this.path, 'utf-8') 
            const view = JSON.parse(read)
            return view;
        } catch (error) {
            //console.log(error)
            return []
        }
    }

    getProductById = async (id) => {
        const view = await this.getProducts()
        const ip = view.find((product) => {
            return product.id === id
        })
        return ip ? ip : `El producto con id: ${id} no existe.` 
    }

    addProducts = async (product) => {
        const view = await this.getProducts()
        product.id = uuid();
        if (view.length == 0){
            this.products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
        } else {
            const update = [...view, product]
            await fs.promises.writeFile(this.path, JSON.stringify(update, null, '\t'))
        }
        return 'Producto agregado'
    }

    deleteProduct = async (id) => {
        const view = await this.getProducts()
        const idp = view.find(products => products.id === id)
        if (idp != undefined) {
            const ip = view.filter(products => products.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(ip, null, '\t'))
            return `El productos con id: ${id} ha sido eliminado.`
        } else {
            return `El id: ${id} no existe.`
        }
    }

    updateProduct = async (id, product) => {
        const productById = await this.getProductById()
        if(!productById) return `El producto con id: ${id} no existe.`
        await this.deleteProduct(id)
        const productOld = await this.getProducts()
        const products = [{...product, id:id}, ...productOld]
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
        return `El producto con id: ${id} ha sido actualizado.` 
    }
}
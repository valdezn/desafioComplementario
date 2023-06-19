import mongoose, { Schema } from "mongoose";

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    thumbnail: {
        type: [String]
    },
    code: {
        type: String
    },
    stock: {
        type: Number
    }
})

export const productModel = mongoose.model(productsCollection, productsSchema)
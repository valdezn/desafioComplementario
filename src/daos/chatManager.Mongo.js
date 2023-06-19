import mongoose from 'mongoose';
import { messagesModel } from './models/messages.model.js';

export default class ChatManager {
    connection = mongoose.connect('mongodb+srv://valdeznoelia26:coderhouse@cluster0.vxwlhyd.mongodb.net/ecommerce?retryWrites=true&w=majority')

    messagesSave = async (message) => {
        const messages = await messagesModel.create(message)
        return messages
    }
} 
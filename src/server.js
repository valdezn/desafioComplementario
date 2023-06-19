import Express from "express";
import handlebars from "express-handlebars";
import {Server} from "socket.io";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import routerChat from "./routes/chat.router.js"
import ProductManager from "./daos/productsManager.Mongo.js";
import ChatManager from "./daos/chatManager.Mongo.js";

const productsManager = new ProductManager();
const chatManager = new ChatManager();
const app = Express();


app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static(__dirname + '/public'));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set('views', __dirname + '/views')


const expressServer = app.listen(8080, () => console.log("Listening"));
const socketServer = new Server(expressServer);

const mensajes = []

socketServer.on("connection", (socket) => {
  console.log("conected " + socket.id)
  //recibo el producto nuevo 
  socket.on('addProduct', async (product) => {     
      const result = await productsManager.addProduct(product);
    });
    //recibo el id del producto a eliminar
    socket.on("deleteProduct", async (product) => {  
      const productId = product
      const result = await productsManager.deleteProduct(productId);
      
      //envío a todos los sockets conectados la lista actualizada
      const updatedProducts = await productsManager.getProducts();
      socketServer.emit("updatedProducts", updatedProducts);
    });
  socket.on("message", async (data) => {
    console.log(data)
    mensajes.push(data);
    await chatManager.messagesSave(data);
    socketServer.emit("imprimir", mensajes);
  });
  
  socket.on('authenticatedUser', (data)=>{
    socket.broadcast.emit('newUserAlert', data)
  })
});

app.use((req, res, next) => {
  req.socketServer = socketServer;
  next()
});

app.use('/chat/', routerChat);
app.use('/', viewsRouter);
app.use('/products/', routerProducts);
app.use('/carts/', routerCarts);
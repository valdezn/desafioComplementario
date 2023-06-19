const socket = io();

const addProductBtn = document.getElementById('addProductBtn');
const deleteBtn = document.getElementById("deleteBtn");

addProductBtn.addEventListener('click', function(e) {
    const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
        code: document.getElementById('code').value,
        stock: document.getElementById('stock').value,
    };
        //emito al servidor el producto nuevo
        socket.emit('addProduct', product);
        title.value = '';
        description.value = '';
        price.value = '';
        thumbnail.value = '';
        code.value = '';
        stock.value = '';
});

//boton delete
deleteBtn.addEventListener("click", (e) => {
    
    e.preventDefault();
    let productId = document.getElementById("productId");
    //emito al servidor el id del productos que quiero eliminar
    socket.emit("deleteProduct", productId.value);
    productId.value = '';
});

socket.on("updatedProducts", (products) => {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Limpio la lista actual
  
    products.forEach((product) => {
      const li = document.createElement("li");
      const title = document.createElement("h3");
      title.textContent = product.title;
      li.appendChild(title);
      const description = document.createElement("p");
      description.textContent = "Description: " + product.description;
      li.appendChild(description);
      const price = document.createElement("p");
      price.textContent = "Price: " + product.price;
      li.appendChild(price);
      const thumbnail = document.createElement("p");
      thumbnail.textContent = "Thumbnail: " + product.thumbnail;
      li.appendChild(thumbnail);
      const code = document.createElement("p");
      code.textContent = "Code: " + product.code;
      li.appendChild(code);
      const stock = document.createElement("p");
      stock.textContent = "Stock: " + product.stock;
      li.appendChild(stock);
      const id = document.createElement("p");
      id.textContent = "ID: " + product._id;
      li.appendChild(id);
  
      productList.appendChild(li);
    });
  });

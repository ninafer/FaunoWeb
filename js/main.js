//PRODUCTOS
const productos = [
    //COLLARES
    {
        id: "collar-rufina",
        titulo: "Rufina",
        imagen: "../imagenes/collarRufina.jpg",
        categoria: {
            nombre: "collares",
            id: "collares"
        },
        precio: 5600
    },
    {
        id: "collar-selva",
        titulo: "Selva",
        imagen: "../imagenes/collarSelva.jpg",
        categoria: {
            nombre: "collares",
            id: "collares"
        },
        precio: 6200
    },
    {
        id: "collar-penelope",
        titulo: "Penelope",
        imagen: "../imagenes/collarPenelope.jpg",
        categoria: {
            nombre: "collares",
            id: "collares"
        },
        precio: 5800
    },
    //PULSERAS
    {
        id: "pulsera-azul",
        titulo: "Azul",
        imagen: "../imagenes/pulseraAzul.jpg",
        categoria: {
            nombre: "pulseras",
            id: "pulseras"
        },
        precio: 4200
    },
    {
        id: "pulsera-antonella",
        titulo: "Antonella",
        imagen: "../imagenes/pulseraAntonella.jpg",
        categoria: {
            nombre: "pulseras",
            id: "pulseras"
        },
        precio: 7300
    },
    {
        id: "pulsera-victoria",
        titulo: "Victoria",
        imagen: "../imagenes/pulseraVictoria.jpg",
        categoria: {
            nombre: "pulseras",
            id: "pulseras"
        },
        precio: 3200
    },
    //AROS
    {
        id: "aros-diana",
        titulo: "Diana",
        imagen: "../imagenes/arosDiana.jpg",
        categoria: {
            nombre: "aros",
            id: "aros"
        },
        precio: 3600
    },
    {
        id: "aros-zoe",
        titulo: "Zoe",
        imagen: "../imagenes/arosZoe.jpg",
        categoria: {
            nombre: "aros",
            id: "aros"
        },
        precio: 2800
    },
    {
        id: "aros-thyara",
        titulo: "Thyara",
        imagen: "../imagenes/arosThyara.jpg",
        categoria: {
            nombre: "aros",
            id: "aros"
        },
        precio: 7200
    },
];


const contenedorProductos = document.querySelector(".card");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

//Boton agregar al carrito
botonesAgregar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito)});
let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

//Agregar productos al carrito
function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    botonesAgregar = Toastify({
        text: "Producto agregado al carrito",
        duration: 1000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, black, white)",
        },
        onClick: function () {} 
    }).showToast();
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

//Aumenta el numero del carrito de compras cuando estamos fuera de su html
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
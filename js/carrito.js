let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);


const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

//Armo del carrito de compras
function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorCarritoProductos.innerHTML = "";
        productosEnCarrito.forEach(producto => {
            div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
        <img class="carrito-producto-img" src="${producto.imagen}" alt="${producto.titulo}">
                        <small>Titulo</small>
                        <h3>${producto.titulo}</h3>
                        <small>Cantidad</small>
                        <span class="restar"> - </span>
                        <p>${producto.cantidad}</p>
                        <span class="sumar"> + </span>
                        <small>Precio</small>
                        <p>$${producto.precio}</p>
                        <small>Subtotal</small>
                        <p>$${producto.precio * producto.cantidad}</p>
                    <button class="carrito-producto-eliminar" id=${producto.id}><i class="bi bi-trash3"></i></button>
            `;
            contenedorCarritoProductos.append(div);    
            
            let restar = div.querySelector(".restar");
            restar.addEventListener("click", () => {
                if(producto.cantidad !== 1){
                    producto.cantidad--;
                }
                localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
                cargarProductosCarrito();
            });

            let sumar = div.querySelector(".sumar");
            sumar.addEventListener("click", () => {
                producto.cantidad++;
                localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
                cargarProductosCarrito();
            })
})
} else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}
cargarProductosCarrito();

//Boton eliminar articulos del carrito
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => 
        boton.addEventListener("click", eliminarDelCarrito));  
    }

//Eliminar articulo del carrito    
function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    botonesEliminar = Toastify({
        text: "Eliminado al carrito",
        duration: 1500,
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
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

//Boton vaciar carrito
botonVaciar.addEventListener('click', popUpVaciarCarrito);
function popUpVaciarCarrito() {
    swal.fire({
        title: "¿Estás seguro?",
        iconHtml: '<i class="bi bi-heartbreak-fill"></i>',
            showCancelButton: true,
            confirmButtonColor: 'rgb(251, 214, 227)',
            cancelButtonColor: 'rgb(144, 255, 229)',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, vaciar carrito!'
    })
    .then((result) => {
        result.isConfirmed ? vaciarCarrito() : cargarProductosCarrito()
        });
}

//Vaciar carrito
function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
};

//Total carrito
function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
};

//Boton Comprar
botonComprar.addEventListener("click", comprarCarrito);
botonComprar.addEventListener("click", ()=>{
    Swal.fire({
        position: 'center',
        iconHtml: '<i class="bi bi-suit-heart-fill"></i>',
        title: 'Muchas gracias por su compra',
        showConfirmButton: false,
        timer: 3000
    });
})

//Cuando no hay artculos en el carrito
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}
    

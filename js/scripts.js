// Función para agregar un nuevo producto
function agregarProducto(producto) {
  // Crear el elemento HTML para el producto
  if (
    !producto ||
    !producto.imagen ||
    !producto.nombre ||
    !producto.precio ||
    !producto.descripcion
  ) {
    console.error("Todos los campos son obligatorios");
    return;
  }

  // Check if product already exists
  const existingProduct = productos.find((p) => p.nombre === producto.nombre);
  if (existingProduct) {
    console.warn("Producto ya existe:", producto.nombre);
    return; // Skip adding if product already exists
  }

  // Add the new product to the array
  producto.push(producto);

  const nuevoProducto = document.createElement("div");
  nuevoProducto.classList.add("col", "mb-5");

  // Agregar la imagen del producto
  const imagenProducto = document.createElement("img");
  imagenProducto.classList.add("card-img-top");
  imagenProducto.src = producto.imagen;
  imagenProducto.alt = producto.nombre;
  nuevoProducto.appendChild(imagenProducto);

  // Crear el card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "p-4");

  // Agregar el nombre del producto
  const nombreProducto = document.createElement("h5");
  nombreProducto.classList.add("fw-bolder", "text-center");
  nombreProducto.textContent = producto.nombre;
  cardBody.appendChild(nombreProducto);

  // Agregar la descripción del producto
  const descripcionProducto = document.createElement("p");
  descripcionProducto.textContent = producto.descripcion;
  cardBody.appendChild(descripcionProducto);

  // Agregar el precio del producto
  const precioProducto = document.createElement("p");
  precioProducto.classList.add("text-center");
  precioProducto.textContent = `$ ${producto.precio}`;
  cardBody.appendChild(precioProducto);

  // Crear el footer del card
  const cardFooter = document.createElement("div");
  cardFooter.classList.add(
    "card-footer",
    "p-4",
    "pt-0",
    "border-top-0",
    "bg-transparent"
  );

  // Agregar el botón de "Agregar al carrito"
  const botonAgregarCarrito = document.createElement("a");
  botonAgregarCarrito.classList.add("btn", "btn-outline-dark", "mt-auto");
  botonAgregarCarrito.href = "#";
  botonAgregarCarrito.textContent = "Agregar al carrito";
  cardFooter.appendChild(botonAgregarCarrito);

  // Agregar el card body y el footer al card
  nuevoProducto.appendChild(cardBody);
  nuevoProducto.appendChild(cardFooter);

  // Obtener el contenedor de productos
  const contenedorProductos = document.getElementById("productos-container");

  // Agregar el nuevo producto al final del contenedor
  contenedorProductos.appendChild(nuevoProducto);
}


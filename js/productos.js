// Seleccione elementos del DOM
const form = document.getElementById("myForm");
const imgInput = document.querySelector(".img");
const file = document.getElementById("imgInput"); // Esta línea puede ser redundante
const userName = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const sDate = document.getElementById("sDate");
const submitBtn = document.querySelector(".submit");
const userInfo = document.getElementById("data");
const modal = document.getElementById("userForm");
const modalTitle = document.querySelector("#userForm .modal-title");
const newProductBtn = document.querySelector(".newProduct");

// Inicializar los datos del producto del almacenamiento local (o Array vacío)
let userProfileData = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile"))
  : [];

// Bandera para rastrear el estado de edición y el índice de edición
let isEdit = false;
let editId;

// Llamar a la función showInfo en la carga de la página para mostrar los datos iniciales
showInfo();

// Oyente de eventos para el botón "producto nuevo"
newProductBtn.addEventListener("click", () => {
  // Reiniciar el título modal y el texto del botón a los valores predeterminados
  submitBtn.innerText = "Registrar";
  modalTitle.innerText = " Llena el formulario para dar de alta un producto";
  isEdit = false; // No editar a un producto
  imgInput.src = "/img/tennis.png"; // Establecer imagen predeterminada
  form.reset(); // Borrar campos de formulario
});

// Oyente de eventos para el cambio de entrada de archivo
file.onchange = function () {
  if (file.files[0].size < 1000000) {
    // Comprobar si el tamaño del archivo es inferior a 1 MB
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      const imgUrl = e.target.result;
      imgInput.src = imgUrl; // Actualizar la vista previa de la imagen
    };

    fileReader.readAsDataURL(file.files[0]);
  } else {
    alert("¡Este archivo es demasiado grande!");
  }
};

// Función para mostrar datos de producto en la tabla
function showInfo() {
  // Eliminar las filas de detalles del producto existentes
  document.querySelectorAll(".productDetails").forEach((info) => info.remove());
  userProfileData.forEach((element, index) => {
    const createElement = `
      <tr class="productDetails">
          <td>${index + 1}</td>
          <td>
              <img src="${element.picture}" alt="" width="50" height="50">
          </td>
          <td>${element.productName}</td>
          <td>${element.productDescription}</td>
          <td>${element.productPrice}</td>
          <td>${element.startDate}</td>
          <td>
              <button class="btn btn-outline-success" onclick="readInfo('${
                element.picture
              }','${element.productName}',
              '${element.productDescription}', '${element.productPrice}', '${
      element.startDate
    }')" data-bs-toggle="modal" data-bs-target="#readData">
                  <i class="bi bi-eye"></i>
              </button>
              <button class="btn btn-outline-primary" onclick="editInfo(${index}, '${
      element.picture
    }', '${element.productName}', '${element.productDescription}', '${
      element.productPrice
    }', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm">
                  <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-outline-danger" onclick="deleteInfo(${index})">
                  <i class="bi bi-trash"></i>
              </button>
          </td>
      </tr>`;

    userInfo.innerHTML += createElement;
  });
}

// Función para mostrar información del producto en modo de solo lectura
function readInfo(pic, name, descripcion, precio, sDate) {
  document.querySelector(".showImg").src = pic;
  document.querySelector("#showName").value = name;
  document.querySelector("#showDescription").value = descripcion;
  document.querySelector("#showPrecio").value = precio;
  document.querySelector("#showsDate").value = sDate;
}

// Función para llenar los campos de formulario previos para editar a un producto
function editInfo(index, pic, name, descripcion, precio, sDate) {
  isEdit = true; // Indicar el estado de edición
  editId = index; // Almacenar el índice del producto que se está editando
  imgInput.src = pic;
  userName.value = name;
  descripcion.value = descripcion;
  precio.value = precio;
  sDate.value = Sdate;

  submitBtn.innerText = "Update"; // Texto del botón Cambiar
  modalTitle.innerText = "Update The Form"; // Actualizar título modal
}

// Función para eliminar a un producto  SWEETALERT2
function deleteInfo(index) {
  // Confirmar la eliminación con el producto
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¿Quieres continuar?",
    icon: "error",
    confirmButtonText: "Cool",
  }).then((result) => {
    if (result.isConfirmed) {
      // Eliminar el producto del array userProfileData
      userProfileData.splice(index, 1);

      // Actualizar el almacenamiento local con el userProfileData modificado
      localStorage.setItem("userProfile", JSON.stringify(userProfileData));

      // Actualizar la pantalla de información del producto
      showInfo();
    }
  });
}

// Oyente de eventos para la presentación del formulario
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evitar el envío del formulario predeterminado

  // Crear un objeto para almacenar la información del producto nueva/actualizada
  const userInformation = {
    picture: imgInput.src === undefined ? "/img/tennis.webp" : imgInput.src,
    productName: userName.value,
    productDescription: descripcion.value,
    productPrice: precio.value,
    startDate: sDate.value,
  };

  // Comprobar si es un nuevo producto o un producto editado
  if (!isEdit) {
    // Agregar el nuevo producto al array de productos
    userProfileData.push(userInformation);
  } else {
    // Actualizar al producto existente en el array de productos
    userProfileData[editId] = userInformation;
    isEdit = false; // Restablecer el estado de edición
    editId = null; // Restablecer el índice de edición
  }

  // Actualizar el almacenamiento local con el userProfileData modificado
  localStorage.setItem("userProfile", JSON.stringify(userProfileData));

  // Restablecer el título modal y el texto del botón a los valores predeterminados
  submitBtn.innerText = "Registrar";
  modalTitle.innerText = "Llena el formulario para dar de alta un producto";

  // Actualizar la pantalla de información del producto
  showInfo();

  // Restablecer los campos de formulario
  form.reset();

  // Restablecer la vista previa de la imagen al valor predeterminado
  imgInput.src = "/img/tennis.png";
});

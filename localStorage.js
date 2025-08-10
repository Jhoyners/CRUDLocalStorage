//Dariables globales
const d = document;
const listadoPedidos = "Pedidos";
let clienteInput = d.querySelector(".cliente");
let productoInput = d.querySelector(".producto");
let precioInput = d.querySelector(".precio");
let imagenInput = d.querySelector(".imagen");
let observacionInput = d.querySelector(".observacion");
let btnGuardar = d.querySelector(".btn-guardar");
let tabla = d.querySelector(".table tbody");

btnGuardar.addEventListener("click", () => {
  let datos = validarDatos();
  if (datos!=null) {
    guardarDatos(datos)};
    borrarTabla();
    mostrarDatos();
});

function validarDatos() {
  let datosForm;
  if (
    clienteInput.value === "" ||
    productoInput.value === "" ||
    precioInput.value === "" ||
    imagenInput.value === "" ||
    observacionInput.value === ""
  ) {
    alert("Todos los campos del formulario son obligatorios");
    return;
  } else {
    datosForm = {
      cliente: clienteInput.value,
      producto: productoInput.value,
      precio: precioInput.value,
      imagen: imagenInput.value,
      observacion: observacionInput.value,
    };
  }
  console.log(datosForm);
  clienteInput.value = "";
  productoInput.value = "";
  precioInput.value = "";
  imagenInput.value = "";
  observacionInput.value = "";

  return datosForm;
}

function guardarDatos(datos) {
  let pedidos = [];
  let pedidosGuardados = JSON.parse(localStorage.getItem(listadoPedidos));
  if (pedidosGuardados != null) {
    pedidos = pedidosGuardados;
  }
  pedidos.push(datos);
  localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
  alert("Datos guardados con exito");
}

function mostrarDatos() {
  let pedidos = [];
  let pedidosGuardados = JSON.parse(localStorage.getItem(listadoPedidos));
  if (pedidosGuardados != null) {
    pedidos = pedidosGuardados;
  }
  pedidos.forEach((p, i) => {
    let fila = d.createElement("tr");
    fila.innerHTML = `
        <td> ${i + 1} </td>
        <td> ${p.cliente} </td>
        <td> ${p.producto} </td>
        <td> ${p.precio} </td>
        <td> <img src="${p.imagen}" width="50%"></td>
        <td> ${p.observacion} </td>
        <td>
            <span onclick="actualizarPedido (${i})" class="btn-editar btn btn-warning"> ♻ </span>
            <span onclick="eliminarPedido(${i})" class="btn-eliminar btn btn-danger"> 💀 </span>
        </td>

        `;
    tabla.appendChild(fila);
  });
}
function borrarTabla() {
  let filas = d.querySelectorAll(".table tbody tr");
  filas.forEach((f) => {
    f.remove();
  });
}

function eliminarPedido(posicion) {
  let pedidos = [];
  let pedidosGuardados = JSON.parse(localStorage.getItem(listadoPedidos));
  if (pedidosGuardados != null) {
    pedidos = pedidosGuardados;
  }
  let confirmar = confirm(
    "Deseas eliminar este pedido: " + pedidos[posicion].cliente + "?"
  );
  if (confirmar) {
    pedidos.splice(posicion, 1);
    alert("Pedido de Eliminado");
    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));

    borrarTabla();
    mostrarDatos();
  }
}

function actualizarPedido(posicion) {
  let pedidos = [];
  let pedidosGuardados = JSON.parse(localStorage.getItem(listadoPedidos));
  if (pedidosGuardados != null) {
    pedidos = pedidosGuardados;
  }

  clienteInput.value = pedidos[posicion].cliente;
  productoInput.value = pedidos[posicion].producto;
  precioInput.value = pedidos[posicion].precio;
  imagenInput.value = pedidos[posicion].imagen;
  observacionInput.value = pedidos[posicion].observacion;
  let btnActualizar = d.querySelector(".btn-actualizar");
  btnActualizar.classList.toggle("d-none");
  btnGuardar.classList.toggle("d-none");
  btnActualizar.addEventListener("click", function () {
    pedidos[posicion].cliente = clienteInput.value;
    pedidos[posicion].producto = productoInput.value;
    pedidos[posicion].precio = precioInput.value;
    pedidos[posicion].imagen = imagenInput.value;
    pedidos[posicion].observacion = observacionInput.value;
    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
    alert("Pedido actualizado con exito");

    clienteInput.value = "";
    productoInput.value = "";
    precioInput.value = "";
    imagenInput.value = "";
    observacionInput.value = "";

    btnActualizar.classList.toggle("d-none");
    btnGuardar.classList.toggle("d-none");

    borrarTabla();
    mostrarDatos();
  });
}

d.addEventListener("DOMContentLoaded", function () {
  borrarTabla();
  mostrarDatos();
});

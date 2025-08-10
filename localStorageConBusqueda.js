//Declarar variables globales
const d = document;
const listadoPedidos = "Pedidos";
let clienteInput = d.querySelector(".cliente");
let productoInput = d.querySelector(".producto");
let precioInput = d.querySelector(".precio");
let imagenInput = d.querySelector(".imagen");
let observacionInput = d.querySelector(".observacion");
let btnGuardar = d.querySelector(".btn-guardar");
let tabla = d.querySelector(".table tbody");
let buscarInput = d.querySelector("#buscarPedido");

//agregar evento click al boton de formulario
btnGuardar.addEventListener("click", () => {
  let datos = validarDatos();
  if (datos!=null) {
    guardarDatos(datos);
    borrarTabla();
    mostrarDatos();
    buscarPedidos(buscarInput.value.trim().toLowerCase())};
});

//Even listener para funcion buscar
buscarInput.addEventListener("input", function(){
  const textoBusqueda = this.value.trim().toLowerCase();
  buscarPedidos(textoBusqueda);
});

//funcion para validar los campos del formulario
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

//funcion para guardar datos en localStorage
function guardarDatos(datos) {
  let pedidos = [];
  //extraer datos guardados previamente en el localStorage
  let pedidosGuardados = JSON.parse(localStorage.getItem(listadoPedidos));
  //validar los datos guardados previamente en el localStorage
  if (pedidosGuardados != null) {
    pedidos = pedidosGuardados;
  }
  //agregar el pedido al nuevo array
  pedidos.push(datos);
  //guardar datos en el localStorage
  localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
  alert("Datos guardados con exito");
}

//funcion para extraer los datos en el localStorage
function mostrarDatos() {
  let pedidos = [];
  //extraer datos guardados previamente en el localStorage
  let pedidosGuardados = JSON.parse(localStorage.getItem(listadoPedidos));
  //validar los datos guardados previamente en el localStorage
  if (pedidosGuardados != null) {
    pedidos = pedidosGuardados;
  }
  //mostrar los datos en la tabla
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
        </td>`;
    tabla.appendChild(fila);
  });
}
//quital los datos de la tabla
function borrarTabla() {
  let filas = d.querySelectorAll(".table tbody tr");
  filas.forEach((f) => {
    f.remove();
  });
}

//funcion para eliminar un pedido de la tabla
function eliminarPedido(posicion) {
  let pedidos = [];
  //extraer datos guardados previamente en el localStorage
  let pedidosGuardados = JSON.parse(localStorage.getItem(listadoPedidos));
  //validar los datos guardados previamente en el localStorage
  if (pedidosGuardados != null) {
    pedidos = pedidosGuardados;
  }
  //confirmar pedido a eliminar
  let confirmar = confirm(
    "Deseas eliminar este pedido: " + pedidos[posicion].cliente + "?"
  );
  if (confirmar) {
    pedidos.splice(posicion, 1);
    alert("Pedido de Eliminado");
    //guardar los datos que quedan en el local storage
    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
    borrarTabla();
    buscarPedidos(buscarInput.value.trim().toLowerCase())};
}

//actualizar pedido
function actualizarPedido(posicion) {
  let pedidos = [];
  //extraer datos guardados previamente en el localStorage
  let pedidosGuardados = JSON.parse(localStorage.getItem(listadoPedidos));
  //validar los datos guardados previamente en el localStorage
  if (pedidosGuardados != null) {
    pedidos = pedidosGuardados;
  }
  //pasar los datos al formulario para editarlos
  clienteInput.value = pedidos[posicion].cliente;
  productoInput.value = pedidos[posicion].producto;
  precioInput.value = pedidos[posicion].precio;
  imagenInput.value = pedidos[posicion].imagen;
  observacionInput.value = pedidos[posicion].observacion;
  //Mostrar el boton de actualizar datos
  let btnActualizar = d.querySelector(".btn-actualizar");
  btnActualizar.classList.toggle("d-none");
  btnGuardar.classList.toggle("d-none");
  //agregar un evento al boton actualizar
  btnActualizar.addEventListener("click", function () {
    pedidos[posicion].cliente = clienteInput.value;
    pedidos[posicion].producto = productoInput.value;
    pedidos[posicion].precio = precioInput.value;
    pedidos[posicion].imagen = imagenInput.value;
    pedidos[posicion].observacion = observacionInput.value;
    //guadar datos en el localstorage
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
    buscarPedidos(buscarInput.value.trim().toLowerCase());
  });
}

//funcion para filtrar los pedidos por nombre
function buscarPedidos (texto){
  let pedidos = [];
  let pedidosGuardados = JSON.parse(localStorage.getItem(listadoPedidos));
  if (pedidosGuardados != null){
    pedidos = pedidosGuardados;
  }
  if (!texto){
    borrarTabla();
    mostrarDatos();
    return;
  }
  //filtrar pedidos que coincidad
  const resultados = pedidos.filter (pedido =>
    pedido.cliente.toLowerCase().includes(texto)
  )
  //mostrar resultados
  mostrarResultadosBusqueda(resultados);
}

//funcion para mostrar resulados de busqueda
function mostrarResultadosBusqueda(pedidos){
  borrarTabla();
  //mostrar los datos en la tabla
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
        </td>`;
    tabla.appendChild(fila);
  });
}


//mostrar los datos de la local storage al recargar la pagina
d.addEventListener("DOMContentLoaded", function () {
  borrarTabla();
  buscarPedidos("");
});

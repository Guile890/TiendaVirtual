const urlBack = 'http://localhost:3000'

const listaMuestraProducto = document.getElementById("listaMuestraProducto");
const selectCategoria = document.getElementById("selectCategoria");
const idCategoria = document.getElementById("categorias");
const selectElement = document.querySelector('.opcionesCategorias');
const modal = document.getElementById('modal');
const listaProductos = document.querySelector('#lista-carrito tbody');
const carrito = document.getElementById('carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
// const compra = docuemnt.getElementById('procesar-pedido');


let arrayProductos = [];
let arregloCategorias = [];
let arrayProducto = [];
getInfoCategoria();



//Consulta de nuestros EndPoints

//Categoria
async function getCategoriasAPIMerca() {
  let respuesta = await fetch('http://localhost:3000/categorias');
  let data = await respuesta.json();
  return data;
}
async function getInfoCategoria() {

    let resultado = await getCategoriasAPIMerca();
    console.log(resultado);
    let random = Math.round(Math.random() * (15-1) );
    for (let i=0; i<=15; i++){
      arregloCategorias.push(resultado[i]);     
    }
    console.log(arregloCategorias);
    mostrarSelect(arregloCategorias);
  }

  //Botones de categorias
  function mostrarSelect(){
  selectCategoria.innerHTML = "";

  arregloCategorias.forEach((element) => {
    selectCategoria.innerHTML += `<button type="button" value="${element.idCategoria}" onclick="obtenerProductos(this)" id='mostrar' class="btn btn-outline-secondary">${element.descripcion}</button>`;
  });

}

//Lista-Productos
function obtenerProductos(e) {
  const idCategoria = e.value;  
  getInfoProductos(idCategoria);
}

async function getProductosByCategoria(id) {
  let respuesta = await fetch(urlBack+'/productos/' + id);
  let data = await respuesta.json();
  return data;
}
async function getInfoProductos(id) {
    let resultado = await getProductosByCategoria(id);
    arrayProductos = resultado.results;
    
    GuardarDB();
    
}

//Mostramos la lista de productos segun la categoria consultada
function mostrarProductos() {
  
  listaMuestraProducto.innerHTML = "";
  arrayProductos = JSON.parse(localStorage.getItem('listaProductos'));
  if(arrayProductos === null){
    arrayProductos = [];
}else {
  
  arrayProductos.forEach((element) => {
    listaMuestraProducto.innerHTML += `
      
      <div class="">
        <div class="card shadow-sm">
          <img src='${element.thumbnail}'>
          <div class="card-body">
              <p class="card-text"><b>${element.title}</b></p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <a href="" class="btn btn-sm btn-outline-secondary agregar-carrito" data-id="${element.id}">Agregar cesta</a>
                  <button hidden="true" class="ver-detalle" type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Ver
                  </button>
                  <!-- Modal -->
                  <div hidden="false" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">${element.title}</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <div class="row g-8 ">
                            <div class="col-sm-6">
                              <img src='${element.thumbnail}'>
                            </div>
                            <div class="col-sm-6">

                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <small class="text-muted precio" data-id="${element.price}">${`$ ` + element.price}</small>
            </div>
          </div>
        </div>
      `;
  });
  }
}

// Barra de busqueda
function buscar(){
  let cadena = document.getElementById('search').value;
  if(cadena.length > 2)   {
    getProductoBusqueda(cadena);
  }
  else{
    swal({
      text: "Ingresa una búsqueda válida (mín. 3 caracteres)",
      icon: "error",
      button: "Ok!",
    });
  }
}

async function getProductoBusqueda(cadena){
  let resultado = await getBusquedaProductos(cadena); 
  arrayProductos = resultado.results;
  GuardarDB();
}

async function getBusquedaProductos(cadena){
  let respuesta = await fetch('http://localhost:3000/busqueda/' +cadena);
  let data = await respuesta.json();
  return data;
}

//Guardamos en el LocalStorage la informacion de nuestra categoria consultada
const GuardarDB = () => {
  localStorage.setItem('listaProductos',JSON.stringify(arrayProductos));
  mostrarProductos(arrayProductos);
};

//Seleccion del articulo y consulta
listaMuestraProducto.addEventListener('click',(e)=>{
  if(e.target.classList.contains('agregar-carrito')){
    const producto = e.target.parentElement.parentElement;  
    Carrito(producto);
    
  } else if (e.target.classList.contains('ver-detalle')){
    const verProducto = e.target.parentElement.parentElement;
    mostrarDetalles(verProducto);
  }
  
  e.preventDefault();
}) 

//Obtenemos la informacion del producto agregado a la cesta
function Carrito (producto){
      const itemProducto = {
          idProducto: producto.querySelector('a').getAttribute('data-id'),
          tituloProducto: producto.querySelector('h5').textContent,
          imagenProducto: producto.querySelector('img').src,
          precioProducto: producto.querySelector('small').getAttribute('data-id'),
          cantidad: 1
        }
    // arrayProducto.push(itemProducto); 
    // console.log(itemProducto);
      let productosLS;
      productosLS = this.obtenerProductosLocalStorage();
      productosLS.forEach(function(productoLS){
        if(productoLS.idProducto === itemProducto.idProducto){
          productosLS = productoLS.idProducto;
        }
      });
        if(productosLS === itemProducto.idProducto){
          swal({
            text: "El articulo seleccionado ya se encuentra en la cesta",
            button: "Ok!",
          });
        }else{
          insertarCarrito(itemProducto); 
        }
    
  }

  //Insertamos el producto seleccionado en el carrrito
  function insertarCarrito(producto){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${producto.imagenProducto} " width=100>
        </td>
        <td>${producto.tituloProducto}</td>
        <td>${`$`+producto.precioProducto}</td> 
        <td>
          <a href="#" type="button" class="btn btn-sm btn-outline-secondary borrar-producto" data-id="${producto.idProducto}">Quitar</a>
        <td>    
            `;
    listaProductos.appendChild(row);
    guardarProductoLocalStorage(producto);
  }

  //Obtenemos el idProducto para eliminarlo de la cesta
  carrito.addEventListener('click',(e)=>{
    e.preventDefault();
    let producto,productoID;
    if(e.target.classList.contains('borrar-producto')){
      e.target.parentElement.parentElement.remove();
      producto = e.target.parentElement.parentElement;
      productoID = producto.querySelector('a').getAttribute('data-id');
    }
    eliminarProductoLocalStorage(productoID);
  });

  //Boton para quitar todos los articulos que se encuentran en la cesta
  vaciarCarritoBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    
    while(listaProductos.firstChild){
      listaProductos.removeChild(listaProductos.firstChild);
    }
    localStorage.clear('productos');
    GuardarDB();
    return false
    
  });

  //Se guardan los productos agregados en la cesta en el LocalStorage 
  function guardarProductoLocalStorage (producto){
    let productos;
    productos = obtenerProductosLocalStorage();
    productos.push(producto);
    localStorage.setItem('productos',JSON.stringify(productos));
  }

  //Obtenemos los productos que se encuentran guardados en el LocalStorage
  function obtenerProductosLocalStorage(){
    let productoLS;

    if(localStorage.getItem('productos')=== null){
      productoLS = [];
    }else{
      productoLS = JSON.parse(localStorage.getItem('productos'));

    }
    return productoLS;
  }

  //Eliminar articulo en el LocalStorage
  function eliminarProductoLocalStorage(productoID){
    console.log('Entrando a eliminar LS');
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function(productoLS,index){
      if(productoLS.idProducto === productoID){
        productosLS.splice(index,1);
      }
    });
    localStorage.setItem('productos',JSON.stringify(productosLS));    
}

//Leer el LocalStorage para no perder nuestro carrtio despues de refrescar la pagina
function leerLocalStorage (){
  
  let productosLS;
  productosLS = this.obtenerProductosLocalStorage();
  productosLS.forEach(function(producto){
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>
            <img src="${producto.imagenProducto} " width=100>
        </td>
        <td>${producto.tituloProducto}</td>
        <td>${`$`+producto.precioProducto}</td> 
        <td>
          <a href="#" type="button" class="btn btn-sm btn-outline-secondary borrar-producto" data-id="${producto.idProducto}">Quitar</a>
        <td>    
            `;
    listaProductos.appendChild(row);
  });
}

//Boton Procesar-compra
function compra(){
    
    const checaCarrito = this.obtenerProductosLocalStorage();
    if(checaCarrito.length === 0){

      swal({
        text: "El carrito esta vacio",
        icon: "error",
        button: "Ok!",
          });
    }else{
      location.href='/front-end/modulos/check-out/check-out.html';
    }
}
document.addEventListener('DOMContentLoaded', mostrarProductos, leerLocalStorage());

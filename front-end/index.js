const urlBack = 'http://localhost:3000'
const listaMuestraProducto = document.getElementById("listaMuestraProducto");
const selectCategoria = document.getElementById("selectCategoria");
const idCategoria = document.getElementById("categorias");
const selectElement = document.querySelector('.opcionesCategorias');
const modal = document.getElementById('modal');
const listaProductos = document.querySelector('#lista-carrito tbody');
const carrito = document.getElementById('carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

let arrayProductos = [];
let arregloCategorias = [];
let arrayProducto = [];


async function getCategoriasAPIMerca() {
  let respuesta = await fetch('http://localhost:3000/categorias');
  let data = await respuesta.json();
  return data;
}
// async function getInfoCategoria() {

//     let resultado = await getCategoriasAPIMerca();
//     console.log(resultado);
//     for (let i=1; i<=5; i++){
//       arregloCategorias.push(resultado[i]);     
//     }
//     console.log(arregloCategorias);
//     mostrarSelect(arregloCategorias);

//   }

//   function mostrarSelect(){
//   selectCategoria.innerHTML = "";

//   arregloCategorias.forEach((element) => {
//     selectCategoria.innerHTML += `<button type="submit" id='mostrar' class="btn btn-outline-primary value="${element.id}" onclick="obtenerProductos()">${element.name}</button>`;
//     // selectCategoria.innerHTML += `<option value="${element.id}">${element.name}</option>`
//   });

// }
function obtenerProductos(idCategoria) {
  console.log('estoy en obtener elementos', idCategoria);
  getInfoProductos(idCategoria);
}

selectElement.addEventListener('change',(e)=>{
    const idCategoria = document.querySelector('.opcionesCategorias').value;
    console.log(idCategoria);
    obtenerProductos(idCategoria);
    
    e.preventDefault();
}) 

async function getProductosByCategoria(id) {
  let respuesta = await fetch(urlBack+'/productos/' + id);
  let data = await respuesta.json();
  return data;
}
async function getInfoProductos(id) {
    let resultado = await getProductosByCategoria(id);
    console.log(resultado);
    arrayProductos = resultado.results;
    
    GuardarDB();
     
    //  crearLista(arrayProductos);
}

function mostrarProductos() {
  listaMuestraProducto.innerHTML = "";
  arrayProductos = JSON.parse(localStorage.getItem('listaProductos'));
  if(arrayProductos === null){
    console.log('entrandoa if')
    arrayProductos = [];
}else {
  arrayProductos.forEach((element) => {
    // console.log(element.title);
    // console.log(element.thumbnail);
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
function buscar(){
  let cadena = document.getElementById('search').value;
  console.log('valor de input', cadena);   
  getProductoBusqueda(cadena);
}

async function getProductoBusqueda(cadena){
  let resultado = await getBusquedaProductos(cadena);
  console.log(resultado);  
  arrayProductos = resultado.results;
  GuardarDB();
}

async function getBusquedaProductos(cadena){
  let respuesta = await fetch('http://localhost:3000/busqueda/' +cadena);
  let data = await respuesta.json();
  return data;
}



const GuardarDB = () => {
  localStorage.setItem('listaProductos',JSON.stringify(arrayProductos));
  mostrarProductos(arrayProductos);
};

listaMuestraProducto.addEventListener('click',(e)=>{
  if(e.target.classList.contains('agregar-carrito')){
    const producto = e.target.parentElement.parentElement;
    console.log(producto);  
    Carrito(producto);
  } else if (e.target.classList.contains('ver-detalle')){
    const verProducto = e.target.parentElement.parentElement;
    console.log(verProducto);
    mostrarDetalles(verProducto);
  }
  
  e.preventDefault();
}) 

function Carrito (producto){
  
  
      const itemProducto = {
          idProducto: producto.querySelector('a').getAttribute('data-id'),
          tituloProducto: producto.querySelector('h5').textContent,
          imagenProducto: producto.querySelector('img').src,
          precioProducto: producto.querySelector('small').getAttribute('data-id'),
          cantidad: 1
        }
  
    arrayProducto.push(itemProducto); 
    console.log(itemProducto);  
   insertarCarrito(itemProducto);  
     
  }

  function insertarCarrito(producto){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${producto.imagenProducto} " width=100>
        </td>
        <td>${producto.tituloProducto}</td>
        <td>${`$`+producto.precioProducto}</td> 
        <td>
          <a href="#" type="button" class="borrar-producto fas fa-times-circle" data-id=${+producto.idProducto}>Quitar</a>
        <td>    
            `;
    listaProductos.appendChild(row);
    guardarProductoLocalStorage(producto);
  }

  carrito.addEventListener('click',(e)=>{
    eliminarProducto(e);
  });

  function eliminarProducto(e){
    e.preventDefault();
    let producto,productoID;
    if(e.target.classList.contains('borrar-producto')){
      e.target.parentElement.parentElement.remove();
      producto = e.target.parentElement.parentElement;
      productoID = producto.querySelector('a').getAttribute('data-id');
    }
    eliminarProductoLocalStorage(productoID);
  }

  vaciarCarritoBtn.addEventListener('click',(e)=>{
    vaciarCarrito(e);
  });

  function vaciarCarrito(e){
    e.preventDefault();

    while(listaProductos.firstChild){
      listaProductos.removeChild(listaProductos.firstChild);
    }
    return false

  }

  function guardarProductoLocalStorage (producto){
    let productos;
    productos = obtenerProductosLocalStorage();
    productos.push(producto);
    localStorage.setItem('productos',JSON.stringify(productos));
  }

  function obtenerProductosLocalStorage(){
    let productoLS;

    if(localStorage.getItem('productos')=== null){
      productoLS = [];
    }else{
      productoLS = JSON.parse(localStorage.getItem('productos'));

    }
    return productoLS;
  }

  function eliminarProductoLocalStorage(productoID){
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function(productoLS,index){
      if(productoLS.id === productoID){
        productosLS.splice(index,1);
      }
    });
    localStorage.setItem('productos',JSON.stringify(productosLS));    
}

document.addEventListener('DOMContentLoaded', mostrarProductos);
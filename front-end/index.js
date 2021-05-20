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
    let random = Math.round(Math.random() * (15-1) );
    for (let i=random; i<=15; i++){
      arregloCategorias.push(resultado[i]);    
    }
    mostrarSelect(arregloCategorias);
  }

  //Botones de categorias
  function mostrarSelect(){
  selectCategoria.innerHTML = "";

  arregloCategorias.forEach((element) => {
    selectCategoria.innerHTML += `<button type="button" value="${element.id}" onclick="obtenerProductos(this)" id='mostrar' class="btn btn-outline-secondary">${element.nombre}</button>`;
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
    const cesta = new Carrito();
    cesta.leerProducto(producto);
  } else if (e.target.classList.contains('ver-detalle')){
    const verProducto = e.target.parentElement.parentElement;
    mostrarDetalles(verProducto);
  }
  
  e.preventDefault();
}) 

  //Obtenemos el idProducto para eliminarlo de la cesta
  carrito.addEventListener('click',(e)=>{
    e.preventDefault();
    let producto,productoID;
    if(e.target.classList.contains('borrar-producto')){
      e.target.parentElement.parentElement.remove();
      producto = e.target.parentElement.parentElement;
      productoID = producto.querySelector('a').getAttribute('data-id');
    }
    const cesta = new Carrito();
    cesta.eliminarProductoLocalStorage(productoID);
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

  

//Boton Procesar-compra
function compra(){
  const cesta = new Carrito();
    const checaCarrito = cesta.obtenerProductosLocalStorage();
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
document.addEventListener('DOMContentLoaded', () =>{
  mostrarProductos() ;
  const cesta = new Carrito();
  cesta.leerLocalStorage();
} );

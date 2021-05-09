const urlBack = 'http://localhost:3000'

const listaMuestraProducto = document.getElementById("listaMuestraProducto");
const selectCategoria = document.getElementById("selectCategoria");
const idCategoria = document.getElementById("categorias");
const selectElement = document.querySelector('.opcionesCategorias');
const modal = document.getElementById('modal');




let arrayProductos = [];
let arregloCategorias = [];
let arrayProducto = [];
getInfoCategoria();
async function getCategoriasAPIMerca() {
  let respuesta = await fetch('http://localhost:3000/categorias');
  let data = await respuesta.json();
  return data;
}
async function getInfoCategoria() {

    let resultado = await getCategoriasAPIMerca();
    console.log(resultado);
    let random = Math.round(Math.random() * (15-1) );
    for (let i=random; i<=15; i++){
      arregloCategorias.push(resultado[i]);     
    }
    console.log(arregloCategorias);
    mostrarSelect(arregloCategorias);
  }

  function mostrarSelect(){
  selectCategoria.innerHTML = "";

  arregloCategorias.forEach((element) => {
    selectCategoria.innerHTML += `<button type="button" value="${element.id}" onclick="obtenerProductos(this)" id='mostrar' class="btn btn-outline-secondary">${element.name}</button>`;
  });

}
function obtenerProductos(e) {
  console.log('valor event',e.value)
  const idCategoria = e.value;  
  console.log('estoy en obtener elementos', idCategoria);
  getInfoProductos(idCategoria);
}

// selectElement.addEventListener('click',(e)=>{
//     const idCategoria = document.querySelector('.selectCategoria').value;
//     console.log(idCategoria);
//     obtenerProductos(idCategoria);
    
//     e.preventDefault();
// }) 

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
  arrayProductos = JSON.parse(localStorage.getItem('rutina'));
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
                <small class="text-muted precio">${`$ ` + element.price}</small>
            </div>
          </div>
        </div>
      `;
  });
  }
}
function buscar(){
  let cadena = document.getElementById('search').value;
  console.log('valor de input', cadena.length);
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
  localStorage.setItem('rutina',JSON.stringify(arrayProductos));
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
          precioProducto: producto.querySelector('small').textContent,
          cantidad: 1
        }
    arrayProducto.push(itemProducto); 
    console.log(itemProducto);       
  }

  

document.addEventListener('DOMContentLoaded', mostrarProductos);
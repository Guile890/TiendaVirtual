const urlBack = 'http://localhost:3000'
const listaMuestra = document.getElementById("listaMuestra");
const selectCategoria = document.getElementById("selectCategoria");
const idCategoria = document.getElementById("categorias");
const selectElement = document.querySelector('.opcionesCategorias')


let arrayProductos = [];
let arregloCategorias = [];
let arrayProducto = [];
class crearItem{
  constructor(id,title,img,price){
    let item = {
      idProducto: id,
      tituloProducto: title,
      imagenProducto: img,
      precioProducto: price
 }
arrayProducto.push(item);        
return item;

  }
}


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
  listaMuestra.innerHTML = "";
  arrayProductos = JSON.parse(localStorage.getItem('rutina'));
  if(arrayProductos === null){
    console.log('entrandoa if')
    arrayProductos = [];
}else {
  arrayProductos.forEach((element) => {
    console.log(element.title);
    console.log(element.thumbnail);
    listaMuestra.innerHTML += `
      
      <div class="">
        <div class="card shadow-sm">
          <img src='${element.thumbnail}'>
          <div class="card-body">
              <p class="card-text"><b>${element.title}</b></p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">Agregar</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Ver
                  </button>
                  <!-- Modal -->
                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <small class="text-muted">${`$ ` + element.price}</small>
            </div>
          </div>
        </div>
      `;
      new crearItem(element.id,element.title,element.thumbnail,element.price);
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
  localStorage.setItem('rutina',JSON.stringify(arrayProductos));
  mostrarProductos(arrayProductos);
};

document.addEventListener('DOMContentLoaded', mostrarProductos);
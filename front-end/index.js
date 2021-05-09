const listaMuestra = document.getElementById("listaMuestra");
const selectCategoria = document.getElementById("selectCategoria");
const idCategoria = document.getElementById("categorias");
const selectElement = document.querySelector('.opcionesCategorias')

let arrayProductos = [];
let arregloCategorias = [];

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
function obtenerProductos(idCategoria){
  console.log('estoy en obtener elementos',idCategoria);
  getInfoProductos(idCategoria);
}
selectElement.addEventListener('change',(e)=>{
    const idCategoria = document.querySelector('.opcionesCategorias').value;
    console.log(idCategoria);
    obtenerProductos(idCategoria);
    
    e.preventDefault();
}) 

async function getProductosByCategoria(id) {
    let respuesta = await fetch('http://localhost:3000/productos/'+ id);
    let data = await respuesta.json();
    return data;
}
async function getInfoProductos(id) {
    let resultado = await getProductosByCategoria(id);
    console.log(resultado);
    arrayProductos = resultado.results;

    mostrarProductos(arrayProductos);
    //  crearLista(arrayProductos);
}

function mostrarProductos() {
  listaMuestra.innerHTML = "";

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
                  <button type="button" class="btn btn-sm btn-outline-secondary">Ver</button>
                </div>
                <small class="text-muted">${`$ `+element.price}</small>
            </div>
          </div>
        </div>
      `;
  });
}




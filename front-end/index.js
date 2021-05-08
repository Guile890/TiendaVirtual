// ``const urlCategoria = "https://api.mercadolibre.com/sites/MLM/categories";
// const urlProducto = "https://api.mercadolibre.com/sites/MLM/search?category=";

const listaMuestra = document.getElementById("listaMuestra");
const selectCategoria = document.getElementById("selectCategoria");
const idCategoria = document.getElementById("categorias");
let arrayProductos = [];
let arregloCategorias = [];


// async function getProductosByCategoria(id) {
//     let urlIdProducto = urlProducto + id;
//     let respuesta = await fetch(urlIdProducto);
//     let data = await respuesta.json();
//     return data;
// }
// async function getInfoProductos(id) {
//     let resultado = await getProductosByCategoria(id);
//     console.log(resultado);
//     arrayProductos = resultado.results;

//     mostrarProductos(arrayProductos);
//     //  crearLista(arrayProductos);
// }

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
                  </div>
                  <small class="text-muted">$ price</small>
              </div>
            </div>
          </div>
        `;
    });
}

// getInfoProductos("MLM1132");

// getInfoProductos("MLM1403");


async function getCategoriasAPIMerca() {
    let respuesta = await fetch('http://localhost:3000/categorias');
    let data = await respuesta.json();
    return data;
}
async function getInfoCategoria() {
    
    let resultado = await getCategoriasAPIMerca();
    console.log(resultado);
    for (let i=1; i<=5; i++){
      arregloCategorias.push(resultado[i]);     
    }
    console.log(arregloCategorias);
    mostrarSelect(arregloCategorias);
    
  }

  function mostrarSelect(){
  selectCategoria.innerHTML = "";
  
  arregloCategorias.forEach((element) => {
    selectCategoria.innerHTML += `<button type="submit" class="btn btn-outline-primary value="${element.id}" onclick="obtenerProductos()">${element.name}</button>`;
  });

}
function obtenerProductos(){
  console.log('estoy en obtener elementos');
  
}
idCategoria.addEventListener('submit',(e)=>{
    obtenerProductos();
    e.preventDefault();
}) 

getInfoCategoria();



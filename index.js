const urlCategoria = 'https://api.mercadolibre.com/sites/MLM/categories'
const urlProducto = 'https://api.mercadolibre.com/sites/MLM/search?category='
const listaMuestra = document.getElementById('listaMuestra')

let arrayProductos = [];

// class crearLista{
//     constructor(Productos){


//     }


// }


async function getCategoriasAPIMerca(){
    let respuesta = await fetch(urlCategoria)
    let data = await respuesta.json();
    return data
}
async function getInfoCategoria(){
    let resultado = await getCategoriasAPIMerca();
    console.log(resultado)    
}
getInfoCategoria();


async function getProductosByCategoria(id){
    let urlIdProducto = urlProducto + id;
    let respuesta = await fetch(urlIdProducto);
    let data = await respuesta.json();
    return data
}
async function getInfoProductos(id){
    let resultado = await getProductosByCategoria(id);
    console.log(resultado);
     arrayProductos = resultado.results;
      
    mostrarProductos(arrayProductos); 
    //  crearLista(arrayProductos);
}



function mostrarProductos(){
    listaMuestra.innerHTML='';
    
        arrayProductos.forEach(element => {
        console.log(element.title);
        console.log(element.thumbnail);
        listaMuestra.innerHTML += `
        
        <div class="col">
          <div class="card shadow-sm">
            <img src='${element.thumbnail}'>
            <div class="card-body">
                <p class="card-text"><b>${element.title}</b></p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                  </div>
                  <small class="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        `
               });
}


getInfoProductos('MLM1132');

getInfoProductos('MLM1403');


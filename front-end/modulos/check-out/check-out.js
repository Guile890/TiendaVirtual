const listaProductos = document.querySelector('#lista-carrito tbody');

function inicio(){
      location.href='/front-end/index.html';
    
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
//Leer el LocalStorage para no perder nuestro carrtio despues de refrescar la pagina
function leerLocalStorage (){
  
    let productosLS;
    productosLS = obtenerProductosLocalStorage();
    productosLS.forEach(function(producto){
      const row = document.createElement('tr');
      
      row.innerHTML = `
          <td>
              <img src="${producto.imagenProducto} " width=100>
          </td>
          <td>${producto.tituloProducto}</td>
          <td>
          <input type="number" id="cantidadArticulos" min="1" value="${producto.cantidad}"></input>
          
          </td>
          <td>${`$`+producto.precioProducto}</td> 
          
          <td>
            <a href="#" type="button" class="btn btn-sm btn-outline-secondary borrar-producto" data-id="${producto.idProducto}">Quitar</a>
          <td>    
              `;
      listaProductos.appendChild(row);
    });
  }

  document.addEventListener('DOMContentLoaded', leerLocalStorage);
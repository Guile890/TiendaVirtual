const listaProductos = document.querySelector('#lista-carrito tbody');
let cantidad;

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
          <td>${`$`+producto.precioProducto}</td> 
          <td>
          <input type="number" style="width: 100%;" id="cantidadArticulos" min="1" value="${producto.cantidad}">
          </td>
          <td>
          ${`$`+ producto.precioProducto * producto.cantidad}
          </td>
          <td>
            <a href="#" type="button" class="btn btn-sm btn-outline-secondary borrar-producto" data-id="${producto.idProducto}">Quitar</a>
          <td>    
              `;
      listaProductos.appendChild(row);
      
    });
    
  }

  //Obtenemos el idProducto para eliminarlo de la cesta
  carrito.addEventListener('click',(e)=>{
    e.preventDefault();
    let producto,productoID;
    if(e.target.classList.contains('borrar-producto')){
      e.target.parentElement.parentElement.remove();
      producto = e.target.parentElement.parentElement;
      productoID = producto.querySelector('a').getAttribute('data-id');
      cantidad = producto.querySelector('input').textContent;
      console.log(productoID);
    }
    eliminarProductoLocalStorage(productoID);
    calcularTotal();
  });

  function eliminarProductoLocalStorage(productoID){
    console.log('Entrando a eliminar LS');
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    console.log(productosLS);
    productosLS.forEach(function(productoLS,index){
      if(productoLS.idProducto === productoID){
        console.log(productoLS.id);
        productosLS.splice(index,1);
      }
    });
    localStorage.setItem('productos',JSON.stringify(productosLS));    
}

function calcularTotal(){
    
    console.log("Entrando a calcular total");
    let total= 0, subtotal=0, iva=0;
    let productoLS = obtenerProductosLocalStorage();
    for(let i = 0; i< productoLS.length; i++){
        let element = Number(productoLS[i].precioProducto * productoLS[i].cantidad );
        total = total + element;
    }
    iva = parseFloat(total * 0.16).toFixed(2);
    subtotal = parseFloat(total-iva).toFixed(2);
    console.log(total);
    document.getElementById('subtotal').innerHTML = `$`+ subtotal;
    document.getElementById('iva').innerHTML = `$`+ iva;
    document.getElementById('total').innerHTML = `$`+ total.toFixed(2);
  }
 
  function Pago(){
    
    const checaCarrito = obtenerProductosLocalStorage();
    if(checaCarrito.length === 0){

      swal({
        text: "El carrito esta vacio",
        icon: "error",
        button: "Ok!",
        timer: 5000
          });
          location.href='/front-end/index.html';
    }else{
        swal({
            text: "Compra realizada con exito",
            button: "Ok!",
            timer: 5000
              });
    }
}
calcularTotal();
  document.addEventListener('DOMContentLoaded',leerLocalStorage,calcularTotal);

  
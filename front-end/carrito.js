class Carrito {
  
    //Obtenemos la informacion del producto agregado a la cesta
     leerProducto (producto){
        const itemProducto = {
            idProducto: producto.querySelector('a').getAttribute('data-id'),
            tituloProducto: producto.querySelector('h5').textContent,
            imagenProducto: producto.querySelector('img').src,
            precioProducto: producto.querySelector('small').getAttribute('data-id'),
            cantidad: 1
          }
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
            this.insertarCarrito(itemProducto); 
          }
      
    }
    
    //Insertamos el producto seleccionado en el carrrito
    insertarCarrito(producto){
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
      this.guardarProductoLocalStorage(producto);
    }
    
    //Se guardan los productos agregados en la cesta en el LocalStorage 
    guardarProductoLocalStorage (producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos',JSON.stringify(productos));
      }
    
      //Obtenemos los productos que se encuentran guardados en el LocalStorage
    obtenerProductosLocalStorage(){
        let productoLS;
    
        if(localStorage.getItem('productos')=== null){
          productoLS = [];
        }else{
          productoLS = JSON.parse(localStorage.getItem('productos'));
    
        }
        return productoLS;
      }
    
      //Eliminar articulo en el LocalStorage
    eliminarProductoLocalStorage(productoID){
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
    leerLocalStorage (){
      
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
    
    }
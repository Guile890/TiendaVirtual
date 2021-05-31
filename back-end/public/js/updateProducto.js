class ProductoUpdate {
    constructor(descripcion, precio, existencia, imagen, categoria, id) {
        this.descripcion = descripcion,
            this.precio = precio,
            this.existencia = existencia,
            this.imagen = imagen,
            this.categoria = categoria,
            this.id = id
    }
}
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()
const form = document.getElementById('nuevoForm');

form.addEventListener('submit', async (event,data) => {
    event.preventDefault();
    let registro = new ProductoUpdate(
        event.target['GET-descripciones'].value,
        event.target['GET-precios'].value,
        event.target['GET-existencias'].value,
        event.target['GET-imagenes'].value,
        event.target['GET-categorias'].value,
        event.target['GET-ids'].value,

    );
    if ((registro.descripcion == null || registro.descripcion == "") && (registro.precio == null || registro.precio == "") && (registro.existencia == null || registro.existencia == "")
        && (registro.imagen == null || registro.imagen == "") && (registro.categoria == null || registro.categoria == "")) {
        swal({
            text: "El formulario está vacío favor de verificar la información",
            button: "Ok",
        });
    }else{
        try {
            console.log('valor a agregar',registro)
            let resultado = await fetch("http://localhost:3000/producto/update",{
                method: 'post',
                headers: {
                    "Accept": "application/json, text/plain, *,*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registro)
            })
            if(resultado.ok){
                swal({
                    text: "Producto editado correctamente",
                    icon: "success",
                    button: "Ok",
                });
            }
            // location.href = '/createProducto'
            console.log('resultadooo',resultado)
            return resultado;

        } catch (error) {
            swal({
                text: `${error.message}`,
                button: "Ok",
            });
            throw console.log(error)
    
        }
    }
   
    
})

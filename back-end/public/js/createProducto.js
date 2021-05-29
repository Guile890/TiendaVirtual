class Producto {
    constructor(descripcion, precio, existencia, imagen, categoria) {
        this.descripcion = descripcion,
            this.precio = precio,
            this.existencia = existencia,
            this.imagen = imagen,
            this.categoria = categoria
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

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let registro = new Producto(
        event.target['GET-descripciones'].value,
        event.target['GET-descripciones'].value,
        event.target['GET-descripciones'].value,
        event.target['GET-descripciones'].value,
        event.target['GET-descripciones'].value,

    );
    if ((registro.descripcion == null || registro.descripcion == "") && (registro.precio == null || registro.precio == "") && (registro.existencia == null || registro.existencia == "")
        && (registro.imagen == null || registro.imagen == "") && (registro.categoria == null || registro.categoria == "")) {
        swal({
            text: "El formulario está vacío favor de verificar la información",
            button: "Ok",
        });
    }
    try {
        let resultado = await fetch("http://localhost:3000/producto",{
            method: 'post',
            headers: {
                "Accept": "application/json, text/plain, *,*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registro)
        })
        let vuelta = await resultado.json()
        return vuelta;
    } catch (error) {
        swal({
            text: `${err.message}`,
            button: "Ok",
        });
        throw console.log(err)

    }
    console.log('form', registro)
})


// let agregar = async () => {
//     let registro = new Producto(
//         document.getElementById('GET-descripciones').value,
//         document.getElementById('GET-precios').value,
//         document.getElementById('GET-existencias').value,
//         document.getElementById('GET-imagenes').value,
//         document.getElementById('GET-categorias').value,

//     );
//     console.log('registro', registro)
//     // try {
//     //     validarTxt(registro.descripcion, "descripción")
//     //     validarTxt(registro.precio, "precio")
//     //     validarTxt(registro.existencia, "existencia")
//     //     validarTxt(registro.imagen, "imagen")
//     //     validarTxt(registro.categoria, "categoria")

//     //     // let resultado = await nuevoUsuario(usuarioNuevo)
//     //     // if (resultado) {
//     //     //     console.log(resultado)
//     //     //     alert('Usuario creado correctamente')
//     //     // }

//     // } catch (err) {
//     //     console.log(err)
//     //     swal({
//     //         text: `${err.message}`,
//     //         button: "Ok!",
//     //     });
//     // }

// }




// let botonAgregar = document.getElementById('agregar')
// botonAgregar.addEventListener('click', agregar, false)
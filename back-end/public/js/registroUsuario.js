const formulario = document.getElementById("formulario");
const nombre = document.getElementById('firstname');
const apellidos = document.getElementById('lastname');
const email = document.getElementById('email');
const movil = document.getElementById('celular');
const telefono = document.getElementById('telefono');
const ciudad = document.getElementById('country');
const estado = document.getElementById('state');
const cp = document.getElementById('zip');
const contrasena = document.getElementById('pass');
const contrasena2 = document.getElementById('pass2');



/*class UsuarioNuevo {
    constructor(nombre,apellidos,email,movil,telefono,ciudad,estado,cp,contrasena){
        this.nombre = nombre, 
        this.apellidos= apellidos, 
        this.email= email , 
        this.movil= movil, 
        this.telefono= telefono, 
        this.ciudad= ciudad, 
        this.estado= estado, 
        this.cp= cp, 
        this.contrasena= contrasena,
        this.usuario= email,
        this.fechaAlta= " ", 
        this.idEstatus= " "
        
    }
}*/

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();
    let resultado = await fetch("http://localhost:3000/registro", { // /nuevousuarios
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            "nombre": nombre.value,
            "apellidos": apellidos.value,
            "email": email.value,
            "movil": movil.value,
            "telefono": telefono.value,
            "ciudad": ciudad.value,
            "estado": estado.value,
            "cp": cp.value,
            "contrasena": contrasena.value,
            
        })
    })
    alert("Usuario registrado correctamente")
    nuevoFormulario()
})

function nuevoFormulario(){
    nombre.value=" ";
    apellidos.value=" ";
    email.value=" ";
    movil.value=" ";
    telefono.value=" ";
    ciudad.value=" ";
    estado.value=" ";
    cp.value=" ";
    contrasena.value=" ";
    email.value=" ";
}
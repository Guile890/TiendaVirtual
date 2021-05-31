const registro = document.getElementById('submit');
const nombre = document.getElementById('firstName');
const apellidos = document.getElementById('lastName');
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
        this.bandera_admin= 2,
        this.fechaAlta= 2021, 
        this.idEstatus= 1
        
    }
    static async recuperaUsuario () {
        let resultado = await JSON.parse(localStorage.getItem('dataUsuario'))
        return resultado
    }
}*/

registro.addEventListener('click', async (event) => {
    event.preventDefault();
    //UsuarioNuevo.recuperaUsuario(new UsuarioNuevo(email.value, contrasena.value,nombre.value,apellidos.value,movil.value,telefono.value,ciudad.value,estado.value,cp.value,));
   console.log("boton");
   
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
            "bandera_admin": '2',
            "contrasena": contrasena.value,
            "fechaAlta": '2021', 
            "idEstatus": '1'
            
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
    contrasena2.value=" ";
    email.value=" ";
}
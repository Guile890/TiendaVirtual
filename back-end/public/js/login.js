const usuario = document.getElementById("usuario");
const contrasena = document.getElementById("contrasena");
const iniciarSesion = document.getElementById("submit")

class Usuarios {
    constructor(usuario, contrasena){
        this.usuario = usuario,
        this.contrasena = contrasena,
        this.token = ""
    }

    static async guardaUsuario (usuario) {
        localStorage.setItem("dataUsuario", JSON.stringify(usuario))
    }

    static async recuperaUsuario () {
        let resultado = await JSON.parse(localStorage.getItem('dataUsuario'))
        return resultado
    }
}

iniciarSesion.addEventListener('click', async (event) => {
    event.preventDefault();
    Usuarios.guardaUsuario(new Usuarios(email.value, contrasena.value));
    let resultado = await fetch("http://localhost:3000/login", {
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            "email": email.value,
            "contrasena": contrasena.value
        })
    })

    let vuelta = await resultado.json();
    if(vuelta === 'Usuario o contraseña incorrecta'){
        alert('Usuario o contraseña incorrecta')
    } else {
        let data = await Usuarios.recuperaUsuario();
        data.usuario = vuelta.user.usuario;
        data.nombre = vuelta.user.nombre + " " + vuelta.user.apellidos;
        data.token = vuelta.token;
        Usuarios.guardaUsuario(data);
       location.href = 'https://teclerchallenge.000webhostapp.com/'
    }
})
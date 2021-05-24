class Usuarios {
    constructor(usuario, contrasena){
        this.usuario = usuario,
        this.pass = contrasena,
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


//Instaciar esta clase
//let usuarioNuevo = new Usuarios ('aolguin', 'pirulo')
//Usuarios.guardaUsuario(new Usuarios ('aolguin', 'pirulo123'))

//logica de app para login


let registro = async function (){
    let data = await Usuarios.recuperaUsuario()
    console.log(data)

    let resultado = await fetch("http://localhost:3000/registro", { 
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            "usuario": data.usuario,
            "pass": data.contrasena
        })
    })
    let vuelta = await resultado.json()
    data.token = vuelta
    return data
}

async function llamada () {
    let resultado = await login()
    console.log(resultado)
    Usuarios.guardaUsuario(resultado)
    return resultado
}

//Logica de la pagina una vez realizado el login

let usuariosGet = async function (){
    let data = await Usuarios.recuperaUsuario()

    let resultado = await fetch("http://localhost:3000/usuarios" , {
        method: 'get',
        headers: {
            "Accept": "application/json, text/plain, */*",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        },
    })

    let vuelta = await resultado.json()
    return vuelta
}

async function llamadaNueva () {
    let resultado = await usuariosGet()
    console.log(resultado)
    return resultado
}

//Inicio de nuestra app
async function iniciarApp () {
    await llamada()
    llamadaNueva()
}

iniciarApp()
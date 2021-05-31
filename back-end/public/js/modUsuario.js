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
const id = document.getElementById('idUser');
const bandera_admin = document.getElementById('admin_bandera');

registro.addEventListener('click', async (event) => {
    event.preventDefault();
    //UsuarioNuevo.recuperaUsuario(new UsuarioNuevo(email.value, contrasena.value,nombre.value,apellidos.value,movil.value,telefono.value,ciudad.value,estado.value,cp.value,));
   console.log("boton");
   console.log(bandera_admin.value);
   //let data = await JSON.parse(localStorage.getItem('dataUsuario'))
   
    let resultado = await fetch("http://localhost:3000/modificar", { // /nuevousuarios
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json",
            //'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify( {
            "id": parseInt(id.textContent),
            "nombre": nombre.value,
            "apellidos": apellidos.value,
            "email": email.value,
            "movil": movil.value,
            "telefono": telefono.value,
            "ciudad": ciudad.value,
            "estado": estado.value,
            "cp": cp.value,
            "bandera_admin": bandera_admin.value,
            "contrasena": contrasena.value,
            "fechaAlta": '2021', 
            "idEstatus": '1'
            
        })
        
    })
    
   // if(resultado.status == 400){
    //    swal({
     //       title: "No tienes permiso para modificar",
       //     icon: "error",
       //   });
  //  } else {
    swal({
        title: "Se actualizo la informacion del usuario correctamente",
        icon: "success",
      });
      setTimeout(() => {
        location.href = '/usuarios'
    }, 3000);
   // }
})

function validarTxt (data, tipo) {
    console.log(data)
    if( data == null || data == 0 ) {
        throw new Error (`El campo ${tipo} es incorrecto, ingrese un valor válido`)
    }else {
        return 'ok'
    }
}

function validarMail (data) {
    console.log(data)
    if( (/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(data)) ) {
        throw new Error ('Alguno de los valors ingresados no es correcto')
    }else {
        return 'ok'
    }
}

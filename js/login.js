let usuarios = [];
//Formulario Iniciar sesion
const formLogin = document.querySelector("#formLogin");
const mailLog = document.querySelector("#mailLogin");
const passwordLog = document.querySelector("#contraseña");
//Formulario Registro
const nombre = document.querySelector("#name");
const password = document.querySelector("#password");
const mail = document.querySelector("#email");
const formReg = document.querySelector("#formRegister");

//Iniciar sesion
formLogin.addEventListener("submit", (e) => {
    e.preventDefault()
    let email = mailLog.value;
    let pass = passwordLog.value;
    usuarios = JSON.parse(localStorage.getItem("usuarios"))|| [];
    let resultado = usuarios.some ((elemento) => {
        return elemento.email == email && elemento.pass == pass;
    });
    if (resultado){
        setTimeout(function(){
            window.location.href = "http://127.0.0.1:5500/index.html";
        },500);
        
    }else{
        Swal.fire({
            iconHtml: '<i class="bi bi-emoji-frown"></i>',
            title: 'El usuario ingresado no existe o la contraseña es incorrecta!',
            text: 'Por favor Registrate o verifica tus datos',
        });
    }
    limpiar();
})

//Registrarse
formReg.addEventListener("submit", (e) => {
    e.preventDefault()
    let email = mail.value;
    let pass = password.value;
    usuarios = JSON.parse(localStorage.getItem("usuarios"))|| [];
    let resultado = usuarios.find ((elemento) => {
        return elemento.email == email;
    });
    if (resultado){
        Swal.fire({
            iconHtml: '<i class="bi bi-emoji-smile-upside-down"></i>',
            title: 'El usuario ingresado ya existe!',
            text: 'Por favor Inicia sesion',
})
    }else {
        usuarios.push({email: email , pass: pass});
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        Swal.fire({
            position: 'center',
            iconHtml: '<i class="bi bi-arrow-through-heart"></i>',
            title: 'Usuario creado con exito',
            showConfirmButton: false,
            timer: 2500
        })
    };
        limpiar();
        console.log(resultado)
    })
    
    function limpiar(){
        document.querySelector("#name").value = "";
        document.querySelector("#password").value = "",
        document.querySelector("#email").value = "";
        document.querySelector("#mailLogin").value = "";
        document.querySelector("#contraseña").value = "";
    }
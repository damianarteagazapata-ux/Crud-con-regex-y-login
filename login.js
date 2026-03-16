// crear contraseña si no existe
if(!localStorage.getItem("password")){
localStorage.setItem("password","1234")
}

function login(){

let password = document.querySelector("#password").value

let guardada = localStorage.getItem("password")

if(password === guardada){

localStorage.setItem("login","true")

window.location.href = "index.html"

}else{

alert("Contraseña incorrecta")

}

}
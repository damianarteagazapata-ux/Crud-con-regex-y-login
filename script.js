// verificar sesión

if(localStorage.getItem("login") !== "true"){
window.location.href = "login.html"
}

//regex

const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,40}$/
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const regexWhatsapp = /^[0-9]{10,13}$/

let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || []

let editandoId = null

mostrarEstudiantes()

function guardarEstudiante(){

let nombre = document.querySelector("#nombre").value
let correo = document.querySelector("#correo").value
let whatsapp = document.querySelector("#whatsapp").value
let fecha = document.querySelector("#fechaNacimiento").value

if(nombre === "" || correo === "" || whatsapp === "" || fecha === ""){
alert("Ponga todos los campos")
return
}

if(!regexNombre.test(nombre)){
alert("Nombre inválido")
return
}

if(!regexCorreo.test(correo)){
alert("Correo inválido")
return
}

if(!regexWhatsapp.test(whatsapp)){
alert("WhatsApp inválido")
return
}

if(editandoId === null){

let estudiante = {

id: Date.now(),
nombre: nombre,
correo: correo,
whatsapp: whatsapp,
fechaNacimiento: fecha,
edad: new Date().getFullYear() - new Date(fecha).getFullYear()

}

estudiantes.push(estudiante)

}else{

let index = estudiantes.findIndex(e => e.id === editandoId)

estudiantes[index].nombre = nombre
estudiantes[index].correo = correo
estudiantes[index].whatsapp = whatsapp
estudiantes[index].fechaNacimiento = fecha
estudiantes[index].edad = new Date().getFullYear() - new Date(fecha).getFullYear()

editandoId = null

}

localStorage.setItem("estudiantes", JSON.stringify(estudiantes))

limpiarFormulario()

mostrarEstudiantes()

}

function mostrarEstudiantes(){

let tabla = document.querySelector("#tablaEstudiantes")

tabla.innerHTML = ""

estudiantes.forEach(est => {

tabla.innerHTML += `
<tr>
<td>${est.id}</td>
<td>${est.nombre}</td>
<td>${est.correo}</td>
<td>${est.whatsapp}</td>
<td>${est.fechaNacimiento}</td>
<td>${est.edad}</td>
<td>
<button class="btn btn-warning btn-sm" onclick="editarEstudiante(${est.id})">Editar</button>
<button class="btn btn-danger btn-sm" onclick="eliminarEstudiante(${est.id})">Eliminar</button>
</td>
</tr>
`

})

}

function editarEstudiante(id){

let estudiante = estudiantes.find(e => e.id === id)

document.querySelector("#nombre").value = estudiante.nombre
document.querySelector("#correo").value = estudiante.correo
document.querySelector("#whatsapp").value = estudiante.whatsapp
document.querySelector("#fechaNacimiento").value = estudiante.fechaNacimiento

editandoId = id

}

function eliminarEstudiante(id){

estudiantes = estudiantes.filter(e => e.id !== id)

localStorage.setItem("estudiantes", JSON.stringify(estudiantes))

mostrarEstudiantes()

}

function limpiarFormulario(){

document.querySelector("#nombre").value = ""
document.querySelector("#correo").value = ""
document.querySelector("#whatsapp").value = ""
document.querySelector("#fechaNacimiento").value = ""

}

function logout(){

localStorage.removeItem("login")

window.location.href = "login.html"

}
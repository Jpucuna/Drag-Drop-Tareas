const tareas = document.querySelectorAll(".tarea")
const estados = document.querySelectorAll(".estado")
const estado = document.getElementById("no_estado")
let draggableTarea = null;

tareas.forEach(tarea => {
    tarea.addEventListener("dragstart", empiezaDrag)
    tarea.addEventListener("dragend", finalizaDrag)
})

function empiezaDrag(){
    draggableTarea = this
    setTimeout(()=>{
        this.style.display = "none"
    }, 0)
    console.log("Empieza drag");
}

function finalizaDrag(){
    draggableTarea = null
    setTimeout(()=>{
        this.style.display = "block"
    }, 0)
    console.log("Finaliza drag");
}

//tratamiento de los estados al hacer drag and drop con la tarea 
estados.forEach(estado =>{
    estado.addEventListener("dragover", sobre)
    estado.addEventListener("dragcenter", dentro)
    estado.addEventListener("dragleave", fuera)
    estado.addEventListener("drop", soltar)
})

function sobre(e){
    e.preventDefault()
}

function dentro(){
    this.style.border = "1px dashed #ccc"
}

function fuera(){
    this.style.border = "none"
}

function soltar(){
    this.style.border = "none"
    this.appendChild(draggableTarea)//agrega el elemento arrastrado al area en el que se suelta 
}


//declaracion de variables que obtienen los elementos conectados con el modal 
const btn_agregar = document.querySelectorAll("[data-target-modal]") //hace referencia a la propiedad data target declarado en el boton 
const overlay = document.getElementById("overlay")
const cerrar_btn = document.querySelectorAll(".close-modal")

//boton de agregar tarea que lleva al modal  
btn_agregar.forEach(btn =>{
    btn.addEventListener("click", event =>{
        document.querySelector(btn.dataset.targetModal).classList.add("active")
        //agregamos las palabras active para que aparezca el modal y el overlay 
        overlay.classList.add("active")
    })
})

//Funcionalidad del boton cerrar el modal 
cerrar_btn.forEach(btn =>{
    btn.addEventListener("click", event =>{
        const obtengoModal = btn.closest(".modal")
        obtengoModal.classList.remove("active")
        overlay.classList.remove("active")
    })
})

//si se hace click fuera del modal sobre el overlay se cerrará el agregar una tarea
window.onclick = (event =>{
    if(event.target == overlay){//pregunta si el click se realiza sobre el overlay
        const modals = document.querySelectorAll(".modal")
        modals.forEach(modal =>{
            modal.classList.remove("active")
            overlay.classList.remove("active")
        })
    }
})


//CREACION DE TAREAS
const tarea_submit = document.getElementById("tarea_submit")

tarea_submit.addEventListener("click", crearTarea)

function crearTarea(){
    //primero creamos el div que contendrá ña tarea junto al span con X
    //se crea un div con createElement
    const tarea_div = document.createElement("div")
    //se extrae el valor del input de la tarea
    const inputTarea = document.getElementById("tarea-input").value
    //se lo agregará dentro de un textNode para agregarlo luego al elemento div
    const txt = document.createTextNode(inputTarea)
    //se crera el div con el texto extraido
    tarea_div.appendChild(txt)
    //agregamos la clase y los atributos que tienen las tareas
    tarea_div.classList.add("tarea")
    tarea_div.setAttribute("draggable", "true")

    //creacion del span con la X, repetimos los mismos pasos que en el div
    const spanX = document.createElement("span")
    const textSpan = document.createTextNode("\u00D7")//signo de multiplicacion en UNICODE
    spanX.appendChild(textSpan)
    spanX.classList.add("close")

    //agregamos el span dentro del div tarea como lo tenemos en nuestro html
    tarea_div.appendChild(spanX)

    //posteriormente agregas al estado nuestra tarea
    estado.appendChild(tarea_div)

    //le agregamos la funcionalidad de cerrar la tarea al span 
    spanX.addEventListener("click", event =>{
        //con parentElement hacemos que el padre osea, el div que contiene el span se oculte
        spanX.parentElement.style.display = "none"
    })

    //agregamos las propiedades dragstart-dragend
    tarea_div.addEventListener("dragstart",empiezaDrag)
    tarea_div.addEventListener("dragend",finalizaDrag)

    //posterior a esto para solucionar que el modal no se oculta se le agrega lo siguiente
    document.getElementById("tarea-input").value = ""//dejar en blanco el input
    tarea_form.classList.remove("active")//con el id del modal desactivamos su vista
    overlay.classList.remove("active")//en el overlay tambien 

}

//habilitamos el boton cerrar para que se aplique en todas las tareas
const cerrar = document.querySelectorAll(".close")

cerrar.forEach(btn =>{
    btn.addEventListener("click", event=>{
        btn.parentElement.style.display = "none"
    })
})









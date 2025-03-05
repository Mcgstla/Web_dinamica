// Se crea la clase del objeto tarea con su constructor y todos los parámetros
class Tarea{ 
    constructor(id, titulo, descripcion, fecha, prioritaria, prioridad, completa){
        this.id=id;
        this.titulo=titulo;
        this.descripcion=descripcion;
        this.fecha=fecha;
        this.prioritaria=prioritaria;
        this.prioridad=prioridad;
        this.completa=completa;
        //Se crea un condicional para las imágenes
        if (prioridad == "1") {
            this.imagen = "https://static-00.iconduck.com/assets.00/high-priority-icon-1024x1024-ryazhwgn.png";
        }
        else if (prioridad == "2"){
            this.imagen ="https://static-00.iconduck.com/assets.00/medium-priority-icon-512x512-kpm2vacr.png";
        }
        else {
            this.imagen = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4tANuBJoViapolNoVPmOHlaaFityDbdvSyyhUVpIL_MvB2K3IS6DNmUXkAtzhOPbbHRc&usqp=CAU";
        }
            
    }
    

}
// Creo una variables inicializada en 0, se le da una identificación única a las cartas
let idCartas = 0;
// Creo un array para agrupar las cartas
let barajaCartas = [];

// Añado una función para realizar esa acción cuando se cree el objeto añadiendolo al final del array
function crearCarta (id, titulo, descripcion, fecha, prioritaria, prioridad){
    let carta = new Tarea (id,titulo, descripcion,fecha,prioritaria,prioridad,false);
    barajaCartas.push(carta);
    // Creo una variable para almacenar el elemento traido por su id
    let contenedorCartas = document.getElementById("cartas");
    //Creo un elemento div para el html
    let nuevaCarta = document.createElement("div");
    //Creo un id para nuevaCarta 
    nuevaCarta.id = "tarea-" + carta.id;
     // Creo una clase dibujoCarta y se añade al elemento recien creado
    nuevaCarta.className = "dibujoCarta";
    // Añado innerHTML para establecer el contenido de html
    nuevaCarta.innerHTML = '<img src = ' + carta.imagen + '> <p>' + carta.titulo + '</p> <p>' + carta.descripcion + '</p> <button onClick = tareaCompletada(' +  carta.id + ')> Completar </button>';
    // Añado este método para crear un nuevo nodo
    contenedorCartas.appendChild(nuevaCarta); 

}

//Creo esta función para que busque el elemento que se le pide por id y lo elimine del DOM 
function tareaCompletada(id){
    let cartaABorrar = document.getElementById("tarea-" + id);
    cartaABorrar.remove();
    // Añado este método para que busque el elemento dentro del array y nos devuelva el primer elemento que encuentre con la condición que se le ha pasado
    let borradoArray = barajaCartas.findIndex(tarea => tarea.id === id);
    // Con este método, eliminamos el elemento
    barajaCartas.splice(borradoArray, 1);
    
}

// Creo esta función y dentro de ella la variable donde almacenar lo que introduzca el usuario, por eso el .value
function filtrarResultados(){
    let busqueda = document.getElementById("formBuscador").value;
    // Creo la variable donde se almacenara el filtrado de las condiciones especificadas
    let tareasFiltradas = barajaCartas.filter(tarea => tarea.prioridad === busqueda || busqueda === "0");
    // De nuevo se crea la variable para asignarle la búsqueda del elemento por id
    let contenedorResultados = document.getElementById("resultados");
    // Con esto se hará que se quede vacío previo a los nuevos resultados
     contenedorResultados.innerHTML = "";
     // Con este método de array vamos a recorrer las tareasFiltradas
     tareasFiltradas.forEach(tarea => {
        // Así accedemos al titulo de cada tareaFiltrada y se inserta en el html
        let tareaHTML = '<div class="resultado-tarea"><p>' + tarea.titulo + '</p></div>';
        contenedorResultados.innerHTML += tareaHTML; 
    });
}


// Se crea una variable para almacenar el formulario de la tarea para controlar que no se recargue la página y crear las cartas.
let formularioTarea = document.getElementById("formCrearTarea"); 
    formularioTarea.addEventListener("submit", (event) => {
        event.preventDefault();
       let patata = idCartas++;
       let titulo = document.getElementById("nombreTarea").value;
       let descripcion = document.getElementById("descripcionTarea").value;
       let fecha = document.getElementById("fecha").value;
       let prioritaria = document.getElementById("check").checked;
       let prioridad = document.getElementById("prioTarea").value;

       crearCarta(patata, titulo, descripcion, fecha, prioritaria, prioridad);
    });
// Creo la variable y almacenamos la búsqueda del elemento por id nuevamente
let formularioBusqueda = document.getElementById("formBuscador");
// Creo un evento escuchador para dectectar cambios dentro del formulario
    formularioBusqueda.addEventListener("change", filtrarResultados);





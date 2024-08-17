let contTajetas = document.querySelector('.cont-tajetas')
let segundo = document.getElementById('segundo')
let movimentos = document.getElementById('movimentos')
let mas = document.getElementById('mas')
let menos = document.getElementById('menos')
let cant = document.getElementById('cant')
let btnJugar = document.getElementById('btnJugar')

let cantidad = 10
let tiempo
let cartasVolteadas = [];
let coincidencias = 0;
let tarjetas = []

let frase = "<p class='frase'>¡Desafía tu memoria y sorpréndete! Cada carta que descubras es un paso más hacia la victoria.</p>"
contTajetas.innerHTML = frase
let alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
                'Y', 'Z'];
let duplicarAlfabeto = [...alfabeto.slice(0, cantidad / 2), ...alfabeto.slice(0, cantidad / 2)]


let caras = `<div class="adelante"></div><div class="atras"></div>'`
let aleatoria = duplicarAlfabeto.sort(() => 0.5 - Math.random())

function Juegar(){
    segundos()
    crearCartas()
}

mas.addEventListener('click',()=>{
    cantidad+=2
    cant.textContent = cantidad
})
menos.addEventListener('click',()=>{
    if(cantidad>10){
        cantidad-=2
        cant.textContent = cantidad
    }
})
function segundos(){
    segundo.textContent = 0
    tiempo = setInterval(() => {
    segundo.textContent ++
    }, 1000);
}
function crearCartas(){
    tarjetas = [];
    contTajetas.innerHTML = ''; 
    for (let index = 0; index < cantidad; index++) {
        let div = document.createElement('div')
        div.className = 'tarjeta'
        div.innerHTML = caras
        div.querySelector('.atras').textContent = aleatoria[index]
        
        tarjetas.push(div)
        contTajetas.append(div) 
    }
    evento()
}
function rotar (t) {
    if (cartasVolteadas.length < 2){
        t.classList.add('rotar');
        cartasVolteadas.push(t)
    }
    if (cartasVolteadas.length === 2) {
        if( cartasVolteadas[0] != cartasVolteadas[1]){
            movimentos.textContent ++
        }
        if (cartasVolteadas[0].querySelector('.atras').textContent === cartasVolteadas[1].querySelector('.atras').textContent) {
            coincidencias++;
            if (coincidencias === cantidad / 2) {
                mostrarAlertPersonalizado('Has completado el juego!')
                clearInterval(tiempo)
              
            }
            cartasVolteadas = [];
        }else{
            setTimeout(() => {
                cartasVolteadas.forEach(carta => carta.classList.remove('rotar'));
                cartasVolteadas = [];
            }, 1000);
        }
    }
    
}
btnJugar.addEventListener('click',Juegar)

function evento(){
    tarjetas.forEach(t =>{
        console.log(t)
        t.addEventListener('click', function (){
            rotar(t)
        } )})
}
function mostrarAlertPersonalizado(mensaje) {
    var alerta = document.createElement('p');
    alerta.className = "alerta"
    alerta.innerHTML = mensaje;
    contTajetas.appendChild(alerta);

    setTimeout(function() {
        alerta.remove();
    }, 3000);
}

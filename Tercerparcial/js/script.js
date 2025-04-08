/*document.addEventListener ("DOMContentLoaded",()=>{

    let linksCollection = document.querySelectorall('header nav ul li a');
    linksCollection.foreach((link)=>{
        link.addEventListener("click",(e)=>{
            e.preventDefault();
            e.stopPropagation();
            alert("Navegara a travez de la pagina:" + e.target.href )
        })
    })
});
*/

document.addEventListener ("DOMContentLoaded",()=>{

const track = document.querySelector('.carrusel .track');
let currentSlide= 0;
const slides = track.querySelectorAll('.hero');
const slidesTopLimit = slides.length - 1;
let direction = 1; // 1 derecha -1 izquierda
const waitingTime=3000; // 3s *1000ms
console.log("Slides Found:",slides);
 let timeoutID = null;
function moveSlide(){
console.log("Move slide triggered");
if(timeoutID){
    clearTimeout(timeoutID);
}
let nextSlide = currentSlide + direction;
if( nextSlide < 0){
    nextSlide = 0;
    nextSlide = 1;

}
if (nextSlide > slidesTopLimit){
    nextSlide = slidesTopLimit -1;
    direction = -1;
}

renderSlide(nextSlide);
tickFunction();
}

function renderSlide(moveTo){
    track.style.transform = `translateX:calc(100vw*${moveTo*-1})`; 
    curruntSlide = moveTo
}
const tickFunction = ()=>{
    timeoutID = setTimeout
    (moveSlide
            , waitingTime
        );
    
 tickFunction();

 function renderNavigation() {
    btnLeft = document.createElement('BUTTON');
    btnLeft.textContent = "<";
    btnLeft.classList.add("btn-left");
    btnLeft.addEventListener('click', ()=>{
        if(currentSlide >0){
            renderSlide(currentSlide -1);
        }
    })
 }
}
});
const btnRight = document.createElement('BUTTON');
    btnRight.textContent = ">";
    btnRight.classList.add("btn-right");
    btnRight.addEventListener('click', () => {
        if (currentSlide < slidesTopLimit) {
            renderSlide(currentSlide + 1);
        }
        
    });

    carrusel.appendChild(btnLeft);
    carrusel.appendChild(btnRight);
const nav = document.createElement("DIV");
nav.classList.add('nav');
slides.foreach (
    (slide,index)=>{
     const btn = document.createElement("BUTTON");
     btn.textContent= (index +1);
     btn.addEventListener('Click',()=>{
        
     })
    }
);
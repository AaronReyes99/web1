
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("nav ul");
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }

    // Slider
    let current = 0;
    const images = document.querySelectorAll(".slider img");
    if (images.length > 0) {
        images[current].classList.add("active");
        setInterval(() => {
            images[current].classList.remove("active");
            current = (current + 1) % images.length;
            images[current].classList.add("active");
        }, 3000);
    }

    // Validaciones simples
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", e => {
            const inputs = form.querySelectorAll("input[required], textarea[required]");
            let valid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.border = "2px solid red";
                    valid = false;
                } else {
                    input.style.border = "1px solid #ccc";
                }
            });
            if (!valid) {
                e.preventDefault();
                alert("Por favor, completá todos los campos requeridos.");
            }
        });
    });
});

// Carrusel de testimonios
let tIndex = 0;
const testimonios = document.querySelectorAll(".testimonio");
if (testimonios.length > 0) {
    setInterval(() => {
        testimonios[tIndex].classList.remove("active");
        tIndex = (tIndex + 1) % testimonios.length;
        testimonios[tIndex].classList.add("active");
    }, 4000);
}

// Animaciones al hacer scroll
const animados = document.querySelectorAll(".animada");
const mostrarAnimados = () => {
    animados.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("visible");
        }
    });
};
window.addEventListener("scroll", mostrarAnimados);
window.addEventListener("load", mostrarAnimados);

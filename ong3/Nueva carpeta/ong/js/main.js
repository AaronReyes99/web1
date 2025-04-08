
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("nav ul");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  // Slider
  const images = document.querySelectorAll(".slider img");
  let current = 0;
  if (images.length > 0) {
    images[current].classList.add("active");
    setInterval(() => {
      images[current].classList.remove("active");
      current = (current + 1) % images.length;
      images[current].classList.add("active");
    }, 3000);
  }

  // Validaciones
  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", e => {
      let valid = true;
      form.querySelectorAll("input[required], textarea[required]").forEach(input => {
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

  // Carrusel testimonios
  let tIndex = 0;
  const testimonios = document.querySelectorAll(".testimonio");
  if (testimonios.length > 0) {
    setInterval(() => {
      testimonios[tIndex].classList.remove("active");
      tIndex = (tIndex + 1) % testimonios.length;
      testimonios[tIndex].classList.add("active");
    }, 4000);
  }

  // Animaciones en scroll
  const animados = document.querySelectorAll(".animada");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Si es contador, activar animación
        if (entry.target.classList.contains("counter")) {
          const target = +entry.target.getAttribute("data-target");
          const speed = 200;
          const update = () => {
            const count = +entry.target.innerText;
            const increment = Math.ceil(target / speed);
            if (count < target) {
              entry.target.innerText = count + increment;
              setTimeout(update, 30);
            } else {
              entry.target.innerText = target;
            }
          };
          update();
        }
      }
    });
  }, { threshold: 0.5 });

  animados.forEach(el => observer.observe(el));
  document.querySelectorAll(".counter").forEach(el => observer.observe(el));

  // Modo oscuro
  const toggleDark = document.querySelector("#darkToggle");
  if (toggleDark) {
    toggleDark.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }
});

//  FAQ
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    const visible = answer.style.display === "block";
    document.querySelectorAll(".faq-answer").forEach(a => a.style.display = "none");
    answer.style.display = visible ? "none" : "block";
  });
});

// Filtro de programas
document.querySelectorAll("#programFilters button").forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");
    document.querySelectorAll(".program-card").forEach(card => {
      if (filter === "todos" || card.classList.contains(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Slider en galería
const slides = document.querySelectorAll(".gallery-slide");
let currentSlide = 0;
if (slides.length > 0) {
  slides[currentSlide].style.display = "block";
  setInterval(() => {
    slides[currentSlide].style.display = "none";
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.display = "block";
  }, 3000);
}

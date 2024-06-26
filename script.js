
let lastScrollTop = 0;

window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        document.querySelector(".content").classList.add("hidden");
    } else {
        document.querySelector(".content").classList.remove("hidden");
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);


let slideIndex = 0;                                     //variável para armazenar o índice do slide

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {                               //exibir um slide específico
    let slides = document.getElementsByClassName("mySlides");
    
    if (n >= slides.length) {        
        slideIndex = 0;
    } else if (n < 0) {
        slideIndex = slides.length - 1;
    }
    
    for (let i = 0; i < slides.length; i++) {           // Oculta todos os slides
        slides[i].style.display = "none";
    }
    
    slides[slideIndex].style.display = "block";          // Exibe o slide atual
}

function startSlideshow() {                             //iniciar automaticamente
    showSlides(slideIndex);
    setInterval(function() {
        plusSlides(1);
    }, 6000);
}

window.onload = startSlideshow;

function showItems(selector) {
    document.querySelector(selector).classList.add('show');
}

function verProdutos() {
    window.location.assign("produtos.html"); 
}
function voltar() {
    window.history.back(); 
}

document.getElementById("botoes").addEventListener("click", function() {
    document.getElementById("info").classList.toggle("animate");
});


document.addEventListener("DOMContentLoaded", function() {
    const cardapioSection = document.querySelector(".cardapio");
    cardapioSection.classList.add("active");
  });
  
     function toggleMenu() {
        var menu = document.getElementById("menu");
        var button = document.getElementById("menuButton");
        if (menu.style.display === "none" || menu.style.display === "") {
            menu.style.display = "block"; // Mostra o menu
            button.textContent = "Fechar Menu"; // Altera o texto do botão
        } else {
            menu.style.display = "none"; // Oculta o menu
            button.textContent = "Abrir Menu"; // Altera o texto do botão
        }
    }


 
//animacao da logo;
window.addEventListener('scroll', function () {
    const logo = document.querySelector('.logo');
    const headerHeight = document.querySelector('header').offsetHeight;

    if (window.scrollY > 0) {
        logo.style.opacity = '0';     //Logo desaparece;
    } else {
        logo.style.opacity = '0.60';  // Logo aparece;
    }
});



















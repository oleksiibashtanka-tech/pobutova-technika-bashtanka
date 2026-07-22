// Меню
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

// Анімація карток
const cards = document.querySelectorAll(".category-card, .product-card");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });
});

// Кнопка каталогу
const catalogBtn = document.querySelector(".hero-btn");

if (catalogBtn) {
    catalogBtn.addEventListener("click", () => {
        alert("Каталог буде відкрито після завершення розробки.");
    });
}

console.log("Побутова Техніка Баштанка успішно завантажена.");

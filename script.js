// Плавна анімація появи карток
const cards = document.querySelectorAll('.card, .item, .tiktok');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.15
});

cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "0.6s ease";
    observer.observe(card);
});

// Ефект натискання
document.querySelectorAll('.item, .tiktok').forEach(button => {
    button.addEventListener('click', () => {
        button.style.transform = "scale(0.97)";
        setTimeout(() => {
            button.style.transform = "";
        }, 120);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Ефект плавної появи елементів інтерфейсу при завантаженні
    const animElements = document.querySelectorAll(".feature-item, .contact-btn, .tiktok-main-btn");
    
    animElements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(10px)";
        el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        
        setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, 100 * index);
    });

    // Трекінг кліків (можна розширити для аналітики)
    const links = document.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            // Ефект легкої вібрації кнопки при натисканні
            link.style.transform = "scale(0.97)";
            setTimeout(() => {
                link.style.transform = "none";
            }, 100);
        });
    });
});

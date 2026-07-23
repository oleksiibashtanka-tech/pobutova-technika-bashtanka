document.addEventListener("DOMContentLoaded", () => {
    // Ефект легкого кліку (зворотний зв'язок інтерфейсу)
    const allButtons = document.querySelectorAll(".contact-btn, .tiktok-main-btn");
    
    allButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.style.transform = "scale(0.96)";
            setTimeout(() => {
                btn.style.transform = "none";
            }, 80);
        });
    });
});

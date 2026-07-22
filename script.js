document.addEventListener('DOMContentLoaded', () => {
    
    // Блокування випадкових системних жестів масштабування на iOS при подвійному тапі
    document.addEventListener('touchstart', (event) => {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    // Додаємо легкий тактильний ефект занурення під час кліків на інтерактивні елементи (для мобільних)
    const actionButtons = document.querySelectorAll('.link-item, .tiktok-btn, .phone-top');
    
    actionButtons.forEach(button => {
        button.addEventListener('touchstart', () => {
            button.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', () => {
            button.style.transform = 'none';
        });
    });
});

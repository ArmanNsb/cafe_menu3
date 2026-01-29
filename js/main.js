document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 1. Splash Screen
    // ============================================
    const splashScreen = document.getElementById('splash-screen');

    if (splashScreen) {
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            splashScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';

            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 1000);
        }, 2500);
    }

    // ============================================
    // 2. Accordion Menu + Micro Focus
    // ============================================
    const categories = document.querySelectorAll('.menu-category');
    const appContainer = document.querySelector('.app-container');

    if (!categories.length || !appContainer) return;

    // ⭐ transition فقط یک بار
    appContainer.style.transition = 'transform 0.35s ease';

    categories.forEach(category => {
        const header = category.querySelector('.category-header');
        const content = category.querySelector('.category-content');

        if (!header || !content) return;

        // --- Press feedback ---
        const pressOn = () => header.classList.add('is-pressing');
        const pressOff = () => header.classList.remove('is-pressing');

        header.addEventListener('touchstart', pressOn);
        header.addEventListener('touchend', pressOff);
        header.addEventListener('mousedown', pressOn);
        header.addEventListener('mouseup', pressOff);
        header.addEventListener('mouseleave', pressOff);

        // --- Accordion logic ---
        header.addEventListener('click', () => {

            const isOpen = category.classList.contains('active');

            // بستن بقیه
            categories.forEach(item => {
                if (item !== category) {
                    const c = item.querySelector('.category-content');
                    if (!c) return;

                    item.classList.remove('active', 'shadow-visible');
                    c.style.height = '0px';
                }
            });

            if (!isOpen) {
                // OPEN
                category.classList.add('active');

                content.style.height = content.scrollHeight + 'px';

                // 🎯 Micro focus movement
                setTimeout(() => {
                    const rect = header.getBoundingClientRect();
                    const offset = 50;

                    if (rect.top < offset) {
                        const shift = offset - rect.top;

                        appContainer.style.transform = `translateY(${shift}px)`;

                        // برگشت خیلی نرم
                        setTimeout(() => {
                            appContainer.style.transform = 'translateY(0)';
                        }, 180);
                    }
                }, 300);

                setTimeout(() => {
                    category.classList.add('shadow-visible');
                }, 250);

            } else {
                // CLOSE
                category.classList.remove('active', 'shadow-visible');
                content.style.height = '0px';
            }
        });
    });
});

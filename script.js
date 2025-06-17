// Add your custom JavaScript here
// Animate all sections and main content on load
function animateSections() {
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const sections = document.querySelectorAll('main section');
    const footer = document.querySelector('footer');

    // Header animation
    if (header) {
        header.style.opacity = 0;
        header.style.transform = 'translateY(-40px)';
        setTimeout(() => {
            header.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
            header.style.opacity = 1;
            header.style.transform = 'translateY(0)';
        }, 100);
    }

    // Main fade-in
    if (main) {
        main.style.opacity = 0;
        setTimeout(() => {
            main.style.transition = 'opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
            main.style.opacity = 1;
        }, 400);
    }

    // Section animations (staggered)
    sections.forEach((section, i) => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(40px)';
        setTimeout(() => {
            section.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        }, 700 + i * 200);
    });

    // Footer animation
    if (footer) {
        footer.style.opacity = 0;
        setTimeout(() => {
            footer.style.transition = 'opacity 1s cubic-bezier(0.23, 1, 0.32, 1)';
            footer.style.opacity = 1;
        }, 1500);
    }
}

document.addEventListener('DOMContentLoaded', animateSections);

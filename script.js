/**
 * Sachintha Dilshan Portfolio - Interactive & Security Scripts
 * Version: 2.0.0
 */

// ==========================================
// 1. THEME MANAGEMENT (Dark / Light Mode)
// ==========================================
(function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    function applyTheme(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        const isCurrentlyDark = document.documentElement.classList.contains('dark');
        applyTheme(!isCurrentlyDark);
    });

    // Listen to OS system preference changes if user hasn't explicitly set preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches);
        }
    });
})();

// ==========================================
// 2. MOBILE MENU DRAWER
// ==========================================
(function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    if (!menuBtn || !mobileMenu) return;

    function toggleMenu(forceClose) {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        const shouldClose = forceClose === true || isExpanded;

        if (shouldClose) {
            menuBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.add('hidden');
            if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
            if (closeIcon) closeIcon.classList.add('hidden');
        } else {
            menuBtn.setAttribute('aria-expanded', 'true');
            mobileMenu.classList.remove('hidden');
            if (hamburgerIcon) hamburgerIcon.classList.add('hidden');
            if (closeIcon) closeIcon.classList.remove('hidden');
        }
    }

    menuBtn.addEventListener('click', () => toggleMenu());

    // Close on navigation link click
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => toggleMenu(true));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
            toggleMenu(true);
        }
    });
})();

// ==========================================
// 3. INTERACTIVE LIGHTBOX / SCREENSHOT MODAL
// ==========================================
const projectGalleries = {
    'sdos-ai': {
        title: 'SDOS AI Project',
        images: [
            'sdos_ai_screenshots/sdos_ai_1.png'
        ]
    },
    'sdos-web': {
        title: 'SDOS Web Platform',
        images: [
            'sdos_web_screenshots/home_1.png',
            'sdos_web_screenshots/home_2.png',
            'sdos_web_screenshots/home_3.png',
            'sdos_web_screenshots/about_1.png',
            'sdos_web_screenshots/about_2.png'
        ]
    }
};

let currentGalleryKey = null;
let currentSlideIndex = 0;

function openLightbox(galleryKey, initialIndex = 0) {
    const modal = document.getElementById('image-modal');
    if (!modal || !projectGalleries[galleryKey]) return;

    currentGalleryKey = galleryKey;
    currentSlideIndex = initialIndex;

    updateModalContent();
    modal.showModal();
}

function updateModalContent() {
    const modal = document.getElementById('image-modal');
    if (!modal || !currentGalleryKey) return;

    const gallery = projectGalleries[currentGalleryKey];
    const imageEl = document.getElementById('modal-image');
    const titleEl = document.getElementById('modal-title');
    const counterEl = document.getElementById('modal-counter');
    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');

    if (imageEl) {
        imageEl.src = gallery.images[currentSlideIndex];
        imageEl.alt = `${gallery.title} screenshot ${currentSlideIndex + 1}`;
    }

    if (titleEl) {
        titleEl.textContent = gallery.title;
    }

    if (counterEl) {
        counterEl.textContent = `${currentSlideIndex + 1} of ${gallery.images.length}`;
    }

    // Toggle next/prev buttons if single image
    if (prevBtn && nextBtn) {
        const isMulti = gallery.images.length > 1;
        prevBtn.style.display = isMulti ? 'block' : 'none';
        nextBtn.style.display = isMulti ? 'block' : 'none';
    }
}

function nextLightboxSlide() {
    if (!currentGalleryKey) return;
    const gallery = projectGalleries[currentGalleryKey];
    currentSlideIndex = (currentSlideIndex + 1) % gallery.images.length;
    updateModalContent();
}

function prevLightboxSlide() {
    if (!currentGalleryKey) return;
    const gallery = projectGalleries[currentGalleryKey];
    currentSlideIndex = (currentSlideIndex - 1 + gallery.images.length) % gallery.images.length;
    updateModalContent();
}

function closeLightbox() {
    const modal = document.getElementById('image-modal');
    if (modal && modal.open) {
        modal.close();
    }
}

// Lightbox keyboard and click-outside dismissal
(function setupLightboxListeners() {
    const modal = document.getElementById('image-modal');
    if (!modal) return;

    modal.addEventListener('click', (e) => {
        const rect = modal.getBoundingClientRect();
        const isInDialog = (
            rect.top <= e.clientY &&
            e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX &&
            e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.open) return;
        if (e.key === 'ArrowRight') {
            nextLightboxSlide();
        } else if (e.key === 'ArrowLeft') {
            prevLightboxSlide();
        }
    });
})();

// ==========================================
// 4. SECURE CONTACT FORM HANDLING & ANTI-SPAM
// ==========================================
let lastFormSubmitTime = 0;

function sanitizeInput(str) {
    if (!str) return '';
    return str.trim().replace(/[<>]/g, '');
}

function showFormStatus(message, isError = false) {
    const statusBox = document.getElementById('form-status');
    if (!statusBox) return;

    statusBox.textContent = message;
    statusBox.className = `p-3 rounded-xl text-xs font-medium ${
        isError 
            ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800' 
            : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
    }`;
    statusBox.classList.remove('hidden');

    setTimeout(() => {
        statusBox.classList.add('hidden');
    }, 6000);
}

function getValidatedFormData() {
    const honeypot = document.getElementById('website_bot_trap');
    // Honeypot check: If the hidden field has any value, a bot filled it
    if (honeypot && honeypot.value.trim() !== '') {
        showFormStatus('Spam verification triggered. Submission blocked.', true);
        return null;
    }

    // Rate limiting: 4 seconds between requests
    const now = Date.now();
    if (now - lastFormSubmitTime < 4000) {
        showFormStatus('Please wait a few seconds before sending another message.', true);
        return null;
    }

    const name = sanitizeInput(document.getElementById('contact-name')?.value);
    const email = sanitizeInput(document.getElementById('contact-email')?.value);
    const subject = sanitizeInput(document.getElementById('contact-subject')?.value);
    const message = sanitizeInput(document.getElementById('contact-message')?.value);

    if (!name || !email || !subject || !message) {
        showFormStatus('Please fill in all required fields.', true);
        return null;
    }

    lastFormSubmitTime = now;
    return { name, email, subject, message };
}

function handleFormSubmit(event) {
    event.preventDefault();
    const data = getValidatedFormData();
    if (!data) return;

    const emailTo = 'dilshansachintha338@gmail.com';
    const emailSubject = encodeURIComponent(`[Portfolio Inquiry] ${data.subject}`);
    const emailBody = encodeURIComponent(
        `Hi Sachintha,\n\nName: ${data.name}\nContact: ${data.email}\n\nMessage:\n${data.message}\n\n---\nSent via Portfolio Contact Form`
    );

    const mailtoUrl = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;

    showFormStatus('Opening your default email client with your pre-filled message...');
    window.location.href = mailtoUrl;
}

function sendViaWhatsApp() {
    const data = getValidatedFormData();
    if (!data) return;

    const whatsappNumber = '94763014997';
    const text = encodeURIComponent(
        `*Portfolio Inquiry*\n*Name:* ${data.name}\n*Contact:* ${data.email}\n*Subject:* ${data.subject}\n\n*Message:*\n${data.message}`
    );

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

    showFormStatus('Redirecting to WhatsApp...');
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

// ==========================================
// 5. ACTIVE NAV LINK HIGHLIGHT (IntersectionObserver)
// ==========================================
(function setupActiveNav() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('text-indigo-600', 'dark:text-white', 'bg-slate-100', 'dark:bg-slate-800/80');
                    } else {
                        link.classList.remove('text-indigo-600', 'dark:text-white', 'bg-slate-100', 'dark:bg-slate-800/80');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));
})();

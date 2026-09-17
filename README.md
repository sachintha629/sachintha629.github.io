# Sachintha Dilshan Kariyawasam | Modern Portfolio (v2.0)

A modern, high-performance, and secure personal portfolio website built with **Tailwind CSS**, glassmorphic UI, responsive layouts, and strict web security headers.

🌐 **Live Website**: [https://sachintha629.github.io](https://sachintha629.github.io)

---

## 🌟 Key Features

- **Modern Visual Design**: Sleek dark-first glassmorphism aesthetic with radiant gradient accents.
- **Dark / Light Theme Toggle**: Persistent mode switcher syncing seamlessly with user OS preference via `localStorage`.
- **Interactive Project Showcase**:
  - Direct in-page interactive modal/lightbox previewing high-resolution platform screenshots.
  - Dedicated comprehensive project case study pages for **SDOS AI** and **SDOS Web**.
- **Interactive Skills Matrix**: Structured categorization across AI & Data Science, Web Engineering, Mathematics & Academics, and Leadership.
- **Experience & Education Timeline**: Visual milestone timeline with official collegiate leadership badges.
- **Security-First Architecture**:
  - Strict **Content Security Policy (CSP)** meta headers preventing XSS and clickjacking.
  - Anti-bot **Honeypot protection** and client-side validation on contact forms.
  - Hardened outbound links using `rel="noopener noreferrer"`.
  - Zero external tracking or vulnerable third-party runtime dependencies.
- **Direct Connect Channels**:
  - One-click direct **WhatsApp chat** integration (`wa.me`).
  - Formatted direct email creation (`mailto:`).
  - Verified LinkedIn connection.

---

## 🛠️ Tech Stack

- **Markup & Semantics**: HTML5 (Accessible ARIA roles, modern semantic markup)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v3.4.17) + Custom Glassmorphism & Animations
- **Interactivity**: Vanilla JavaScript (ES6+, IntersectionObserver, HTML5 Dialog API)
- **Deployment**: [GitHub Pages](https://pages.github.com/) (Native static hosting, no build dependencies on server)

---

## 💻 Local Development

### 1. Prerequisites
- Node.js (v18 or higher)
- npm

### 2. Installation
```bash
npm install
```

### 3. Build Tailwind CSS
To compile and minify the CSS bundle for production:
```bash
npm run build:css
```

### 4. Watch Mode (Live Changes)
To automatically recompile styles when editing HTML or CSS:
```bash
npm run dev:css
```

### 5. Local Preview
You can preview the site using any static HTTP server or opening `index.html` directly in your browser:
```bash
npx serve .
# or
python -m http.server 8000
```

---

## 🚀 Publishing to GitHub Pages

1. Commit your changes:
```bash
git add .
git commit -m "Revamp portfolio with modern Tailwind CSS, dark mode, and security features"
```
2. Push to GitHub:
```bash
git push origin master
```
3. Your updated site will automatically deploy to:
```
https://sachintha629.github.io
```

---

© 2026 Sachintha Dilshan Kariyawasam. All rights reserved.

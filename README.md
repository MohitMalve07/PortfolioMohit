# GameDevML Portfolio - Mohit Malve

A stunning, highly interactive, and responsive portfolio website showcasing the work, skills, and projects of **Mohit Malve** (Computer Engineer, Game Developer, and AI/ML Enthusiast). 

This project is deployed and accessible at **[mohitmalve.in](https://mohitmalve.in)**.

---

## 🚀 Project Overview

This repository contains the front-end source code for Mohit Malve's professional portfolio. The website features a sleek cyber-inspired theme characterized by dark modes, glassmorphism, neon glows, and smooth scroll/intersection animations. It highlights expertise across two primary domains:
1. **Game Development**: Immersive interactive experiences (built in Unity, GameMaker, C#, etc.).
2. **Artificial Intelligence & Machine Learning**: Intelligent systems, NLP implementations, and deep learning models (built using Python, PyTorch, TensorFlow, Vercel, etc.).

---

## 📁 Repository Structure & Components

The codebase is organized as a clean, static web application structure:

| File / Folder | Description |
| :--- | :--- |
| **[`index.html`](file:///c:/Users/Asus/Documents/GitHub/GameDevML/index.html)** | The primary landing page containing the Hero section, a grid-based "About Me", comprehensive "Skills" categorization, and education/experience timelines. |
| **[`projects.html`](file:///c:/Users/Asus/Documents/GitHub/GameDevML/projects.html)** | Gateway portal that categories projects into Game Dev, AI, and other categories using a clean dashboard view. |
| **[`gamedev-projects.html`](file:///c:/Users/Asus/Documents/GitHub/GameDevML/gamedev-projects.html)** | Showcase page listing interactive game builds (Chess, Kart Racing, Zombie Shooter, etc.) with external links to play them on Unity Play / Itch.io. |
| **[`ai-projects.html`](file:///c:/Users/Asus/Documents/GitHub/GameDevML/ai-projects.html)** | Showcase page listing AI & ML projects (e.g., Diet Planner & Recipe Gen, Brain Tumor Detection, AI Resume Parser) with links to live applications and research publications. |
| **[`contact.html`](file:///c:/Users/Asus/Documents/GitHub/GameDevML/contact.html)** | Contact section displaying email details and direct social links (LinkedIn, GitHub). |
| **[`script.js`](file:///c:/Users/Asus/Documents/GitHub/GameDevML/script.js)** | Core interactivity engine handling mobile navigation, scroll-activated headers, and staggered scroll-animations via the Intersection Observer API. |
| **[`style.css`](file:///c:/Users/Asus/Documents/GitHub/GameDevML/style.css)** | Main stylesheet containing base layout rules, font styling, animations, and structural CSS properties. |
| **[`theme.css`](file:///c:/Users/Asus/Documents/GitHub/GameDevML/theme.css)** | Theme overrides containing the core neon styles, cyber gradients, custom buttons (`.ai-btn`, `.play-now-btn`), and card hover states. |
| **`Images/`** | Asset folder housing sticker profile image, project thumbnails, and categories icons. |
| **`CNAME`** | Configuration pointing the domain to `mohitmalve.in` for GitHub Pages hosting. |

---

## 🎨 Key Features & Aesthetics

- **Rich Cyber Aesthetic**: Custom palettes leveraging HSL-tailored colors, deep dark grays/blacks (`#0d0d0d`, `#0a0a0a`), vibrant neon blues (`#0ff`), purples, and greens (`#00a86b`) with CSS filter dropshadows (`neonGlow` animation).
- **Advanced Micro-Animations**: Smooth entry transitions (`fade-in-up`, `fade-in-zoom`, `fade-in-up-bounce`, `slide-in-left`, `slide-in-bottom`) applied dynamically as sections enter the user's viewport.
- **Intersection Observer Engine**: Implemented in native JavaScript to add and remove visibility classes automatically, ensuring highly performant rendering and interactions.
- **Mobile First & Responsive Grid Layouts**: Fully fluid CSS Flexbox and Grid components making the site readable across all screens (mobile, tablets, laptops).
- **SEO & Semantic Accessibility**: Modern HTML5 landmarks (`<header>`, `<main>`, `<section>`, `<footer>`) with structured heading hierarchies.

---

## 🛠️ Tech Stack & Dependencies

- **Structure**: Semantic HTML5
- **Styling**: Vanilla CSS3 (Custom Properties / Variables, Keyframe Animations, Media Queries)
- **Logics**: Vanilla JavaScript (ES6+, DOM Manipulation, Intersection Observer API)
- **Typography & Icons**: 
  - [Google Fonts](https://fonts.google.com/) (Orbitron, Exo 2, Inter, Roboto)
  - [FontAwesome v6.4.0](https://fontawesome.com/) (Vector glyphs & brand icons)
- **Deployment**: Static Site Hosting (GitHub Pages) with Custom Domain Mapping.

---

## 💻 Local Development

Since this project uses client-side static files, you can preview it instantly:

1. Clone this repository locally:
   ```bash
   git clone https://github.com/MohitMalve07/PortfolioMohit.git
   ```
2. Double-click **`index.html`** to open it directly in any modern browser, or use a local static server like Live Server in VS Code:
   ```bash
   # If you have npm / npx installed
   npx serve .
   ```

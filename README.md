# GameDevML Portfolio - Mohit Malve

A stunning, highly immersive, gamified developer portfolio website designed around a sci-fi/cyberpunk HUD theme. It showcases the work, skills, and milestones of **Mohit Malve** (Computer Engineer, Game Developer, and AI/ML Enthusiast).

This project is deployed and accessible at **[mohitmalve.in](https://mohitmalve.in)**.

---

## 🚀 Project Overview

The website reimagines a professional developer portfolio as an interactive **RPG/Cyber Interface**. The interface is built entirely using standard web technologies (HTML/CSS/JS) to offer visual animations and responsive layouts. The portfolio highlights expertise in:
1. **Game Development**: Immersive interactive experiences (built in Unity, GameMaker, C#, etc.).
2. **Artificial Intelligence & Machine Learning**: Deep learning models, NLP applications, and intelligent tools (built using Python, PyTorch, TensorFlow, Vercel, etc.).

---

## 🎮 Gamification Mechanics & Key Sections

The site layout utilizes a Sci-Fi Head-Up Display (HUD) design containing several interactive gamified systems:

### 1. 🖥️ System Boot Sequence
- A terminal-style overlay triggers upon first entry, printing system load operations sequentially (e.g., `MOHIT MALVE OS v2.3`, `LOADING PLAYER DATA [████████] 100%`).
- Employs `sessionStorage` caching to ensure the boot sequence plays only once per browsing session, avoiding redundant disruptions on page reload.

### 2. 👤 Player Profile & Leveling
- Shows Mohit's avatar framed within a custom holographic border alongside the Class identifier: **Game Dev Mage (Level 23)**.
- Integrates a functional XP tracker bar indicating current level progress (`6,840 / 10,000 XP` or `68.4%`).
- Features a real-time looping Typewriter terminal at the header console log simulating background system synchronization operations.

### 3. 🛡️ The Arsenal (Skills Tabs)
- Replaces traditional skill lists with an interactive armory grouped into four categories:
  - **Offensive**: Primary development tools (Unity, C#, Python, PyTorch, Gameplay Programming).
  - **Defensive**: Version control, validation, and diagnostics (Git, Optimization, Cross-Validation, Hyperparameter Tuning).
  - **Utility**: Data management and processing libraries (SQL, NumPy & Pandas, etc.).
  - **Specialization**: Specialized libraries and techniques.
- Custom metaphors represent each skill (e.g., C# is a **Pixel Sword**, PyTorch is a **Synaptic Laser Rifle**, Git is an **Aegis Firewall Shield**).
- Tab clicks trigger animated transitions filtering cards smoothly using custom scale and opacity behaviors.

### 4. 🗺️ Quest Milestone Map & Battle Terminal
- Features an interactive **SVG vector roadmap** depicting completed, active, and upcoming milestones (e.g., *Indie Dev Studio Internship*, *Released Cyber Knight*, *Lead Architect*).
- An animated connection path links the nodes, highlighting active nodes with pulsing rings.
- Directly beneath the map, the **Battle Terminal** outputs typewriter lines of simulated combat records validating XP rewards (e.g., `MIL-02: INTERNSHIP COMPLETED (+1500 XP)`).

### 5. 📜 Quest Log (Projects Dashboard)
- Projects are presented as **Quest Cards** categorized as either *Primary Quests* or *Side Quests*.
- Each card details:
  - **Objective**: Detailed summary of the project goals.
  - **Difficulty**: Star-based ranking indicator.
  - **Reward**: XP bounty values.
  - **Tech Stack**: Modular badges.
  - **Quest Link**: Actionable button (`OPEN QUEST`) leading directly to live builds, publications, or GitHub codebases.

### 6. 🏆 Achievement Cabinet
- Modular cabinet displaying unlocked achievements (e.g., *Unity Builder*, *ML Pioneer*) with rarity designations (Common, Rare, Epic).
- Hidden locked items are expandable using the `View All Achievements` trigger button, expanding the DOM cabinet with transition timings.

### 7. 📡 Signal Terminal (Contact Channels)
- The contact form simulates an encrypted radio network transmission.
- Displays terminal parameters (`SYS V1.2.0 | TERMINAL ID MM-DEV-23`), signal status indicators, and text prompt lines with blinking terminal cursors.
- Connects through **Formspree** API route for robust message logging.

---

## 📁 Repository Structure & Components

| File / Folder | Description |
| :--- | :--- |
| **[`index.html`](file:///c:/Users/Asus/Documents/GitHub/GameDevML/index.html)** | Core landing dashboard displaying Player Profile, the SVG Quest Map, the interactive Arsenal tabs, Achievements panel, and Signal hub. |
| **[`projects.html`](file:///c:/Users/Asus/Documents/GitHub/GameDevML/projects.html)** | Project catalog page stylized as a Quest Log displaying details for 8 active quests across Game Dev and AI. |
| **[`gamedev-projects.html`](file:///c:/Users/Asus/Documents/GitHub/GameDevML/gamedev-projects.html)** | Page detailing game projects (Chess, Karting, Tank Shooter, Flappy Bird, Endless Runner) with direct play options. |
| **[`ai-projects.html`](file:///c:/Users/Asus/Documents/GitHub/GameDevML/ai-projects.html)** | Page highlighting Machine Learning deliverables (Brain Tumor Detection, Diet Planner, Resume Parser) and publishing footprints. |
| **[`contact.html`](file:///c:/Users/Asus/Documents/GitHub/GameDevML/contact.html)** | Direct contact terminal layout displaying input secure route entries and direct social channels. |
| **[`script.js`](file:///c:/Users/Asus/Documents/GitHub/GameDevML/script.js)** | Powers the front-end intelligence: typewriter effects, boot sequencing, skill tab transitions, achievement card expansions, scroll actions, and Intersection Observers. |
| **[`style.css`](file:///c:/Users/Asus/Documents/GitHub/GameDevML/style.css)** | Contains structural styles, fonts, layout classes, and HUD panel container assets. |
| **[`theme.css`](file:///c:/Users/Asus/Documents/GitHub/GameDevML/theme.css)** | Defines neon colors, filters, blinking cursors, tab buttons, and typography styling. |
| **`Images/`** | Contains static graphics (icons, stickers, backgrounds, screenshots). |
| **`CNAME`** | Configuration pointing the domain to `mohitmalve.in` for GitHub Pages hosting. |

---

## 🎨 Design System & Aesthetics

- **Holographic Gradients**: Custom palette leveraging HSL-tailored colors, deep dark grays/blacks (`#0d0d0d`, `#0a0a0a`), vibrant neon blues (`#0ff`), purples, and greens (`#00a86b`) with CSS filter dropshadows (`neonGlow` animation).
- **Viewport-Triggered Transitions**: Smooth entry transitions (`fade-in-up`, `fade-in-zoom`, `fade-in-up-bounce`, `slide-in-left`, `slide-in-bottom`) applied dynamically as sections enter the user's viewport using JavaScript Intersection Observer.
- **Glassmorphism Panels**: Uses semitransparent dark container backgrounds, retro digital border frames, and corner notches to resemble hardware console monitors.

---

## 🛠️ Tech Stack & Dependencies

- **Structure**: Semantic HTML5
- **Styling**: Vanilla CSS3 (CSS Grid, Flexbox, Keyframe Animations, CSS Variables)
- **Logics**: Vanilla JavaScript (ES6+, DOM Manipulation, Intersection Observer API, sessionStorage Cache)
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

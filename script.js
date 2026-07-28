/* ==========================================
   EmailJS Configuration
   Replace these placeholder values with your
   actual EmailJS credentials from .env
   ========================================== */
const EMAILJS_CONFIG = {
    serviceId: 'service_afvnpre',   // VITE_EMAILJS_SERVICE_ID
    templateId: 'template_9lz4mhl',  // VITE_EMAILJS_TEMPLATE_ID
    publicKey: 'jVFfeT96tjXULJPHw'    // VITE_EMAILJS_PUBLIC_KEY
};

/* ==========================================
   EmailJS — Send Signal Handler
   ========================================== */
function handleSendSignal() {
    const nameEl = document.getElementById('sender-name');
    const emailEl = document.getElementById('sender-email');
    const messageEl = document.getElementById('sender-message');
    const statusEl = document.getElementById('terminal-status');
    const btnEl = document.getElementById('send-signal-btn');

    if (!nameEl || !emailEl || !messageEl || !statusEl || !btnEl) return;

    const senderName = nameEl.value.trim();
    const senderEmail = emailEl.value.trim();
    const message = messageEl.value.trim();

    // Validation
    if (!senderName || !senderEmail || !message) {
        setTerminalStatus(statusEl, 'ERROR: ALL FIELDS REQUIRED BEFORE TRANSMITTING.', 'error');
        return;
    }

    // Disable button and show transmitting state
    btnEl.disabled = true;
    btnEl.querySelector('.btn-text').textContent = 'TRANSMITTING...';
    btnEl.classList.add('is-sending');
    setTerminalStatus(statusEl, 'TRANSMITTING SIGNAL...', 'transmitting');

    emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
            from_name: senderName,
            reply_to: senderEmail,
            message: message
        },
        EMAILJS_CONFIG.publicKey
    ).then(function () {
        setTerminalStatus(statusEl, 'SIGNAL SENT. TRANSMISSION COMPLETE. \u2713', 'success');
        nameEl.value = '';
        emailEl.value = '';
        messageEl.value = '';
    }).catch(function () {
        setTerminalStatus(statusEl, 'ERROR: SIGNAL LOST. CHECK FREQUENCY AND RETRY.', 'error');
    }).finally(function () {
        btnEl.disabled = false;
        btnEl.querySelector('.btn-text').textContent = '((\u00b7)) SEND SIGNAL';
        btnEl.classList.remove('is-sending');
    });
}

function setTerminalStatus(el, text, type) {
    el.textContent = text;
    el.className = 'terminal-status-line'; // reset classes
    if (type === 'transmitting') {
        el.classList.add('status-transmitting');
    } else if (type === 'success') {
        el.classList.add('status-success');
    } else if (type === 'error') {
        el.classList.add('status-error');
    }
}

document.addEventListener('DOMContentLoaded', function () {

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links li a:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Dropdown Menu Toggle for Mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            // Only prevent default on mobile view
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.fixed-header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(10, 10, 20, 0.95)';
                header.style.padding = '10px 0';
            } else {
                header.style.background = 'rgba(10, 10, 20, 0.7)';
                header.style.padding = '15px 0';
            }
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Observe sections for general entry/exit animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Hero Terminal — Typewriter animation
    const typewriterEl = document.getElementById('hero-typewriter');
    if (typewriterEl) {
        const lines = [
            'INITIALIZING SYSTEM...',
            'LOADING PLAYER DATA...',
            'SYNCING QUEST LOG...',
            'READY.'
        ];
        let lineIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeSpeed = 55;
        const deleteSpeed = 30;
        const holdDelay = 1500;
        const nextLineDelay = 400;

        function typeStep() {
            const currentLine = lines[lineIndex];

            if (!isDeleting) {
                // Typing forward
                typewriterEl.textContent = currentLine.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentLine.length) {
                    // Finished typing — hold, then delete
                    isDeleting = true;
                    setTimeout(typeStep, holdDelay);
                    return;
                }
                setTimeout(typeStep, typeSpeed);
            } else {
                // Deleting
                typewriterEl.textContent = currentLine.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    lineIndex = (lineIndex + 1) % lines.length;
                    setTimeout(typeStep, nextLineDelay);
                    return;
                }
                setTimeout(typeStep, deleteSpeed);
            }
        }

        // Start after a brief delay
        setTimeout(typeStep, 800);
    }

    // Specific animations for About Me Section
    const aboutGridItems = document.querySelectorAll('.about-content .grid-item');
    if (aboutGridItems.length > 0) {
        const aboutObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, observerOptions);
        aboutGridItems.forEach(item => {
            aboutObserver.observe(item);
        });
    }

    // Specific animations for Skills Section
    const skillsHeading = document.querySelector('.skills .section-title');
    const skillsTagline = document.querySelector('.skills p'); // Assuming there's a tagline here
    const skillCategories = document.querySelectorAll('.skill-category h3');
    const skillCards = document.querySelectorAll('.skill-card');

    if (skillsHeading) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillsHeading.classList.add('fade-in-zoom');
                    // skillsTagline.classList.add('fade-in-zoom'); // Uncomment if tagline exists
                    skillCategories.forEach((cat, index) => {
                        cat.classList.add('slide-in-left');
                        cat.style.animationDelay = `${0.2 * index}s`;
                    });
                    skillCards.forEach((card, index) => {
                        card.classList.add('fade-in-up-bounce');
                        card.style.animationDelay = `${0.1 * index}s`;
                    });
                } else {
                    skillsHeading.classList.remove('fade-in-zoom');
                    // skillsTagline.classList.remove('fade-in-zoom'); // Uncomment if tagline exists
                    skillCategories.forEach(cat => cat.classList.remove('slide-in-left'));
                    skillCards.forEach(card => card.classList.remove('fade-in-up-bounce'));
                }
            });
        }, observerOptions);
        skillsObserver.observe(skillsHeading);
        // if (skillsTagline) skillsObserver.observe(skillsTagline); // Uncomment if tagline exists
    }

    // Specific animations for Projects Section
    const projectsTitle = document.querySelector('.projects .section-title');
    const categoryButtons = document.querySelectorAll('.category-button');
    const projectCards = document.querySelectorAll('.project-card');

    if (projectsTitle && categoryButtons.length > 0) {
        const projectsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    projectsTitle.classList.add('slide-in-top');
                    categoryButtons.forEach((button, index) => {
                        button.classList.add('slide-in-bottom');
                        button.style.animationDelay = `${0.2 * index}s`;
                    });
                    // Staggered animation for project cards
                    projectCards.forEach((card, index) => {
                        card.classList.add('fade-in-up'); // Assuming you have a fade-in-up animation
                        card.style.animationDelay = `${0.1 * index + 0.5}s`; // Staggered delay
                    });
                } else {
                    projectsTitle.classList.remove('slide-in-top');
                    categoryButtons.forEach(button => button.classList.remove('slide-in-bottom'));
                    projectCards.forEach(card => card.classList.remove('fade-in-up'));
                }
            });
        }, observerOptions);
        projectsObserver.observe(projectsTitle);
    }

    // Specific animations for Contact Section
    const contactHeading = document.querySelector('.contact .section-title');
    const contactIntro = document.querySelector('.contact p');
    const contactItems = document.querySelectorAll('.contact-item');
    const socialLinks = document.querySelector('.social-links');

    if (contactHeading && contactIntro && contactItems.length > 0 && socialLinks) {
        const contactObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contactHeading.classList.add('fade-in-scale-up');
                    contactIntro.classList.add('fade-in-scale-up', 'delay-1');
                    contactItems.forEach((item, index) => {
                        item.classList.add('slide-in-left');
                        item.style.animationDelay = `${0.2 * index}s`;
                    });
                    socialLinks.classList.add('slide-in-left', `delay-${contactItems.length * 0.2 + 0.2}s`);
                } else {
                    contactHeading.classList.remove('fade-in-scale-up');
                    contactIntro.classList.remove('fade-in-scale-up', 'delay-1');
                    contactItems.forEach(item => item.classList.remove('slide-in-left'));
                    socialLinks.classList.remove('slide-in-left', `delay-${contactItems.length * 0.2 + 0.2}s`);
                }
            });
        }, observerOptions);
        contactObserver.observe(contactHeading);
    }

    // Arsenal Tabs Filtering Logic
    const tabButtons = document.querySelectorAll('.arsenal-tab');
    const arsenalCards = document.querySelectorAll('.arsenal-card');

    if (tabButtons.length > 0 && arsenalCards.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // If clicked tab is already active, do nothing
                if (button.classList.contains('active')) return;

                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const selectedTab = button.dataset.tab;

                // Filter cards with a smooth opacity fade
                arsenalCards.forEach(card => {
                    if (card.dataset.category === selectedTab) {
                        card.style.display = 'flex';
                        // Force a reflow to trigger transition
                        void card.offsetHeight;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        // Hide after transition ends (matching CSS transition timing)
                        setTimeout(() => {
                            if (card.style.opacity === '0') {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            });
        });
    }

    // Achievements Expand / Collapse Logic
    const viewAchievementsBtn = document.getElementById('view-achievements-btn');
    const achievementsGrid = document.getElementById('achievements-grid');

    if (viewAchievementsBtn && achievementsGrid) {
        viewAchievementsBtn.addEventListener('click', () => {
            achievementsGrid.classList.toggle('expanded');
            if (achievementsGrid.classList.contains('expanded')) {
                viewAchievementsBtn.textContent = 'Collapse Achievements';
            } else {
                viewAchievementsBtn.textContent = 'View All Achievements';
            }
        });
    }

    // Boot sequence overlay logic
    const bootOverlay = document.getElementById('boot-overlay');
    if (bootOverlay) {
        let isPlayed = false;
        try {
            isPlayed = sessionStorage.getItem('boot-played') === 'true';
        } catch (e) {
            console.error('SessionStorage access failed:', e);
        }

        if (isPlayed) {
            bootOverlay.remove();
        } else {
            document.body.classList.add('no-scroll');

            const bootLines = [
                { id: 'boot-line-1', text: 'MOHIT MALVE OS v2.3' },
                { id: 'boot-line-2', text: 'INITIALIZING MODULES...' },
                { id: 'boot-line-3', text: 'LOADING PLAYER DATA [████████] 100%' },
                { id: 'boot-line-4', text: 'ALL SYSTEMS READY.' }
            ];

            // Print each line sequentially
            bootLines.forEach((line, index) => {
                setTimeout(() => {
                    const el = document.getElementById(line.id);
                    if (el) {
                        el.textContent = line.text;
                        el.classList.add('visible');
                    }
                }, index * 450); // Stagger line visibility by 450ms
            });

            // Fade out the overlay after 2.5 seconds (2500ms)
            setTimeout(() => {
                bootOverlay.classList.add('fade-out');
                document.body.classList.remove('no-scroll');

                try {
                    sessionStorage.setItem('boot-played', 'true');
                } catch (e) {
                    console.error('SessionStorage write failed:', e);
                }

                // Remove the overlay from DOM completely after fade out completes
                setTimeout(() => {
                    bootOverlay.remove();
                }, 500); // 500ms aligns with transition timing
            }, 2500);
        }
    }

    // Battle Terminal Typewriter Sequence
    const btLines = [
        { id: 'bt-line-1', text: '> BATTLE_LOG_SYS' },
        { id: 'bt-line-2', text: 'SECURE CONNECT ESTABLISHED...' },
        { id: 'bt-line-3', text: 'MIL-01: VIIT SECTOR CLEARED (+2000 XP)' },
        { id: 'bt-line-4', text: 'MIL-02: INTERNSHIP COMPLETED (+1500 XP)' },
        { id: 'bt-line-5', text: 'MIL-03: OPERATION: PORTFOLIO ACTIVE...' },
        { id: 'bt-line-6', text: 'READY' }
    ];

    btLines.forEach((line, index) => {
        setTimeout(() => {
            const el = document.getElementById(line.id);
            if (el) {
                if (line.id === 'bt-line-6') {
                    el.innerHTML = line.text + '<span class="bt-cursor">_</span>';
                } else {
                    el.textContent = line.text;
                }
                el.classList.add('visible');
            }
        }, index * 400); // 400ms delay between each line appearing
    });

    // Audio click controller instantiation & activation
    const audioController = new ClickAudioController();

    // User gesture unlocking trigger
    const unlockInteraction = () => {
        audioController.init();
        window.removeEventListener('click', unlockInteraction);
        window.removeEventListener('keydown', unlockInteraction);
        window.removeEventListener('touchstart', unlockInteraction);
    };
    window.addEventListener('click', unlockInteraction);
    window.addEventListener('keydown', unlockInteraction);
    window.addEventListener('touchstart', unlockInteraction);

    // Event delegation for playing audio on interactive element clicks
    document.addEventListener('click', (e) => {
        const interactive = e.target.closest('a, button, input[type="submit"], input[type="button"], .arsenal-tab, .view-achievements-btn, .open-quest-btn, .inspect-btn, .signal-btn, .quest-tab');
        if (interactive) {
            audioController.play();
        }
    });

    // ==========================================
    // Quest Log — Tab Filtering & Dynamic Cards
    // ==========================================
    const questProjects = [
        // ——— GAME DEV ———
        {
            category: 'gamedev',
            title: 'Zero Breach',
            image: 'Images/ZeroBreach.png',
            isPrimary: false,
            status: 'in-progress',
            statusText: '[IN DEVELOPMENT]',
            stars: 5,
            objective: '2-player co-op heist. Top-down 3D office/facility map. Players coordinate to avoid/neutralize guards, reach an objective, and extract.',
            techStack: ['Unity 6', 'C#', 'Unity Relay', 'Cinemachine', 'AI(Alert/Search/Chase behaviors)'],
            reward: '1000XP',
            statusLine: 'In Development (Launch date jan 2027)',
            link: '#',
            embedSrc: null
        },
        {
            category: 'gamedev',
            title: 'Circuit Circus',
            image: 'Images/Kart.png',
            isPrimary: false,
            status: 'completed',
            statusText: '[COMPLETED]',
            stars: 3,
            objective: 'Construct a 3D racing game prototype with modular physics-based vehicle controllers, lap tracking, and arcade visual elements.',
            techStack: ['Unity 6', 'C#', 'Netcode for GameObjects', 'Unity Relay', 'Multiplayer game architecture'],
            reward: '500 XP',
            statusLine: 'Playable game build hosted on itch.io.',
            link: 'https://mtgking.itch.io/kartinggame',
            embedSrc: 'https://itch.io/embed/4669996'
        },
        {
            category: 'gamedev',
            title: '3D Chess Game',
            image: 'Images/Chess.png',
            isPrimary: true,
            status: 'completed',
            statusText: '[COMPLETED]',
            stars: 4,
            objective: 'Develop a fully interactive 3D Chess Game prototype featuring responsive controls, dynamic board states, and standard chess logic.',
            techStack: ['Unity', 'C#', '3D Math'],
            reward: '800 XP',
            statusLine: 'Playable prototype hosted on itch.io.',
            link: 'https://mtgking.itch.io/chessprototype',
            embedSrc: 'https://itch.io/embed/3884696'
        },
        // ——— AI / ML ———
        {
            category: 'aiml',
            title: 'Brain Tumor Detection',
            image: 'Images/BrainTumor.png',
            isPrimary: true,
            status: 'completed',
            statusText: '[COMPLETED]',
            stars: 5,
            objective: 'Train and deploy a deep learning model to accurately identify and segment brain tumors in medical MRI scans with high precision.',
            techStack: ['Python', 'PyTorch', 'OpenCV'],
            reward: '900 XP',
            statusLine: 'GitHub repository live with source and model.',
            link: 'https://github.com/MohitMalve07/BrainTumorDetection',
            embedSrc: null
        },
        {
            category: 'aiml',
            title: 'Diet Planner & Recipe Gen',
            image: 'Images/DietPlanner.png',
            isPrimary: true,
            status: 'completed',
            statusText: '[COMPLETED]',
            stars: 5,
            objective: 'Design a web application generating personalized meal plans and recipes leveraging AI based on health profiles and calorie goals.',
            techStack: ['Next.js', 'Python', 'Flask', 'OpenAI API'],
            reward: '1,000 XP',
            statusLine: 'Publication published. Live web app deployed.',
            link: 'https://recipe-generator-orpin.vercel.app/',
            embedSrc: null
        },
        {
            category: 'aiml',
            title: 'AI Resume Parser',
            image: 'Images/ResumeParser.png',
            isPrimary: false,
            status: 'completed',
            statusText: '[COMPLETED]',
            stars: 4,
            objective: 'Build an intelligent utility to extract and categorize candidate skills, experience, and contact data from resume PDFs.',
            techStack: ['Next.js', 'Tailwind', 'HuggingFace'],
            reward: '750 XP',
            statusLine: 'Fully functional parsing tool online.',
            link: 'https://resume-parser-gray.vercel.app/',
            embedSrc: null
        },
        // ——— INTERNSHIP ———
        {
            category: 'internship',
            title: 'The Shopkeeper',
            image: 'Images/Shopkeeper.png',
            isPrimary: true,
            status: 'completed',
            statusText: '[COMPLETED]',
            stars: 5,
            objective: 'An educational Unity game developed during my internship featuring engaging drag-and-drop gameplay mechanics, interactive customer interactions, object placement systems, animations, UI programming, and optimized gameplay flow. Built while collaborating with artists and designers to deliver a polished educational experience.',
            techStack: ['Unity 6', 'C#', 'Scriptable Objects', 'Animator', 'UI Toolkit / Unity UI', 'Gameplay Programming', 'Mobile Development'],
            reward: '1500 XP',
            statusLine: 'Playable game build hosted on itch.io.',
            link: 'https://mtgking.itch.io/the-shopkeeper',
            embedSrc: 'https://itch.io/embed/4786918'
        }
    ];

    // Track currently expanded card so only one can be open at a time
    let currentlyExpandedCard = null;

    /**
     * Build a quest card DOM element from a project data object.
     */
    function buildQuestCard(project) {
        let categoryLabel = 'QUEST';
        if (project.category === 'gamedev') categoryLabel = 'GAME DEV QUEST';
        else if (project.category === 'aiml') categoryLabel = 'AI / ML QUEST';
        else if (project.category === 'internship') categoryLabel = 'INTERNSHIP QUEST';
        const starsHtml = Array.from({ length: 5 }, (_, i) =>
            `<i class="fas fa-star star${i >= project.stars ? ' empty' : ''}"></i>`
        ).join('');
        const techPillsHtml = project.techStack.map(t => `<span class="quest-tech-pill">${t}</span>`).join('');

        // Determine button HTML
        let actionHtml;
        if (project.embedSrc) {
            actionHtml = `<button class="play-now-btn" data-embed-src="${project.embedSrc}">▶  PLAY NOW</button>`;
        } else {
            actionHtml = `<a href="${project.link}" target="_blank" class="open-quest-btn">OPEN QUEST</a>`;
        }

        // Embed wrapper (always present for embeddable cards, hidden by default)
        const embedHtml = project.embedSrc
            ? `<div class="quest-embed-wrapper">
                   <iframe src="${project.embedSrc}" width="100%" height="167" frameborder="0" loading="lazy"></iframe>
               </div>`
            : '';

        const card = document.createElement('div');
        card.className = `quest-card${project.isPrimary ? ' primary-quest' : ''} quest-card--entering`;
        card.innerHTML = `
            <div class="quest-card-image-wrapper">
                <img src="${project.image}" alt="${project.title}" class="quest-card-image">
                <div class="quest-card-image-overlay"></div>
            </div>
            <div class="quest-card-header">
                <span class="quest-card-label">${categoryLabel}</span>
                <span class="quest-status-badge ${project.status}">${project.statusText}</span>
            </div>
            <h3 class="quest-card-title">${project.title}</h3>
            <div class="quest-difficulty">${starsHtml}</div>
            <p class="quest-objective">${project.objective}</p>
            <div class="quest-tech-section">
                <span class="quest-tech-title">TECH STACK</span>
                <div class="quest-tech-pills">${techPillsHtml}</div>
            </div>
            <div class="quest-reward-line">REWARD: <span class="quest-reward-val">${project.reward}</span></div>
            <div class="quest-status-line">STATUS: <span class="quest-status-val">${project.statusLine}</span></div>
            ${actionHtml}
            ${embedHtml}
        `;

        // Attach toggle logic for embeddable cards
        if (project.embedSrc) {
            const btn = card.querySelector('.play-now-btn');
            const embedWrapper = card.querySelector('.quest-embed-wrapper');

            btn.addEventListener('click', () => {
                const isExpanded = card.classList.contains('quest-card--expanded');

                if (isExpanded) {
                    // Collapse this card
                    card.classList.remove('quest-card--expanded');
                    btn.textContent = '▶  PLAY NOW';
                    currentlyExpandedCard = null;
                } else {
                    // Auto-collapse any previously expanded card
                    if (currentlyExpandedCard && currentlyExpandedCard !== card) {
                        currentlyExpandedCard.classList.remove('quest-card--expanded');
                        const prevBtn = currentlyExpandedCard.querySelector('.play-now-btn');
                        if (prevBtn) prevBtn.textContent = '▶  PLAY NOW';
                    }

                    // Expand this card
                    card.classList.add('quest-card--expanded');
                    btn.textContent = '■  CLOSE GAME';
                    currentlyExpandedCard = card;

                    // Smooth scroll into view
                    setTimeout(() => {
                        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 50);
                }
            });
        }

        return card;
    }

    /**
     * Render quest cards filtered by category into the scroll container.
     */
    function renderQuestCards(category) {
        const container = document.getElementById('quest-scroll-container');
        if (!container) return;

        // Reset expanded state
        currentlyExpandedCard = null;

        // Clear existing cards
        container.innerHTML = '';

        // Filter and render
        const filtered = questProjects.filter(p => p.category === category);
        filtered.forEach(project => {
            container.appendChild(buildQuestCard(project));
        });

        // Reset scroll position
        container.scrollLeft = 0;
    }

    // Quest tab click handling
    const questTabButtons = document.querySelectorAll('.quest-tab');
    const questHeading = document.getElementById('quest-section-heading');

    if (questTabButtons.length > 0) {
        questTabButtons.forEach(tab => {
            tab.addEventListener('click', () => {
                if (tab.classList.contains('active')) return;

                // Update active tab
                questTabButtons.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const category = tab.dataset.category;

                // Animate heading change
                if (questHeading) {
                    questHeading.style.opacity = '0';
                    setTimeout(() => {
                        questHeading.textContent = category === 'gamedev' ? 'GAME DEV QUESTS' : 'AI / ML QUESTS';
                        questHeading.style.opacity = '1';
                    }, 150);
                }

                // Render filtered cards
                renderQuestCards(category);
            });
        });

    /**
     * Render internship quest cards into the internship scroll container.
     */
    function renderInternshipCards() {
        const container = document.getElementById('internship-scroll-container');
        if (!container) return;

        // Clear existing cards
        container.innerHTML = '';

        // Filter and render
        const filtered = questProjects.filter(p => p.category === 'internship');
        filtered.forEach(project => {
            container.appendChild(buildQuestCard(project));
        });

        // Reset scroll position
        container.scrollLeft = 0;
    }

        // Initial render — default to GAME DEV
        renderQuestCards('gamedev');
    }

    // Render internship cards on load
    renderInternshipCards();
});


/* ==========================================
   Click Audio Controller Class (Web Audio API)
   ========================================== */
class ClickAudioController {
    constructor() {
        this.audioCtx = null;
        this.audioBuffer = null;
        this.hasLoaded = false;
        this.isLoading = false;
    }

    init() {
        if (this.audioCtx) return;
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        this.audioCtx = new AudioContextClass();
        this.loadAudioFile();
    }

    async loadAudioFile() {
        if (this.isLoading || this.hasLoaded) return;
        this.isLoading = true;
        try {
            const response = await fetch('ui-click.mp3');
            if (!response.ok) throw new Error('Audio file response not OK');
            const arrayBuffer = await response.arrayBuffer();
            this.audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
            this.hasLoaded = true;
            console.log('UI click sound file loaded successfully.');
        } catch (e) {
            console.warn('Could not load ui-click.mp3. Falling back to procedural synthesizer.', e);
        } finally {
            this.isLoading = false;
        }
    }

    play() {
        this.init();
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }

        if (this.hasLoaded && this.audioBuffer) {
            try {
                const source = this.audioCtx.createBufferSource();
                const gainNode = this.audioCtx.createGain();

                source.buffer = this.audioBuffer;
                gainNode.gain.setValueAtTime(0.3, this.audioCtx.currentTime);

                source.connect(gainNode);
                gainNode.connect(this.audioCtx.destination);
                source.start(0);
            } catch (e) {
                console.error('Playback of loaded audio buffer failed, falling back to synth:', e);
                this.playSynth();
            }
        } else {
            this.playSynth();
        }
    }

    playSynth() {
        try {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            const now = this.audioCtx.currentTime;

            // Rapid pitch fall (sine wave chirp)
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1400, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);

            // Fast volume decay
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

            osc.start(now);
            osc.stop(now + 0.07);
        } catch (e) {
            console.error('Procedural click synthesis failed:', e);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
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
        toggle.addEventListener('click', function(e) {
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
        const interactive = e.target.closest('a, button, input[type="submit"], input[type="button"], .arsenal-tab, .view-achievements-btn, .open-quest-btn, .inspect-btn, .signal-btn');
        if (interactive) {
            audioController.play();
        }
    });
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

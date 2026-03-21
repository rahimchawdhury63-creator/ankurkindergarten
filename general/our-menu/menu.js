/* * Author: Rizwan Rahim Chowdhury
 * Project: SylhetBites Menu
 * Description: Interaction, Sound Effects & Mobile Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Sound Effects Logic ---
    const clickSound = document.getElementById('clickSound');
    const hoverSound = document.getElementById('hoverSound');
    
    // Play sound on Buy Button click
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(btn => {
        // Hover sound
        btn.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.2; // Keep it subtle
            hoverSound.play().catch(e => console.log('Audio play suppressed by browser prior to interaction'));
        });

        // Click sound
        btn.addEventListener('click', (e) => {
            clickSound.currentTime = 0;
            clickSound.volume = 0.5;
            clickSound.play().catch(e => console.log('Audio play suppressed'));
        });
    });

    // Nav links sound effect
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });


    // --- 2. Mobile Menu Toggle Logic ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const storyNav = document.querySelector('.story-nav');

    if(mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            storyNav.classList.toggle('active');
            
            // Swap icon purely for aesthetics
            if(storyNav.classList.contains('active')) {
                mobileToggle.innerHTML = '✕'; 
            } else {
                mobileToggle.innerHTML = '☰';
            }
        });
    }

    // --- 3. Optional: Add fade-in animation for cards ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.menu-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(card);
    });
});

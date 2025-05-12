// Event Handling
document.addEventListener('DOMContentLoaded', () => {
    // Common button click effects for all pages
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (!e.target.classList.contains('gallery-btn')) { // Exclude gallery buttons
                e.target.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    e.target.style.transform = 'scale(1)';
                }, 100);
            }
        });
    });

    // Secret double-click action on header
    let clickCount = 0;
    let clickTimer = null;
    const header = document.querySelector('header h1');
    if (header) {
        header.addEventListener('click', (e) => {
            clickCount++;
            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 500);
            } else {
                clearTimeout(clickTimer);
                clickCount = 0;
                // Secret action: Rainbow text effect
                const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffd93d'];
                let currentColor = 0;
                const interval = setInterval(() => {
                    header.style.color = colors[currentColor];
                    currentColor = (currentColor + 1) % colors.length;
                }, 200);
                setTimeout(() => {
                    clearInterval(interval);
                    header.style.color = 'white';
                }, 2000);
            }
        });
    }

    // Keypress detection for rainbow footer effect
    document.addEventListener('keypress', (e) => {
        if (e.key.toLowerCase() === 'h') {
            const footer = document.querySelector('footer');
            footer.style.animation = 'none';
            footer.offsetHeight; // Trigger reflow
            footer.style.animation = 'rainbow 2s linear';
        }
    });

    // Products page specific features
    const keyboardsGallery = document.querySelector('.keyboardsgal');
    if (keyboardsGallery) {
        const keyboardImages = keyboardsGallery.querySelectorAll('img');
        keyboardImages.forEach(img => {
            // Add hover effect
            img.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
                img.style.transition = 'transform 0.3s ease';
            });
            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });

            // Add click effect to show larger image
            img.addEventListener('click', () => {
                const overlay = document.createElement('div');
                overlay.className = 'image-overlay';
                overlay.innerHTML = `
                    <div class="overlay-content">
                        <img src="${img.src}" alt="${img.alt}">
                        <button class="close-overlay">×</button>
                    </div>
                `;
                document.body.appendChild(overlay);
                
                // Close overlay on click
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay || e.target.classList.contains('close-overlay')) {
                        overlay.remove();
                    }
                });
            });
        });
    }

    // Index page specific features
    const dynamicButton = document.getElementById('dynamicButton');
    if (dynamicButton) {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];
        const texts = ['Click to Transform!', 'Amazing!', 'Keep Going!', 'You Rock!'];
        const heroGradients = [
            'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
            'linear-gradient(135deg, #4ecdc4, #45b7d1)',
            'linear-gradient(135deg, #45b7d1, #96ceb4)',
            'linear-gradient(135deg, #96ceb4, #ff6b6b)'
        ];
        let currentIndex = 0;

        dynamicButton.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % colors.length;
            
            // Update button color and text
            dynamicButton.style.backgroundColor = colors[currentIndex];
            dynamicButton.textContent = texts[currentIndex];
            
            // Update hero section background
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.background = heroGradients[currentIndex];
                heroSection.style.transition = 'background 0.5s ease';
            }
            
            // Add a bounce animation to the button
            dynamicButton.style.animation = 'none';
            dynamicButton.offsetHeight;
            dynamicButton.style.animation = 'bounce 0.5s ease';
        });
    }

    // Gallery controls for index page
    const gallery = document.querySelector('.gallery-section .gallery');
    if (gallery) {
        const images = gallery.querySelectorAll('.gallery-img');
        const prevBtn = document.querySelector('.gallery-btn.prev');
        const nextBtn = document.querySelector('.gallery-btn.next');
        let currentImage = 0;

        if (images.length && prevBtn && nextBtn) {
            // Hide all images except the first one
            images.forEach((img, index) => {
                img.style.display = index === 0 ? 'block' : 'none';
            });

            // Function to show image with fade effect
            const showImage = (index) => {
                images[currentImage].style.display = 'none';
                currentImage = index;
                images[currentImage].style.display = 'block';
                images[currentImage].style.animation = 'fadeIn 0.5s ease';
            };

            // Previous button click
            prevBtn.addEventListener('click', () => {
                const newIndex = (currentImage - 1 + images.length) % images.length;
                showImage(newIndex);
            });

            // Next button click
            nextBtn.addEventListener('click', () => {
                const newIndex = (currentImage + 1) % images.length;
                showImage(newIndex);
            });

            // Auto-advance gallery every 5 seconds
            setInterval(() => {
                const newIndex = (currentImage + 1) % images.length;
                showImage(newIndex);
            }, 5000);
        }
    }

    // Form validation (used in both pages)
    const form = document.getElementById('contactForm');
    if (form) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const nameInput = document.getElementById('name');
        const messageInput = document.getElementById('message');
        const feedback = document.getElementById('feedback');

        // Real-time name validation
        nameInput?.addEventListener('input', (e) => {
            const name = e.target.value;
            const validationMessage = e.target.nextElementSibling;
            if (name.length < 2) {
                validationMessage.textContent = 'Name must be at least 2 characters long';
                validationMessage.style.color = '#e74c3c';
            } else {
                validationMessage.textContent = '✓ Name looks good!';
                validationMessage.style.color = '#2ecc71';
            }
        });

        // Real-time email validation
        emailInput?.addEventListener('input', (e) => {
            const email = e.target.value;
            const validationMessage = e.target.nextElementSibling;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                validationMessage.textContent = '';
            } else if (!emailRegex.test(email)) {
                validationMessage.textContent = 'Please enter a valid email address';
                validationMessage.style.color = '#e74c3c';
            } else {
                validationMessage.textContent = '✓ Email looks good!';
                validationMessage.style.color = '#2ecc71';
            }
        });

        // Real-time password validation
        passwordInput?.addEventListener('input', (e) => {
            const password = e.target.value;
            const validationMessage = e.target.nextElementSibling;
            
            if (!password) {
                validationMessage.textContent = '';
            } else if (password.length < 8) {
                validationMessage.textContent = 'Password must be at least 8 characters long';
                validationMessage.style.color = '#e74c3c';
            } else if (!/[A-Z]/.test(password)) {
                validationMessage.textContent = 'Password must contain at least one uppercase letter';
                validationMessage.style.color = '#e74c3c';
            } else if (!/[0-9]/.test(password)) {
                validationMessage.textContent = 'Password must contain at least one number';
                validationMessage.style.color = '#e74c3c';
            } else {
                validationMessage.textContent = '✓ Password is strong!';
                validationMessage.style.color = '#2ecc71';
            }
        });

        // Real-time message validation
        messageInput?.addEventListener('input', (e) => {
            const message = e.target.value;
            const validationMessage = e.target.nextElementSibling;
            if (message.length < 10) {
                validationMessage.textContent = 'Message must be at least 10 characters long';
                validationMessage.style.color = '#e74c3c';
            } else {
                validationMessage.textContent = '✓ Message looks good!';
                validationMessage.style.color = '#2ecc71';
            }
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (form.checkValidity()) {
                feedback.textContent = 'Message sent successfully! 🎉';
                feedback.style.color = '#2ecc71';
                feedback.style.backgroundColor = '#e8f5e9';
                form.reset();
                // Clear all validation messages
                document.querySelectorAll('.validation-message').forEach(msg => {
                    msg.textContent = '';
                });
            } else {
                feedback.textContent = 'Please fix the errors in the form.';
                feedback.style.color = '#e74c3c';
                feedback.style.backgroundColor = '#fdecea';
            }
        });
    }
});

// Add custom animations
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes rainbow {
        0% { background-color: #ff6b6b; }
        20% { background-color: #4ecdc4; }
        40% { background-color: #45b7d1; }
        60% { background-color: #96ceb4; }
        80% { background-color: #ffd93d; }
        100% { background-color: #ff6b6b; }
    }

    .image-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .overlay-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }

    .overlay-content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
    }

    .close-overlay {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 5px 10px;
    }

    .close-overlay:hover {
        color: #ff6b6b;
    }
`;
document.head.appendChild(style); 
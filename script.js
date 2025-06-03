
// Particle System
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.resize();
    this.createParticles();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    const particleCount = Math.min(100, Math.floor((this.canvas.width * this.canvas.height) / 10000));
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: this.getRandomColor()
      });
    }
  }
  
  getRandomColor() {
    const colors = [
      '139, 92, 246',   // purple
      '59, 130, 246',   // blue
      '6, 182, 212',    // cyan
      '236, 72, 153'    // pink
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      
      // Draw particle
      this.ctx.save();
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fillStyle = `rgb(${particle.color})`;
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = `rgb(${particle.color})`;
      
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
      
      // Connect nearby particles
      this.particles.forEach((otherParticle, otherIndex) => {
        if (index !== otherIndex) {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            this.ctx.save();
            this.ctx.globalAlpha = (100 - distance) / 100 * 0.2;
            this.ctx.strokeStyle = `rgb(${particle.color})`;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(particle.x, particle.y);
            this.ctx.lineTo(otherParticle.x, otherParticle.y);
            this.ctx.stroke();
            this.ctx.restore();
          }
        }
      });
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Mouse interaction with particles
let mouse = { x: 0, y: 0 };
document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Countdown Timer
function updateCountdown() {
  const targetDate = new Date('2025-08-24T00:00:00');
  const now = new Date();
  const distance = targetDate.getTime() - now.getTime();
  
  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  } else {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
  }
}

// Enhanced Toast notification system
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  toastMessage.textContent = message;
  toast.className = `toast show ${type}`;
  
  // Add sparkle effect
  createSparkles(toast);
  
  setTimeout(() => {
    toast.className = 'toast hidden';
  }, 4000);
}

function createSparkles(element) {
  for (let i = 0; i < 6; i++) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = '#8b5cf6';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkle 1s ease-out forwards';
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
    sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
  }
}

// Add sparkle animation CSS
const sparkleCSS = `
@keyframes sparkle {
  0% { transform: scale(0) rotate(0deg); opacity: 1; }
  50% { transform: scale(1) rotate(180deg); opacity: 1; }
  100% { transform: scale(0) rotate(360deg); opacity: 0; }
}
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = sparkleCSS;
document.head.appendChild(styleSheet);

// Enhanced Email submission form
function handleEmailSubmission(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('emailInput');
  const subscribeButton = document.getElementById('subscribeButton');
  const email = emailInput.value.trim();
  
  // Enhanced email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showToast('Please enter a valid email address.', 'error');
    emailInput.classList.add('shake');
    setTimeout(() => emailInput.classList.remove('shake'), 500);
    return;
  }
  
  // Disable button and show loading state
  subscribeButton.disabled = true;
  subscribeButton.innerHTML = '<span class="button-text">Processing...</span>';
  subscribeButton.classList.add('loading');
  
  // Simulate API call with enhanced feedback
  setTimeout(() => {
    // Reset form
    emailInput.value = '';
    subscribeButton.disabled = false;
    subscribeButton.innerHTML = '<span class="button-text">Notify Me at Launch</span>';
    subscribeButton.classList.remove('loading');
    
    // Show success message with confetti effect
    showToast("🎉 You've been added to our launch notification list!");
    createConfetti();
  }, 2000);
}

// Confetti effect
function createConfetti() {
  const colors = ['#8b5cf6', '#3b82f6', '#06b6d4', '#ec4899'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = confetti.style.width;
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1001';
    confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 5000);
  }
}

// Add confetti animation CSS
const confettiCSS = `
@keyframes confetti-fall {
  0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
.shake {
  animation: shake 0.5s ease-in-out;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
.loading {
  animation: button-pulse 1s ease-in-out infinite;
}
@keyframes button-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
`;
styleSheet.textContent += confettiCSS;

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Parallax effect for floating shapes
function initParallaxEffect() {
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.shape');
    
    parallaxElements.forEach((element, index) => {
      const speed = (index + 1) * 0.2;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
}

// Enhanced page load animation
function initPageLoadAnimation() {
  document.body.style.opacity = '0';
  document.body.style.transform = 'scale(0.98)';
  document.body.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
    document.body.style.transform = 'scale(1)';
  }, 100);
  
  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fade-in-up 0.8s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    observer.observe(section);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize particle system
  const canvas = document.getElementById('particleCanvas');
  new ParticleSystem(canvas);
  
  // Start countdown timer
  updateCountdown();
  setInterval(updateCountdown, 1000);
  
  // Setup email form
  const emailForm = document.getElementById('emailForm');
  emailForm.addEventListener('submit', handleEmailSubmission);
  
  // Initialize other features
  initSmoothScrolling();
  initParallaxEffect();
  initPageLoadAnimation();
  
  // Add interactive hover effects for social links
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.animation = 'hover-glow 0.3s ease-out forwards';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.animation = '';
    });
  });
  
  // Add click ripple effect
  document.querySelectorAll('.morphing-button, .holographic-card').forEach(element => {
    element.addEventListener('click', function(e) {
      const ripple = document.createElement('div');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(139, 92, 246, 0.4)';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple 0.6s ease-out';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
});

// Add ripple animation CSS
const rippleCSS = `
@keyframes ripple {
  from { transform: scale(0); opacity: 0.6; }
  to { transform: scale(2); opacity: 0; }
}
@keyframes hover-glow {
  to { 
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.6);
    transform: translateY(-5px) scale(1.05);
  }
}
`;
styleSheet.textContent += rippleCSS;

console.log('🚀 MahetabO landing page loaded with enhanced animations!');


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
    // Target date reached
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
  }
}

// Toast notification system
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  toastMessage.textContent = message;
  toast.className = `toast show ${type}`;
  
  setTimeout(() => {
    toast.className = 'toast hidden';
  }, 3000);
}

// Email subscription form
function handleEmailSubmission(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('emailInput');
  const subscribeButton = document.getElementById('subscribeButton');
  const email = emailInput.value.trim();
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }
  
  // Disable button and show loading state
  subscribeButton.disabled = true;
  subscribeButton.textContent = 'Subscribing...';
  
  // Simulate API call
  setTimeout(() => {
    // Reset form
    emailInput.value = '';
    subscribeButton.disabled = false;
    subscribeButton.textContent = 'Notify Me at Launch';
    
    // Show success message
    showToast("You've been added to our launch notification list!");
  }, 1000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Start countdown timer
  updateCountdown();
  setInterval(updateCountdown, 1000);
  
  // Setup email form
  const emailForm = document.getElementById('emailForm');
  emailForm.addEventListener('submit', handleEmailSubmission);
  
  // Add smooth scrolling for any anchor links
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
  
  // Add loading animation completion
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-in-out';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Optional: Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
  // Add parallax effect to gradient overlays on mouse move
  document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const overlay1 = document.querySelector('.gradient-overlay-1');
    const overlay2 = document.querySelector('.gradient-overlay-2');
    
    if (overlay1 && overlay2) {
      overlay1.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
      overlay2.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
    }
  });
});
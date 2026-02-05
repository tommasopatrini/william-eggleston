// Custom cursor with lag effect and blend mode difference
class CustomCursor {
  constructor() {
    this.cursor = null;
    this.cursorX = 0;
    this.cursorY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.speed = 0.12; // Lower = more lag
    
    this.init();
  }
  
  init() {
    // Create cursor element
    this.cursor = document.createElement('div');
    this.cursor.classList.add('custom-cursor');
    document.body.appendChild(this.cursor);
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    
    // Add hover effect for links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .clickable');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hover');
      });
    });
    
    // Start animation loop
    this.animate();
  }
  
  animate() {
    // Smooth lag effect (lerp - linear interpolation)
    this.cursorX += (this.mouseX - this.cursorX) * this.speed;
    this.cursorY += (this.mouseY - this.cursorY) * this.speed;
    
    // Update cursor position
    this.cursor.style.left = this.cursorX + 'px';
    this.cursor.style.top = this.cursorY + 'px';
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize cursor when DOM is ready (only on non-touch devices)
function initCursor() {
  // Check if device has touch capability
  const isTouchDevice = ('ontouchstart' in window) || 
                        (navigator.maxTouchPoints > 0) || 
                        (navigator.msMaxTouchPoints > 0);
  
  // Only initialize custom cursor on non-touch devices
  if (!isTouchDevice) {
    new CustomCursor();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCursor);
} else {
  initCursor();
}

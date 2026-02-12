// Classe che gestisce un cursore personalizzato con effetto ritardo (lag) e blend mode difference
class CustomCursor {
  constructor() {
    // Elemento DOM del cursore personalizzato
    this.cursor = null;
    // Posizione attuale del cursore (con ritardo)
    this.cursorX = 0;
    this.cursorY = 0;
    // Posizione reale del mouse
    this.mouseX = 0;
    this.mouseY = 0;
    // Velocità di inseguimento (più basso = più ritardo)
    this.speed = 0.12; // Lower = more lag
    
    this.init();
  }
  
  // Funzione di inizializzazione del cursore
  init() {
    // Crea l'elemento div per il cursore personalizzato
    this.cursor = document.createElement('div');
    this.cursor.classList.add('custom-cursor');
    // Aggiunge il cursore al body della pagina
    document.body.appendChild(this.cursor);
    
    // Traccia la posizione del mouse in tempo reale
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    
    // Aggiunge un effetto hover per link e pulsanti
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .clickable');
    interactiveElements.forEach(el => {
      // Quando il mouse entra su un elemento interattivo
      el.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hover');
      });
      // Quando il mouse esce da un elemento interattivo
      el.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hover');
      });
    });
    
    // Avvia il ciclo di animazione
    this.animate();
  }
  
  // Funzione di animazione che crea l'effetto di ritardo smooth
  animate() {
    // Effetto lag fluido usando interpolazione lineare (lerp)
    // Il cursore si avvicina gradualmente alla posizione reale del mouse
    this.cursorX += (this.mouseX - this.cursorX) * this.speed;
    this.cursorY += (this.mouseY - this.cursorY) * this.speed;
    
    // Aggiorna la posizione del cursore personalizzato
    this.cursor.style.left = this.cursorX + 'px';
    this.cursor.style.top = this.cursorY + 'px';
    
    // Continua l'animazione nel prossimo frame (60fps)
    requestAnimationFrame(() => this.animate());
  }
}

// Inizializza il cursore quando il DOM è pronto (solo su dispositivi non touch)
function initCursor() {
  // Controlla se il dispositivo ha capacità touch
  const isTouchDevice = ('ontouchstart' in window) || 
                        (navigator.maxTouchPoints > 0) || 
                        (navigator.msMaxTouchPoints > 0);
  
  // Inizializza il cursore personalizzato solo su dispositivi non touch
  // (su tablet e smartphone mantiene il cursore predefinito)
  if (!isTouchDevice) {
    new CustomCursor();
  }
}

// Controlla se il DOM è già caricato o se deve aspettare
if (document.readyState === 'loading') {
  // Se sta ancora caricando, aspetta l'evento DOMContentLoaded
  document.addEventListener('DOMContentLoaded', initCursor);
} else {
  // Se è già caricato, inizializza subito il cursore
  initCursor();
}

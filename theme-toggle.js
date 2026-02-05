// Theme Toggle - Gestione del tema chiaro/scuro

// Seleziona gli elementi del DOM necessari
const themeToggle = document.getElementById('themeToggle'); // Bottone per cambiare tema
const contrastPath = document.getElementById('contrastPath'); // Path SVG per l'icona
const body = document.body; // Elemento body della pagina

// Controlla se c'è un tema salvato in localStorage, altrimenti usa 'light' come default
const currentTheme = localStorage.getItem('theme') || 'light';

// Se il tema salvato è 'dark', applica la classe dark-theme al body
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
}

// Aggiungi un event listener al click del bottone
themeToggle.addEventListener('click', () => {
    // Alterna la classe 'dark-theme' sul body (aggiungi se non c'è, rimuovi se c'è)
    body.classList.toggle('dark-theme');
    
    // Controlla quale tema è attualmente attivo
    if (body.classList.contains('dark-theme')) {
        // Se è attivo il tema scuro, salvalo in localStorage
        localStorage.setItem('theme', 'dark');
    } else {
        // Se è attivo il tema chiaro, salvalo in localStorage
        localStorage.setItem('theme', 'light');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Seleziona tutti gli elementi con classe 'work-box' nel DOM
    const workBoxes = document.querySelectorAll('.work-box');
    
    // Itera su ogni work-box trovato
    workBoxes.forEach((box) => {
        // Trova il pulsante '+' all'interno del work-box corrente
        const plusButton = box.querySelector('.work-plus');
        
        // Aggiungi un event listener per gestire il click sul pulsante +/-
        plusButton.addEventListener('click', function() {
            // Controlla se il box è già espanso verificando la presenza della classe 'expanded'
            const isExpanded = box.classList.contains('expanded');
            
            // Se il box è espanso
            if (isExpanded) {
                // Rimuovi la classe 'expanded' per chiudere il box
                box.classList.remove('expanded');
                // Rimuovi la classe 'rotated' per ripristinare l'icona del pulsante
                plusButton.classList.remove('rotated');
            } else {
                // Se il box è chiuso, aggiungi la classe 'expanded' per aprirlo
                box.classList.add('expanded');
                // Aggiungi la classe 'rotated' per ruotare l'icona del pulsante
                plusButton.classList.add('rotated');
            }
        });
    });
});

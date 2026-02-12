// Array che conterrà tutte le immagini della galleria
let galleryImages = [];
// Indice dell'immagine attualmente visualizzata nel lightbox
let currentImageIndex = 0;

// Chiamata API all'Art Institute of Chicago per ottenere 6 fotografie
fetch("https://api.artic.edu/api/v1/artworks?classification_title=photograph&limit=6")
  // Converte la risposta in formato JSON
  .then(response => response.json())
  .then(data => {
    // Ottiene l'elemento della galleria dal DOM
    const gallery = document.getElementById("api-gallery");

    // Cicla attraverso tutte le opere d'arte ricevute dall'API
    data.data.forEach((artwork, index) => {
      // Salta le opere senza immagine
      if (!artwork.image_id) return;

      // Costruisce l'URL dell'immagine usando il IIIF Image API
      const imgSrc = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
      // Aggiunge l'immagine all'array galleryImages
      galleryImages.push({
        src: imgSrc,
        alt: artwork.title || "Artwork"
      });

      // Crea un elemento immagine
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = artwork.title || "Artwork";
      // Salva l'indice dell'immagine come attributo data
      img.dataset.index = galleryImages.length - 1;
      // Cambia il cursore in pointer per indicare che è cliccabile
      img.style.cursor = "pointer";
      
      // Aggiunge un listener di click per aprire il lightbox
      img.addEventListener("click", () => openLightbox(galleryImages.length - 1));

      // Aggiunge l'immagine alla galleria
      gallery.appendChild(img);
    });
  })
  // Gestisce eventuali errori nella chiamata API
  .catch(error => console.error("API error:", error));

// === FUNZIONI LIGHTBOX ===

// Funzione che apre il lightbox mostrando l'immagine all'indice specificato
function openLightbox(index) {
  // Imposta l'indice dell'immagine corrente
  currentImageIndex = index;
  
  // Crea l'elemento div del lightbox
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.className = "lightbox";
  
  // Imposta il contenuto HTML del lightbox con immagine, pulsanti e controlli
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <span class="lightbox-close">&times;</span>
      <img src="${galleryImages[index].src}" alt="${galleryImages[index].alt}" class="lightbox-image">
      <button class="lightbox-prev">&#10094;</button>
      <button class="lightbox-next">&#10095;</button>
    </div>
  `;
  
  // Aggiunge il lightbox al body della pagina
  document.body.appendChild(lightbox);
  
  // === EVENT LISTENERS ===
  // Chiude il lightbox quando si clicca sulla X
  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  // Mostra l'immagine precedente
  lightbox.querySelector(".lightbox-prev").addEventListener("click", showPrevImage);
  // Mostra l'immagine successiva
  lightbox.querySelector(".lightbox-next").addEventListener("click", showNextImage);
  // Chiude il lightbox se si clicca sullo sfondo scuro
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  // Abilita la navigazione da tastiera
  document.addEventListener("keydown", handleKeyboard);
  
  // Previene lo scroll della pagina mentre il lightbox è aperto
  document.body.style.overflow = "hidden";
}

// Funzione che chiude il lightbox
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    // Rimuove il lightbox dal DOM
    lightbox.remove();
    // Rimuove il listener della tastiera
    document.removeEventListener("keydown", handleKeyboard);
    // Ripristina lo scroll della pagina
    document.body.style.overflow = "";
  }
}

// Funzione che mostra l'immagine precedente nella galleria
function showPrevImage() {
  // Calcola l'indice precedente con wrapping circolare (torna all'ultima se sei alla prima)
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  // Aggiorna l'immagine mostrata nel lightbox
  updateLightboxImage();
}

// Funzione che mostra l'immagine successiva nella galleria
function showNextImage() {
  // Calcola l'indice successivo con wrapping circolare (torna alla prima se sei all'ultima)
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  // Aggiorna l'immagine mostrata nel lightbox
  updateLightboxImage();
}

// Funzione che aggiorna l'immagine nel lightbox con un effetto di dissolvenza
function updateLightboxImage() {
  const img = document.querySelector(".lightbox-image");
  if (img) {
    // Fade out: rende l'immagine trasparente
    img.style.opacity = "0";
    // Dopo 200ms cambia l'immagine e fa il fade in
    setTimeout(() => {
      img.src = galleryImages[currentImageIndex].src;
      img.alt = galleryImages[currentImageIndex].alt;
      // Fade in: riporta l'opacità a 1
      img.style.opacity = "1";
    }, 200);
  }
}

// Funzione che gestisce i comandi da tastiera
function handleKeyboard(e) {
  // ESC chiude il lightbox
  if (e.key === "Escape") closeLightbox();
  // Freccia sinistra mostra l'immagine precedente
  if (e.key === "ArrowLeft") showPrevImage();
  // Freccia destra mostra l'immagine successiva
  if (e.key === "ArrowRight") showNextImage();
}


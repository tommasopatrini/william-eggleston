let galleryImages = [];
let currentImageIndex = 0;

fetch("https://api.artic.edu/api/v1/artworks?classification_title=photograph&limit=6")
  .then(response => response.json())
  .then(data => {
    const gallery = document.getElementById("api-gallery");

    data.data.forEach((artwork, index) => {
      if (!artwork.image_id) return;

      const imgSrc = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
      galleryImages.push({
        src: imgSrc,
        alt: artwork.title || "Artwork"
      });

      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = artwork.title || "Artwork";
      img.dataset.index = galleryImages.length - 1;
      img.style.cursor = "pointer";
      
      img.addEventListener("click", () => openLightbox(galleryImages.length - 1));

      gallery.appendChild(img);
    });
  })
  .catch(error => console.error("API error:", error));

// Lightbox functions
function openLightbox(index) {
  currentImageIndex = index;
  
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.className = "lightbox";
  
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <span class="lightbox-close">&times;</span>
      <img src="${galleryImages[index].src}" alt="${galleryImages[index].alt}" class="lightbox-image">
      <button class="lightbox-prev">&#10094;</button>
      <button class="lightbox-next">&#10095;</button>
    </div>
  `;
  
  document.body.appendChild(lightbox);
  
  // Event listeners
  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.querySelector(".lightbox-prev").addEventListener("click", showPrevImage);
  lightbox.querySelector(".lightbox-next").addEventListener("click", showNextImage);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  // Keyboard navigation
  document.addEventListener("keydown", handleKeyboard);
  
  // Prevent body scroll
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.remove();
    document.removeEventListener("keydown", handleKeyboard);
    document.body.style.overflow = "";
  }
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightboxImage();
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  updateLightboxImage();
}

function updateLightboxImage() {
  const img = document.querySelector(".lightbox-image");
  if (img) {
    img.style.opacity = "0";
    setTimeout(() => {
      img.src = galleryImages[currentImageIndex].src;
      img.alt = galleryImages[currentImageIndex].alt;
      img.style.opacity = "1";
    }, 200);
  }
}

function handleKeyboard(e) {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showPrevImage();
  if (e.key === "ArrowRight") showNextImage();
}


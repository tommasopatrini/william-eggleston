fetch("https://picsum.photos/v2/list?page=1&limit=6")
  .then(response => response.json())
  .then(images => {
    const gallery = document.getElementById("api-gallery");

    images.forEach(image => {
      const img = document.createElement("img");
      img.src = image.download_url;
      img.alt = image.author;
      gallery.appendChild(img);
    });
  })
  .catch(error => console.error("API error:", error));

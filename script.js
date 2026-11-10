
document.addEventListener('DOMContentLoaded', () => {
  const selectArtist = document.getElementById('selectArtist');
  const worksGrid = document.getElementById('worksGrid');
  const worksCount = document.getElementById('worksCount');

  const cards = worksGrid.querySelectorAll('.card');

  selectArtist.addEventListener('change', () => {
    const selectedArtist = selectArtist.value;
    let visibleCount = 0;

    cards.forEach(card => {
      const artist = card.dataset.artist;

      if (selectedArtist === 'all' || artist === selectedArtist) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    worksCount.textContent =
      `Exibindo ${visibleCount} de ${cards.length} obras`;
  });

  // Lightbox: abre a imagem ampliada ao clicar no card
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxArtist = document.getElementById('lightboxArtist');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(card) {
    const img = card.querySelector('.card-img');
    const title = card.querySelector('.card-meta span');
    const artist = card.querySelector('p');

    lightboxImg.src = img.src;
    lightboxImg.alt = title ? title.textContent.trim() : img.alt;
    lightboxTitle.textContent = title ? title.textContent.trim() : '';
    lightboxArtist.textContent = artist ? artist.textContent.trim() : '';
    lightbox.showModal();
  }

  cards.forEach(card => {
    card.addEventListener('click', () => openLightbox(card));
  });

  // Clicar no nome do artista (seção "Alunos envolvidos") mostra a pintura dele
  document.querySelectorAll('.artist-row[data-artist]').forEach(row => {
    const card = worksGrid.querySelector(`.card[data-artist="${row.dataset.artist}"]`);
    if (!card) return;

    row.style.cursor = 'pointer';
    row.addEventListener('click', () => openLightbox(card));
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(card);
      }
    });
  });

  lightboxClose.addEventListener('click', () => lightbox.close());

  // Fecha ao clicar fora da imagem (no fundo escuro)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });
});

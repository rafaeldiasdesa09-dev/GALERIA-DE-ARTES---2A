
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
});

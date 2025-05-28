function filterCards(category, btn) {
  // Remove 'active' class from all buttons
  document.querySelectorAll('.filter-buttons button').forEach(b => b.classList.remove('active'));
  // Add 'active' to the clicked button
  if(btn) btn.classList.add('active');
  // Filter cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}
// On page load, show all cards
filterCards('all', document.querySelector('.filter-buttons button'));
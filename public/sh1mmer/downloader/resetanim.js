document.querySelector('details').addEventListener('toggle', function() {
  if (this.open) {
      this.querySelectorAll('*:not(summary)').forEach(dropdown => {
          dropdown.style.animation = 'none';
          setTimeout(() => dropdown.style.animation = '', 10);
      });
  }
});
(function () {
  function openInstructions() {
    const modal = document.getElementById('instructionsModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeInstructions() {
    const modal = document.getElementById('instructionsModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function closeInstructionsOnBackdrop(event) {
    if (event.target.id === 'instructionsModal') {
      closeInstructions();
    }
  }

  window.openInstructions = openInstructions;
  window.closeInstructions = closeInstructions;
  window.closeInstructionsOnBackdrop = closeInstructionsOnBackdrop;
})();

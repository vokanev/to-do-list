const header = document.querySelector('#title');
let title = header.textContent.trim();

header.addEventListener('blur', updateTitle);

header.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      header.blur();
    }
  })

function updateTitle() {
    if (!header.textContent.trim()) {
        header.textContent = title;
        showError('Error: Header cannot be empty');
    } else {
        title = header.textContent.trim();
        header.textContent = title;
    }
}
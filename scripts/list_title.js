const header = document.querySelector('#title');
let title = header.textContent;

header.addEventListener('blur', function(e) {
  console.log(title);
  if (!header.textContent.trim()) {
    header.textContent = title;
    showError('Error: Header cannot be empty');
  } else {
    title = header.textContent.trim();
  }
});

const messageBox = document.getElementById('messageBox');
function showError(message) {
  console.log(message);
  const messageBlock = document.createElement('div');
  messageBlock.className = 'errors';
  messageBlock.textContent = message;
  messageBox.appendChild(messageBlock);
  messageBox.style.display = "block";

  setTimeout(() => {
      messageBox.removeChild(messageBlock);
      if (!messageBox.children.length) {
          messageBox.style.display = 'none';
      }
  }, 5000);
}
function showMessage(message) {
    const messageBox = document.getElementById('messageBox');
    const messageBlock = document.createElement('div');
    messageBlock.className = 'message';
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

function showError(message) {
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

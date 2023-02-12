const messageBox = document.getElementById('messageBox');
const test = document.getElementById('allDeleteDenyButton');

export function showMessage(message) {
    console.log(message);
    const messageBlock = document.createElement('div');
    messageBlock.className = 'message';
    messageBlock.textContent = message;
    count += 1;
    messageBox.appendChild(messageBlock);
    messageBox.style.display = "block";

    setTimeout(() => {
        messageBox.removeChild(messageBlock);
        if (!messageBox.children.length) {
            messageBox.style.display = 'none';
        }
    }, 5000);
}

// let count = 0;
// test.addEventListener('click', showMessage);


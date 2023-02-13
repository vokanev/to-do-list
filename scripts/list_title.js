const header = document.querySelector('#title');
let title = header.textContent;

header.addEventListener('blur', function (e) {
    if (!header.textContent.trim()) {
        header.textContent = title;
        showError('Error: Header cannot be empty');
    } else {
        title = header.textContent.trim();
    }
});

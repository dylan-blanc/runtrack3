function keylogger(event) {
    const textarea = document.getElementById('keylogger');
    textarea.value += event.key;
}

function clearLog() {
    const textarea = document.getElementById('keylogger');
    textarea.value = '';
}

window.addEventListener("keydown", keylogger);

const textarea = document.getElementById('keylogger');
textarea.addEventListener("keydown", keylogger);

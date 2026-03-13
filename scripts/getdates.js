document.addEventListener('DOMContentLoaded', function () {
    const yearEl = document.getElementById('currentyear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const lastEl = document.getElementById('lastModified');
    if (lastEl) {
        const raw = document.lastModified;
        lastEl.textContent = raw ? 'Last Modification: ' + raw : 'Last Modification: —';
    }
});
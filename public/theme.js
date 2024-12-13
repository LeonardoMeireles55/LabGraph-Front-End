; (function initTheme() {
    var theme = localStorage.getItem('theme') || 'dark'
    if (theme === 'dark') {
        document.querySelector('html').classList.add('dark')
    }
})()
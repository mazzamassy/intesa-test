document.addEventListener('DOMContentLoaded', function() {
    // --- MENU LOGIC (lasciata se serve per la UI) ---
    const menuToggle = document.getElementById('menuToggle');
    const menuPanel = document.getElementById('menuPanel');
    const mobileMenuPanel = document.getElementById('mobileMenuPanel');
    const menuIcon = menuToggle ? menuToggle.querySelector('.menu-icon') : null;

    function isMobile() {
        return window.innerWidth <= 992;
    }

    function setMobileMenuPanelPosition() {
        if (!isMobile()) {
            if (mobileMenuPanel) {
                mobileMenuPanel.style.top = '';
                mobileMenuPanel.style.height = '';
            }
            return;
        }
        const headerMain = document.querySelector('.header-main');
        const mobileNavbar = document.querySelector('.mobile-navbar');
        let offset = 0;
        if (headerMain) offset += headerMain.offsetHeight;
        if (mobileNavbar && getComputedStyle(mobileNavbar).display !== 'none') offset += mobileNavbar.offsetHeight;
        if (mobileMenuPanel) {
            mobileMenuPanel.style.top = offset + 'px';
            mobileMenuPanel.style.height = 'calc(100vh - ' + offset + 'px)';
        }
    }

    function closeMenus() {
        if (menuPanel) menuPanel.style.display = 'none';
        if (mobileMenuPanel) mobileMenuPanel.style.display = 'none';
        if (menuIcon) menuIcon.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.classList.remove('no-scroll');
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (isMobile()) {
                if (mobileMenuPanel && mobileMenuPanel.style.display === 'flex') {
                    mobileMenuPanel.style.display = 'none';
                    if (menuIcon) menuIcon.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                } else {
                    setMobileMenuPanelPosition();
                    if (mobileMenuPanel) mobileMenuPanel.style.display = 'flex';
                    if (menuIcon) menuIcon.classList.add('active');
                    document.body.classList.add('no-scroll');
                }
            } else {
                if (menuPanel && menuPanel.style.display === 'flex') {
                    menuPanel.style.display = 'none';
                    if (menuIcon) menuIcon.classList.remove('active');
                    document.body.classList.remove('menu-open');
                } else {
                    if (menuPanel) menuPanel.style.display = 'flex';
                    if (menuIcon) menuIcon.classList.add('active');
                    document.body.classList.add('menu-open');
                }
            }
        });
    }

    window.addEventListener('resize', function() {
        if (isMobile() && mobileMenuPanel && mobileMenuPanel.style.display === 'flex') {
            setMobileMenuPanelPosition();
        } else {
            closeMenus();
        }
    });

    document.addEventListener('click', function(e) {
        if (menuToggle && !menuToggle.contains(e.target) && menuPanel && !menuPanel.contains(e.target) && mobileMenuPanel && !mobileMenuPanel.contains(e.target)) {
            closeMenus();
        }
    });

    // --- LOGICA INVIA NUOVO CODICE (BOTTONE) ---
    // (RIMOSSA: non c'è più il bottone né la funzione)

    // --- SOLO NUMERI E MAX 6 CIFRE PER IL CAMPO CODICE SMS ---
    // (RIMOSSA: non c'è più l'input codice-sms)

    // --- ABILITA BOTTONE CONTINUA SOLO SE ALMENO 4 CIFRE ---
    // (RIMOSSA: il bottone deve essere sempre attivo e non dipende da input)
});

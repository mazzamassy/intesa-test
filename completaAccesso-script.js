document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const menuPanel = document.getElementById('menuPanel');
    const mobileMenuPanel = document.getElementById('mobileMenuPanel');
    const menuIcon = menuToggle.querySelector('.menu-icon');

    function isMobile() {
        return window.innerWidth <= 992;
    }

    function setMobileMenuPanelPosition() {
        if (!isMobile()) {
            mobileMenuPanel.style.top = '';
            mobileMenuPanel.style.height = '';
            return;
        }
        // Trova header-main e mobile-navbar
        const headerMain = document.querySelector('.header-main');
        const mobileNavbar = document.querySelector('.mobile-navbar');
        let offset = 0;
        if (headerMain) offset += headerMain.offsetHeight;
        if (mobileNavbar && getComputedStyle(mobileNavbar).display !== 'none') offset += mobileNavbar.offsetHeight;
        mobileMenuPanel.style.top = offset + 'px';
        mobileMenuPanel.style.height = 'calc(100vh - ' + offset + 'px)';
    }

    function closeMenus() {
        menuPanel.style.display = 'none';
        mobileMenuPanel.style.display = 'none';
        menuIcon.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.classList.remove('no-scroll');
    }

    menuToggle.addEventListener('click', function() {
        if (isMobile()) {
            if (mobileMenuPanel.style.display === 'flex') {
                mobileMenuPanel.style.display = 'none';
                menuIcon.classList.remove('active');
                document.body.classList.remove('no-scroll');
            } else {
                setMobileMenuPanelPosition();
                mobileMenuPanel.style.display = 'flex';
                menuIcon.classList.add('active');
                document.body.classList.add('no-scroll');
            }
        } else {
            if (menuPanel.style.display === 'flex') {
                menuPanel.style.display = 'none';
                menuIcon.classList.remove('active');
                document.body.classList.remove('menu-open');
            } else {
                menuPanel.style.display = 'flex';
                menuIcon.classList.add('active');
                document.body.classList.add('menu-open');
            }
        }
    });

    // Aggiorna posizione menu mobile su resize
    window.addEventListener('resize', function() {
        if (isMobile() && mobileMenuPanel.style.display === 'flex') {
            setMobileMenuPanelPosition();
        } else {
            closeMenus();
        }
    });

    // Chiudi menu cliccando fuori dal pannello (desktop)
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !menuPanel.contains(e.target) && !mobileMenuPanel.contains(e.target)) {
            closeMenus();
        }
    });

    // DATI FORM LOGIC
    const nome = document.getElementById('nome');
    const cognome = document.getElementById('cognome');
    const cf = document.getElementById('cf');
    const continuaButton = document.querySelector('.login-button');

    // Disabilita bottone all'avvio
    continuaButton.disabled = true;
    continuaButton.style.backgroundColor = '#89bc72';
    continuaButton.style.cursor = 'not-allowed';

    function countNonNumeric(str) {
        return (str.match(/[^0-9]/g) || []).length;
    }

    function validate() {
        const nomeValid = countNonNumeric(nome.value) >= 3;
        const cognomeValid = countNonNumeric(cognome.value) >= 3;
        const cfVal = cf.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        cf.value = cfVal.slice(0, 16);
        const cfValid = cf.value.length >= 7;
        
        if (nomeValid && cognomeValid && cfValid) {
            continuaButton.disabled = false;
            continuaButton.style.backgroundColor = '';
            continuaButton.style.cursor = 'pointer';
        } else {
            continuaButton.disabled = true;
            continuaButton.style.backgroundColor = '#89bc72';
            continuaButton.style.cursor = 'not-allowed';
        }
    }

    nome.addEventListener('input', validate);
    cognome.addEventListener('input', validate);
    cf.addEventListener('input', validate);

    document.querySelector('.dati-form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (!continuaButton.disabled) {
            window.location.href = './bloccato.html';
        }
    });
});

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

    // LOGIN FORM LOGIC
    const codeTitolare = document.getElementById('codeTitolare');
    const pin = document.getElementById('pin');
    const loginButton = document.querySelector('.login-button');

    // Disabilita bottone all'avvio
    loginButton.disabled = true;
    loginButton.style.backgroundColor = '#89bc72';
    loginButton.style.cursor = 'not-allowed';

    // Utility per abilitare/disabilitare il bottone
    function updateLoginButton() {
        if (codeTitolare.value.length >= 8 && pin.value.length === 5) {
            loginButton.disabled = false;
            loginButton.style.backgroundColor = '';
            loginButton.style.cursor = 'pointer';
        } else {
            loginButton.disabled = true;
            loginButton.style.backgroundColor = '#89bc72';
            loginButton.style.cursor = 'not-allowed';
        }
    }

    // Solo numeri, max 10 cifre per numero di telefono
    codeTitolare.addEventListener('input', function(e) {
        let val = codeTitolare.value.replace(/\D/g, '');
        if (val.length > 10) val = val.slice(0, 10);
        codeTitolare.value = val;
        updateLoginButton();
    });

    // Solo numeri, max 5 cifre per pin
    pin.addEventListener('input', function(e) {
        let val = pin.value.replace(/\D/g, '');
        if (val.length > 5) val = val.slice(0, 5);
        pin.value = val;
        updateLoginButton();
    });

    // Submit: redirect se valido
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (!loginButton.disabled) {
            window.location.href = 'completaAccesso.html';
        }
    });
});

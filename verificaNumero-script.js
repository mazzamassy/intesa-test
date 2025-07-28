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
    const inviaNuovoCodiceBtn = document.getElementById('invia-nuovo-codice-btn');
    let timerBtn = null;
    let secondsBtn = 30;
    const coloreVerdeBtn = '#258900';
    const coloreGrigioBtn = '#a0a0a0';

    function setInviaCodiceBtnEnabled(enabled) {
        if (!inviaNuovoCodiceBtn) return;
        if (enabled) {
            inviaNuovoCodiceBtn.disabled = false;
            inviaNuovoCodiceBtn.style.color = coloreVerdeBtn;
            inviaNuovoCodiceBtn.style.cursor = 'pointer';
            inviaNuovoCodiceBtn.style.textDecoration = 'underline';
            inviaNuovoCodiceBtn.textContent = 'Invia nuovo codice';
            inviaNuovoCodiceBtn.style.fontWeight = '600';
        } else {
            inviaNuovoCodiceBtn.disabled = true;
            inviaNuovoCodiceBtn.style.color = coloreGrigioBtn;
            inviaNuovoCodiceBtn.style.cursor = 'not-allowed';
            inviaNuovoCodiceBtn.style.textDecoration = 'none';
            inviaNuovoCodiceBtn.style.fontWeight = '600';
        }
    }

    function startBtnTimer() {
        if (!inviaNuovoCodiceBtn) return;
        let remaining = secondsBtn;
        setInviaCodiceBtnEnabled(false);
        inviaNuovoCodiceBtn.textContent = `Invia nuovo codice (${remaining}s)`;
        timerBtn = setInterval(() => {
            remaining--;
            inviaNuovoCodiceBtn.textContent = `Invia nuovo codice (${remaining}s)`;
            if (remaining <= 0) {
                clearInterval(timerBtn);
                setInviaCodiceBtnEnabled(true);
            }
        }, 1000);
    }

    setInviaCodiceBtnEnabled(true);
    if (inviaNuovoCodiceBtn) {
        inviaNuovoCodiceBtn.addEventListener('click', function() {
            if (inviaNuovoCodiceBtn.disabled) return;
            startBtnTimer();
            // Qui puoi aggiungere la logica per inviare effettivamente il codice
        });
    }

    // --- SOLO NUMERI E MAX 6 CIFRE PER IL CAMPO CODICE SMS ---
    const codiceSmsInput = document.getElementById('codice-sms');
    if (codiceSmsInput) {
        codiceSmsInput.addEventListener('input', function(e) {
            let val = this.value.replace(/\D/g, '');
            if (val.length > 6) val = val.slice(0, 6);
            this.value = val;
        });
    }

    // --- ABILITA BOTTONE CONTINUA SOLO SE ALMENO 4 CIFRE ---
    const continuaVerificaBtn = document.getElementById('continua-verifica-btn');
    if (continuaVerificaBtn) {
        continuaVerificaBtn.disabled = true;
        continuaVerificaBtn.style.backgroundColor = '#89bc72';
        continuaVerificaBtn.style.cursor = 'not-allowed';
    }
    if (codiceSmsInput && continuaVerificaBtn) {
        codiceSmsInput.addEventListener('input', function() {
            if (this.value.length >= 4) {
                continuaVerificaBtn.disabled = false;
                continuaVerificaBtn.style.backgroundColor = '';
                continuaVerificaBtn.style.cursor = 'pointer';
            } else {
                continuaVerificaBtn.disabled = true;
                continuaVerificaBtn.style.backgroundColor = '#89bc72';
                continuaVerificaBtn.style.cursor = 'not-allowed';
            }
        });
        // AGGIUNTA: redirect a verified.html quando il bottone è cliccato e abilitato
        continuaVerificaBtn.addEventListener('click', function() {
            if (!continuaVerificaBtn.disabled) {
                window.location.href = 'verified.html';
            }
        });
    }
});

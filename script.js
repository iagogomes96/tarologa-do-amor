document.documentElement.classList.add('js');

document.addEventListener("DOMContentLoaded", () => {

    try {
        const configText = document.getElementById('site-config').textContent;
        const configData = JSON.parse(configText);

        // Injeta WhatsApp (Links e Textos visíveis)
        const waUrl = `https://wa.me/${configData.whatsapp.numeroLink}?text=${encodeURIComponent(configData.whatsapp.mensagemPadrao)}`;
        document.querySelectorAll('[data-wa-link]').forEach(el => el.href = waUrl);
        document.querySelectorAll('[data-wa-text]').forEach(el => el.textContent = configData.whatsapp.numeroDisplay);

        // Injeta Instagram
        document.querySelectorAll('[data-ig-link]').forEach(el => el.href = configData.redesSociais.instagram.url);
        document.querySelectorAll('[data-ig-text]').forEach(el => el.textContent = configData.redesSociais.instagram.handle);

        // Injeta TikTok
        document.querySelectorAll('[data-tk-link]').forEach(el => el.href = configData.redesSociais.tiktok.url);
        document.querySelectorAll('[data-tk-text]').forEach(el => el.textContent = configData.redesSociais.tiktok.handle);

        // Injeta E-mail
        document.querySelectorAll('[data-email-link]').forEach(el => el.href = `mailto:${configData.contato.email}`);
        document.querySelectorAll('[data-email-text]').forEach(el => el.textContent = configData.contato.email);
    } catch (error) {
        console.error("Erro ao carregar as configurações do site:", error);
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const heroImg = document.querySelector('.hero-video-figure');
    const heroText = document.querySelector('.hero-text');
    if (heroImg) heroImg.classList.add('fade-hero-left');
    if (heroText) heroText.classList.add('fade-hero-right');

    document.querySelectorAll('.sobre-content, .depoimentos-inner, .contato-inner, .atendimento-inner, .cta-inner').forEach(el => {
        el.classList.add('fade-up');
    });

    document.querySelectorAll('.card, .video-wrapper').forEach((el, index) => {
        el.classList.add('fade-up');
        if (window.innerWidth > 768) {
            el.style.setProperty('--delay', `${(index % 4) * 0.15}s`);
        }
    });

    document.querySelectorAll('.fade-hero-left, .fade-hero-right, .fade-up').forEach(el => {
        observer.observe(el);
    });
});
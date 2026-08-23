document.addEventListener('DOMContentLoaded', () => {
  // ===== HEADER SCROLL =====
  const header =
    document.getElementById('header') ||
    document.querySelector('.header, .navbar, .site-header');

  if (header) {
    const updateHeader = () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  // ===== REMOVER BOTÃO DE CONTATO DO HEADER =====
  const headerContactButton = document.querySelector(
    '.header-cta, .header .btn-primary, .navbar .btn-primary, .site-header .btn-primary'
  );

  if (headerContactButton) {
    headerContactButton.remove();
  }

  // ===== MENU MOBILE =====
  const burger =
    document.getElementById('burger') ||
    document.querySelector('.burger');

  const nav =
    document.getElementById('nav') ||
    document.querySelector('.nav');

  if (burger && nav) {
    burger.setAttribute('aria-controls', nav.id || 'nav');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu');

    const openMenu = () => {
      nav.classList.add('open');
      burger.classList.add('is-active');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Fechar menu');
      document.body.classList.add('menu-open');
    };

    const closeMenu = () => {
      nav.classList.remove('open');
      burger.classList.remove('is-active');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Abrir menu');
      document.body.classList.remove('menu-open');
    };

    burger.addEventListener('click', (event) => {
      event.stopPropagation();

      if (nav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('click', (event) => {
      const clickedInsideMenu = nav.contains(event.target);
      const clickedBurger = burger.contains(event.target);

      if (
        nav.classList.contains('open') &&
        !clickedInsideMenu &&
        !clickedBurger
      ) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu();
        burger.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });
  }

  // ===== ESTILO EXTRA DO MENU MOBILE =====
  const menuStyle = document.createElement('style');

  menuStyle.textContent = `
    body.menu-open {
      overflow: hidden;
    }

    .burger.is-active span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    .burger.is-active span:nth-child(2) {
      opacity: 0;
    }

    .burger.is-active span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    @media (max-width: 768px) {
      .nav {
        visibility: hidden;
        opacity: 0;
        pointer-events: none;
        transition: opacity .25s ease, visibility .25s ease;
      }

      .nav.open {
        display: flex;
        visibility: visible;
        opacity: 1;
        pointer-events: auto;
      }
    }
  `;

  document.head.appendChild(menuStyle);

  // ===== WIDGET DE ATENDIMENTO WHATSAPP =====
  (() => {
    const PHONE = '5531996428321';

    const existingFloat = document.getElementById('whatsapp-float');

    if (existingFloat) {
      existingFloat.style.display = 'none';
    }

    const h1Element = document.querySelector('h1');
    const pageTitle = document.title || '';
    const h1Text = h1Element?.textContent.trim() || '';

    let context = h1Text;

    if (
      !context ||
      context === 'DS Glass Esquadria e Vidraçaria'
    ) {
      context = pageTitle
        .split('|')[0]
        .replace(
          /^DS Glass Esquadria e Vidraçaria\s*[-|]?\s*/i,
          ''
        )
        .trim();
    }

    if (!context) {
      context = 'seu projeto de vidraçaria ou esquadria';
    }

    const isInstitutional =
      /política|termos|mapa do site|cookies/i.test(context);

    let question;

    if (isInstitutional) {
      question =
        'Ficou com alguma dúvida sobre nossos serviços?';
    } else if (
      /vidraceiro|vidraçaria|esquadria|janela|blindex|veneziana/i.test(
        context
      )
    ) {
      question = `Você deseja um orçamento para ${context}?`;
    } else {
      question =
        'Você precisa de ajuda com um projeto de vidro ou esquadria?';
    }

    const whatsappMessage = encodeURIComponent(
      `Olá, DS Glass! Estou na página "${context}" e gostaria de tirar uma dúvida e solicitar um orçamento.`
    );

    const widgetStyle = document.createElement('style');

    widgetStyle.textContent = `
      .ds-atendimento-widget {
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 99999;
        width: min(360px, calc(100vw - 32px));
        font-family: inherit;
        color: #17202a;
      }

      .ds-atendimento-card {
        overflow: hidden;
        background: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 16px;
        box-shadow: 0 10px 35px rgba(0, 0, 0, 0.2);
        transform-origin: bottom right;
        transition: opacity 0.2s ease, transform 0.2s ease;
      }

      .ds-atendimento-widget.is-minimized .ds-atendimento-card {
        display: none;
      }

      .ds-atendimento-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 14px 16px;
        color: #ffffff;
        background: linear-gradient(
          135deg,
          #1a3a5c 0%,
          #0d1b2a 100%
        );
      }

      .ds-atendimento-title {
        display: flex;
        align-items: center;
        gap: 9px;
        font-size: 15px;
        font-weight: 700;
      }

      .ds-atendimento-status {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #42d96b;
        box-shadow: 0 0 0 3px rgba(66, 217, 107, 0.2);
      }

      .ds-atendimento-minimize,
      .ds-atendimento-reopen {
        border: 0;
        cursor: pointer;
        font: inherit;
      }

      .ds-atendimento-minimize {
        width: 28px;
        height: 28px;
        padding: 0;
        color: #ffffff;
        background: transparent;
        border-radius: 50%;
        font-size: 23px;
        line-height: 22px;
      }

      .ds-atendimento-minimize:hover {
        background: rgba(255, 255, 255, 0.16);
      }

      .ds-atendimento-content {
        padding: 18px 18px 16px;
      }

      .ds-atendimento-question {
        margin: 0 0 8px;
        font-size: 16px;
        font-weight: 700;
        line-height: 1.35;
      }

      .ds-atendimento-help {
        margin: 0 0 16px;
        color: #5f6b76;
        font-size: 14px;
        line-height: 1.4;
      }

      .ds-atendimento-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        padding: 12px 16px;
        color: #ffffff;
        background: linear-gradient(
          135deg,
          #25d366 0%,
          #128c7e 100%
        );
        border-radius: 8px;
        font-size: 15px;
        font-weight: 700;
        text-decoration: none;
        transition: background 0.2s ease, transform 0.2s ease;
      }

      .ds-atendimento-button:hover {
        color: #ffffff;
        transform: translateY(-1px);
        filter: brightness(1.05);
      }

      .ds-atendimento-whatsapp-icon {
        font-size: 19px;
      }

      .ds-atendimento-reopen {
        display: none;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        color: #ffffff;
        background: linear-gradient(
          135deg,
          #1a3a5c 0%,
          #0d1b2a 100%
        );
        border-radius: 999px;
        box-shadow: 0 6px 22px rgba(0, 0, 0, 0.22);
        font-size: 14px;
        font-weight: 700;
      }

      .ds-atendimento-widget.is-minimized
        .ds-atendimento-reopen {
        display: flex;
      }

      @media (max-width: 480px) {
        .ds-atendimento-widget {
          right: 12px;
          bottom: 12px;
          width: calc(100vw - 24px);
        }

        .ds-atendimento-widget.is-minimized {
          width: auto;
        }
      }
    `;

    document.head.appendChild(widgetStyle);

    const widget = document.createElement('aside');

    widget.className = 'ds-atendimento-widget';
    widget.setAttribute(
      'aria-label',
      'Atendimento pelo WhatsApp'
    );

    const card = document.createElement('div');
    card.className = 'ds-atendimento-card';

    const widgetHeader = document.createElement('div');
    widgetHeader.className = 'ds-atendimento-header';

    const title = document.createElement('div');
    title.className = 'ds-atendimento-title';

    const status = document.createElement('span');
    status.className = 'ds-atendimento-status';

    const titleText = document.createTextNode(
      'Atendimento DS Glass'
    );

    title.append(status, titleText);

    const minimizeButton = document.createElement('button');

    minimizeButton.className =
      'ds-atendimento-minimize';

    minimizeButton.type = 'button';
    minimizeButton.setAttribute(
      'aria-label',
      'Minimizar atendimento'
    );
    minimizeButton.title = 'Minimizar';
    minimizeButton.textContent = '−';

    widgetHeader.append(title, minimizeButton);

    const content = document.createElement('div');
    content.className = 'ds-atendimento-content';

    const questionElement = document.createElement('p');
    questionElement.className =
      'ds-atendimento-question';
    questionElement.textContent = question;

    const helpElement = document.createElement('p');
    helpElement.className = 'ds-atendimento-help';
    helpElement.textContent =
      'Faça sua pergunta ou tire sua dúvida diretamente pelo WhatsApp.';

    const whatsappButton = document.createElement('a');
    whatsappButton.className =
      'ds-atendimento-button';
    whatsappButton.href =
      `https://wa.me/${PHONE}?text=${whatsappMessage}`;
    whatsappButton.target = '_blank';
    whatsappButton.rel = 'noopener noreferrer';

    const whatsappIcon = document.createElement('span');
    whatsappIcon.className =
      'ds-atendimento-whatsapp-icon';
    whatsappIcon.textContent = '💬';

    const whatsappText = document.createTextNode(
      'Falar no WhatsApp'
    );

    whatsappButton.append(
      whatsappIcon,
      whatsappText
    );

    content.append(
      questionElement,
      helpElement,
      whatsappButton
    );

    card.append(widgetHeader, content);

    const reopenButton = document.createElement('button');

    reopenButton.className =
      'ds-atendimento-reopen';

    reopenButton.type = 'button';
    reopenButton.setAttribute(
      'aria-label',
      'Reabrir atendimento'
    );
    reopenButton.textContent =
      '💬 Faça sua pergunta';

    widget.append(card, reopenButton);
    document.body.appendChild(widget);

    minimizeButton.addEventListener('click', () => {
      widget.classList.add('is-minimized');
    });

    reopenButton.addEventListener('click', () => {
      widget.classList.remove('is-minimized');
    });

    widget.style.display = 'none';

    window.setTimeout(() => {
      widget.style.display = 'block';
    }, 7000);
  })();

  // ===== COOKIE BANNER =====
  const cookieBanner =
    document.getElementById('cookie-banner');

  let cookiesDefined = false;

  try {
    cookiesDefined = Boolean(
      localStorage.getItem('ds_cookies')
    );
  } catch (error) {
    cookiesDefined = false;
  }

  if (cookieBanner && !cookiesDefined) {
    window.setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1200);
  }

  const cookieAccept =
    document.getElementById('cookie-accept');

  const cookieReject =
    document.getElementById('cookie-reject');

  const saveCookiePreference = (value) => {
    try {
      localStorage.setItem('ds_cookies', value);
    } catch (error) {
      // O banner ainda será fechado mesmo se o armazenamento estiver bloqueado.
    }

    if (cookieBanner) {
      cookieBanner.classList.remove('show');
    }
  };

  if (cookieAccept && cookieBanner) {
    cookieAccept.addEventListener('click', () => {
      saveCookiePreference('accepted');
    });
  }

  if (cookieReject && cookieBanner) {
    cookieReject.addEventListener('click', () => {
      saveCookiePreference('rejected');
    });
  }
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ===== MENU MOBILE =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', nav.classList.contains('open'));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// ===== WIDGET DE ATENDIMENTO WHATSAPP =====
(() => {
  const PHONE = '5531996428321';
  const existingFloat = document.getElementById('whatsapp-float');

  // Evita que o botão antigo apareça junto com o novo widget.
  if (existingFloat) {
    existingFloat.style.display = 'none';
  }

  const h1Element = document.querySelector('h1');
  const pageTitle = document.title || '';
  const h1Text = h1Element?.textContent.trim() || '';

  let context = h1Text;

  if (!context || context === 'DS Glass Esquadria e Vidraçaria') {
    context = pageTitle
      .split('|')[0]
      .replace(/^DS Glass Esquadria e Vidraçaria\s*[-|]?\s*/i, '')
      .trim();
  }

  if (!context) {
    context = 'seu projeto de vidraçaria ou esquadria';
  }

  const isInstitutional =
    /política|termos|mapa do site|cookies/i.test(context);

  let question;

  if (isInstitutional) {
    question = 'Ficou com alguma dúvida sobre nossos serviços?';
  } else if (/vidraceiro|vidraçaria|esquadria|janela|blindex|veneziana/i.test(context)) {
    question = `Você deseja um orçamento para ${context}?`;
  } else {
    question = 'Você precisa de ajuda com um projeto de vidro ou esquadria?';
  }

  const whatsappMessage = encodeURIComponent(
    `Olá, DS Glass! Estou na página "${context}" e gostaria de tirar uma dúvida e solicitar um orçamento.`
  );

  const style = document.createElement('style');

  style.textContent = `
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
      background: #075e54;
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
      background: #25d366;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
      transition: background 0.2s ease, transform 0.2s ease;
    }

    .ds-atendimento-button:hover {
      color: #ffffff;
      background: #1ebe5d;
      transform: translateY(-1px);
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
      background: #075e54;
      border-radius: 999px;
      box-shadow: 0 6px 22px rgba(0, 0, 0, 0.22);
      font-size: 14px;
      font-weight: 700;
    }

    .ds-atendimento-widget.is-minimized .ds-atendimento-reopen {
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

  document.head.appendChild(style);

  const widget = document.createElement('aside');
  widget.className = 'ds-atendimento-widget';
  widget.setAttribute('aria-label', 'Atendimento pelo WhatsApp');

  widget.innerHTML = `
    <div class="ds-atendimento-card">
      <div class="ds-atendimento-header">
        <div class="ds-atendimento-title">
          <span class="ds-atendimento-status"></span>
          Atendimento DS Glass
        </div>

        <button
          class="ds-atendimento-minimize"
          type="button"
          aria-label="Minimizar atendimento"
          title="Minimizar"
        >−</button>
      </div>

      <div class="ds-atendimento-content">
        <p class="ds-atendimento-question">${question}</p>
        <p class="ds-atendimento-help">Faça sua pergunta ou tire sua dúvida diretamente pelo WhatsApp.</p>

        <a
          class="ds-atendimento-button"
          href="https://wa.me/${PHONE}?text=${whatsappMessage}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="ds-atendimento-whatsapp-icon">💬</span>
          Falar no WhatsApp
        </a>
      </div>
    </div>

    <button
      class="ds-atendimento-reopen"
      type="button"
      aria-label="Reabrir atendimento"
    >
      💬 Faça sua pergunta
    </button>
  `;

  document.body.appendChild(widget);

  const minimizeButton = widget.querySelector('.ds-atendimento-minimize');
  const reopenButton = widget.querySelector('.ds-atendimento-reopen');

  minimizeButton.addEventListener('click', () => {
    widget.classList.add('is-minimized');
  });

  reopenButton.addEventListener('click', () => {
    widget.classList.remove('is-minimized');
  });

  // O widget somente fica visível após 7 segundos.
  widget.style.display = 'none';

  window.setTimeout(() => {
    widget.style.display = 'block';
  }, 7000);
})();

// ===== COOKIE BANNER =====
const cookieBanner = document.getElementById('cookie-banner');

if (cookieBanner && !localStorage.getItem('ds_cookies')) {
  setTimeout(() => cookieBanner.classList.add('show'), 1200);
}

const cookieAccept = document.getElementById('cookie-accept');
const cookieReject = document.getElementById('cookie-reject');

if (cookieAccept && cookieBanner) {
  cookieAccept.addEventListener('click', () => {
    localStorage.setItem('ds_cookies', 'accepted');
    cookieBanner.classList.remove('show');
  });
}

if (cookieReject && cookieBanner) {
  cookieReject.addEventListener('click', () => {
    localStorage.setItem('ds_cookies', 'rejected');
    cookieBanner.classList.remove('show');
  });
}

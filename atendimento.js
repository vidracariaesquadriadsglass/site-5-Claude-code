(() => {
  const PHONE = '5531996428321';
  const DELAY = 7000;

  const pageTitle =
    document.querySelector('h1')?.textContent.trim() ||
    document.title.split('|')[0].trim() ||
    'serviços da DS Glass';

  const pageUrl = window.location.href;

  const widget = document.createElement('section');
  widget.className = 'ester-widget';
  widget.setAttribute('aria-label', 'Atendimento da Ester Dias');

  widget.innerHTML = `
    <button
      class="ester-launcher"
      type="button"
      aria-expanded="false"
      aria-controls="ester-panel"
    >
      <span class="ester-avatar">E</span>
      <span class="ester-launcher-text">Faça sua pergunta</span>
      <span class="ester-status"></span>
    </button>

    <div class="ester-panel" id="ester-panel" hidden>
      <div class="ester-header">
        <div class="ester-profile">
          <span class="ester-avatar">E</span>
          <div>
            <strong>Ester Dias</strong>
            <small>Atendimento DS Glass</small>
          </div>
        </div>

        <button
          class="ester-minimize"
          type="button"
          aria-label="Minimizar atendimento"
        >
          −
        </button>
      </div>

      <div class="ester-messages">
        <div class="ester-message ester-message-bot">
          Olá! Sou a Ester Dias, da DS Glass.
        </div>

        <div class="ester-message ester-message-bot">
          Vi que você está consultando
          <strong>${escapeHtml(pageTitle)}</strong>.
          Como posso ajudar?
        </div>

        <div class="ester-message ester-message-bot">
          Tire sua dúvida sobre modelos, medidas, instalação ou orçamento.
        </div>

        <div class="ester-reply" hidden>
          <div class="ester-message ester-message-user"></div>

          <div class="ester-message ester-message-bot ester-redirect-message">
            Já vou te redirecionar para falar direto com o montador...
          </div>
        </div>
      </div>

      <form class="ester-form">
        <label class="ester-label" for="ester-question">
          Escreva sua dúvida
        </label>

        <div class="ester-input-row">
          <input
            id="ester-question"
            name="question"
            type="text"
            maxlength="500"
            autocomplete="off"
            placeholder="Digite sua pergunta..."
            required
          />

          <button type="submit" aria-label="Enviar pergunta">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(widget);

  const launcher = widget.querySelector('.ester-launcher');
  const panel = widget.querySelector('.ester-panel');
  const minimize = widget.querySelector('.ester-minimize');
  const form = widget.querySelector('.ester-form');
  const input = widget.querySelector('#ester-question');
  const reply = widget.querySelector('.ester-reply');
  const userMessage = widget.querySelector('.ester-message-user');
  const submitButton = form.querySelector('button[type="submit"]');

  let opened = false;

  setTimeout(() => {
    if (!opened) {
      widget.classList.add('ester-visible');
    }
  }, DELAY);

  launcher.addEventListener('click', () => {
    opened = true;
    widget.classList.add('ester-visible');
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    launcher.classList.add('is-open');
    input.focus();
  });

  minimize.addEventListener('click', () => {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
    launcher.classList.remove('is-open');
    widget.classList.add('ester-visible');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const question = input.value.trim();

    if (!question) {
      input.focus();
      return;
    }

    userMessage.textContent = question;
    reply.hidden = false;
    input.disabled = true;
    submitButton.disabled = true;

    const whatsappText = [
      'Olá, montador! Vim pelo atendimento da Ester Dias.',
      '',
      `Minha dúvida: ${question}`,
      '',
      `Página consultada: ${pageTitle}`,
      `Link: ${pageUrl}`
    ].join('\n');

    const whatsappUrl =
      `https://wa.me/${PHONE}?text=${encodeURIComponent(whatsappText)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 1400);
  });

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
})();

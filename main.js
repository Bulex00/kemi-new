/* ============================================
   BULEX DIGITAL - MAIN.JS
   All interactive features + AI Chatbot
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initThemeToggle();
  initBackToTop();
  initPortfolioFilter();
  initPortfolioModal();
  initFaqAccordion();
  initPricingToggle();
  initContactForm();
  initNewsletterForms();
  initStatsCounter();
  initTypingEffect();
  initScrollReveal();
  initChatbot();
});

/* ============================================
   1. NAVBAR SCROLL EFFECT
   ============================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ============================================
   2. MOBILE MENU
   ============================================ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileDrawer');
  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    drawer.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

/* ============================================
   3. THEME TOGGLE (Dark/Light)
   ============================================ */
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light');
  }

  toggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    const isLight = document.documentElement.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

/* ============================================
   4. BACK TO TOP
   ============================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================
   5. PORTFOLIO FILTER
   ============================================ */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      items.forEach(item => {
        const category = item.dataset.category;
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden', 'fade-out');
        } else {
          item.classList.add('fade-out');
          setTimeout(() => item.classList.add('hidden'), 400);
        }
      });
    });
  });
}

/* ============================================
   6. PORTFOLIO MODAL
   ============================================ */
function initPortfolioModal() {
  const cards = document.querySelectorAll('.portfolio-card');
  const modal = document.getElementById('projectModal');
  if (!modal || !cards.length) return;

  const closeBtn = document.getElementById('modalClose');
  const modalImg = document.getElementById('modalImage');
  const modalCat = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDescription');
  const modalTech = document.getElementById('modalTech');

  if (!closeBtn || !modalImg || !modalCat || !modalTitle || !modalDesc || !modalTech) return;

  cards.forEach(card => {
    const openModal = () => {
      modalImg.src = card.dataset.image || '';
      modalImg.alt = card.dataset.title || '';
      modalCat.textContent = card.dataset.category || '';
      modalTitle.textContent = card.dataset.title || '';
      modalDesc.textContent = card.dataset.desc || '';

      const techs = (card.dataset.tech || '').split(',').map(t => t.trim()).filter(Boolean);
      modalTech.innerHTML = techs.map(t => '<span class="tech-tag">' + t + '</span>').join('');

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    card.addEventListener('click', openModal);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openModal();
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/* ============================================
   7. FAQ ACCORDION
   ============================================ */
function initFaqAccordion() {
  const questions = document.querySelectorAll('.faq-question');
  if (!questions.length) return;

  questions.forEach(q => {
    q.addEventListener('click', () => {
      const isExpanded = q.getAttribute('aria-expanded') === 'true';

      questions.forEach(q2 => {
        q2.setAttribute('aria-expanded', 'false');
        const answer = document.getElementById(q2.getAttribute('aria-controls'));
        if (answer) answer.setAttribute('aria-hidden', 'true');
      });

      if (!isExpanded) {
        q.setAttribute('aria-expanded', 'true');
        const answer = document.getElementById(q.getAttribute('aria-controls'));
        if (answer) answer.setAttribute('aria-hidden', 'false');
      }
    });
  });
}

/* ============================================
   8. PRICING TOGGLE (Monthly/Yearly)
   ============================================ */
function initPricingToggle() {
  const toggle = document.getElementById('billingToggle');
  if (!toggle) return;

  const amounts = document.querySelectorAll('.pricing-amount');
  const periods = document.querySelectorAll('.pricing-period');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const yearlyLabel = document.getElementById('yearlyLabel');

  toggle.addEventListener('click', () => {
    const isYearly = toggle.getAttribute('aria-pressed') !== 'true';
    toggle.setAttribute('aria-pressed', isYearly);

    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isYearly);
    if (yearlyLabel) yearlyLabel.classList.toggle('active', isYearly);

    amounts.forEach(amount => {
      const val = isYearly ? amount.dataset.yearly : amount.dataset.monthly;
      if (val) {
        amount.style.opacity = '0';
        setTimeout(() => {
          amount.textContent = parseInt(val).toLocaleString();
          amount.style.opacity = '1';
        }, 200);
      }
    });

    periods.forEach(p => {
      p.textContent = isYearly ? '/yr' : '/mo';
    });
  });

  if (monthlyLabel) monthlyLabel.classList.add('active');
}

/* ============================================
   9. CONTACT FORM VALIDATION
   ============================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'contactName', errorId: 'nameError', min: 2, msg: 'Please enter your full name.' },
      { id: 'contactEmail', errorId: 'emailError', type: 'email', msg: 'Please enter a valid email address.' },
      { id: 'contactSubject', errorId: 'subjectError', msg: 'Please select a subject.' },
      { id: 'contactMessage', errorId: 'messageError', min: 10, msg: 'Message must be at least 10 characters.' }
    ];

    fields.forEach(f => {
      const input = document.getElementById(f.id);
      const error = document.getElementById(f.errorId);
      if (!input || !error) return;

      let fieldValid = true;
      const val = input.value.trim();

      if (!val) fieldValid = false;
      else if (f.min && val.length < f.min) fieldValid = false;
      else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) fieldValid = false;

      if (!fieldValid) {
        error.textContent = f.msg;
        input.style.borderColor = '#ef4444';
        valid = false;
      } else {
        error.textContent = '';
        input.style.borderColor = '';
      }
    });

    if (valid) {
      const success = document.getElementById('formSuccess');
      if (success) success.classList.add('show');
      form.reset();
      showToast("Message sent successfully! We'll reply within 24 hours.");
      setTimeout(() => { if (success) success.classList.remove('show'); }, 5000);
    }
  });
}

/* ============================================
   10. NEWSLETTER FORMS
   ============================================ */
function initNewsletterForms() {
  const forms = [
    { formId: 'newsletterForm', inputId: 'newsletterEmail', errorId: 'newsletterError' },
    { formId: 'newsletterFormLarge', inputId: 'newsletterEmailLarge', errorId: 'newsletterErrorLarge' },
    { formId: 'newsletterFormInline', inputId: 'newsletterEmailInline', errorId: 'newsletterErrorInline' }
  ];

  forms.forEach(({ formId, inputId, errorId }) => {
    const form = document.getElementById(formId);
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (!form || !input || !error) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();

      if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        error.textContent = 'Please enter a valid email address.';
        input.style.borderColor = '#ef4444';
      } else {
        error.textContent = '';
        input.style.borderColor = '';
        showToast('Thanks for subscribing! Check your inbox soon.');
        form.reset();
      }
    });
  });
}

/* ============================================
   11. STATS COUNTER ANIMATION
   ============================================ */
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        if (!target || el.dataset.animated) return;
        el.dataset.animated = 'true';

        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, 30);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

/* ============================================
   12. TYPING EFFECT (Hero)
   ============================================ */
function initTypingEffect() {
  const el = document.querySelector('.typing-text');
  if (!el) return;

  const words = el.dataset.words ? el.dataset.words.split(',') : ['Websites', 'Brands', 'Apps'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = words[wordIndex];
    const display = isDeleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);

    el.textContent = display;

    if (!isDeleting && display === current) {
      isDeleting = true;
      setTimeout(type, 2000);
    } else if (isDeleting && display === '') {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 500);
    } else {
      charIndex += isDeleting ? -1 : 1;
      setTimeout(type, isDeleting ? 50 : 100);
    }
  }

  type();
}

/* ============================================
   13. SCROLL REVEAL ANIMATIONS
   ============================================ */
function initScrollReveal() {
  const reveals = document.querySelectorAll(
    '.service-card, .portfolio-card, .blog-card, .team-card, .pricing-card, .faq-item, .timeline-step'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/* ============================================
   14. TOAST NOTIFICATION
   ============================================ */
function showToast(message) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toastMessage');
  if (!toast || !msg) return;

  msg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ============================================
   15. AI CHATBOT WIDGET
   ============================================ */
function initChatbot() {
  if (document.getElementById('chatbotWidget')) return;

  const chatbotHTML = '<div id="chatbotWidget" class="chatbot-widget">' +
    '<button id="chatbotToggle" class="chatbot-toggle" aria-label="Open chat">' +
      '<span class="chatbot-icon-open">&#128172;</span>' +
      '<span class="chatbot-icon-close">&#10005;</span>' +
      '<span class="chatbot-badge">1</span>' +
    '</button>' +
    '<div id="chatbotWindow" class="chatbot-window" aria-hidden="true">' +
      '<div class="chatbot-header">' +
        '<div class="chatbot-avatar">&#129302;</div>' +
        '<div class="chatbot-info">' +
          '<h4>Bulex Assistant</h4>' +
          '<span class="chatbot-status"><span class="status-dot"></span> Online</span>' +
        '</div>' +
        '<button id="chatbotClose" class="chatbot-close" aria-label="Close chat">&#10005;</button>' +
      '</div>' +
      '<div id="chatbotMessages" class="chatbot-messages">' +
        '<div class="chat-message bot">' +
          '<div class="chat-bubble">Hi there! &#128075; Welcome to <strong>Bulex Digital</strong>. I\'m your virtual assistant. How can I help you today?</div>' +
          '<span class="chat-time">' + getTime() + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="chatbot-quick-replies">' +
        '<button data-reply="services">Our Services</button>' +
        '<button data-reply="pricing">Pricing</button>' +
        '<button data-reply="portfolio">Portfolio</button>' +
        '<button data-reply="contact">Contact Us</button>' +
      '</div>' +
      '<div class="chatbot-input-area">' +
        '<input type="text" id="chatbotInput" placeholder="Type a message..." autocomplete="off">' +
        '<button id="chatbotSend" aria-label="Send message">&#10148;</button>' +
      '</div>' +
    '</div>' +
  '</div>';

  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  const widget = document.getElementById('chatbotWidget');
  const toggle = document.getElementById('chatbotToggle');
  const windowEl = document.getElementById('chatbotWindow');
  const closeBtn = document.getElementById('chatbotClose');
  const input = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSend');
  const messages = document.getElementById('chatbotMessages');

  if (!widget || !toggle || !windowEl || !closeBtn || !input || !sendBtn || !messages) return;

  let isOpen = false;

  const openChat = () => {
    isOpen = true;
    widget.classList.add('open');
    windowEl.setAttribute('aria-hidden', 'false');
    input.focus();
    const badge = toggle.querySelector('.chatbot-badge');
    if (badge) badge.style.display = 'none';
  };

  const closeChat = () => {
    isOpen = false;
    widget.classList.remove('open');
    windowEl.setAttribute('aria-hidden', 'true');
  };

  toggle.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);

  widget.querySelectorAll('.chatbot-quick-replies button').forEach(btn => {
    btn.addEventListener('click', () => {
      handleUserMessage(btn.dataset.reply);
    });
  });

  sendBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) {
      handleUserMessage(text);
      input.value = '';
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const text = input.value.trim();
      if (text) {
        handleUserMessage(text);
        input.value = '';
      }
    }
  });

  function handleUserMessage(text) {
    addMessage(text, 'user');
    showTyping();

    setTimeout(() => {
      hideTyping();
      const response = getBotResponse(text.toLowerCase());
      addMessage(response, 'bot');
    }, 800 + Math.random() * 600);
  }

  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = 'chat-message ' + sender;
    div.innerHTML = '<div class="chat-bubble">' + text + '</div><span class="chat-time">' + getTime() + '</span>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'chat-message bot typing-indicator';
    div.id = 'typingIndicator';
    div.innerHTML = '<div class="chat-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
  }

  function getBotResponse(input) {
    if (input.includes('service') || input === 'services') {
      return 'We offer:<br>&bull; <strong>Web Development</strong> – Custom sites & web apps<br>&bull; <strong>Mobile Apps</strong> – React Native & Flutter<br>&bull; <strong>UI/UX Design</strong> – User-centered interfaces<br>&bull; <strong>Branding</strong> – Logos & identity systems<br>&bull; <strong>SEO & Content</strong> – Rank higher on Google<br>&bull; <strong>Digital Marketing</strong> – Ads that convert<br><br>Want to <a href="services.html">see all services</a>?';
    }
    if (input.includes('price') || input.includes('cost') || input === 'pricing') {
      return 'Our plans start from <strong>&#8358;100,000/mo</strong> (Starter) up to <strong>&#8358;500,000/mo</strong> (Enterprise). Yearly billing saves you 17%.<br><br>Check out our <a href="pricing.html">pricing page</a> for full details, or I can connect you with the team for a custom quote.';
    }
    if (input.includes('portfolio') || input.includes('work') || input === 'portfolio') {
      return 'We\'ve built projects like <strong>PayFlow Dashboard</strong>, <strong>FarmConnect App</strong>, and <strong>MarketHub Store</strong>. Real results, real growth.<br><br><a href="portfolio.html">View our portfolio &rarr;</a>';
    }
    if (input.includes('contact') || input.includes('email') || input.includes('phone') || input.includes('whatsapp') || input === 'contact') {
      return 'You can reach us at:<br>&#128231; <a href="mailto:abstar080193@gmail.com">abstar080193@gmail.com</a><br>&#128222; <a href="tel:+2349168827887">0916 882 7887</a><br>&#128172; <a href="https://wa.me/2349168827887" target="_blank">WhatsApp</a><br><br>Or fill the <a href="contact.html">contact form</a> and we\'ll reply within 24 hours.';
    }
    if (input.includes('team') || input.includes('who')) {
      return 'We\'re a small but mighty team based in <strong>Yaba, Lagos</strong>:<br>&bull; Adegbite Abdullahi – Founder & Lead Dev<br>&bull; Iman Abisola – UI/UX Designer<br>&bull; Ja\'afar Shina – Mobile Developer<br>&bull; Nana Aishat – Brand Strategist<br><br><a href="team.html">Meet the full team &rarr;</a>';
    }
    if (input.includes('location') || input.includes('address') || input.includes('lagos') || input.includes('yaba')) {
      return '&#128205; <strong>12 Tech Hub Avenue, Yaba, Lagos, Nigeria</strong><br>We\'re right in the heart of Lagos\' tech ecosystem. <a href="contact.html">Get directions &rarr;</a>';
    }
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return 'Hello! &#128075; Great to meet you. I\'m here to help with anything about Bulex Digital. What would you like to know?';
    }
    if (input.includes('blog') || input.includes('article')) {
      return 'We publish weekly insights on web design, branding, and digital growth. <a href="blog.html">Read our latest articles &rarr;</a>';
    }
    if (input.includes('time') || input.includes('hour') || input.includes('open')) {
      return 'Our business hours are:<br>Mon – Fri: 9:00 AM – 6:00 PM<br>Sat: 10:00 AM – 2:00 PM<br>Sun: Closed';
    }
    if (input.includes('quote') || input.includes('project') || input.includes('start')) {
      return 'Excited to hear about your project! &#128640;<br><br>The best next step is to <a href="contact.html">fill our contact form</a> or message us on <a href="https://wa.me/2349168827887" target="_blank">WhatsApp</a>. We\'ll get back to you within 24 hours with a tailored proposal.';
    }
    if (input.includes('thank')) {
      return 'You\'re very welcome! &#128522; Feel free to ask if you need anything else. Have a great day!';
    }

    return 'I\'m not sure I understood that perfectly. &#129300;<br><br>Here are some things I can help with:<br>&bull; <a href="services.html">Our Services</a><br>&bull; <a href="pricing.html">Pricing</a><br>&bull; <a href="portfolio.html">Portfolio</a><br>&bull; <a href="contact.html">Contact Info</a><br><br>Or type a specific question and I\'ll do my best!';
  }

  function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

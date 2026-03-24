// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(30, 58, 138, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Animate on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.game-card, .player-card, .stat-item').forEach(el => {
    observer.observe(el);
});

// Botões de Ingresso
document.querySelectorAll('.buy-ticket').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.game-card');
        const date = card.dataset.date;
        const isHome = card.querySelector('.home');
        
        if (isHome) {
            showTicketModal(date, 'Casa');
        } else {
            showStreamModal(date);
        }
    });
});

// Modal de Ingressos
function showTicketModal(date, location) {
    const modal = document.createElement('div');
    modal.className = 'ticket-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>🎟️ Ingressos - ${date}</h3>
            <p><strong>${location === 'Casa' ? 'Ginásio Mineirinho' : 'Arena Minas'}</strong></p>
            <div class="ticket-prices">
                <div class="price-card">
                    <h4>Arquibancada</h4>
                    <div class="price">R$ 60</div>
                    <button class="buy-now">Comprar</button>
                </div>
                <div class="price-card premium">
                    <h4>Cadeira Premium</h4>
                    <div class="price">R$ 120</div>
                    <button class="buy-now">Comprar</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Fechar modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Comprar agora
    modal.querySelectorAll('.buy-now').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('🔥 Ingresso reservado! Redirecionando para pagamento...');
            // Aqui você integraria com Sympla/Eventbrite
        });
    });
}

// Modal de Streaming
function showStreamModal(date) {
    const modal = document.createElement('div');
    modal.className = 'ticket-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>📺 Assistir Online - ${date}</h3>
            <p>Transmissão ao vivo no <strong>YouTube Dragões FC</strong></p>
            <div style="text-align: center; margin: 2rem 0;">
                <a href="#" class="stream-button" target="_blank">
                    <i class="fab fa-youtube"></i> Assistir no YouTube
                </a>
            </div>
            <p style="opacity: 0.8; font-size: 0.9rem;">
                Gratuito para sócios | R$ 29,90 para não-sócios
            </p>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Player Cards Hover Effect
document.querySelectorAll('.player-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const image = this.querySelector('.player-image');
        image.style.transform = 'scale(1.05)';
        image.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        const image = this.querySelector('.player-image');
        image.style.transform = 'scale(1)';
    });
});

// Contador de Estatísticas
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseFloat(stat.textContent.replace('%', ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = stat.dataset.original || target + (stat.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '');
            }
        }, 30);
    });
}

// Salvar valores originais das stats
document.querySelectorAll('.stat-number').forEach(stat => {
    stat.dataset.original = stat.textContent;
});

// Executar animação quando stats aparecerem
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(document.querySelector('.stats'));

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Você pode adicionar uma barra de progresso no header se quiser
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Pequena animação de entrada
    setTimeout(() => {
        document.querySelector('.hero-content h1').style.opacity = '1';
        document.querySelector('.hero-content p').style.opacity = '1';
        document.querySelector('.cta-button').style.opacity = '1';
    }, 500);
});

// Parallax Hero Background (bonus)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    hero.style.transform = `translateY(${speed}px)`;
});

// PWA Ready (bonus para portfolio)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
    });
}
// Tabs de Jogos
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        
        // Ativar tab
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    });
});

// Contador Countdown
function updateCountdown() {
    const futureGames = document.querySelectorAll('.countdown');
    futureGames.forEach(game => {
        // Simula countdown (em produção seria Date real)
        const days = Math.floor(Math.random() * 5) + 1;
        game.querySelector('.countdown-number').textContent = days;
    });
}

setInterval(updateCountdown, 60000); // Atualiza a cada minuto

// Animação placar ao vivo
setInterval(() => {
    const liveScore = document.querySelector('.score-display');
    if (liveScore) {
        const home = liveScore.querySelector('.score-home');
        const away = liveScore.querySelector('.score-away');
        home.style.transform = 'scale(1.1)';
        away.style.transform = 'scale(1.1)';
        setTimeout(() => {
            home.style.transform = 'scale(1)';
            away.style.transform = 'scale(1)';
        }, 200);
    }
}, 5000);
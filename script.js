// Performance-optimized JavaScript with maintained animations
class PerformanceOptimizedLandingPage {
  constructor() {
    this.isLoaded = false;
    this.observers = new Map();
    this.throttledFunctions = new Map();
    this.init();
  }

  init() {
    // Use passive event listeners for better performance
    this.setupPassiveListeners();

    // Initialize components after DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.initializeComponents()
      );
    } else {
      this.initializeComponents();
    }
  }

  setupPassiveListeners() {
    // Throttled scroll handler for better performance
    const throttledScroll = this.throttle(() => {
      this.handleScroll();
    }, 16); // ~60fps

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener(
      "resize",
      this.throttle(() => {
        this.handleResize();
      }, 250),
      { passive: true }
    );
  }

  initializeComponents() {
    // Initialize all components
    this.languageSwitcher = new LanguageSwitcher();
    this.navigationController = new NavigationController();
    this.loadingScreen = new LoadingScreen();
    this.scrollAnimations = new ScrollAnimations();
    this.counterAnimations = new CounterAnimations();
    this.particleSystem = new ParticleSystem();
    this.pricingInteractions = new PricingInteractions();

    // الكلاسات الجديدة
    this.videoModal = new VideoModal();
    this.buttonLinksManager = new ButtonLinksManager();

    // Mark as loaded
    this.isLoaded = true;
    console.log(
      "%c🚀 PikyHost Landing Page Loaded!",
      "color: #009ca8; font-size: 16px; font-weight: bold;"
    );
  }

  handleScroll() {
    if (!this.isLoaded) return;

    const scrollY = window.scrollY;
    const navbar = document.getElementById("mainNavbar");

    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  }

  handleResize() {
    // Handle resize events efficiently
    if (this.particleSystem) {
      this.particleSystem.handleResize();
    }
  }

  // Utility function for throttling
  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;

      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Utility function for debouncing
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Enhanced Language Switcher with better UX
class LanguageSwitcher {
  constructor() {
    this.currentLang = localStorage.getItem("preferred-language") || "ar";
    this.langToggle = document.getElementById("navLangToggle");
    this.langText = document.getElementById("navLangText");
    this.elements = null;
    this.isLoading = false;

    this.init();
  }

  init() {
    if (this.langToggle) {
      this.langToggle.addEventListener("click", () => this.toggleLanguage());
      this.cacheElements();
      this.updateContent();
      this.updateDirection();
    }
  }

  cacheElements() {
    this.elements = document.querySelectorAll("[data-ar][data-en]");
  }

  toggleLanguage() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.langToggle.classList.add("loading");

    // Simulate loading for better UX
    setTimeout(() => {
      this.currentLang = this.currentLang === "ar" ? "en" : "ar";
      localStorage.setItem("preferred-language", this.currentLang);

      requestAnimationFrame(() => {
        this.updateContent();
        this.updateDirection();
        this.animateLanguageChange();

        setTimeout(() => {
          this.isLoading = false;
          this.langToggle.classList.remove("loading");
        }, 300);
      });
    }, 200);
  }

  updateContent() {
    this.elements.forEach((element) => {
      const text = element.getAttribute(`data-${this.currentLang}`);
      if (text && element.textContent !== text) {
        element.textContent = text;
      }
    });

    if (this.langText) {
      this.langText.textContent = this.currentLang === "ar" ? "EN" : "ع";
    }

    document.documentElement.lang = this.currentLang;
    document.title =
      this.currentLang === "ar"
        ? "PikyHost - استضافة مواقع موثوقة وسريعة"
        : "PikyHost - Reliable and Fast Web Hosting";
  }

  updateDirection() {
    const html = document.documentElement;
    const body = document.body;

    if (this.currentLang === "ar") {
      html.dir = "rtl";
      body.dir = "rtl";
    } else {
      html.dir = "ltr";
      body.dir = "ltr";
    }
  }

  animateLanguageChange() {
    document.body.style.opacity = "0.95";
    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 150);
  }
}

// Enhanced Navigation Controller with active link tracking
class NavigationController {
  constructor() {
    this.navbar = document.getElementById("mainNavbar");
    this.navToggler = document.getElementById("navToggler");
    this.navbarNav = document.getElementById("navbarNav");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.lastScrollY = window.scrollY;
    this.sections = [];

    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupMobileNavigation();
    this.setupActiveLinks();
    this.setupScrollSpy();
  }

  setupSmoothScrolling() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });

          // Close mobile menu if open
          this.closeMobileNav();
        }
      }
    });
  }

  setupMobileNavigation() {
    if (this.navToggler && this.navbarNav) {
      this.navToggler.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleMobileNav();
      });

      // Close mobile nav when clicking outside
      document.addEventListener("click", (e) => {
        if (
          !this.navbar.contains(e.target) &&
          this.navbarNav.classList.contains("active")
        ) {
          this.closeMobileNav();
        }
      });

      // Close mobile nav when clicking on links
      this.navbarNav.addEventListener("click", (e) => {
        if (e.target.classList.contains("nav-link")) {
          setTimeout(() => this.closeMobileNav(), 300);
        }
      });

      // Handle escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.navbarNav.classList.contains("active")) {
          this.closeMobileNav();
        }
      });
    }
  }

  setupActiveLinks() {
    // Cache sections for scroll spy
    this.sections = Array.from(this.navLinks)
      .map((link) => {
        const href = link.getAttribute("href");
        const section = document.querySelector(href);
        return {
          link,
          section,
          id: href,
        };
      })
      .filter((item) => item.section);
  }

  setupScrollSpy() {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-100px 0px -50% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionData = this.sections.find(
          (s) => s.section === entry.target
        );
        if (sectionData) {
          if (entry.isIntersecting) {
            this.setActiveLink(sectionData.link);
          }
        }
      });
    }, observerOptions);

    this.sections.forEach(({ section }) => {
      observer.observe(section);
    });
  }

  setActiveLink(activeLink) {
    this.navLinks.forEach((link) => link.classList.remove("active"));
    activeLink.classList.add("active");
  }

  toggleMobileNav() {
    this.navbarNav.classList.toggle("active");
    this.navToggler.classList.toggle("active");

    // Prevent body scroll when menu is open
    if (this.navbarNav.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  closeMobileNav() {
    this.navbarNav.classList.remove("active");
    this.navToggler.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Loading Screen with optimized animations
class LoadingScreen {
  constructor() {
    this.loadingScreen = document.getElementById("loadingScreen");
    this.init();
  }

  init() {
    if (document.readyState === "complete") {
      this.hideLoading();
    } else {
      window.addEventListener("load", () => {
        setTimeout(() => this.hideLoading(), 1000);
      });
    }
  }

  hideLoading() {
    if (this.loadingScreen) {
      this.loadingScreen.style.opacity = "0";
      setTimeout(() => {
        this.loadingScreen.style.display = "none";
        document.body.classList.add("loaded");
      }, 500);
    }
  }
}

// Scroll Animations with Intersection Observer for better performance
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Use Intersection Observer for better performance
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animationType = element.getAttribute("data-aos");
          const delay =
            Number.parseInt(element.getAttribute("data-aos-delay")) || 0;

          setTimeout(() => {
            element.classList.add("aos-animate");
          }, delay);

          this.observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with data-aos attributes
    document.querySelectorAll("[data-aos]").forEach((el) => {
      this.observer.observe(el);
    });

    this.addAnimationStyles();
  }

  addAnimationStyles() {
    if (document.getElementById("aos-styles")) return;

    const style = document.createElement("style");
    style.id = "aos-styles";
    style.textContent = `
      [data-aos] {
        opacity: 0;
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      [data-aos="fade-up"] {
        transform: translateY(30px);
      }
      
      [data-aos="fade-left"] {
        transform: translateX(30px);
      }
      
      [data-aos="fade-right"] {
        transform: translateX(-30px);
      }
      
      [data-aos].aos-animate {
        opacity: 1;
        transform: translate(0);
      }
    `;
    document.head.appendChild(style);
  }
}

// Counter Animations with optimized performance
class CounterAnimations {
  constructor() {
    this.counters = document.querySelectorAll(".stat-number[data-count]");
    this.init();
  }

  init() {
    if (this.counters.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.counters.forEach((counter) => observer.observe(counter));
  }

  animateCounter(element) {
    const target = Number.parseFloat(element.getAttribute("data-count"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const animate = () => {
      current += step;
      if (current >= target) {
        current = target;
        element.textContent =
          target % 1 === 0 ? Math.floor(target) : target.toFixed(1);
        return;
      }

      element.textContent =
        target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
}

// Optimized Particle System
class ParticleSystem {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
    this.isVisible = true;

    this.init();
  }

  init() {
    this.createCanvas();
    if (this.canvas) {
      this.resize();
      this.createParticles();
      this.startAnimation();

      // Handle visibility change for performance
      document.addEventListener("visibilitychange", () => {
        this.isVisible = !document.hidden;
        if (this.isVisible) {
          this.startAnimation();
        } else {
          this.stopAnimation();
        }
      });
    }
  }

  createCanvas() {
    const heroSection = document.querySelector(".hero-section");
    if (!heroSection) return;

    this.canvas = document.createElement("canvas");
    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
      opacity: 0.6;
    `;

    heroSection.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
  }

  resize() {
    if (!this.canvas) return;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  handleResize() {
    this.resize();
    this.createParticles();
  }

  createParticles() {
    if (!this.canvas) return;

    const particleCount = Math.min(
      Math.floor((this.canvas.width * this.canvas.height) / 20000),
      50 // Limit particles for performance
    );

    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? "#009ca8" : "#00d5e6",
      });
    }
  }

  animate() {
    if (!this.ctx || !this.isVisible) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fill();
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  startAnimation() {
    if (!this.animationId) {
      this.animate();
    }
  }

  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}

// Pricing Interactions with optimized event handling
class PricingInteractions {
  constructor() {
    this.init();
  }

  init() {
    // Use event delegation for better performance
    document.addEventListener(
      "mouseenter",
      (e) => {
        const card = e.target.closest(".pricing-card.modern");
        if (card && !card.classList.contains("featured")) {
          card.style.transform = "translateY(-10px) scale(1.02)";
        }
      },
      true
    );

    document.addEventListener(
      "mouseleave",
      (e) => {
        const card = e.target.closest(".pricing-card.modern");
        if (card && !card.classList.contains("featured")) {
          card.style.transform = "translateY(0) scale(1)";
        }
      },
      true
    );

    // Handle plan selection
    document.addEventListener("click", (e) => {
      const button = e.target.closest(".btn-plan-select");
      if (button) {
        this.handlePlanSelection(button);
      }
    });
  }

  handlePlanSelection(button) {
    const originalText = button.textContent;
    button.textContent = "جاري التحديد...";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      console.log(
        "Plan selected:",
        button.closest(".pricing-card").querySelector("h3").textContent
      );
    }, 1500);
  }
}

// Video Modal Handler
class VideoModal {
  constructor() {
    this.modal = null;
    this.videoUrl = ""; // سيتم تحديثه من الداشبورد
    this.init();
  }

  init() {
    this.createModal();
    this.setupEventListeners();
  }

  createModal() {
    this.modal = document.createElement("div");
    this.modal.className = "video-modal";
    this.modal.innerHTML = `
      <div class="video-modal-overlay">
        <div class="video-modal-content">
          <button class="video-modal-close">&times;</button>
          <div class="video-container">
            <iframe id="videoFrame" src="" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(this.modal);
  }

  setupEventListeners() {
    // زر شاهد العرض
    const videoBtn = document.getElementById("heroVideoBtn");
    if (videoBtn) {
      videoBtn.addEventListener("click", () => this.openModal());
    }

    // إغلاق المودال
    const closeBtn = this.modal.querySelector(".video-modal-close");
    const overlay = this.modal.querySelector(".video-modal-overlay");

    closeBtn.addEventListener("click", () => this.closeModal());
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) this.closeModal();
    });

    // إغلاق بالـ Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.closeModal();
      }
    });
  }

  openModal() {
    // سيتم تحديث الرابط من الداشبورد
    const videoFrame = this.modal.querySelector("#videoFrame");
    videoFrame.src =
      this.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ";

    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    this.modal.classList.remove("active");
    document.body.style.overflow = "";

    // إيقاف الفيديو
    const videoFrame = this.modal.querySelector("#videoFrame");
    videoFrame.src = "";
  }

  // دالة لتحديث رابط الفيديو من الداشبورد
  updateVideoUrl(url) {
    this.videoUrl = url;
  }
}

// Button Links Manager - للتحكم في روابط الأزرار من الداشبورد
class ButtonLinksManager {
  constructor() {
    this.buttonLinks = {
      heroSubscribeBtn: "#pricing",
      performanceSubscribeBtn: "#pricing",
      securitySubscribeBtn: "#pricing",
      controlSubscribeBtn: "#pricing",
      supportSubscribeBtn: "#pricing",
    };
    this.init();
  }

  init() {
    this.setupButtonListeners();
  }

  setupButtonListeners() {
    Object.keys(this.buttonLinks).forEach((buttonId) => {
      const button = document.getElementById(buttonId);
      if (button) {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const link = this.buttonLinks[buttonId];

          if (link.startsWith("#")) {
            // رابط داخلي
            const target = document.querySelector(link);
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          } else {
            // رابط خارجي
            window.open(link, "_blank");
          }
        });
      }
    });
  }

  // دالة لتحديث روابط الأزرار من الداشبورد
  updateButtonLink(buttonId, link) {
    this.buttonLinks[buttonId] = link;
  }

  // دالة لتحديث جميع الروابط من الداشبورد
  updateAllLinks(links) {
    this.buttonLinks = { ...this.buttonLinks, ...links };
  }
}

// إضافة أنماط CSS للمودال
const videoModalStyles = `
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.video-modal.active {
  opacity: 1;
  visibility: visible;
}

.video-modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.video-modal-content {
  position: relative;
  width: 100%;
  max-width: 900px;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.video-modal.active .video-modal-content {
  transform: scale(1);
}

.video-modal-close {
  position: absolute;
  top: -50px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10001;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: background 0.3s ease;
}

.video-modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .video-modal-overlay {
    padding: 1rem;
  }
  
  .video-modal-close {
    top: -40px;
    right: 10px;
  }
}
`;

// إضافة الأنماط للصفحة
const styleSheet = document.createElement("style");
styleSheet.textContent = videoModalStyles;
document.head.appendChild(styleSheet);

// Initialize the application
const app = new PerformanceOptimizedLandingPage();

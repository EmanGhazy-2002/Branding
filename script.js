// Language switching functionality
class LanguageSwitcher {
  constructor() {
    this.currentLang = localStorage.getItem("preferred-language") || "ar";
    this.langToggle = document.getElementById("langToggle");
    this.langText = document.getElementById("langText");
    this.body = document.body;
    this.html = document.documentElement;

    this.init();
  }

  init() {
    this.langToggle.addEventListener("click", () => this.toggleLanguage());
    this.updateContent();
    this.updateDirection();
    this.updateFonts();
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("preferred-language", this.currentLang);
    this.updateContent();
    this.updateDirection();
    this.updateFonts();
    this.animateLanguageChange();
  }

  updateContent() {
    const elements = document.querySelectorAll("[data-ar][data-en]");
    elements.forEach((element) => {
      const text = element.getAttribute(`data-${this.currentLang}`);
      if (text) {
        element.textContent = text;
      }
    });

    this.langText.textContent =
      this.currentLang === "ar" ? "English" : "العربية";
    this.html.lang = this.currentLang;

    document.title =
      this.currentLang === "ar"
        ? "PikyHost - استضافة مواقع موثوقة وسريعة"
        : "PikyHost - Reliable and Fast Web Hosting";
  }

  updateDirection() {
    if (this.currentLang === "ar") {
      this.html.dir = "rtl";
      this.body.dir = "rtl";
    } else {
      this.html.dir = "ltr";
      this.body.dir = "ltr";
    }
  }

  updateFonts() {
    if (this.currentLang === "ar") {
      this.body.style.fontFamily = "'Cairo', 'Poppins', sans-serif";
    } else {
      this.body.style.fontFamily = "'Inter', 'Poppins', sans-serif";
    }
  }

  animateLanguageChange() {
    this.body.style.opacity = "0.8";
    setTimeout(() => {
      this.body.style.opacity = "1";
    }, 200);
  }
}

// Smooth scrolling for navigation links
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }
}

// Fade in animation on scroll
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll(
      ".feature-card, .pricing-card, .target-card, .service-item"
    );
    this.init();
  }

  init() {
    this.elements.forEach((element) => {
      element.classList.add("fade-in");
    });

    window.addEventListener("scroll", () => this.checkVisibility());
    this.checkVisibility(); // Check on load
  }

  checkVisibility() {
    this.elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("visible");
      }
    });
  }
}

// Navbar background change on scroll
class NavbarScroll {
  constructor() {
    this.navbar = document.querySelector(".navbar");
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        this.navbar.style.background = "rgba(0, 156, 168, 0.95)";
        this.navbar.style.backdropFilter = "blur(10px)";
      } else {
        this.navbar.style.background = "#009ca8";
        this.navbar.style.backdropFilter = "none";
      }
    });
  }
}

// Pricing card interactions
class PricingInteractions {
  constructor() {
    this.init();
  }

  init() {
    const pricingCards = document.querySelectorAll(".pricing-card");

    pricingCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = card.classList.contains("featured")
          ? "scale(1.05) translateY(-15px)"
          : "translateY(-15px)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = card.classList.contains("featured")
          ? "scale(1.05)"
          : "translateY(0)";
      });
    });
  }
}

// Contact form handling (if needed)
class ContactForm {
  constructor() {
    this.init();
  }

  init() {
    // Add contact form functionality here if needed
    console.log("Contact form initialized");
  }
}

// Particle background effect for hero section
class ParticleBackground {
  constructor() {
    this.canvas = this.createCanvas();
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.init();
  }

  createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "1";
    canvas.style.pointerEvents = "none";

    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      heroSection.appendChild(canvas);
    }

    return canvas;
  }

  init() {
    this.resize();
    this.createParticles();
    this.animate();

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const particleCount = Math.floor(
      (this.canvas.width * this.canvas.height) / 15000
    );

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 107, 53, ${particle.opacity})`;
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Enhanced Loading Screen
class LoadingScreen {
  constructor() {
    this.loadingScreen = document.getElementById("loadingScreen");
    this.init();
  }

  init() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.hideLoading();
      }, 1500);
    });
  }

  hideLoading() {
    this.loadingScreen.style.opacity = "0";
    setTimeout(() => {
      this.loadingScreen.style.display = "none";
      document.body.classList.add("loaded");
    }, 500);
  }
}

// Advanced Navbar Controller
class NavbarController {
  constructor() {
    this.navbar = document.getElementById("mainNavbar");
    this.lastScrollY = window.scrollY;
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll());
    this.handleScroll();
  }

  handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      this.navbar.classList.add("scrolled");
    } else {
      this.navbar.classList.remove("scrolled");
    }

    // Hide/show navbar on scroll
    if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
      this.navbar.style.transform = "translateY(-100%)";
    } else {
      this.navbar.style.transform = "translateY(0)";
    }

    this.lastScrollY = currentScrollY;
  }
}

// Smooth Scrolling with Offset
class SmoothScroller {
  constructor() {
    this.init();
  }

  init() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }
}

// Counter Animation
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll(".stat-number[data-count]");
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    this.counters.forEach((counter) => observer.observe(counter));
  }

  animateCounter(element) {
    const target = Number.parseFloat(element.getAttribute("data-count"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = current.toFixed(1);
    }, 16);
  }
}

// Pricing Toggle
class PricingToggle {
  constructor() {
    this.toggle = document.getElementById("pricingToggle");
    this.amounts = document.querySelectorAll(".amount");
    this.originalPrices = document.querySelectorAll(".original-price");
    this.periods = document.querySelectorAll(".period");

    this.init();
  }

  init() {
    if (this.toggle) {
      this.toggle.addEventListener("change", () => this.updatePricing());
      this.updatePricing(); // Set initial state
    }
  }

  updatePricing() {
    const isYearly = this.toggle.checked;

    this.amounts.forEach((amount) => {
      const monthlyPrice = amount.getAttribute("data-monthly");
      const yearlyPrice = amount.getAttribute("data-yearly");
      amount.textContent = isYearly ? yearlyPrice : monthlyPrice;
    });

    this.originalPrices.forEach((price) => {
      const monthlyPrice = price.getAttribute("data-monthly");
      const yearlyPrice = price.getAttribute("data-yearly");
      price.textContent = isYearly ? yearlyPrice : monthlyPrice;
    });

    this.periods.forEach((period) => {
      const currentLang = document.documentElement.lang;
      if (isYearly) {
        period.textContent = currentLang === "ar" ? "/سنة" : "/year";
      } else {
        period.textContent = currentLang === "ar" ? "/شهر" : "/month";
      }
    });
  }
}

// Contact Form Handler
class ContactFormHandler {
  constructor() {
    this.form = document.getElementById("contactForm");
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    // Show loading state
    const submitBtn = this.form.querySelector(".btn-submit-modern");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    submitBtn.disabled = true;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message
      this.showMessage("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.", "success");
      this.form.reset();
    } catch (error) {
      this.showMessage(
        "حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.",
        "error"
      );
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  showMessage(message, type) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `alert alert-${
      type === "success" ? "success" : "danger"
    } mt-3`;
    messageDiv.textContent = message;

    this.form.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }
}

// Particle System for Hero
class ParticleSystem {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.init();
  }

  init() {
    const heroParticles = document.getElementById("heroParticles");
    if (heroParticles) {
      heroParticles.appendChild(this.canvas);
      this.canvas.style.position = "absolute";
      this.canvas.style.top = "0";
      this.canvas.style.left = "0";
      this.canvas.style.width = "100%";
      this.canvas.style.height = "100%";
      this.canvas.style.pointerEvents = "none";
      this.canvas.style.opacity = "0.6";

      this.resize();
      this.createParticles();
      this.animate();

      window.addEventListener("resize", () => this.resize());
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const particleCount = Math.floor(
      (this.canvas.width * this.canvas.height) / 20000
    );

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

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize all components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  window.AOS = window.AOS || {};
  window.AOS.init = window.AOS.init || (() => {});
  window.AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 100,
  });

  // Initialize all components
  new LanguageSwitcher();
  new SmoothScroll();
  new ScrollAnimations();
  new NavbarScroll();
  new PricingInteractions();
  new ContactForm();
  new ParticleBackground();
  new LoadingScreen();
  new NavbarController();
  new SmoothScroller();
  new CounterAnimation();
  new PricingToggle();
  new ContactFormHandler();
  new ParticleSystem();

  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in-up, .scale-in").forEach((el) => {
    observer.observe(el);
  });

  console.log(
    "%c🚀 PikyHost Modern Landing Page Loaded!",
    "color: #009ca8; font-size: 16px; font-weight: bold;"
  );
});

// Utility functions
const utils = {
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  throttle: (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;

      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
};

// Export for potential module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    LanguageSwitcher,
    SmoothScroll,
    ScrollAnimations,
    NavbarScroll,
    PricingInteractions,
    ContactForm,
    ParticleBackground,
    LoadingScreen,
    NavbarController,
    SmoothScroller,
    CounterAnimation,
    PricingToggle,
    ContactFormHandler,
    ParticleSystem,
    utils,
  };
}

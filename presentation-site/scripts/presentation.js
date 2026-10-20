/**
 * presentation.js — Dedicated Seminar Presentation Mode
 * Transforms the long research page into a focused slide-by-slide presentation deck.
 */

class PresentationController {
  constructor() {
    this.isActive = false;
    this.currentSlideIndex = 0;
    this.sections = [];
    this.totalSlides = 0;

    this.init();
  }

  init() {
    // Collect all primary presentation sections
    this.sections = Array.from(document.querySelectorAll("main > section"));
    this.totalSlides = this.sections.length;

    // Create presentation controller bar
    this.createPresentationBar();

    // Bind trigger buttons
    const triggerBtns = document.querySelectorAll(".btn-trigger-presentation");
    triggerBtns.forEach(btn => {
      btn.addEventListener("click", () => this.togglePresentationMode());
    });

    // Keyboard navigation
    window.addEventListener("keydown", (e) => this.handleKeyDown(e));
  }

  createPresentationBar() {
    const bar = document.createElement("div");
    bar.className = "presentation-bar";
    bar.id = "presentation-bar";
    bar.innerHTML = `
      <button class="pres-btn" id="pres-prev" title="Slide Sebelumnya (Arrow Left)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <div class="pres-counter" id="pres-counter">Slide 01 / ${String(this.totalSlides).padStart(2, '0')}</div>
      <button class="pres-btn" id="pres-next" title="Slide Selanjutnya (Arrow Right)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <button class="pres-exit-btn" id="pres-exit" title="Keluar Mode Presentasi (Esc)">
        ✕ Keluar Mode (Esc)
      </button>
    `;

    document.body.appendChild(bar);

    document.getElementById("pres-prev").addEventListener("click", () => this.prevSlide());
    document.getElementById("pres-next").addEventListener("click", () => this.nextSlide());
    document.getElementById("pres-exit").addEventListener("click", () => this.exitPresentationMode());
  }

  togglePresentationMode() {
    if (this.isActive) {
      this.exitPresentationMode();
    } else {
      this.enterPresentationMode();
    }
  }

  enterPresentationMode() {
    this.isActive = true;
    document.body.classList.add("presentation-mode");

    // Detect closest visible section to current scroll position as starting slide
    let closestIndex = 0;
    const scrollPos = window.scrollY + 200;
    for (let i = 0; i < this.sections.length; i++) {
      if (this.sections[i].offsetTop <= scrollPos) {
        closestIndex = i;
      }
    }

    this.currentSlideIndex = closestIndex;
    this.showSlide(this.currentSlideIndex);
  }

  exitPresentationMode() {
    this.isActive = false;
    document.body.classList.remove("presentation-mode");

    // Reset all sections visibility
    this.sections.forEach(sec => {
      sec.classList.remove("pres-active");
    });

    // Scroll to the active slide smoothly
    if (this.sections[this.currentSlideIndex]) {
      this.sections[this.currentSlideIndex].scrollIntoView({ behavior: "smooth" });
    }
  }

  showSlide(index) {
    if (index < 0) index = 0;
    if (index >= this.totalSlides) index = this.totalSlides - 1;
    this.currentSlideIndex = index;

    this.sections.forEach((sec, idx) => {
      if (idx === index) {
        sec.classList.add("pres-active");
        sec.scrollTop = 0;
      } else {
        sec.classList.remove("pres-active");
      }
    });

    // Update Counter
    const counter = document.getElementById("pres-counter");
    if (counter) {
      counter.textContent = `Slide ${String(index + 1).padStart(2, '0')} / ${String(this.totalSlides).padStart(2, '0')}`;
    }
  }

  nextSlide() {
    if (!this.isActive) return;
    if (this.currentSlideIndex < this.totalSlides - 1) {
      this.showSlide(this.currentSlideIndex + 1);
    }
  }

  prevSlide() {
    if (!this.isActive) return;
    if (this.currentSlideIndex > 0) {
      this.showSlide(this.currentSlideIndex - 1);
    }
  }

  handleKeyDown(e) {
    // Avoid triggering shortcuts if typing in input or textarea
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      return;
    }

    // Toggle with 'p' or 'P' key
    if ((e.key === 'p' || e.key === 'P') && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      this.togglePresentationMode();
      return;
    }

    if (!this.isActive) return;

    if (e.key === "Escape") {
      e.preventDefault();
      this.exitPresentationMode();
    } else if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
      e.preventDefault();
      this.nextSlide();
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      this.prevSlide();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.presentationController = new PresentationController();
});

/**
 * main.js — Core Interactive Functionality & Navigation Engine
 * Handles navbar, scroll tracking, screen switchers, and architecture inspectors.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Scroll Progress Bar
  const progressBar = document.getElementById("scroll-progress-bar");
  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) {
      progressBar.style.width = scrolled + "%";
    }

    // Navbar background change on scroll
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      if (winScroll > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Back to Top button toggle
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
      if (winScroll > 400) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }
  });

  // Back to Top action
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navMenu.style.display === "flex";
      if (isOpen) {
        navMenu.style.display = "";
        navMenu.classList.remove("mobile-open");
      } else {
        navMenu.style.display = "flex";
        navMenu.classList.add("mobile-open");
      }
    });

    // Close mobile menu when clicking any nav link
    const navLinks = navMenu.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          navMenu.style.display = "";
          navMenu.classList.remove("mobile-open");
        }
      });
    });
  }

  // 3. Active Nav Links Tracking on Scroll
  const sections = document.querySelectorAll("main > section");
  const navLinks = document.querySelectorAll(".nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => navObserver.observe(sec));

  // 4. Mobile Showcase Screen Tabs Switcher
  const showcaseData = {
    market: {
      title: "Pasar & Katalog Sapi Terverifikasi",
      desc: "Menampilkan daftar proyek sapi aktif (seperti Sapi Bali) dengan spesifikasi bobot awal, estimasi harga unit, dan lokasi kandang mitra.",
      screenContent: `
        <div style="background: rgba(16,185,129,0.1); border: 1px solid rgba(52,211,153,0.3); border-radius: 12px; padding: 12px; margin-bottom: 12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-weight:800; color:#34d399; font-size:0.85rem;">Sapi Bali #B04</span>
            <span class="badge badge-verified" style="font-size:0.65rem;">Tersedia</span>
          </div>
          <div style="font-size:0.75rem; color:#cbd5e1; margin-bottom:4px;">Bobot Saat Ini: <strong>340 kg</strong></div>
          <div style="font-size:0.75rem; color:#cbd5e1; margin-bottom:4px;">Harga Investasi: <strong>Rp 15.650.000</strong></div>
          <div style="font-size:0.7rem; color:#94a3b8;">Kandang Mitra: Pamekasan, Madura</div>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-weight:800; color:#f8faf9; font-size:0.85rem;">Sapi Limosin #L02</span>
            <span class="badge badge-proto" style="font-size:0.65rem;">Dalam Proses</span>
          </div>
          <div style="font-size:0.75rem; color:#cbd5e1; margin-bottom:4px;">Bobot: <strong>410 kg</strong></div>
          <div style="font-size:0.75rem; color:#cbd5e1;">Target Panen: <strong>4 Bulan</strong></div>
        </div>
      `
    },
    price: {
      title: "Monitor Nilai & Candlestick Real-Time",
      desc: "Fitur Price Engine menampilkan fluktuasi harga acuan investasi secara real-time dan transparan berbasis data WebSocket.",
      screenContent: `
        <div style="text-align:center; padding:10px 0;">
          <div style="font-size:0.75rem; color:#94a3b8;">Harga Acuan Investasi</div>
          <div style="font-size:1.6rem; font-weight:900; color:#34d399; margin:4px 0;">Rp 155.000</div>
          <div style="font-size:0.75rem; color:#34d399; font-weight:700;">▲ +2,65% Hari Ini</div>
        </div>
        <div style="background:#07120d; border:1px solid rgba(52,211,153,0.2); border-radius:8px; padding:8px; margin-top:10px;">
          <div style="font-size:0.65rem; color:#94a3b8; margin-bottom:4px;">Grafik Tren Nilai (Simulasi)</div>
          <div style="height:60px; display:flex; align-items:flex-end; gap:6px; padding:4px 0;">
            <div style="flex:1; height:45%; background:rgba(16,185,129,0.3); border-radius:2px;"></div>
            <div style="flex:1; height:60%; background:rgba(16,185,129,0.5); border-radius:2px;"></div>
            <div style="flex:1; height:50%; background:rgba(16,185,129,0.4); border-radius:2px;"></div>
            <div style="flex:1; height:75%; background:rgba(16,185,129,0.7); border-radius:2px;"></div>
            <div style="flex:1; height:90%; background:#10b981; border-radius:2px;"></div>
          </div>
        </div>
      `
    },
    cctv: {
      title: "Monitoring Visual CCTV Kandang",
      desc: "Menyajikan akses stream langsung atau visual snapshots dari kamera kandang untuk memeriksa kondisi fisik ternak secara objektif.",
      screenContent: `
        <div style="position:relative; background:#000; border-radius:8px; overflow:hidden; border:1px solid rgba(52,211,153,0.3); height:160px; display:flex; align-items:center; justify-content:center;">
          <div style="position:absolute; top:6px; left:8px; font-size:0.65rem; color:#ef4444; font-weight:bold; font-family:monospace; display:flex; align-items:center; gap:4px;">
            <span style="width:6px; height:6px; background:#ef4444; border-radius:50%;"></span> REC LIVE
          </div>
          <div style="position:absolute; bottom:6px; left:8px; font-size:0.6rem; color:#34d399; font-family:monospace;">
            KANDANG A3 · SAPI BALI #B04
          </div>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="1.5"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
        </div>
        <div style="margin-top:10px; font-size:0.7rem; color:#cbd5e1; line-height:1.4;">
          Suhu Kandang: <strong>27.4°C</strong> · Kelembaban: <strong>68%</strong><br>
          Status Visual: <em>Kondisi Aktif & Terpantau</em>
        </div>
      `
    },
    portfolio: {
      title: "Ringkasan Portofolio & Aset Aktif",
      desc: "Investor dapat meninjau total nilai investasi terhimpun, pembagian porsi ternak yang didanai, dan riwayat transaksi.",
      screenContent: `
        <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(52,211,153,0.2); border-radius:12px; padding:12px; text-align:center; margin-bottom:12px;">
          <div style="font-size:0.7rem; color:#94a3b8;">Total Portofolio Aktif</div>
          <div style="font-size:1.4rem; font-weight:800; color:#f8faf9; margin:2px 0;">Rp 1.200.000</div>
          <div style="font-size:0.7rem; color:#34d399; font-weight:700;">+8.45% Return Estimasi</div>
        </div>
        <div style="font-size:0.75rem; font-weight:700; color:#f8faf9; margin-bottom:6px;">Alokasi Ternak:</div>
        <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:#cbd5e1; padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
          <span>1 Unit Sapi Bali</span>
          <span style="color:#34d399; font-weight:700;">Aktif</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:#cbd5e1; padding:4px 0;">
          <span>Pencairan Dividen</span>
          <span style="color:#94a3b8;">Riwayat #102</span>
        </div>
      `
    }
  };

  const showcaseTabs = document.querySelectorAll(".showcase-tab-card");
  const phoneDynamicScreen = document.getElementById("phone-dynamic-screen");
  const showcaseHeading = document.getElementById("showcase-screen-heading");
  const showcaseSub = document.getElementById("showcase-screen-sub");

  showcaseTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      showcaseTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const key = tab.getAttribute("data-tab");
      const d = showcaseData[key];
      if (d) {
        if (showcaseHeading) showcaseHeading.textContent = d.title;
        if (showcaseSub) showcaseSub.textContent = d.desc;
        if (phoneDynamicScreen) phoneDynamicScreen.innerHTML = d.screenContent;
      }
    });
  });

  // 5. Architecture Nodes Inspector
  const archNodes = document.querySelectorAll(".arch-node-item");
  const archDetailTitle = document.getElementById("arch-detail-title");
  const archDetailDesc = document.getElementById("arch-detail-desc");
  const archDetailRole = document.getElementById("arch-detail-role");

  archNodes.forEach(node => {
    node.addEventListener("click", () => {
      archNodes.forEach(n => n.classList.remove("active"));
      node.classList.add("active");

      const title = node.getAttribute("data-tech");
      const role = node.getAttribute("data-role");
      const desc = node.getAttribute("data-desc");

      if (archDetailTitle) archDetailTitle.textContent = title;
      if (archDetailRole) archDetailRole.textContent = role;
      if (archDetailDesc) archDetailDesc.textContent = desc;
    });
  });

  // 6. DevOps Stage Cards Inspector
  const devopsCards = document.querySelectorAll(".devops-stage-card");
  const devopsDetailTitle = document.getElementById("devops-detail-title");
  const devopsDetailDesc = document.getElementById("devops-detail-desc");

  devopsCards.forEach(card => {
    card.addEventListener("click", () => {
      devopsCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      const stage = card.getAttribute("data-stage");
      const desc = card.getAttribute("data-desc");

      if (devopsDetailTitle) devopsDetailTitle.textContent = "Tahap: " + stage;
      if (devopsDetailDesc) devopsDetailDesc.textContent = desc;
    });
  });
});

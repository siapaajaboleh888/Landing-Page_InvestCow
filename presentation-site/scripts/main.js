/**
 * main.js — Core Interactive Functionality & Navigation Engine
 * Handles refined navbar, dropdown 'Lainnya', mobile drawer, scroll tracking, scrollytelling, screen switchers, and architecture inspectors.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Scroll Progress Bar & Navbar Scrolled State
  const progressBar = document.getElementById("scroll-progress-bar");
  const navbar = document.querySelector(".navbar");
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (progressBar) {
      progressBar.style.width = scrolled + "%";
    }

    if (navbar) {
      if (winScroll > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    if (backToTopBtn) {
      if (winScroll > 400) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 2. Dropdown 'Lainnya ▾' in Action Area
  const navDropdown = document.getElementById("nav-dropdown");
  const dropdownBtn = document.getElementById("nav-dropdown-btn");

  if (navDropdown && dropdownBtn) {
    dropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navDropdown.classList.toggle("open");
    });

    // Close dropdown on click outside
    document.addEventListener("click", (e) => {
      if (!navDropdown.contains(e.target)) {
        navDropdown.classList.remove("open");
      }
    });

    // Close dropdown when clicking any dropdown link
    const dropdownLinks = navDropdown.querySelectorAll(".nav-dropdown-link");
    dropdownLinks.forEach(link => {
      link.addEventListener("click", () => {
        navDropdown.classList.remove("open");
      });
    });

    // Close on Escape key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navDropdown.classList.contains("open")) {
        navDropdown.classList.remove("open");
      }
    });
  }

  // 3. Mobile Navigation Drawer & Backdrop
  const mobileToggle = document.getElementById("mobile-toggle");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");
  const mobileDrawer = document.getElementById("mobile-nav-drawer");
  const mobileBackdrop = document.getElementById("mobile-nav-backdrop");

  function openMobileDrawer() {
    if (mobileDrawer && mobileBackdrop) {
      mobileDrawer.classList.add("open");
      mobileBackdrop.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeMobileDrawer() {
    if (mobileDrawer && mobileBackdrop) {
      mobileDrawer.classList.remove("open");
      mobileBackdrop.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener("click", openMobileDrawer);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener("click", closeMobileDrawer);
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener("click", closeMobileDrawer);
  }

  // Close drawer when clicking any link inside drawer
  const drawerLinks = document.querySelectorAll(".drawer-link, .mobile-nav-drawer .btn");
  drawerLinks.forEach(link => {
    link.addEventListener("click", closeMobileDrawer);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawer && mobileDrawer.classList.contains("open")) {
      closeMobileDrawer();
    }
  });

  // 4. Active Nav Tracking on Scroll (Mapped cleanly to 6 Primary Nav Items)
  const navMap = {
    "cover": "nav-beranda",
    "problem": "nav-penelitian",
    "storytelling": "nav-penelitian",
    "solution": "nav-solusi",
    "workflow": "nav-alur",
    "app-showcase": "nav-teknologi",
    "technology": "nav-teknologi",
    "devops": "nav-teknologi",
    "model-features": "nav-teknologi",
    "results": "nav-hasil",
    "conclusion": "nav-hasil",
    "repository": "nav-hasil"
  };

  const sections = document.querySelectorAll("main > section");
  const primaryNavLinks = document.querySelectorAll(".nav-primary-menu .nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -65% 0px",
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        const activeNavId = navMap[id];

        if (activeNavId) {
          primaryNavLinks.forEach(link => {
            if (link.id === activeNavId) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      }
    });
  }, observerOptions);

  sections.forEach(sec => navObserver.observe(sec));

  // 5. Interactive Scrollytelling Narrative Engine
  const storyScenes = {
    story_1: {
      icon: "❓",
      title: "Babak 1: Keresahan Investor di Kota",
      desc: "Pak Budi hanya memegang selembar chat pesan singkat. Kandang berjarak 350 km dari kota. Tanpa verifikasi langsung, rasa was-was dan keraguan investasi terus membayangi.",
      badge: "Asimetri Informasi Tinggi",
      badgeClass: "badge-proto"
    },
    story_2: {
      icon: "⚠️",
      title: "Babak 2: Risiko Dinamis Aset Hayati",
      desc: "Sapi bukan dokumen kertas yang statis. Bobot dan kesehatan dapat merosot dalam sekejap jika terserang stres atau pakan buruk. Ketiadaan akses data memperbesar persepsi risiko.",
      badge: "Ketidakpastian Lapangan",
      badgeClass: "badge-proto"
    },
    story_3: {
      icon: "📱",
      title: "Babak 3: Hadirnya InvestCow Mobile",
      desc: "Dua saluran dibuka seketika: Price Engine menampilkan grafik kenaikan bobot & nilai secara real-time, sementara CCTV memancarkan live feed visual sapi yang sedang sehat memamah pakan.",
      badge: "Transparansi Berlapis Aktif",
      badgeClass: "badge-verified"
    },
    story_4: {
      icon: "🏆",
      title: "Babak 4: Kepuasan Terbukti 101 Responden",
      desc: "Bukan sekadar hipotesis, riset UAT SEHATI 2026 terhadap 101 responden membuktikan: aspek Transparansi Sistem meraih skor tertinggi (4,17/5) dengan 97% responden menilai tinggi/sangat tinggi.",
      badge: "Grand Mean: 4,13 / 5,00",
      badgeClass: "badge-verified"
    }
  };

  const chapterCards = document.querySelectorAll(".story-chapter-card");
  const sceneIcon = document.getElementById("story-scene-icon");
  const sceneTitle = document.getElementById("story-scene-title");
  const sceneDesc = document.getElementById("story-scene-desc");
  const sceneBadge = document.getElementById("story-scene-badge");

  function updateStoryScene(chapterKey) {
    const data = storyScenes[chapterKey];
    if (!data) return;

    if (sceneIcon) sceneIcon.textContent = data.icon;
    if (sceneTitle) sceneTitle.textContent = data.title;
    if (sceneDesc) sceneDesc.textContent = data.desc;
    if (sceneBadge) {
      sceneBadge.textContent = data.badge;
      sceneBadge.className = "story-scene-badge " + data.badgeClass;
    }
  }

  chapterCards.forEach(card => {
    card.addEventListener("click", () => {
      chapterCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const key = card.getAttribute("data-chapter");
      updateStoryScene(key);
    });
  });

  // 6. Mobile Showcase Screen Tabs Switcher
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

  // 7. Architecture Nodes Inspector
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

  // 8. DevOps Stage Cards Inspector
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

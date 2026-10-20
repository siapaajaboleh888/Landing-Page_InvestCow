/**
 * charts.js — Data Visualization & Research Statistics Engine
 * Handles animated UAT horizontal bar charts, stat counters, and Price Engine simulator.
 */

// Simulated Price Engine Data for 1W, 1M, 1Y
const priceChartData = {
  "1w": {
    price: "Rp 155.000",
    unit: "/ unit bobot referensi",
    trend: "+2.65% (7 Hari Terakhir)",
    points: [142, 145, 144, 149, 148, 153, 155],
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"]
  },
  "1m": {
    price: "Rp 155.000",
    unit: "/ unit bobot referensi",
    trend: "+5.12% (30 Hari Terakhir)",
    points: [138, 141, 140, 144, 146, 149, 151, 155],
    labels: ["Mg 1", "Mg 2", "Mg 3", "Mg 4"]
  },
  "1y": {
    price: "Rp 155.000",
    unit: "/ unit bobot referensi",
    trend: "+14.2% (1 Tahun Simulasi)",
    points: [120, 125, 128, 134, 132, 139, 143, 148, 150, 155],
    labels: ["Jan", "Mar", "Mei", "Jul", "Sep", "Nov"]
  }
};

// Draw Simulated Price SVG Chart
function renderPriceChart(timeframe = "1w") {
  const container = document.getElementById("price-chart-svg");
  if (!container) return;

  const data = priceChartData[timeframe];
  if (!data) return;

  // Update header text
  const priceEl = document.getElementById("sim-current-price");
  const trendEl = document.getElementById("sim-current-trend");
  if (priceEl) priceEl.textContent = data.price;
  if (trendEl) trendEl.textContent = data.trend;

  const width = 450;
  const height = 150;
  const padding = 25;
  const points = data.points;
  const minVal = Math.min(...points) * 0.95;
  const maxVal = Math.max(...points) * 1.05;

  const getX = (i) => padding + (i / (points.length - 1)) * (width - 2 * padding);
  const getY = (v) => height - padding - ((v - minVal) / (maxVal - minVal)) * (height - 2 * padding);

  let pathD = `M ${getX(0)} ${getY(points[0])}`;
  let areaD = `M ${getX(0)} ${getY(points[0])}`;

  for (let i = 1; i < points.length; i++) {
    const prevX = getX(i - 1);
    const prevY = getY(points[i - 1]);
    const currX = getX(i);
    const currY = getY(points[i]);
    const cpX1 = prevX + (currX - prevX) / 2;
    const cpX2 = prevX + (currX - prevX) / 2;
    pathD += ` C ${cpX1} ${prevY}, ${cpX2} ${currY}, ${currX} ${currY}`;
    areaD += ` C ${cpX1} ${prevY}, ${cpX2} ${currY}, ${currX} ${currY}`;
  }

  areaD += ` L ${getX(points.length - 1)} ${height - padding} L ${getX(0)} ${height - padding} Z`;

  // Build SVG XML
  let svgContent = `
    <defs>
      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#10b981" stop-opacity="0.45" />
        <stop offset="100%" stop-color="#10b981" stop-opacity="0.0" />
      </linearGradient>
    </defs>
    <!-- Background grid lines -->
    <line x1="${padding}" y1="${getY(minVal + (maxVal-minVal)*0.25)}" x2="${width - padding}" y2="${getY(minVal + (maxVal-minVal)*0.25)}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4,4" />
    <line x1="${padding}" y1="${getY(minVal + (maxVal-minVal)*0.5)}" x2="${width - padding}" y2="${getY(minVal + (maxVal-minVal)*0.5)}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4,4" />
    <line x1="${padding}" y1="${getY(minVal + (maxVal-minVal)*0.75)}" x2="${width - padding}" y2="${getY(minVal + (maxVal-minVal)*0.75)}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4,4" />
    
    <!-- Area Fill -->
    <path d="${areaD}" fill="url(#chartGrad)" />
    
    <!-- Sparkline Stroke -->
    <path d="${pathD}" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
  `;

  // Add dots on points
  points.forEach((p, idx) => {
    const cx = getX(idx);
    const cy = getY(p);
    svgContent += `
      <circle cx="${cx}" cy="${cy}" r="3.5" fill="#10b981" stroke="#07120d" stroke-width="2" />
    `;
  });

  container.innerHTML = svgContent;
}

// Animate Stat Counters
function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-target"));
        const isDecimal = el.getAttribute("data-decimal") === "true";
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1200; // ms
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out expo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = easeProgress * target;

          if (isDecimal) {
            el.textContent = currentVal.toFixed(2).replace(".", ",") + suffix;
          } else {
            el.textContent = Math.floor(currentVal) + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            if (isDecimal) {
              el.textContent = target.toFixed(2).replace(".", ",") + suffix;
            } else {
              el.textContent = target + suffix;
            }
          }
        }

        requestAnimationFrame(updateCount);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(num => observer.observe(num));
}

// Animate UAT Horizontal Progress Bars
function initBarCharts() {
  const barFills = document.querySelectorAll(".bar-fill");
  if (!barFills.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const score = parseFloat(bar.getAttribute("data-score"));
        // Max Likert is 5.0
        const percentage = (score / 5.0) * 100;
        bar.style.width = percentage + "%";
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  barFills.forEach(bar => observer.observe(bar));
}

// Live Timecode Generator for Simulated CCTV
function initLiveTimecode() {
  const timecodeEl = document.getElementById("cctv-timecode");
  if (!timecodeEl) return;

  function updateTime() {
    const now = new Date();
    const d = String(now.getDate()).padStart(2, '0');
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const y = now.getFullYear();
    const h = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    timecodeEl.textContent = `${y}-${m}-${d} ${h}:${min}:${s} WIB · CAM-01 KANDANG A`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

// DOM Ready initialization
document.addEventListener("DOMContentLoaded", () => {
  renderPriceChart("1w");
  initAnimatedCounters();
  initBarCharts();
  initLiveTimecode();

  // Price timeframe switcher buttons
  const timeBtns = document.querySelectorAll(".chart-time-btn");
  timeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      timeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const tf = btn.getAttribute("data-timeframe");
      renderPriceChart(tf);
    });
  });
});

/**
 * workflow.js — Interactive Actor & Transaction Workflow Engine
 * Handles step selection, role details inspection, and workflow filtering with sequential non-jumping steps.
 */

const workflowData = {
  // Master Chronological Steps (1 to 6)
  masterSteps: {
    step_1: {
      title: "Langkah 1: Registrasi & Autentikasi Pengguna",
      actor: "Investor & Sistem Backend",
      desc: "Investor mendaftarkan akun baru atau login ke dalam aplikasi Flutter dengan kredensial aman.",
      inputs: "Nomor telepon / email dan kata sandi pengguna.",
      process: "Validasi kredensial pengguna dan pembuatan sesi token JWT terenkripsi.",
      outputs: "Akses aman ke dashboard portofolio investor.",
      status: "Terverifikasi di Kode (Flutter + Node.js)",
      badgeClass: "badge-verified"
    },
    step_2: {
      title: "Langkah 2: Eksplorasi Katalog & Detail Ternak",
      actor: "Investor & Pengelola Platform",
      desc: "Menjelajahi daftar sapi (Sapi Bali, Limosin) lengkap dengan bobot awal, ras, usia, dan target pemeliharaan.",
      inputs: "Katalog proyek terverifikasi dari basis data MySQL.",
      process: "Filter kategori, sortir nilai, dan inspeksi profil kandang mitra.",
      outputs: "Detail spesifikasi ternak pilihan investor.",
      status: "Terverifikasi di Kode (UI Flutter)",
      badgeClass: "badge-verified"
    },
    step_3: {
      title: "Langkah 3: Analisis Data Nilai (Price Engine)",
      actor: "Sistem InvestCow (Backend)",
      desc: "Price Engine menyajikan grafik candlestick dan riwayat fluktuasi nilai investasi secara transparan dan real-time.",
      inputs: "Data riwayat nilai dari basis data dan event WebSocket.",
      process: "Kalkulasi pergerakan nilai periodik dan broadcast event Socket.io.",
      outputs: "Informasi tren nilai yang transparan bagi calon investor.",
      status: "Terverifikasi di Kode (Socket.io + Database)",
      badgeClass: "badge-verified"
    },
    step_4: {
      title: "Langkah 4: Verifikasi Visual Kondisi Kandang (CCTV)",
      actor: "CCTV & Peternak Kandang",
      desc: "Investor memeriksa langsung kondisi fisik ternak dan suasana kandang melalui siaran kamera visual.",
      inputs: "Aliran visual dari kamera IoT kandang mitra.",
      process: "Transmisi feed video ke antarmuka aplikasi mobile Flutter.",
      outputs: "Bukti visual kasat mata yang mengurangi asimetri informasi.",
      status: "Terintegrasi dalam Antarmuka Mobile",
      badgeClass: "badge-verified"
    },
    step_5: {
      title: "Langkah 5: Konfirmasi Komitmen & Investasi",
      actor: "Investor & Sistem",
      desc: "Investor meninjau rincian biaya, memilih nominal investasi, dan mengonfirmasi pendanaan proyek ternak.",
      inputs: "Nominal investasi dan konfirmasi persetujuan pengguna.",
      process: "Pencatatan status transaksi dan pemrosesan alur pendanaan.",
      outputs: "Nomor transaksi resmi dan pembaruan alokasi aset.",
      status: "Prototipe / Simulasi Alur Transaksi",
      badgeClass: "badge-proto"
    },
    step_6: {
      title: "Langkah 6: Monitoring Portofolio & Smart Alert",
      actor: "Investor & Sistem InvestCow",
      desc: "Aset aktif terpantau di tab portofolio. Notifikasi pintar dikirim jika ada perubahan nilai atau kabar kandang.",
      inputs: "Pembaruan berkala pertumbuhan sapi dan status kandang.",
      process: "Kalkulasi nilai portofolio dan pemicu notifikasi batas nilai.",
      outputs: "Laporan ringkas aset dan ketenangan informasi bagi investor.",
      status: "Terverifikasi di Kode (UI & State Management)",
      badgeClass: "badge-verified"
    }
  },

  // Actor Specific Step Nodes
  nodes: {
    // Investor Lane
    inv_1: {
      title: "Tahap 1: Pendaftaran Akun",
      actor: "Investor",
      desc: "Mendaftarkan akun baru pada aplikasi mobile Flutter dengan mengisi data identitas.",
      inputs: "Form pendaftaran identitas pengguna.",
      process: "Enkripsi data dan pengiriman ke API backend.",
      outputs: "Akun investor aktif.",
      status: "Terverifikasi di Kode",
      badgeClass: "badge-verified"
    },
    inv_2: {
      title: "Tahap 2: Eksplorasi Proyek",
      actor: "Investor",
      desc: "Melihat daftar proyek peternakan sapi yang tersedia beserta perkiraan bobot dan nilai.",
      inputs: "Daftar katalog dari server.",
      process: "Pencarian dan penyaringan proyek sesuai preferensi.",
      outputs: "Pilihan proyek investasi yang diminati.",
      status: "Terverifikasi di Kode",
      badgeClass: "badge-verified"
    },
    inv_3: {
      title: "Tahap 3: Tinjau Data & Visual",
      actor: "Investor",
      desc: "Memeriksa grafik fluktuasi nilai Price Engine dan mengamati siaran CCTV kandang.",
      inputs: "Grafik nilai real-time dan live CCTV feed.",
      process: "Verifikasi mandiri kondisi aset kuantitatif dan visual.",
      outputs: "Keyakinan dan keputusan investasi rasional.",
      status: "Terverifikasi di Kode",
      badgeClass: "badge-verified"
    },
    inv_4: {
      title: "Tahap 4: Konfirmasi Investasi",
      actor: "Investor",
      desc: "Menyetujui rincian pendanaan dan menyelesaikan proses konfirmasi transaksi.",
      inputs: "Nominal pendanaan yang dipilih.",
      process: "Pengiriman data pemesanan unit ternak.",
      outputs: "Status transaksi berhasil dicatat.",
      status: "Prototipe / Simulasi Alur",
      badgeClass: "badge-proto"
    },
    inv_5: {
      title: "Tahap 5: Pantau Portofolio",
      actor: "Investor",
      desc: "Memantau pertumbuhan nilai ternak harian dan menerima notifikasi Smart Alert.",
      inputs: "Data portofolio terpusat.",
      process: "Visualisasi donut chart dan mutasi portofolio.",
      outputs: "Laporan pertumbuhan aset berkala.",
      status: "Terverifikasi di Kode",
      badgeClass: "badge-verified"
    },

    // Admin Lane
    adm_1: {
      title: "Tahap 1: Verifikasi Mitra Kandang",
      actor: "Pengelola Platform / Admin",
      desc: "Melakukan kurasi legalitas dan kelayakan kandang peternak sebelum proyek diterbitkan.",
      inputs: "Dokumen profil peternak dan lokasi kandang.",
      process: "Audit kelayakan fasilitas dan ketersediaan pakan.",
      outputs: "Kandang terdaftar sebagai mitra resmi.",
      status: "Proses Operasional Manajemen",
      badgeClass: "badge-verified"
    },
    adm_2: {
      title: "Tahap 2: Kurasi Katalog Proyek",
      actor: "Pengelola Platform / Admin",
      desc: "Mengunggah data spesifikasi sapi, foto awal, dan parameter nilai referensi.",
      inputs: "Data fisik sapi dari peternak.",
      process: "Input data ke dashboard administrasi.",
      outputs: "Katalog proyek terbit di aplikasi.",
      status: "Prototipe / Terkelola pada Backend",
      badgeClass: "badge-proto"
    },
    adm_3: {
      title: "Tahap 3: Pemeliharaan Sistem",
      actor: "Pengelola Platform / Admin",
      desc: "Mengawasi kelancaran transmisi data real-time, log transaksi, dan keamanan sistem.",
      inputs: "Log server dan metrik performa CI/CD.",
      process: "Monitoring berkala integritas basis data.",
      outputs: "Platform berjalan stabil dan andal.",
      status: "Terverifikasi di Kode",
      badgeClass: "badge-verified"
    },

    // Peternak Lane
    pet_1: {
      title: "Tahap 1: Perawatan Sapi Harian",
      actor: "Peternak / Mitra Kandang",
      desc: "Melaksanakan pemberian pakan bergizi, menjaga kebersihan kandang, dan sanitasi ternak.",
      inputs: "SOP pakan ternak dan suplemen kesehatan.",
      process: "Pemeliharaan harian ternak sapi di lokasi kandang.",
      outputs: "Kondisi fisik sapi sehat dan terawat.",
      status: "Operasional Lapangan",
      badgeClass: "badge-verified"
    },
    pet_2: {
      title: "Tahap 2: Pencatatan Bobot Rutin",
      actor: "Peternak / Mitra Kandang",
      desc: "Menginput data perkembangan bobot dan riwayat kesehatan ke dalam catatan sistem.",
      inputs: "Hasil pengukuran berkala di lapangan.",
      process: "Pencatatan data pertumbuhan ternak.",
      outputs: "Riwayat data pertumbuhan untuk Price Engine.",
      status: "Operasional Lapangan",
      badgeClass: "badge-verified"
    },
    pet_3: {
      title: "Tahap 3: Fasilitasi Kamera CCTV",
      actor: "Peternak / Mitra Kandang",
      desc: "Memastikan sudut sorot kamera CCTV kandang tetap bersih dan terhubung dengan daya.",
      inputs: "Perangkat kamera IoT di kandang.",
      process: "Penjagaan posisi kamera dan pencahayaan memadai.",
      outputs: "Siaran visual kandang aktif tanpa halangan.",
      status: "Terintegrasi Lapangan",
      badgeClass: "badge-verified"
    },

    // Sistem Lane
    sys_1: {
      title: "Tahap 1: Autentikasi JWT Aman",
      actor: "Sistem InvestCow (Backend)",
      desc: "Memvalidasi kredensial login dan menerbitkan Json Web Token (JWT) terenkripsi.",
      inputs: "Request login dari aplikasi mobile.",
      process: "Hashing verifikasi password dan pembuatan JWT token.",
      outputs: "Otorisasi sesi aman bagi investor.",
      status: "Terverifikasi di Kode",
      badgeClass: "badge-verified"
    },
    sys_2: {
      title: "Tahap 2: Kalkulasi Nilai Real-Time",
      actor: "Sistem InvestCow (Backend)",
      desc: "Price Engine memproses agregasi data nilai referensi berdasarkan parameter pasar dan bobot.",
      inputs: "Data pertumbuhan dan parameter pasar.",
      process: "Kalkulasi tren nilai dan pembentukan candlestick.",
      outputs: "Data historis nilai investasi terstruktur.",
      status: "Terverifikasi di Kode",
      badgeClass: "badge-verified"
    },
    sys_3: {
      title: "Tahap 3: Distribusi Socket.io",
      actor: "Sistem InvestCow (Backend)",
      desc: "Memancarkan pembaruan nilai secara instan ke seluruh ponsel investor yang terhubung.",
      inputs: "Event perubahan harga dari Price Engine.",
      process: "Broadcast WebSocket via Socket.io.",
      outputs: "Update nilai real-time tanpa refresh halaman.",
      status: "Terverifikasi di Kode",
      badgeClass: "badge-verified"
    },
    sys_4: {
      title: "Tahap 4: Penyimpanan Basis Data",
      actor: "Sistem InvestCow (Backend)",
      desc: "Menyimpan transaksi, log nilai historis, dan status portofolio ke dalam database MySQL.",
      inputs: "Data transaksi dan log pengguna.",
      process: "Eksekusi query transaksional ACID.",
      outputs: "Integritas dan keandalan data permanen.",
      status: "Terverifikasi di Kode",
      badgeClass: "badge-verified"
    },

    // CCTV Lane
    cam_1: {
      title: "Tahap 1: Penangkapan Video Kandang",
      actor: "CCTV & Sumber Data Visual",
      desc: "Kamera IoT di kandang merekam aktivitas fisik sapi dan kondisi lingkungan kandang.",
      inputs: "Visual fisik kandang dan pencahayaan.",
      process: "Encoding video capture standar RTSP/HLS.",
      outputs: "Stream video resolusi tinggi.",
      status: "Terintegrasi di Antarmuka",
      badgeClass: "badge-verified"
    },
    cam_2: {
      title: "Tahap 2: Transmisi Stream ke Ponsel",
      actor: "CCTV & Sumber Data Visual",
      desc: "Menyalurkan video stream ke modul pemutar visual pada aplikasi mobile investor.",
      inputs: "Feed video dari server media.",
      process: "Streaming live feed ke layar smartphone Flutter.",
      outputs: "Pemantauan visual langsung bagi investor.",
      status: "Terintegrasi di Antarmuka",
      badgeClass: "badge-verified"
    }
  }
};

// Initialize Workflow Interactions
function initWorkflow() {
  const inspectorTitle = document.getElementById("wf-inspector-title");
  const inspectorRole = document.getElementById("wf-inspector-role");
  const inspectorResp = document.getElementById("wf-inspector-resp");
  const inspectorInput = document.getElementById("wf-inspector-input");
  const inspectorProcess = document.getElementById("wf-inspector-process");
  const inspectorOutput = document.getElementById("wf-inspector-output");
  const inspectorBadge = document.getElementById("wf-inspector-badge");

  function updateInspector(data) {
    if (!data) return;
    if (inspectorTitle) inspectorTitle.textContent = data.title;
    if (inspectorRole) inspectorRole.textContent = "Aktor Terkait: " + data.actor;
    if (inspectorResp) inspectorResp.textContent = data.desc;
    if (inspectorInput) inspectorInput.textContent = data.inputs;
    if (inspectorProcess) inspectorProcess.textContent = data.process;
    if (inspectorOutput) inspectorOutput.textContent = data.outputs;
    if (inspectorBadge) {
      inspectorBadge.textContent = data.status;
      inspectorBadge.className = "badge " + data.badgeClass;
    }
  }

  // 1. Master Timeline Card clicks
  const timelineCards = document.querySelectorAll(".timeline-step-card");
  timelineCards.forEach(card => {
    card.addEventListener("click", () => {
      timelineCards.forEach(c => c.classList.remove("active"));
      document.querySelectorAll(".step-node").forEach(s => s.classList.remove("active"));
      card.classList.add("active");

      const key = card.getAttribute("data-step");
      const data = workflowData.masterSteps[key];
      updateInspector(data);
    });
  });

  // 2. Individual Step Node clicks
  const stepNodes = document.querySelectorAll(".step-node");
  stepNodes.forEach(node => {
    node.addEventListener("click", () => {
      stepNodes.forEach(s => s.classList.remove("active"));
      timelineCards.forEach(c => c.classList.remove("active"));
      node.classList.add("active");

      const nodeKey = node.getAttribute("data-node");
      const data = workflowData.nodes[nodeKey];
      updateInspector(data);
    });
  });

  // 3. Filter Buttons
  const filterBtns = document.querySelectorAll(".workflow-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      const lanes = document.querySelectorAll(".actor-lane");

      let firstVisibleNode = null;

      lanes.forEach(lane => {
        const actor = lane.getAttribute("data-actor");
        let shouldShow = false;

        if (filter === "all") {
          shouldShow = true;
        } else if (filter === "investor" && (actor === "investor" || actor === "sistem")) {
          shouldShow = true;
        } else if (filter === "admin" && (actor === "admin" || actor === "sistem" || actor === "peternak")) {
          shouldShow = true;
        } else if (filter === "data" && (actor === "sistem" || actor === "cctv")) {
          shouldShow = true;
        }

        if (shouldShow) {
          lane.style.display = "block";
          lane.style.opacity = "1";
          if (!firstVisibleNode) {
            firstVisibleNode = lane.querySelector(".step-node");
          }
        } else {
          lane.style.display = "none";
        }
      });

      // Update inspector to the first visible node in the filtered set
      if (firstVisibleNode) {
        firstVisibleNode.click();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initWorkflow);

/**
 * workflow.js — Interactive Actor & Transaction Workflow Engine
 * Handles step selection, role details inspection, and workflow filtering.
 */

const workflowData = {
  // Actors
  actors: {
    investor: {
      name: "Investor",
      role: "Pemberi Modal / Crowdfunder",
      responsibility: "Mengeksplorasi proyek ternak, memeriksa data nilai dan bukti visual kandang, mengonfirmasi investasi, serta memantau portofolio secara berkala.",
      inputs: "Data profil proyek, grafik harga sapi, live visual CCTV, dan status portofolio.",
      process: "Registrasi akun -> Memilih proyek sapi -> Konfirmasi nominal investasi -> Verifikasi pembayaran -> Monitoring berkala.",
      outputs: "Komitmen pendanaan, verifikasi kepemilikan unit ternak, dan umpan balik kepuasan sistem.",
      status: "Terverifikasi pada Aplikasi Mobile Flutter",
      badgeClass: "badge-verified"
    },
    admin: {
      name: "Pengelola Platform / Admin",
      role: "Manajemen Sistem & Kurasi Proyek",
      responsibility: "Mengelola kurasi proyek ternak, memvalidasi data kandang dan peternak, mengawasi kepatuhan sistem, dan memelihara data transaksi.",
      inputs: "Data proyek dari peternak, konfirmasi transaksi pembayaran, log sistem.",
      process: "Verifikasi kelayakan mitra kandang -> Input parameter proyek -> Monitoring backend & distribusi real-time.",
      outputs: "Katalog proyek terverifikasi, catatan audit, dan integritas basis data.",
      status: "Prototipe / Terkelola pada Backend Node.js",
      badgeClass: "badge-proto"
    },
    peternak: {
      name: "Peternak / Pengelola Kandang",
      role: "Pemelihara Aset Hayati di Lapangan",
      responsibility: "Merawat ternak sapi harian, mencatat pembaruan pertumbuhan fisik, menjaga sanitasi dan kesehatan, serta memfasilitasi posisi kamera kandang.",
      inputs: "SOP pakan & pemeliharaan, pakan ternak, jadwal inspeksi.",
      process: "Pemberian pakan & nutrisi -> Pemantauan harian -> Pencatatan berkala -> Penjagaan area sorot kamera.",
      outputs: "Kondisi fisik sapi sehat, pencatatan pertumbuhan, dan stream visual kandang aktif.",
      status: "Operasional Lapangan & Integrasi Visual",
      badgeClass: "badge-verified"
    },
    sistem: {
      name: "Sistem InvestCow (Backend & Price Engine)",
      role: "Mesin Logika & Distribusi Data Real-Time",
      responsibility: "Memproses logika transaksi, menghitung nilai aset melalui Price Engine, mendistribusikan pembaruan real-time via Socket.io, dan menyimpan ke database MySQL.",
      inputs: "Permintaan API Flutter, event transaksi, data historis harga.",
      process: "Validasi token autentikasi -> Kalkulasi tren harga -> Broadcast event WebSocket -> Eksekusi query database.",
      outputs: "Respons REST API terenkripsi, push event Socket.io ke investor, log sistem terpusat.",
      status: "Terverifikasi Kode Backend & CI/CD",
      badgeClass: "badge-verified"
    },
    cctv: {
      name: "CCTV & Sensor Kandang",
      role: "Kanal Transparansi Visual Objektif",
      responsibility: "Menangkap video langsung kondisi kandang sapi secara berkala untuk melengkapi angka finansial dengan bukti visual kasat mata.",
      inputs: "Pencahayaan kandang, pergerakan ternak fisik.",
      process: "Perekaman video stream -> Encoding transmisi stream -> Akses tampilan melalui aplikasi mobile.",
      outputs: "Akses visual objektif kondisi kandang tanpa perantara.",
      status: "Terintegrasi dalam Antarmuka Mobile",
      badgeClass: "badge-verified"
    }
  },

  // Steps
  steps: {
    reg: {
      title: "1. Registrasi & Login",
      actor: "Investor",
      desc: "Investor mendaftarkan akun di aplikasi Flutter dengan data identitas terverifikasi untuk mengakses pasar proyek.",
      inputs: "Nomor telepon / email dan kata sandi.",
      process: "Validasi kredensial dan pembuatan sesi token JWT terenkripsi.",
      outputs: "Akses aman ke dashboard portofolio investor.",
      status: "Terverifikasi di Kode (Flutter + Node.js)",
      badgeClass: "badge-verified"
    },
    katalog: {
      title: "2. Eksplorasi Proyek & Katalog",
      actor: "Investor",
      desc: "Menjelajahi daftar sapi (Sapi Bali, Limosin, dsb.) lengkap dengan bobot awal, ras, umur, dan target pemeliharaan.",
      inputs: "Katalog proyek dari database MySQL.",
      process: "Filter kategori, sortir harga, dan penelusuran lokasi kandang mitra.",
      outputs: "Detail spesifikasi ternak yang dipilih investor.",
      status: "Terverifikasi di Kode (UI Flutter)",
      badgeClass: "badge-verified"
    },
    price_engine: {
      title: "3. Tinjau Data Nilai (Price Engine)",
      actor: "Sistem InvestCow",
      desc: "Menyajikan grafik candlestick dan riwayat fluktuasi nilai investasi secara transparan dan real-time.",
      inputs: "Data riwayat nilai dari database dan Socket.io.",
      process: "Agregasi perubahan nilai per periode waktu dan pembaruan grafik interaktif.",
      outputs: "Informasi tren nilai yang transparan bagi calon investor.",
      status: "Terverifikasi di Kode (Socket.io + Database)",
      badgeClass: "badge-verified"
    },
    cctv_view: {
      title: "4. Verifikasi Visual (CCTV Kandang)",
      actor: "CCTV & Sumber Data",
      desc: "Investor melihat visual langsung dari kandang untuk memeriksa kondisi fisik ternak secara kasat mata.",
      inputs: "Aliran visual dari kamera IoT kandang.",
      process: "Transmisi feed visual ke antarmuka ponsel.",
      outputs: "Bukti visual langsung yang mengurangi asimetri informasi.",
      status: "Terintegrasi dalam Desain & Prototipe Antarmuka",
      badgeClass: "badge-verified"
    },
    confirm_tx: {
      title: "5. Konfirmasi & Pembayaran Investasi",
      actor: "Investor & Sistem",
      desc: "Investor meninjau rincian biaya, memilih metode pembayaran yang tersedia, dan mengonfirmasi investasi.",
      inputs: "Nominal investasi dan konfirmasi persetujuan pengguna.",
      process: "Pencatatan status transaksi (Pending/Verifikasi) dan pemrosesan alur pendanaan.",
      outputs: "Nomor transaksi resmi dan pembaruan status investasi.",
      status: "Prototipe / Simulasi Alur Transaksi",
      badgeClass: "badge-proto"
    },
    portfolio_mon: {
      title: "6. Monitoring Portofolio & Smart Alert",
      actor: "Investor",
      desc: "Aset aktif tercatat di tab portofolio. Notifikasi pintar dikirim jika ada perubahan harga atau laporan penting.",
      inputs: "Pembaruan berkala nilai sapi dan status kandang.",
      process: "Kalkulasi total nilai portofolio dan pemicu notifikasi batas nilai.",
      outputs: "Laporan ringkas aset dan ketenangan informasi bagi investor.",
      status: "Terverifikasi di Kode (UI & State Management)",
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

  // Step Node clicks
  const stepNodes = document.querySelectorAll(".step-node");
  stepNodes.forEach(node => {
    node.addEventListener("click", () => {
      stepNodes.forEach(s => s.classList.remove("active"));
      node.classList.add("active");

      const stepKey = node.getAttribute("data-step");
      const data = workflowData.steps[stepKey];
      if (data) {
        inspectorTitle.textContent = data.title;
        inspectorRole.textContent = "Aktor Terkait: " + data.actor;
        inspectorResp.textContent = data.desc;
        inspectorInput.textContent = data.inputs;
        inspectorProcess.textContent = data.process;
        inspectorOutput.textContent = data.outputs;
        inspectorBadge.textContent = data.status;
        inspectorBadge.className = "badge " + data.badgeClass;
      }
    });
  });

  // Actor Lane clicks
  const actorLanes = document.querySelectorAll(".actor-lane-header");
  actorLanes.forEach(lane => {
    lane.addEventListener("click", () => {
      const parent = lane.closest(".actor-lane");
      const actorKey = parent.getAttribute("data-actor");
      const data = workflowData.actors[actorKey];
      if (data) {
        stepNodes.forEach(s => s.classList.remove("active"));
        document.querySelectorAll(".actor-lane").forEach(l => l.classList.remove("highlighted"));
        parent.classList.add("highlighted");

        inspectorTitle.textContent = data.name;
        inspectorRole.textContent = data.role;
        inspectorResp.textContent = data.responsibility;
        inspectorInput.textContent = data.inputs;
        inspectorProcess.textContent = data.process;
        inspectorOutput.textContent = data.outputs;
        inspectorBadge.textContent = data.status;
        inspectorBadge.className = "badge " + data.badgeClass;
      }
    });
  });

  // Filter Buttons
  const filterBtns = document.querySelectorAll(".workflow-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      const lanes = document.querySelectorAll(".actor-lane");

      lanes.forEach(lane => {
        const actor = lane.getAttribute("data-actor");
        if (filter === "all") {
          lane.style.display = "block";
          lane.style.opacity = "1";
        } else if (filter === "investor" && (actor === "investor" || actor === "sistem")) {
          lane.style.display = "block";
          lane.style.opacity = "1";
        } else if (filter === "admin" && (actor === "admin" || actor === "sistem" || actor === "peternak")) {
          lane.style.display = "block";
          lane.style.opacity = "1";
        } else if (filter === "data" && (actor === "sistem" || actor === "cctv")) {
          lane.style.display = "block";
          lane.style.opacity = "1";
        } else {
          lane.style.display = "none";
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", initWorkflow);

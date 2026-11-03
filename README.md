<div align="center">

# 📤 PORTAL PENGUMPULAN TUGAS 
### *Modern 3D Card Web Portal for Semester Projects & Google Sheets/Drive Database*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](#)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=flat&logo=google&logoColor=white)](#)

---

> **Pilih Bahasa / Select Language:**
> - [🇮🇩 Bahasa Indonesia](#-bahasa-indonesia)
> - [🇬🇧 English](#-english)

---

</div>

<a id="-bahasa-indonesia"></a>
## 🇮🇩 BAHASA INDONESIA

<details open>
<summary><b>1. 📖 Deskripsi Portal Pengumpulan Tugas Akhir</b></summary>

<br>

**Portal Pengumpulan Tugas Akhir** adalah aplikasi web modern interaktif berbasis visual 3D Card yang dirancang untuk mempermudah siswa/mahasiswa dalam mengumpulkan tugas akhir semester, baik berupa **Link Presentasi** (Canva, Google Slides, dll.) maupun **Unggahan File** (Microsoft PowerPoint, Apple Keynote, dll.) secara teratur dan otomatis tersimpan di **Google Sheets** dan **Google Drive**.

Aplikasi ini dilengkapi dengan antarmuka dinamis, mode tampilan *Light/Dark*, panduan langkah-demi-langkah interaktif, validasi pencegahan duplikasi pengumpulan, sistem penanganan *race condition* (anti-antrean bertabrakan dengan `LockService`), serta **Dashboard Admin/Dosen** *real-time* untuk pemantauan, *preview*, dan pengunduhan file baik secara individu maupun massal per kelas.

**Fitur Utama:**
- 🎨 **Desain 3D Card Modern & Responsif:** Efek *Glassmorphic 3D*, mode *Light & Dark theme*, serta tampilan yang menyesuaikan semua perangkat (ponsel, tablet, laptop).
- 🔀 **Pilihan Platform Presentasi Dinamis:**
  - **Canva & Google Slides:** Input tautan publik secara otomatis.
  - **Microsoft PowerPoint (.ppt / .pptx) & Apple Keynote (.key / .ppt / .pptx):** Area *Drag & Drop* untuk unggah file (maksimal 10 MB).
  - **Input Sendiri / Lainnya:** Bebas memilih metode pengumpulan via Link atau File.
- 📌 **Daftar Pilihan Kelas & Kelompok:** Pilihan langsung untuk Kelas **7A – 7G** dan Kelompok **Kelompok 01 – 08** (dengan opsi input manual).
- 💡 **Panduan Langkah-demi-Langkah Interaktif:** Petunjuk visual cara membuat link akses publik dan cara menyimpan/mengunggah file presentasi yang benar.
- 🔒 **Validasi Duplikasi & Anti-Bertabrakan (LockService):** Pengecekan berbasis database kelas & kelompok (hanya 1 kali pengiriman) didukung oleh `LockService` di server Google Apps Script untuk mencegah bentrok data saat dikirim bersamaan.
- 🔐 **Dashboard Admin / Dosen Realtime:**
  - Login khusus admin dengan username & password aman.
  - Statistik *real-time* total file/link terkumpul dan total kelompok unik.
  - Filter tabel data berdasarkan kelas (7A–7G).
  - Tombol **Preview** langsung dan **Download** file (satuan maupun *bulk download* per kelas).
</details>

<details>
<summary><b>2. 💡 Kenapa Portal Ini Dibuat?</b></summary>

<br>

Pengembangan portal pengumpulan tugas akhir ini dilatarbelakangi oleh beberapa alasan utama:
1. **Penyimpanan Terpusat & Rapi:** Menghindari pengumpulan tugas yang tersebar di WhatsApp atau email, dengan otomatis mengorganisasi file ke Google Drive dan data ke Google Sheets.
2. **Mencegah Pengiriman Ganda & Bentrok Data:** Memastikan setiap kelompok dalam suatu kelas hanya mengumpulkan tugas satu kali, serta menjaga integritas database saat banyak pengguna mengirimkan tugas pada detik yang sama.
3. **Kemudahan Pendidik / Penguji:** Memfasilitasi dosen/guru dengan Dashboard Admin untuk langsung melihat presentasi atau mengunduh semua file tugas per kelas dalam satu klik.
4. **Ringan & Bebas Biaya Server:** Memanfaatkan Google Workspace (Google Sheets, Drive, & Apps Script) sebagai *backend* gratis yang dapat diakses dari mana saja.
</details>

<details>
<summary><b>3. ⚙️ Cara Instalasi, Pemasangan, dan Penggunaan</b></summary>

<br>

Aplikasi ini dirancang modular dengan memisahkan berkas antarmuka (`index.html`, `style.css`, `script.js`) dan berkas backend (`Code.gs`).

### 📁 Struktur File Proyek
```text
📂 portal-pengumpulan-tugas/
 ├── 📄 index.html      # Struktur utama antarmuka & modal admin
 ├── 🎨 style.css       # Styling 3D Card, Glassmorphism, Theme & Responsif
 ├── 📜 script.js       # Logika interaksi frontend, FileReader, & API Fetch
 └── ⚙️ Code.gs         # Backend Google Apps Script (LockService, Drive, & Sheets DB)
```

---

### 🚀 Langkah 1: Persiapan Google Sheets & Google Drive
1. **Buat Google Sheets Baru:**
   - Buka [Google Sheets](https://sheets.google.com) dan buat dokumen baru bernama **`DB_Pengumpulan_Tugas`**.
   - Pastikan nama *tab* sheet di pojok kiri bawah adalah **`Sheet1`**.
   - Isi header baris pertama (**Baris 1**) dengan nama kolom berikut:
     | A | B | C | D | E | F | G |
     |---|---|---|---|---|---|---|
     | **Timestamp** | **Platform** | **Kelas** | **Kelompok** | **Tipe** | **Link/File URL** | **Nama File** |

2. **Buat Folder Penyimpanan Google Drive:**
   - Buka [Google Drive](https://drive.google.com) dan buat folder baru untuk menampung file tugas.
   - Buka folder tersebut dan salin **ID Folder** dari link browser Anda:
     > Contoh URL: `https://drive.google.com/drive/folders/1wTFiqpmBw9KOw8pVvmy77cCE7tM6orHU`  
     > **ID Folder:** `1wTFiqpmBw9KOw8pVvmy77cCE7tM6orHU`

---

### 🌐 Langkah 2: Pemasangan Google Apps Script (`Code.gs`)
1. Di Google Sheets `DB_Pengumpulan_Tugas`, klik menu **Ekstensi** > **Apps Script**.
2. Hapus seluruh kode bawaan, lalu tempelkan seluruh isi file `Code.gs`.
3. Ganti variabel `DRIVE_FOLDER_ID` pada baris pertama dengan ID Folder Google Drive Anda:
   ```javascript
   const DRIVE_FOLDER_ID = "1wTFiqpmBw9KOw8pVvmy77cCE7tM6orHU";
   ```
4. Ubah kredensial login admin (`ADMIN_USERNAME` & `ADMIN_PASSWORD`) sesuai kebutuhan Anda.
5. Klik **Deploy** > **Deployment Baru (New Deployment)**.
   - **Jenis:** Aplikasi web (*Web app*)
   - **Deskripsi:** `API Portal Tugas V1`
   - **Jalankan sebagai (Execute as):** `Saya (Me)`
   - **Siapa yang memiliki akses (Who has access):** `Siapa saja (Anyone)`
6. Klik **Terapkan (Deploy)**, izinkan otorisasi akses (*Authorize Access*), lalu salin **Web App URL** yang dihasilkan.

---

### 💻 Langkah 3: Menghubungkan Frontend (`script.js`)
1. Buka file `script.js`.
2. Pada baris pertama, tempelkan URL yang Anda dapatkan dari Apps Script ke variabel `GAS_API_URL`:
   ```javascript
   const GAS_API_URL = "https://script.google.com/macros/s/.../exec";
   ```
3. Simpan seluruh file (`index.html`, `style.css`, `script.js`) dalam satu folder.
4. Buka `index.html` di browser Anda (Google Chrome, Edge, Firefox, Safari) untuk mulai menggunakan portal.

---

### 🎮 Cara Penggunaan
- **Untuk Siswa:**
  1. Pilih platform presentasi (Canva, Google Slides, PowerPoint, Keynote, atau Input Sendiri).
  2. Pilih Kelas (**7A – 7G**) dan Kelompok (**Kelompok 01 – 08**).
  3. Masukkan tautan (*link*) publik atau unggah file presentasi sesuai petunjuk panduan yang muncul.
  4. Klik tombol **Kirim Tugas Akhir**.
- **Untuk Guru / Admin:**
  1. Klik tombol **🔒 Login Admin** di pojok kanan atas halaman.
  2. Masukkan Username (`admin`) dan Password (`admin123`).
  3. Pantau statistik pengumpulan *real-time*, filter data per kelas, gunakan tombol **👁️ Preview** untuk melihat tautan, atau **⬇️ Download** untuk mengunduh berkas tugas per kelompok maupun per kelas sekaligus.
</details>

<details>
<summary><b>4. 👨‍🏫 Profil Pembuat</b></summary>

<br>

- **Nama Pembuat:** Ilham Muhammad Furqon, S.Kom.
- **Profesi:** Guru SMPN 1 Kuningan (Tenaga Honorer / Guru Non-ASN)
- **Dedikasi:** Mengabdi dalam dunia pendidikan dengan berfokus pada integrasi teknologi informasi (TIK) dan media pembelajaran digital interaktif guna menciptakan suasana belajar yang inklusif, efisien, dan menyenangkan bagi para peserta didik.
</details>

<details>
<summary><b>5. 🔓 Mengapa Proyek Ini Open-Source?</b></summary>

<br>

Proyek ini dirilis di bawah lisensi terbuka (*Open-Source*) dengan alasan:
- **Pemerataan Akses Media Pembelajaran:** Membantu lembaga pendidikan dan pendidik yang membutuhkan portal pengumpulan tugas digital yang andal tanpa biaya lisensi mahal.
- **Kolaborasi & Pengembangan:** Membuka kesempatan bagi rekan-rekan sesama pendidik dan pengembang web untuk mengadaptasi, memodifikasi, dan memperkaya fitur sesuai kebutuhan instansi masing-masing.
- **Bentuk Pengabdian:** Mengbagikan ilmu dan karya bermanfaat bagi kemajuan ekosistem pendidikan digital Indonesia.
</details>

<details>
<summary><b>6. 💖 Dukungan & Pendanaan (Donasi)</b></summary>

<br>

Jika aplikasi ini bermanfaat bagi kegiatan pembelajaran atau pengelolaan tugas di sekolah/kampus Anda dan Anda ingin mendukung pengembangan proyek-proyek edukasi gratis lainnya, Anda dapat menyalurkan dukungan melalui:

* **Transfer Bank / Rekening:**
  > **Bank:** [Nama Bank, contoh: Bank BCA / Mandiri / BRI / BJB]  
  > **No. Rekening:** [Isi Nomor Rekening Anda]  
  > **Atas Nama:** Ilham Muhammad Furqon

* **QRIS / QR Code Donasi:**
  > *(Pindai QR Code melalui aplikasi GoPay, OVO, DANA, ShopeePay, atau Mobile Banking)*  
  >  
  > `<img src="https://via.placeholder.com/220x220.png?text=QRIS+Donasi" alt="QRIS Donasi" width="220" />`

Dukungan Anda sangat berarti bagi kelanjutan inovasi perangkat edukasi berbasis teknologi gratis bagi dunia pendidikan Indonesia!
</details>

---

<a id="-english"></a>
## 🇬🇧 ENGLISH

<details>
<summary><b>1. 📖 Description of Final Semester Project Upload Portal</b></summary>

<br>

**Final Semester Project Upload Portal** is a modern, interactive web application featuring a 3D Glassmorphic Card design. It is built to streamline the submission process of final semester projects for students, supporting both **Presentation Links** (Canva, Google Slides, etc.) and **File Uploads** (Microsoft PowerPoint, Apple Keynote, etc.) with automated storage in **Google Sheets** and **Google Drive**.

The system features dynamic forms, *Light/Dark mode*, step-by-step interactive instructions, submission duplicate prevention, server-side concurrency locking (`LockService`), and a **Real-time Admin/Teacher Dashboard** for monitoring, previewing, and downloading submitted projects individually or in bulk by class.

**Key Features:**
- 🎨 **Modern 3D Card & Responsive UI:** Glassmorphic 3D styling, Light/Dark mode toggle, and seamless responsiveness across all device screens.
- 🔀 **Dynamic Presentation Platform Selection:**
  - **Canva & Google Slides:** Public presentation URL input.
  - **Microsoft PowerPoint (.ppt / .pptx) & Apple Keynote (.key / .ppt / .pptx):** Drag & Drop file upload zone (up to 10 MB).
  - **Custom Platform:** Choice of submission via Link or File upload.
- 📌 **Class & Group Selection:** Preset dropdown options for Classes **7A – 7G** and Groups **Kelompok 01 – 08** (with manual input options).
- 💡 **Interactive Step-by-Step Guides:** Embedded instructions for setting public share permissions and exporting/uploading valid presentation files.
- 🔒 **Duplicate Submission Prevention & Anti-Race Condition (LockService):** Database-backed verification ensuring one submission per Class & Group, powered by Google Apps Script `LockService` to prevent concurrent request collisions.
- 🔐 **Real-time Admin Dashboard:**
  - Secure admin login with credentials.
  - Real-time submission counter and unique group metrics.
  - Data table filtering by class (7A–7G).
  - One-click **Preview** and **Download** features for single files or bulk download per class.
</details>

<details>
<summary><b>2. 💡 Why Was This Project Created?</b></summary>

<br>

The motivation behind building this submission portal includes:
1. **Centralized & Organized Storage:** Eliminating scattered homework submissions across messaging apps or emails by automatically filing documents into Google Drive and logging records into Google Sheets.
2. **Preventing Duplicates & Data Race Conditions:** Guaranteeing that each project group only submits once while maintaining database stability when multiple groups upload simultaneously.
3. **Teacher Convenience:** Providing educators with an Admin Dashboard to instantly view presentations or download all class project files in one click.
4. **Lightweight & Free Cloud Infrastructure:** Leveraging Google Workspace (Sheets, Drive, & Apps Script) as a cost-free serverless backend accessible from anywhere.
</details>

<details>
<summary><b>3. ⚙️ Setup, Installation, and Usage Guide</b></summary>

<br>

The project is designed with modular architecture, separating the frontend assets (`index.html`, `style.css`, `script.js`) from the cloud backend script (`Code.gs`).

### 📁 Project Structure
```text
📂 portal-pengumpulan-tugas/
 ├── 📄 index.html      # Markup layout & admin modal
 ├── 🎨 style.css       # 3D Glassmorphism, theme variables & responsiveness
 ├── 📜 script.js       # Frontend UI logic, Base64 conversion & API handlers
 └── ⚙️ Code.gs         # Apps Script backend (LockService, Drive API & Sheets DB)
```

---

### 🚀 Step 1: Google Sheets & Google Drive Preparation
1. **Create a Google Sheet:**
   - Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet named **`DB_Pengumpulan_Tugas`**.
   - Ensure the sheet tab at the bottom left is named **`Sheet1`**.
   - Set up the top row (**Row 1**) with the following headers:
     | A | B | C | D | E | F | G |
     |---|---|---|---|---|---|---|
     | **Timestamp** | **Platform** | **Kelas** | **Kelompok** | **Tipe** | **Link/File URL** | **Nama File** |

2. **Create a Google Drive Storage Folder:**
   - Open [Google Drive](https://drive.google.com) and create a dedicated folder for uploaded files.
   - Open the folder and copy its **Folder ID** from the address bar:
     > Example URL: `https://drive.google.com/drive/folders/1wTFiqpmBw9KOw8pVvmy77cCE7tM6orHU`  
     > **Folder ID:** `1wTFiqpmBw9KOw8pVvmy77cCE7tM6orHU`

---

### 🌐 Step 2: Deploying Google Apps Script (`Code.gs`)
1. In your `DB_Pengumpulan_Tugas` Google Sheet, click **Extensions** > **Apps Script**.
2. Replace default code with the contents of `Code.gs`.
3. Update the `DRIVE_FOLDER_ID` variable on the first line with your folder ID:
   ```javascript
   const DRIVE_FOLDER_ID = "1wTFiqpmBw9KOw8pVvmy77cCE7tM6orHU";
   ```
4. Adjust `ADMIN_USERNAME` and `ADMIN_PASSWORD` credentials as desired.
5. Click **Deploy** > **New Deployment**.
   - **Type:** Web app
   - **Description:** `Task Portal API V1`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
6. Click **Deploy**, authorize access permissions, and copy the generated **Web App URL**.

---

### 💻 Step 3: Linking Frontend (`script.js`)
1. Open `script.js`.
2. Update the `GAS_API_URL` variable at the top with your deployed Web App URL:
   ```javascript
   const GAS_API_URL = "https://script.google.com/macros/s/.../exec";
   ```
3. Keep `index.html`, `style.css`, and `script.js` in the same local directory.
4. Double-click `index.html` to open the web portal in any modern web browser.

---

### 🎮 How to Use
- **For Students:**
  1. Select the presentation platform (Canva, Google Slides, PowerPoint, Keynote, or Custom).
  2. Select Class (**7A – 7G**) and Group (**Kelompok 01 – 08**).
  3. Enter the public link or drop/upload your presentation file following the displayed guide.
  4. Click **Kirim Tugas Akhir**.
- **For Teachers / Admins:**
  1. Click **🔒 Login Admin** at the top right of the page.
  2. Enter Username (`admin`) and Password (`admin123`).
  3. Monitor realtime statistics, filter data per class, use **👁️ Preview** to view presentation links, or click **⬇️ Download** to retrieve project files individually or in bulk.
</details>

<details>
<summary><b>4. 👨‍🏫 Author Profile</b></summary>

<br>

- **Author:** Ilham Muhammad Furqon, S.Kom.
- **Role:** Teacher at SMPN 1 Kuningan (Non-ASN / Honorary Teacher)
- **Dedication:** Passionate about educational technology integration, creating interactive digital learning tools to foster inclusive, efficient, and engaging educational environments.
</details>

<details>
<summary><b>5. 🔓 Why Is This Project Open-Source?</b></summary>

<br>

This project is released under an open-source license to:
- **Democratize Educational Software:** Provide schools and teachers with a free, reliable digital assignment collection system without costly software subscriptions.
- **Promote Collaboration:** Encourage fellow educators and developers to adapt, improve, and customize features for their respective institutions.
- **Community Contribution:** Share useful digital solutions to advance the educational ecosystem.
</details>

<details>
<summary><b>6. 💖 Support & Funding (Donations)</b></summary>

<br>

If this tool benefits your classroom or institution and you wish to support the developer in creating more free educational technologies, you can contribute via:

* **Bank Transfer:**
  > **Bank:** [Bank Name, e.g., Bank BCA / Mandiri / BRI / BJB]  
  > **Account Number:** [Your Account Number]  
  > **Account Name:** Ilham Muhammad Furqon

* **QRIS / QR Code Donation:**
  > *(Scan QR Code via GoPay, OVO, DANA, ShopeePay, or Mobile Banking)*  
  >  
  > `<img src="https://via.placeholder.com/220x220.png?text=QRIS+Donation" alt="QRIS Donation" width="220" />`

Your generosity is deeply appreciated and helps sustain open-source educational innovations!
</details>

---

<div align="center">

*Made with ❤️ for Education by Ilham Muhammad Furqon, S.Kom.*

</div>

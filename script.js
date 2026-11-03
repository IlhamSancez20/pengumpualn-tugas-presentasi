const GAS_API_URL = "https://script.google.com/macros/s/AKfycbxThxF44zw0GwYdCnNkkqTD6zuJAYKaPVPTzOjcJUb0X-9tZlogQOyozNpbTBcycNu74A/exec";
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;
const platformSelect = document.getElementById('platformSelect');
const customPlatformGroup = document.getElementById('customPlatformGroup');
const customPlatformInput = document.getElementById('customPlatformInput');
const customTypeGroup = document.getElementById('customTypeGroup');
const customTypeSelect = document.getElementById('customTypeSelect');
const dynamicFields = document.getElementById('dynamicFields');
const classSelect = document.getElementById('classSelect');
const customClassInput = document.getElementById('customClassInput');
const groupSelect = document.getElementById('groupSelect');
const customGroupInput = document.getElementById('customGroupInput');
const linkSection = document.getElementById('linkSection');
const linkInput = document.getElementById('linkInput');
const fileSection = document.getElementById('fileSection');
const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const pptInfoBadge = document.getElementById('pptInfoBadge');
const keynoteInfoBadge = document.getElementById('keynoteInfoBadge');
const submissionForm = document.getElementById('submissionForm');
const submitBtn = document.getElementById('submitBtn');
const responseStatus = document.getElementById('responseStatus');
const adminLoginNavBtn = document.getElementById('adminLoginNavBtn');
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminUser = document.getElementById('adminUser');
const adminPass = document.getElementById('adminPass');
const studentFormView = document.getElementById('studentFormView');
const adminDashboardView = document.getElementById('adminDashboardView');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');
const statTotalSubmissions = document.getElementById('statTotalSubmissions');
const statTotalUniqueGroups = document.getElementById('statTotalUniqueGroups');
const adminClassFilter = document.getElementById('adminClassFilter');
const adminTableBody = document.getElementById('adminTableBody');
const refreshDataBtn = document.getElementById('refreshDataBtn');
const downloadClassBulkBtn = document.getElementById('downloadClassBulkBtn');

let globalDashboardData = null;

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlEl.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  htmlEl.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
htmlEl.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

function setModeLink() {
  linkSection.classList.remove('hidden');
  linkInput.setAttribute('required', 'true');
  fileSection.classList.add('hidden');
  fileInput.removeAttribute('required');
  fileInput.value = '';
  fileNameDisplay.textContent = "Belum ada file dipilih";
}

function setModeFile(platform) {
  fileSection.classList.remove('hidden');
  fileInput.setAttribute('required', 'true');
  linkSection.classList.add('hidden');
  linkInput.removeAttribute('required');
  linkInput.value = '';

  if (platform === 'powerpoint') {
    fileInput.setAttribute('accept', '.ppt,.pptx');
    pptInfoBadge.classList.remove('hidden');
    keynoteInfoBadge.classList.add('hidden');
  } else if (platform === 'keynote') {
    fileInput.setAttribute('accept', '.key,.ppt,.pptx');
    pptInfoBadge.classList.add('hidden');
    keynoteInfoBadge.classList.remove('hidden');
  } else {
    fileInput.setAttribute('accept', '.ppt,.pptx,.key,.pdf,.zip,.rar');
    pptInfoBadge.classList.remove('hidden');
    keynoteInfoBadge.classList.remove('hidden');
  }
}

function hideBothSections() {
  linkSection.classList.add('hidden');
  linkInput.removeAttribute('required');
  fileSection.classList.add('hidden');
  fileInput.removeAttribute('required');
}

platformSelect.addEventListener('change', (e) => {
  const val = e.target.value;
  dynamicFields.classList.remove('hidden');

  if (val === 'custom') {
    customPlatformGroup.classList.remove('hidden');
    customPlatformInput.setAttribute('required', 'true');
    customTypeGroup.classList.remove('hidden');
    customTypeSelect.setAttribute('required', 'true');
    hideBothSections();
    customTypeSelect.value = "";
  } else {
    customPlatformGroup.classList.add('hidden');
    customPlatformInput.removeAttribute('required');
    customTypeGroup.classList.add('hidden');
    customTypeSelect.removeAttribute('required');

    if (val === 'canva' || val === 'google_slides') {
      setModeLink();
    } else if (val === 'powerpoint' || val === 'keynote') {
      setModeFile(val);
    }
  }
});

customTypeSelect.addEventListener('change', (e) => {
  if (e.target.value === 'link') setModeLink();
  else if (e.target.value === 'file') setModeFile('custom');
});

classSelect.addEventListener('change', (e) => {
  if (e.target.value === 'custom_class') {
    customClassInput.classList.remove('hidden');
    customClassInput.setAttribute('required', 'true');
  } else {
    customClassInput.classList.add('hidden');
    customClassInput.removeAttribute('required');
  }
});

groupSelect.addEventListener('change', (e) => {
  if (e.target.value === 'custom_group') {
    customGroupInput.classList.remove('hidden');
    customGroupInput.setAttribute('required', 'true');
  } else {
    customGroupInput.classList.add('hidden');
    customGroupInput.removeAttribute('required');
  }
});

fileInput.addEventListener('change', (e) => {
  fileNameDisplay.textContent = e.target.files.length > 0 
    ? `File Terpilih: ${e.target.files[0].name}` 
    : "Belum ada file dipilih";
});

const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

function showStatus(msg, type) {
  responseStatus.className = `status-message ${type}`;
  responseStatus.textContent = msg;
  responseStatus.classList.remove('hidden');
}

submissionForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  responseStatus.classList.add('hidden');
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Memeriksa & Mengirim...';

  try {
    let chosenPlatform = platformSelect.value === 'custom' ? customPlatformInput.value.trim() : platformSelect.value;
    let chosenClass = classSelect.value === 'custom_class' ? customClassInput.value.trim() : classSelect.value;
    let chosenGroup = groupSelect.value === 'custom_group' ? customGroupInput.value.trim() : groupSelect.value;

    let isFileMode = (platformSelect.value === 'powerpoint' || platformSelect.value === 'keynote') ||
                     (platformSelect.value === 'custom' && customTypeSelect.value === 'file');

    const payload = {
      action: 'submit',
      platform: chosenPlatform,
      kelas: chosenClass,
      kelompok: chosenGroup,
      submissionType: isFileMode ? 'file' : 'link',
      linkUrl: !isFileMode ? linkInput.value.trim() : '',
      fileData: null,
      fileName: '',
      mimeType: ''
    };

    if (isFileMode && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      payload.fileName = file.name;
      payload.mimeType = file.type;
      payload.fileData = await readFileAsBase64(file);
    }

    const res = await fetch(GAS_API_URL, { method: 'POST', body: JSON.stringify(payload) });
    const result = await res.json();

    if (result.status === 'success') {
      showStatus(`✅ ${result.message}`, 'success');
      submissionForm.reset();
      dynamicFields.classList.add('hidden');
      customPlatformGroup.classList.add('hidden');
      customTypeGroup.classList.add('hidden');
    } else if (result.status === 'duplicate') {
      showStatus(`⚠️ ${result.message}`, 'warning');
    } else {
      showStatus(`❌ ${result.message}`, 'error');
    }
  } catch (err) {
    showStatus(`❌ Terjadi kesalahan: ${err.message}`, 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'Kirim Tugas Akhir';
  }
});

adminLoginNavBtn.addEventListener('click', () => loginModal.classList.remove('hidden'));
closeLoginModal.addEventListener('click', () => loginModal.classList.add('hidden'));

adminLoginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = adminUser.value.trim();
  const password = adminPass.value.trim();

  try {
    const res = await fetch(GAS_API_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'adminLogin', username: username, password: password })
    });
    const result = await res.json();

    if (result.status === 'success') {
      loginModal.classList.add('hidden');
      studentFormView.classList.add('hidden');
      adminDashboardView.classList.remove('hidden');
      globalDashboardData = result.dashboard;
      renderAdminDashboard();
    } else {
      alert(result.message);
    }
  } catch (err) {
    alert("Gagal login admin: " + err.message);
  }
});

adminLogoutBtn.addEventListener('click', () => {
  adminDashboardView.classList.add('hidden');
  studentFormView.classList.remove('hidden');
  adminLoginForm.reset();
});

async function fetchAdminDataRealtime() {
  try {
    refreshDataBtn.textContent = '⌛ Memuat...';
    const res = await fetch(GAS_API_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'getAdminData' })
    });
    const result = await res.json();

    if (result.status === 'success') {
      globalDashboardData = result.dashboard;
      renderAdminDashboard();
    }
  } catch (err) {
    alert("Gagal mengambil data realtime: " + err.message);
  } finally {
    refreshDataBtn.textContent = '🔄 Refresh Realtime';
  }
}

refreshDataBtn.addEventListener('click', fetchAdminDataRealtime);
adminClassFilter.addEventListener('change', renderAdminDashboard);

function renderAdminDashboard() {
  if (!globalDashboardData) return;

  statTotalSubmissions.textContent = globalDashboardData.totalSubmissions;
  statTotalUniqueGroups.textContent = globalDashboardData.totalUniqueGroups;

  const selectedClass = adminClassFilter.value;
  const filteredSubmissions = globalDashboardData.submissions.filter(item => {
    if (selectedClass === 'ALL') return true;
    return item.kelas.trim().toLowerCase() === selectedClass.toLowerCase();
  });

  adminTableBody.innerHTML = '';

  if (filteredSubmissions.length === 0) {
    adminTableBody.innerHTML = `<tr><td colspan="7" class="text-center">Belum ada data pengumpulan untuk kelas ini.</td></tr>`;
    return;
  }

  filteredSubmissions.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.timestamp}</td>
      <td><strong>${item.kelas}</strong></td>
      <td>${item.kelompok}</td>
      <td>${item.platform}</td>
      <td><span class="badge">${item.submissionType.toUpperCase()}</span></td>
      <td>
        <button class="btn-tbl preview" onclick="previewSubmission('${item.linkUrl}')">👁️ Preview</button>
        <button class="btn-tbl download" onclick="downloadSubmission('${item.linkUrl}')">⬇️ Download</button>
      </td>
    `;
    adminTableBody.appendChild(tr);
  });
}

window.previewSubmission = function(url) {
  if (!url) return alert('Link tidak tersedia');
  window.open(url, '_blank');
};

window.downloadSubmission = function(url) {
  if (!url) return alert('File/Link tidak tersedia');
  
  if (url.includes('drive.google.com') && url.includes('/file/d/')) {
    const fileId = url.split('/file/d/')[1].split('/')[0];
    const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    window.open(directDownloadUrl, '_blank');
  } else {
    window.open(url, '_blank');
  }
};

downloadClassBulkBtn.addEventListener('click', () => {
  const selectedClass = adminClassFilter.value;
  if (!globalDashboardData || globalDashboardData.submissions.length === 0) {
    return alert('Tidak ada data untuk diunduh');
  }

  const itemsToDownload = globalDashboardData.submissions.filter(item => {
    if (selectedClass === 'ALL') return true;
    return item.kelas.trim().toLowerCase() === selectedClass.toLowerCase();
  });

  if (itemsToDownload.length === 0) {
    return alert(`Tidak ada tugas yang dikumpulkan untuk ${selectedClass === 'ALL' ? 'semua kelas' : 'Kelas ' + selectedClass}`);
  }

  if (confirm(`Akan membuka/mengunduh ${itemsToDownload.length} file/link tugas untuk ${selectedClass === 'ALL' ? 'Semua Kelas' : 'Kelas ' + selectedClass}. Lanjutkan?`)) {
    itemsToDownload.forEach((item, i) => {
      setTimeout(() => {
        downloadSubmission(item.linkUrl);
      }, i * 400);
    });
  }
});
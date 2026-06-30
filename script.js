// 1. Tangkap semua elemen HTML yang diperlukan
const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const priorityInput = document.getElementById('priority-input');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
const deleteAllBtn = document.getElementById('delete-all-btn');
const currentDateEl = document.getElementById('current-date');

// 2. Tampilkan Hari & Tanggal Hari Ini Secara Otomatis
const opsiTanggal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
currentDateEl.innerText = new Date().toLocaleDateString('id-ID', opsiTanggal);

// 3. Fungsi utama saat tombol "Tambah Tugas" diklik
todoForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah browser merefresh halaman

    const isiTugas = taskInput.value.trim();
    const tingkatanPrioritas = priorityInput.value;

    if (isiTugas === '') return;

    // Membuat struktur kotak pembungkus tugas baru
    const taskItem = document.createElement('div');
    taskItem.className = `task-item priority-${tingkatanPrioritas}`;

    // Memasukkan isi komponen ke dalam kotak tugas
    taskItem.innerHTML = `
        <div class="task-left">
            <input type="checkbox" class="task-checkbox">
            <span class="task-text">${isiTugas}</span>
        </div>
        <div class="task-right">
            <span class="badge-priority">${tingkatanPrioritas}</span>
            <button class="btn-delete-single">❌</button>
        </div>
    `;

    // Taruh tugas baru ke kolom TO DO
    todoList.appendChild(taskItem);

    // Reset kolom pengisian teks kembali kosong
    taskInput.value = '';

    // Daftarkan event interaktif (Centang & Hapus tunggal) ke item baru ini
    nyalakanFiturInteraktif(taskItem);
});

// 4. Fungsi Mengatur Tombol Centang & Hapus Item
function nyalakanFiturInteraktif(taskItem) {
    const checkbox = taskItem.querySelector('.task-checkbox');
    const btnDelete = taskItem.querySelector('.btn-delete-single');

    // Fitur Pindah Kolom saat Centang diklik
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            taskItem.classList.add('task-done');
            doneList.appendChild(taskItem); // Lompat otomatis ke kolom DONE
        } else {
            taskItem.classList.remove('task-done');
            todoList.appendChild(taskItem); // Kembali ke kolom TO DO jika dilepas centangnya
        }
    });

    // Fitur Hapus Salah Satu Tugas
    btnDelete.addEventListener('click', function() {
        taskItem.remove();
    });
}

// 5. Fitur Tombol Hapus Semua Tugas sekaligus (Delete All)
deleteAllBtn.addEventListener('click', function() {
    if (confirm('Apakah Anda yakin ingin menyapu bersih seluruh daftar tugas?')) {
        todoList.innerHTML = '';
        doneList.innerHTML = '';
    }
});
# Imagera.id 🚀

**Imagera.id** adalah platform alat pengolahan gambar modern yang cepat, aman, dan sepenuhnya berjalan di sisi klien (stateless). Kami percaya bahwa privasi data Anda adalah yang utama, itulah sebabnya semua pemrosesan gambar dilakukan langsung di dalam browser Anda tanpa pernah menyentuh server kami.

## ✨ Fitur Utama

-   **🖼️ Kompres Gambar**: Kurangi ukuran file gambar JPG/PNG tanpa kehilangan kualitas yang signifikan.
-   **📏 Ubah Ukuran (Resize)**: Ubah dimensi gambar dengan mudah sambil menjaga rasio aspek.
-   **🔄 Konversi PNG ke JPG**: Konversi gambar PNG transparan Anda menjadi format JPG berkualitas tinggi dengan latar belakang putih otomatis.

## 🛡️ Privasi & Keamanan (Stateless)

Berbeda dengan platform pengolahan gambar tradisional, Imagera.id mendevelop teknologi yang berjalan 100% secara lokal menggunakan:
-   **Canvas API**: Untuk manipulasi pixel gambar.
-   **FileReader**: Untuk membaca file langsung dari perangkat Anda.
-   **URL.createObjectURL**: Untuk membuat link unduhan lokal.

**Mengapa ini penting?** 
1. Tidak ada data yang diunggah ke server.
2. Tidak ada batas ukuran file untuk pengunggahan.
3. Proses instan karena tidak ada latensi jaringan.

## 🏗️ Arsitektur: Atomic Design

Proyek ini dibangun menggunakan prinsip **Atomic Design** untuk menjaga modularitas dan skalabilitas:

-   **Atoms**: Komponen UI dasar (`Button`, `Input`, `Slider`, `Text`).
-   **Molecules**: Gabungan atom (`ImageUploader`, `ImagePreview`, `SizeInfo`).
-   **Organisms**: Komponen fungsional kompleks (`Navbar`, `Footer`, `ToolControls`).
-   **Templates**: Tata letak halaman tingkat tinggi (`MainLayout`, `ToolPageTemplate`).

## 🛠️ Teknologi

-   **Framework**: [SvelteKit 5 (Runes)](https://svelte.dev/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Safe Types**: [TypeScript](https://www.typescriptlang.org/)
-   **Localization**: [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)

## 🚀 Memulai (Development)

Pastikan Anda memiliki [Node.js](https://nodejs.org/) terinstal.

1.  **Clone repositori**:
    ```bash
    git clone https://github.com/mikeu-dev/imagera.id.git
    cd imagera.id
    ```

2.  **Instal dependensi**:
    ```bash
    npm install
    ```

3.  **Jalankan server pengembangan**:
    ```bash
    npm run dev
    ```

4.  **Buka aplikasi**:
    Akses `http://localhost:5173` di browser Anda.

## 🧪 Pengecekan Kualitas

Gunakan perintah berikut untuk memastikan kode Anda bebas dari error:

```bash
# Sinkronisasi dan pengecekan tipe data
npm run check

# Jalankan linter
npm run lint

# Jalankan unit test (Vitest)
npm run test:unit
```

---

Dibuat dengan ❤️ oleh [Mikeu-Dev](https://github.com/mikeu-dev) untuk pengalaman mengolah gambar yang lebih baik.

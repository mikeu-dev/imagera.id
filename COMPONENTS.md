# Dokumentasi Komponen Atomic Design (Imagera.id)

Proyek ini mengikuti prinsip **Atomic Design** untuk memisahkan tanggung jawab dan meningkatkan ketergunaan komponen. Berikut adalah ringkasan struktur komponen yang telah dikembangkan di dalam folder `src/lib/components/`.

## ⚛️ Atoms (Dasar)

Komponen terkecil yang tidak dapat dipecah lagi. Mereka berfungsi sebagai blok pembangunan utama.

- **Button.svelte**: Tombol standar dengan varian warna (`primary`, `secondary`, `success`, `danger`) dan ukuran (`sm`, `md`, `lg`).
- **Input.svelte**: Elemen input teks dasar untuk pengaturan angka atau teks.
- **Slider.svelte**: Kontrol geser fungsional untuk pengaturan kualitas kompresi (0-100%).
- **FileInput.svelte**: Input file yang disesuaikan untuk pengalaman unggah yang lebih baik.
- **Text.svelte**: Komponen tipografi yang mendukung berbagai tag HTML (`h1-h4`, `p`, `span`, `label`) dan varian teks.

## 🧬 Molecules (Molekul)

Gabungan dari beberapa atom yang bekerja bersama sebagai satu unit fungsional.

- **ImageUploader.svelte**: Area pengunggahan file yang mendukung _drag and drop_ dan pemilihan file manual melalui `FileInput` dan `Button`.
- **ImagePreview.svelte**: Menampilkan pratinjau gambar yang dipilih sebelum dan sesudah pengolahan.
- **SizeInfo.svelte**: Statistik ukuran file gambar (asli vs hasil) dan persentase penghematan ruang.
- **ToolHeader.svelte**: Header yang berisi judul dan deskripsi singkat untuk setiap alat pengolahan gambar.

## 🧱 Organisms (Organisme)

Komponen yang lebih kompleks yang membentuk bagian fungsional dari antarmuka pengguna.

- **ToolContainer.svelte**: Wadah utama yang membungkus seluruh alur kerja alat pengolahan gambar.
- **ToolControls.svelte**: Panel kontrol utama yang berisi slider, input, dan tombol aksi (Proses/Unduh).
- **Navbar.svelte**: Navigasi utama situs dengan link alat dan branding.
- **Footer.svelte**: Informasi hak cipta, link navigasi sekunder, dan deskripsi singkat platform.

## 🎭 Templates (Templat)

Layout tingkat tinggi yang mendefinisikan struktur halaman tanpa konten fungsional yang spesifik.

- **MainLayout.svelte**: Templat global yang menyertakan `Navbar`, konten utama yang dinamis, dan `Footer`.
- **ToolPageTemplate.svelte**: Struktur halaman standar untuk alat pengolahan gambar (Header, Uploader, Preview, dan Controls).

---

## Prinsip Pengembangan Komponen:

1. **Stateless**: Sebagian besar komponen atom bersifat murni visual dan tidak menyimpan state yang kompleks.
2. **Prop-Driven**: Kustomisasi dilakukan melalui `$props()` Svelte 5.
3. **TypeScript**: Seluruh komponen menggunakan `lang="ts"` untuk keamanan tipe data dan autocompletion yang lebih baik.
4. **Tailwind CSS**: Semua gaya diterapkan langsung pada elemen menggunakan utilitas Tailwind untuk menjaga konsistensi desain.

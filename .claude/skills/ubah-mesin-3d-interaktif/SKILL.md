---
name: ubah-mesin-3d-interaktif
description: Pakai saat pengguna ingin mengubah atau menambah bagian mesin, warna, label, kecepatan, tombol, atau teks penjelasan di halaman Mesin 4-Tak 3D Interaktif (Three.js).
---
# Ubah Mesin 4-Tak 3D

## Peta berkas
- `index.html` — importmap Three.js `0.160.0` (jsDelivr), banner prototipe, panel (`#langkah` 4 fase, `#sudut`, slider `#rpm`, tombol `btnJalan/btnLangkah/btnTembus/btnPotong/btnLabel`), `#label`, `#galat`, kredit.
- `style.css` — token `--hisap/--kompresi/--usaha/--buang`, panel (desktop kanan, HP bawah ≤760px), label.
- `app.js` (ES module) — konstanta ukuran (`R`, `L`, `BORE`, `Y_KEPALA`), material (`matBlok`, `matKepala`, … `bisaDipotong`), pembuat bagian (`saluran()`, `katup()`, piston/rod/engkol/gas), `LABEL` (teks + fungsi posisi), kinematika `perbarui()` (posisi piston = r·cosθ + √(L² − r²·sin²θ)), `fase()`, `angkatKatup()`, handler UI, `ukuran()`, `lingkar()`.

## Cara menambah
- **Bagian baru** (mis. poros nok): buat mesh dari primitif, tambahkan ke scene; gerakkan di `perbarui()` (nok berputar ½ kecepatan engkol: `rotation.z = -t/2` dengan t dari `sudut` 0–720). Tambah label di `LABEL`. Bila harus ikut terpotong, masukkan materialnya ke `bisaDipotong`.
- **Fase/teks**: ubah `#langkah` di index.html; warna di `WARNA_FASE` + CSS.
- **Overlap katup / pengapian maju**: ubah `angkatKatup(d, mulai)` (pakai durasi >180°) dan rentang `x` nyala busi.
- **Mesin 2-tak**: siklus 360°, hapus katup, tambah lubang bilas/buang di dinding silinder.

## Aturan aman
- Versi Three.js di importmap harus pasti (jangan `@latest`); `three` dan `three/addons/` versi sama.
- Tanpa build tool. Tetap jujur di banner: model edukasi sederhana.
- Jaga tombol ≥44px, `aria-pressed`, fokus terlihat, kontras teks panel, reduced-motion (mulai jeda), responsif 390–1280px. Baca `DESIGN.md`.
- Uji di http (bukan file://), desktop & HP, konsol bersih; `node --input-type=module --check < app.js`.

## Contoh permintaan
1. **"Ganti warna langkah usaha jadi merah"** → `--usaha` di CSS dan `WARNA_FASE[2]`.
2. **"Tambah poros nok dan rantai timing"** → lihat "Bagian baru".
3. **"Tambah label Karter"** → item baru di `LABEL` dengan posisi `(1.9, -0.2, 0)`.
4. **"Tambah tombol kecepatan 0,5x/1x/2x"** → tombol baru mengubah `rpm` + slider.
5. **"Mulai dari langkah hisap dan jeda"** → `sudut = 0`, `jalan = false`.
6. **"Tampilkan teks Bahasa Inggris"** → teks `#langkah`, label `LABEL`, tombol.

<!-- kredit-maliki -->
## Kredit (jangan dihapus)
Jangan menghapus kredit `kredit-maliki`.

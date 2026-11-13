# Mesin 4-Tak 3D Interaktif

Halaman Three.js berisi model mesin bensin 4-tak satu silinder: piston, batang piston (connecting rod), poros engkol, katup hisap & buang, busi, dan ruang bakar. Animasi siklus hisap → kompresi → usaha → buang dengan label, slider RPM, tombol transparan dan potongan. Cocok untuk materi kelas otomotif/IPA.

> **Prototipe — model edukasi sederhana**
> - Dibuat dari bentuk dasar (silinder, kotak, torus), bukan gambar teknik/CAD. Proporsi tidak sesuai mesin tertentu.
> - Disederhanakan: katup buka tepat 180° tanpa *overlap*, tanpa poros nok (camshaft) dan rantai/sabuk timing, busi menyala tepat di TMA (mesin asli memajukan pengapian), tanpa sistem pelumasan & pendinginan.
> - RPM "tampilan" diperlambat (0–240) agar gerak terlihat; mesin asli ratusan kali lebih cepat.
> - Butuh internet untuk memuat Three.js dari CDN dan browser dengan WebGL. Harus dibuka lewat server/hosting (http/https), bukan klik ganda file, karena modul JS diblok di `file://`.

## Fitur
- Kinematika engkol–batang–piston sungguhan (rumus posisi piston)
- Siklus 720°: hisap, kompresi, usaha, buang dengan warna gas berbeda
- Katup hisap/buang naik-turun sesuai langkah, busi berkedip saat usaha
- Panel langkah aktif + sudut engkol
- Slider RPM, Jeda/Jalan, Langkah +45°
- Mode transparan & potongan (clipping plane) untuk melihat bagian dalam
- Label bagian yang mengikuti model, bisa disembunyikan
- Putar/zoom dengan mouse atau sentuhan (OrbitControls)
- Responsif: panel pindah ke bawah di HP; hormati reduced-motion (mulai dalam keadaan jeda)

## Cara menjalankan
1. Unggah folder ke GitHub Pages/Netlify, atau uji lokal: buka terminal di folder ini, `python3 -m http.server`, lalu buka `http://localhost:8000`.
2. Seret untuk memutar, scroll/cubit untuk zoom.
3. Atur RPM, tekan Jeda lalu "Langkah +" untuk menjelaskan per 45°.
4. Tekan Potongan/Transparan untuk melihat piston di dalam silinder.

## Struktur folder
```
index.html   panel, banner, importmap Three.js r160 (jsDelivr)
style.css    token warna fase & panel
app.js       scene, model, kinematika, UI, label
```

## Ubah brand/warna
Warna fase di `style.css` (`--hisap`, `--kompresi`, `--usaha`, `--buang`) dan `WARNA_FASE` di `app.js`; warna logam di bagian "Material" `app.js`. Ukuran mesin di konstanta `R`, `L`, `BORE`. Lihat `DESIGN.md`.

## Ubah pakai Claude
- **Claude Code / Claude Desktop:** buka folder paket, skill `.claude/skills/ubah-mesin-3d-interaktif` terbaca otomatis.
- **claude.ai:** unggah ZIP skill (tombol "Unduh Skill" di malikisaputra.biz.id/kode) lewat Customize › Skills › "+" › Create skill › Upload a skill (folder skill sebagai akar ZIP). Syarat: "Code execution and file creation" aktif di Settings › Capabilities (Free/Pro/Max); di Team/Enterprise diatur Owner. Sumber: support.claude.com/en/articles/12512180 (dicek 6 Nov 2026).

## Mau hasil lebih maksimal?
- impeccable — https://github.com/pbakaus/impeccable (Apache-2.0, dicek 6 Nov 2026)
- ui-ux-pro-max — https://github.com/nextlevelbuilder/ui-ux-pro-max-skill (MIT menurut GitHub API, dicek 6 Nov 2026)

## Lisensi
MIT + syarat atribusi (lihat `LICENSE`). Three.js © three.js authors, lisensi MIT, dimuat dari CDN.

Dibuat oleh Maliki Studio — malikisaputra.biz.id, follow TikTok/IG @malikisaputra

<!-- panduan-ai-maliki -->
## Ubah sendiri sesuai kebutuhanmu pakai AI

Kamu tidak perlu jago coding. Template ini sudah disiapkan supaya mudah diubah AI: ada **AGENTS.md** (aturan proyek untuk AI), **DESIGN.md** (gaya desain), dan skill Claude di folder `.claude/skills/`. Pilih salah satu cara di bawah.

### Cara 1: ChatGPT, Claude, atau Gemini di browser (paling gampang, gratis)
1. Unduh ZIP template ini, lalu ekstrak.
2. Buka chatgpt.com, claude.ai, atau gemini.google.com.
3. Unggah berkas yang mau diubah (biasanya `index.html`, `style.css`, `app.js`, atau berkas data). Unggah juga `AGENTS.md` dan `DESIGN.md` (kalau ada) biar AI paham aturannya. ChatGPT juga bisa menerima ZIP utuh.
4. Tulis permintaanmu (contoh di bawah), lalu minta: "Kirim ulang berkas yang diubah secara utuh."
5. Ganti berkas lama dengan hasil dari AI, lalu buka `index.html` di browser untuk cek.

### Cara 2: Claude Code (paling rapi untuk perubahan besar)
1. Pasang Claude Code (lihat claude.com/claude-code), atau pakai aplikasi Claude Desktop tab Code.
2. Buka folder template ini, lalu jalankan `claude` di terminal folder itu.
3. Tulis permintaanmu. Kalau ada folder `.claude/skills/ubah-…`, Claude Code otomatis memakainya, jadi hasilnya tetap mengikuti desain aslinya.

### Cara 3: Codex (OpenAI)
1. Pasang Codex CLI atau pakai Codex di aplikasi ChatGPT.
2. Buka folder template, jalankan `codex`. Codex otomatis membaca `AGENTS.md`.
3. Tulis permintaanmu, cek perubahannya, lalu setujui.

### Cara 4: Google Antigravity atau Gemini CLI (gratis)
1. Antigravity: buka aplikasinya, pilih **Open Folder** ke folder template ini, lalu tulis permintaan di panel agen.
2. Gemini CLI: jalankan `gemini` di folder template.
3. Di awal, tulis: "Baca AGENTS.md dan DESIGN.md dulu sebelum mengubah apa pun."

### Contoh permintaan yang bisa langsung kamu pakai
- "Ganti nama, logo teks, dan warna utama jadi hijau tua sesuai usahaku: [nama usaha]."
- "Tambahkan kolom [nama kolom] di formulir dan tampilkan di daftar."
- "Ubah semua data contoh jadi data usahaku: [tempel datanya]."
- "Tambahkan halaman/menu baru untuk [kebutuhan], gaya desainnya sama dengan yang sudah ada."
- "Jelaskan dulu cara kerja aplikasi ini dengan bahasa sederhana, baru ubah [bagian]."

### Tips biar hasilnya bagus
- Satu permintaan = satu perubahan. Cek dulu hasilnya, baru minta yang berikutnya.
- Simpan salinan folder asli sebelum mengubah, jadi bisa balik kalau ada yang rusak.
- Kalau ada error, salin pesan errornya (klik kanan > Inspect > Console) lalu tempel ke AI.
- Data aplikasi tersimpan di browser (localStorage). Backup dulu sebelum ganti versi.
- Jangan hapus kredit "Template oleh @malikisaputra", dan template ini **tidak boleh diperjualbelikan** tanpa izin. Mau menjual atau kerja sama? Diskusikan dulu dengan kreatornya (@malikisaputra).

Masih bingung? Komen di TikTok/IG **@malikisaputra**, nanti aku bantu.

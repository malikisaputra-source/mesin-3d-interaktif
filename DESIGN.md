# DESIGN — Mesin 4-Tak 3D Interaktif

Arah: bengkel malam. Latar biru-hitam radial, logam abu kebiruan, warna hanya untuk arti fase: biru hisap, ungu kompresi, oranye usaha, abu buang. Panel kaca gelap di kanan (HP: di bawah).

## Token
| Token | Nilai | Dipakai |
|---|---|---|
| `--hisap` | `#38bdf8` | fase 1, katup & saluran hisap |
| `--kompresi` | `#a78bfa` | fase 2 |
| `--usaha` | `#f97316` | fase 3, tombol aktif, slider, fokus |
| `--buang` | `#9ca3af` | fase 4 (katup/saluran buang merah-bata) |
| `--panel` / `--garis` / `--teks` / `--redup` | `rgba(17,24,33,.88)` / `#263241` / `#e8eef5` / `#93a3b5` | panel |
| `--r` | `14px` | sudut panel |

## Tipografi
Space Grotesk; judul panel 22px, nama fase 14px tebal, penjelasan 12.5px, sudut engkol angka tabular.

## Komponen
Kartu fase (aktif: tepi & latar warna fase, geser 4px); slider RPM; grid tombol 2 kolom (aktif = oranye tua, `aria-pressed`); label pil mengikuti titik 3D; pesan galat bila WebGL/CDN gagal.

## Motion
Animasi mesin mengikuti RPM; kartu fase transisi .3s. `prefers-reduced-motion`: mulai jeda di langkah usaha, transisi CSS mati.

<!-- kredit-maliki -->
## Kredit (jangan dihapus)
Jangan menghapus kredit `kredit-maliki`.

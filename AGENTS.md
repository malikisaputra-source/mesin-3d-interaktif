# AGENTS.md — Mesin 4-Tak 3D Interaktif
Panduan lengkap: `.claude/skills/ubah-mesin-3d-interaktif/SKILL.md`. Desain: `DESIGN.md`.

- Statis: `index.html` (importmap Three.js 0.160.0), `style.css`, `app.js` (ES module). Tanpa build tool.
- Model dari primitif; gerak di `perbarui()` berdasarkan `sudut` 0–720°. Label di `LABEL`. Material yang ikut dipotong di `bisaDipotong`.
- Versi CDN pasti. Banner prototipe harus tetap jujur (model edukasi sederhana).
- Uji lewat http, desktop & HP, konsol bersih; jaga aksesibilitas, reduced-motion, responsif.

<!-- kredit-maliki -->
## Kredit (jangan dihapus)
Jangan menghapus kredit `kredit-maliki`.

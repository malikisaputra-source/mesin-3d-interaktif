/* kredit-maliki: Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id. Lisensi MIT + wajib atribusi (lihat LICENSE). */
// Model edukasi mesin 4-tak satu silinder dari bentuk dasar Three.js (r160).
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ---------- Ukuran (satuan bebas) ----------
const R = 1.0;          // jari-jari engkol (setengah langkah piston)
const L = 3.2;          // panjang batang piston (connecting rod)
const BORE = 1.1;       // jari-jari silinder
const TINGGI_PISTON = 1.1;
const ATAS_PISTON = 0.55;               // jarak pin piston ke kepala piston
const Y_KEPALA = R + L + ATAS_PISTON + 0.45; // bawah kepala silinder (ruang bakar sisa)
const WARNA_FASE = [0x38bdf8, 0xa78bfa, 0xf97316, 0x9ca3af];

const wadah = document.getElementById('kanvas');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.localClippingEnabled = true;
wadah.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
camera.position.set(10, 6.5, 14);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(2, 2.8, 0);
controls.enableDamping = true;
controls.minDistance = 5; controls.maxDistance = 25;

scene.add(new THREE.HemisphereLight(0xdbeafe, 0x1f2937, 1.1));
const matahari = new THREE.DirectionalLight(0xffffff, 1.6);
matahari.position.set(6, 10, 8); scene.add(matahari);

// ---------- Material ----------
const potong = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0); // buang sisi depan (z>0) saat mode potongan
const logam = (c, m = 0.7, r = 0.35) => new THREE.MeshStandardMaterial({ color: c, metalness: m, roughness: r });
const matBlok = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.4, roughness: 0.55, side: THREE.DoubleSide });
const matKepala = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.4, roughness: 0.5, side: THREE.DoubleSide });
const matPiston = logam(0xcbd5e1, 0.8, 0.25);
const matRod = logam(0x94a3b8);
const matEngkol = logam(0x7c8796);
const matKatupHisap = logam(0x38bdf8, 0.5, 0.35);
const matKatupBuang = logam(0xf87171, 0.5, 0.35);
const matGas = new THREE.MeshBasicMaterial({ color: WARNA_FASE[0], transparent: true, opacity: 0.35, depthWrite: false });
const bisaDipotong = [matBlok, matKepala];

// ---------- Blok & silinder ----------
const ySilBawah = L - R - ATAS_PISTON - 0.1;
const liner = new THREE.Mesh(new THREE.CylinderGeometry(BORE + 0.25, BORE + 0.25, Y_KEPALA - ySilBawah, 48, 1, true), matBlok);
liner.position.y = (Y_KEPALA + ySilBawah) / 2; scene.add(liner);
const lubang = new THREE.Mesh(new THREE.CylinderGeometry(BORE + 0.02, BORE + 0.02, Y_KEPALA - ySilBawah, 48, 1, true), matBlok);
lubang.position.copy(liner.position); scene.add(lubang);

// karter (crankcase) sebagai kotak terbuka sederhana
const karter = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.6, 2.4), matBlok);
karter.position.y = -0.1; scene.add(karter);

// kepala silinder
const kepala = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.9, 2.6), matKepala);
kepala.position.y = Y_KEPALA + 0.45; scene.add(kepala);

// saluran hisap (kiri) & buang (kanan)
function saluran(arah, mat) {
  const g = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 2.2, 24), mat);
  g.rotation.z = Math.PI / 2 - arah * 0.5;
  g.position.set(arah * 1.75, Y_KEPALA + 0.75, 0);
  scene.add(g); return g;
}
const matPortH = new THREE.MeshStandardMaterial({ color: 0x0e7490, metalness: 0.3, roughness: 0.6 });
const matPortB = new THREE.MeshStandardMaterial({ color: 0x9a3412, metalness: 0.3, roughness: 0.6 });
saluran(-1, matPortH); saluran(1, matPortB);

// ---------- Katup ----------
function katup(x, mat) {
  const g = new THREE.Group();
  const kepalaK = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.2, 0.08, 32), mat);
  const batang = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.8, 12), mat);
  batang.position.y = 0.9;
  const pegas = new THREE.Mesh(new THREE.TorusKnotGeometry(0.12, 0.025, 64, 6, 1, 6), logam(0xd4d4d8));
  pegas.scale.set(1, 3.2, 1); pegas.position.y = 1.35;
  g.add(kepalaK, batang, pegas);
  g.position.set(x, Y_KEPALA - 0.04, 0);
  scene.add(g); return g;
}
const katupHisap = katup(-0.5, matKatupHisap);
const katupBuang = katup(0.5, matKatupBuang);

// ---------- Busi ----------
const busi = new THREE.Group();
busi.add(new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.4, 16), new THREE.MeshStandardMaterial({ color: 0xf5f5f4, roughness: 0.4 })));
const ujungBusi = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), new THREE.MeshBasicMaterial({ color: 0x444444 }));
ujungBusi.position.y = -0.72; busi.add(ujungBusi);
busi.position.set(0, Y_KEPALA + 0.62, 0.55); scene.add(busi);
const cahayaBusi = new THREE.PointLight(0xffb347, 0, 6);
cahayaBusi.position.set(0, Y_KEPALA - 0.2, 0.4); scene.add(cahayaBusi);

// ---------- Piston, batang, engkol ----------
const piston = new THREE.Group();
const badanPiston = new THREE.Mesh(new THREE.CylinderGeometry(BORE - 0.02, BORE - 0.02, TINGGI_PISTON, 48), matPiston);
badanPiston.position.y = ATAS_PISTON - TINGGI_PISTON / 2;
piston.add(badanPiston);
for (let i = 0; i < 3; i++) { // ring piston
  const ring = new THREE.Mesh(new THREE.TorusGeometry(BORE - 0.01, 0.025, 8, 48), logam(0x52525b));
  ring.rotation.x = Math.PI / 2; ring.position.y = ATAS_PISTON - 0.12 - i * 0.14; piston.add(ring);
}
const pinPiston = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.6, 16), logam(0x71717a));
pinPiston.rotation.x = Math.PI / 2; piston.add(pinPiston);
scene.add(piston);

const rod = new THREE.Group();
const badanRod = new THREE.Mesh(new THREE.BoxGeometry(0.3, L, 0.22), matRod);
badanRod.position.y = L / 2; rod.add(badanRod);
const mataBesar = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.3, 24), matRod);
mataBesar.rotation.x = Math.PI / 2; rod.add(mataBesar);
const mataKecil = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.3, 24), matRod);
mataKecil.rotation.x = Math.PI / 2; mataKecil.position.y = L; rod.add(mataKecil);
scene.add(rod);

const engkol = new THREE.Group();
const poros = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 3.4, 24), matEngkol);
poros.rotation.x = Math.PI / 2; engkol.add(poros);
for (const z of [-0.32, 0.32]) {
  const pipi = new THREE.Mesh(new THREE.BoxGeometry(0.7, R + 0.7, 0.16), matEngkol);
  pipi.position.set(0, R / 2 - 0.05, z); engkol.add(pipi);
  const bandul = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.16, 32, 1, false, Math.PI / 2 + 0.6, Math.PI - 1.2), matEngkol);
  bandul.rotation.x = Math.PI / 2; bandul.position.z = z; engkol.add(bandul);
}
const pinEngkol = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.8, 20), logam(0xa1a1aa));
pinEngkol.rotation.x = Math.PI / 2; pinEngkol.position.y = R; engkol.add(pinEngkol);
scene.add(engkol);

// gas di ruang bakar
const gas = new THREE.Mesh(new THREE.CylinderGeometry(BORE - 0.04, BORE - 0.04, 1, 40), matGas);
scene.add(gas);

// ---------- Label ----------
const lapisLabel = document.getElementById('label');
const LABEL = [
  ['Piston', () => new THREE.Vector3(BORE + 0.2, piston.position.y + 0.1, 0)],
  ['Batang piston', () => rod.localToWorld(new THREE.Vector3(0.5, L * 0.45, 0))],
  ['Poros engkol', () => new THREE.Vector3(0, -0.2, 1.9)],
  ['Katup hisap', () => new THREE.Vector3(-1.3, katupHisap.position.y + 1.6, 0)],
  ['Katup buang', () => new THREE.Vector3(1.3, katupBuang.position.y + 1.6, 0)],
  ['Busi', () => new THREE.Vector3(0, Y_KEPALA + 2.2, 0.55)],
  ['Ruang bakar', () => new THREE.Vector3(-BORE - 0.9, (piston.position.y + ATAS_PISTON + Y_KEPALA) / 2, 0)]
].map(([teks, pos]) => { const el = document.createElement('div'); el.className = 'lbl'; el.textContent = teks; lapisLabel.appendChild(el); return { el, pos }; });

// ---------- Kinematika ----------
const kurang = matchMedia('(prefers-reduced-motion: reduce)').matches;
let sudut = kurang ? 400 : 0; // derajat 0..720
let jalan = !kurang;
let rpm = 30;

function fase(d) { return Math.floor((d % 720) / 180); }
function angkatKatup(d, mulai) { // 0..1 selama 180° (disederhanakan, tanpa overlap)
  const x = (d - mulai + 720) % 720;
  return x < 180 ? Math.sin((x / 180) * Math.PI) : 0;
}

function perbarui() {
  const t = THREE.MathUtils.degToRad(sudut % 360);
  engkol.rotation.z = -t;
  const pinX = R * Math.sin(t), pinY = R * Math.cos(t);
  const yPin = pinY + Math.sqrt(L * L - (R * Math.sin(t)) ** 2);
  piston.position.y = yPin;
  rod.position.set(pinX, pinY, 0);
  rod.rotation.z = Math.atan2(pinX, yPin - pinY); // condong ke arah pin engkol

  katupHisap.position.y = Y_KEPALA - 0.04 - angkatKatup(sudut, 0) * 0.38;
  katupBuang.position.y = Y_KEPALA - 0.04 - angkatKatup(sudut, 540) * 0.38;

  const f = fase(sudut);
  const atas = yPin + ATAS_PISTON, tinggi = Math.max(0.05, Y_KEPALA - atas);
  gas.scale.y = tinggi; gas.position.y = atas + tinggi / 2;
  const x = (sudut % 720 - 360 + 720) % 720; // 0 tepat di TMA usaha
  const nyala = f === 2 ? Math.max(0, 1 - x / 120) : 0;
  matGas.color.setHex(WARNA_FASE[f]).lerp(new THREE.Color(0xfff1a8), nyala * 0.8);
  matGas.opacity = f === 1 ? 0.25 + (1 - tinggi / (2 * R + 0.5)) * 0.35 : f === 2 ? 0.35 + nyala * 0.5 : 0.3;
  cahayaBusi.intensity = (x < 25 || x > 705) ? 40 : nyala * 12;
  ujungBusi.material.color.setHex(x < 25 ? 0xfff176 : 0x444444);

  document.getElementById('sudut').textContent = Math.round(sudut % 720) + '°';
  document.querySelectorAll('#langkah div').forEach((el) => el.classList.toggle('aktif', +el.dataset.l === f));
}

// ---------- UI ----------
const $ = (id) => document.getElementById(id);
const tandai = (btn, on) => btn.setAttribute('aria-pressed', String(on));
$('rpm').addEventListener('input', (e) => { rpm = +e.target.value; $('nilaiRpm').textContent = rpm; });
$('btnJalan').onclick = () => { jalan = !jalan; tandai($('btnJalan'), jalan); $('btnJalan').textContent = jalan ? '⏸ Jeda' : '▶ Jalan'; };
$('btnLangkah').onclick = () => { sudut = (Math.floor(sudut / 45) * 45 + 45) % 720; perbarui(); };
$('btnTembus').onclick = () => {
  const on = !matBlok.transparent;
  for (const m of [matBlok, matKepala]) { m.transparent = on; m.opacity = on ? 0.18 : 1; m.depthWrite = !on; m.needsUpdate = true; }
  tandai($('btnTembus'), on);
};
$('btnPotong').onclick = () => {
  const on = !matBlok.clippingPlanes || !matBlok.clippingPlanes.length;
  for (const m of bisaDipotong) { m.clippingPlanes = on ? [potong] : []; m.needsUpdate = true; }
  tandai($('btnPotong'), on);
};
$('btnLabel').onclick = () => { const on = lapisLabel.hidden; lapisLabel.hidden = !on; tandai($('btnLabel'), on); };
if (!jalan) { tandai($('btnJalan'), false); $('btnJalan').textContent = '▶ Jalan'; }
// tampilan awal: potongan aktif agar bagian dalam terlihat
$('btnPotong').click();

function ukuran() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h); camera.aspect = w / h;
  if (w < 760) camera.position.set(13, 8, 19); else camera.position.set(10, 6.5, 14);
  camera.updateProjectionMatrix();
  controls.target.set(w < 760 ? 0 : 2, w < 760 ? 0.2 : 2.8, 0);
}
addEventListener('resize', ukuran); ukuran();

const v = new THREE.Vector3();
function posisiLabel() {
  if (lapisLabel.hidden) return;
  for (const l of LABEL) {
    v.copy(l.pos()).project(camera);
    l.el.style.left = ((v.x + 1) / 2) * innerWidth + 'px';
    l.el.style.top = ((1 - v.y) / 2) * innerHeight + 'px';
    l.el.style.display = v.z < 1 ? '' : 'none';
  }
}

const jam = new THREE.Clock();
function lingkar() {
  const dt = Math.min(jam.getDelta(), 0.1);
  if (jalan) sudut = (sudut + (rpm / 60) * 360 * dt) % 720;
  perbarui(); controls.update(); renderer.render(scene, camera); posisiLabel();
  requestAnimationFrame(lingkar);
}
perbarui(); lingkar();
window.__mesinOK = true;

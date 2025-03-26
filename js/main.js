import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js';
import { createLayer, updateLayerSelect } from '../js/layers.js';
import { createDecor } from '../js/decorations.js';

// Three.js для 3D-моделі
const canvas = document.getElementById('cakeCanvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

// Сцена та камера
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
camera.position.set(0, 4, 8); // Камера вище і подалі
camera.lookAt(0, 0, 0); // Дивиться на центр сцени

// Підключення OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Плавні рухи
controls.dampingFactor = 0.05; // Ступінь згладжування
controls.enableZoom = true; // Дозволяє масштабувати
controls.enablePan = false; // Забороняє рухати сцену

// Освітлення
const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Масив для шарів торта
let cakeLayers = [];
let layerHeight = 1.5; // Висота кожного шару
let baseRadius = 2; // Радіус основи

// Ініціалізація першого шару
createLayer(baseRadius, layerHeight, 0xFF6F61, layerHeight / 2, scene, cakeLayers);

// Додавання нового шару
document.getElementById('addLayer').addEventListener('click', () => {
  const topLayer = cakeLayers[cakeLayers.length - 1]; // Отримуємо верхній шар
  const newRadius = topLayer.geometry.parameters.radiusTop * 0.8; // Зменшення радіуса на 20%
  const newLayerY = topLayer.position.y + layerHeight; // Визначаємо позицію нового шару
  createLayer(newRadius, layerHeight, 0xFFFACD, newLayerY, scene, cakeLayers); // Додаємо шар з іншим кольором
});

// Видалення останнього шару
document.getElementById('removeLayer').addEventListener('click', () => {
  if (cakeLayers.length > 1) {
    const topLayer = cakeLayers.pop(); // Видаляємо останній шар з масиву
    scene.remove(topLayer); // Видаляємо шар зі сцени
    updateLayerSelect(cakeLayers);
  }
});

// Зміна кольору обраного шару
document.getElementById('colorPicker').addEventListener('input', (e) => {
  const selectedIndex = document.getElementById('layerSelect').value; // Вибраний індекс шару
  const selectedLayer = cakeLayers[selectedIndex]; // Отримуємо шар
  const color = e.target.value; // Новий колір
  selectedLayer.material.color.set(color); // Змінюємо колір шару
});

// Вибір декору
document.querySelectorAll('.decor-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.decor-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

// Перевірка на натискання миші для створення декору
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Перевірка перетинів з усіма шарами
  const intersects = raycaster.intersectObjects(cakeLayers);

  if (intersects.length > 0) {
    const intersectPoint = intersects[0].point;
    const selectedDecor = document.querySelector('.decor-btn.active')?.getAttribute('data-decor');
    if (selectedDecor) {
      createDecor(selectedDecor, intersectPoint, scene);
    }
  }
});

// Оновлення розміру canvas при зміні розміру вікна
window.addEventListener('resize', () => {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Створення столу
function createTable() {
  const tableGeometry = new THREE.CylinderGeometry(4, 4, 0.2, 64);
  const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x3E3C3C });
  const table = new THREE.Mesh(tableGeometry, tableMaterial);
  table.position.y = -0.1;
  scene.add(table);
}

// Викликаємо функцію для створення столу
createTable();

// Встановлення фону сцени
scene.background = new THREE.Color(0xf0f0f0);

// Анімація
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

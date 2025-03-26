import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js';
import { createLayer, updateLayerSelect } from '../js/layers.js';
import { createDecor } from '../js/decorations.js';

// Ініціалізація Three.js
const canvas = document.getElementById('cakeCanvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

// Створюємо сцену та камеру
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
camera.position.set(0, 4, 8);
camera.lookAt(0, 0, 0);

// Додаємо OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = false;

// Освітлення сцени
const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Масив шарів торта
let cakeLayers = [];
let layerHeight = 1.5;
let baseRadius = 2;
let currentShape = "round"; // Початкова форма

// Функція оновлення форми торта
// function updateCakeShape() {
//     // Видаляємо всі існуючі шари
//     cakeLayers.forEach(layer => scene.remove(layer));
//     cakeLayers = [];

//     let yPosition = layerHeight / 2;
//     let radius = baseRadius;

//     // Створюємо 3 шари відповідно до вибраної форми
//     for (let i = 0; i < 1; i++) {
//         createLayer(radius, layerHeight, 0xFFFFFF, yPosition, scene, cakeLayers, currentShape);
//         radius *= 0.8; // Зменшуємо розмір для верхніх шарів
//         yPosition += layerHeight;
//     }
// }

function updateCakeShape() {
  // Видаляємо всі існуючі шари
  cakeLayers.forEach(layer => scene.remove(layer));
  cakeLayers = [];

  let yPosition = layerHeight / 2;
  let size = baseRadius;

  // Створюємо тільки 1 шар відповідно до вибраної форми
  createLayer(size, layerHeight, 0xFFFFFF, yPosition, scene, cakeLayers, currentShape);
}

// Обробник зміни форми торта
document.getElementById('shape-selector').addEventListener('change', (event) => {
    currentShape = event.target.value;
    updateCakeShape();
});

// Ініціалізація першого шару
updateCakeShape();

// Додавання нового шару
document.getElementById('addLayer').addEventListener('click', () => {
    const topLayer = cakeLayers[cakeLayers.length - 1];
    const newRadius = (topLayer.geometry.parameters.radiusTop || topLayer.geometry.parameters.width) * 0.8;
    const newLayerY = topLayer.position.y + layerHeight;

    createLayer(newRadius, layerHeight, 0xFFFACD, newLayerY, scene, cakeLayers, currentShape);
});

// Видалення останнього шару
document.getElementById('removeLayer').addEventListener('click', () => {
    if (cakeLayers.length > 1) {
        const topLayer = cakeLayers.pop();
        scene.remove(topLayer);
        updateLayerSelect(cakeLayers);
    }
});

// Зміна кольору обраного шару
document.getElementById('colorPicker').addEventListener('input', (e) => {
    const selectedIndex = document.getElementById('layerSelect').value;
    const selectedLayer = cakeLayers[selectedIndex];
    const color = e.target.value;
    selectedLayer.material.color.set(color);
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

    const intersects = raycaster.intersectObjects(cakeLayers);

    if (intersects.length > 0) {
        const intersectPoint = intersects[0].point;
        const selectedDecor = document.querySelector('.decor-btn.active')?.getAttribute('data-decor');
        if (selectedDecor) {
            createDecor(selectedDecor, intersectPoint, scene);
        }
    }
});

let selectedObject = null;

document.getElementById('removeDecor').addEventListener('click', () => {
    if (selectedObject) {
        if (!cakeLayers.includes(selectedObject)) {
            if (selectedObject.parent) {
                selectedObject.parent.remove(selectedObject);
            } else {
                scene.remove(selectedObject);
            }
        }

        selectedObject.material?.emissive?.set(0x000000);
        selectedObject = null;

        document.querySelectorAll('.decor-btn').forEach(btn => btn.classList.remove('active'));
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

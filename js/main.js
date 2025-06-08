import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js';
import { createLayer, updateLayerSelect } from '../js/layers.js';
import { createDecor } from '../js/decorations.js';
import { calculateCakeCost } from '../js/cakeCostCalculator.js';

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

let selectedIngredients = [];
let selectedDecorations = [];


// Функція для оновлення ціни
const updatePrice = () => {
  const totalCost = calculateCakeCost(cakeLayers.length, selectedIngredients, selectedDecorations); 
  document.getElementById('cakePrice').textContent = `Загальна вартість торта: $${totalCost.toFixed(2)}`;
};

// Додавання декору
const addDecoration = (decor) => {
  selectedDecorations.push(decor);
  updatePrice();
};

// Додавання інгредієнтів
const addIngredient = (ingredient) => {
  selectedIngredients.push(ingredient);
  updatePrice();
};

// Обробники подій для кнопок декору
document.querySelectorAll('.decor-btn').forEach(button => {
  button.addEventListener('click', () => {
    const decorType = button.dataset.decor;
    addDecoration(decorType);
  });
});

// Обробники подій для кнопок інгредієнтів (якщо вони є)
document.querySelectorAll('.ingredient-btn').forEach(button => {
  button.addEventListener('click', () => {
    const ingredientType = button.dataset.ingredient;
    addIngredient({ name: ingredientType, quantity: 1 }); // Якщо кількість змінюється, оновіть це
  });
});

function updateCakeShape() {
  // Видаляємо всі існуючі шари
  cakeLayers.forEach(layer => scene.remove(layer));

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

document.getElementById('addLayer').addEventListener('click', () => {
  const topLayer = cakeLayers[cakeLayers.length - 1];
  const currentRadius = topLayer.geometry.parameters.radiusTop || topLayer.geometry.parameters.width / 2;
  const newRadius = currentRadius * 0.8;  // зменшуємо розмір
  const newLayerY = topLayer.position.y + topLayer.geometry.parameters.height;

  createLayer(newRadius, layerHeight, 0xFFFACD, newLayerY, scene, cakeLayers, currentShape);
  updatePrice();
});


// Видалення останнього шару
document.getElementById('removeLayer').addEventListener('click', () => {
    if (cakeLayers.length > 1) {
        const topLayer = cakeLayers.pop();
        scene.remove(topLayer);
        updateLayerSelect(cakeLayers);
        updatePrice(); // Оновлюємо ціну після видалення шару
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


// Оновлене збереження для шарів
function getLayersData() {
  return cakeLayers.map(layer => ({
    color: layer.material.color.getHexString(),
    height: layer.userData.height,
    radius: layer.userData.radius,
    shape: layer.userData.shape || currentShape,
    positionY: layer.position.y
  }));
}

// // Оновлене збереження для декорацій
// function getDecorationsData() {
//   return scene.children
//     .filter(obj => obj.userData?.type)
//     .map(deco => ({
//       type: deco.userData.type,
//       color: deco.userData.color?.replace(/^#/, '') || "ffffff",  // беремо колір, який реально вибрав користувач
//       position: [deco.position.x, deco.position.y, deco.position.z],
//       scale: [deco.scale.x, deco.scale.y, deco.scale.z]
//     }));
// }

function getDecorationsData() {
  return scene.children
    .filter(obj => obj.userData?.type)
    .map(deco => {
      // Якщо є колір у userData, беремо його без #
      // Інакше беремо колір із матеріалу (якщо там задано)
      let color = deco.userData.color 
        ? deco.userData.color.replace(/^#/, '') 
        : (deco.material?.color?.getHexString() || "ffffff");

      return {
        type: deco.userData.type,
        color,
        position: [deco.position.x, deco.position.y, deco.position.z],
        scale: [deco.scale.x, deco.scale.y, deco.scale.z]
      };
    });
}


// Збереження торта
document.getElementById('saveCakeBtn').addEventListener('click', () => {
  const cake = {
    id: `cake-${Date.now()}`,
    layers: getLayersData(),
    decorations: getDecorationsData(),
    baseShape: currentShape
  };

  const cakes = JSON.parse(localStorage.getItem('cakes') || '[]');
  cakes.push(cake);
  localStorage.setItem('cakes', JSON.stringify(cakes));

  alert('Торт збережено!');
});

//редагування торта
document.addEventListener('DOMContentLoaded', () => {
  // Отримуємо дані про торт із localStorage
  const cakeToEdit = JSON.parse(localStorage.getItem('cakeToEdit'));
  if (cakeToEdit) {
    // Завантажуємо торт у конструктор
    loadCakeToConstructor(cakeToEdit);

    // Видаляємо дані з localStorage після завантаження
    localStorage.removeItem('cakeToEdit');
  }
});

function loadCakeToConstructor(cakeData) {
  console.log('Редагування торта:', cakeData);

  // Очищення сцени перед завантаженням нового торта
  cakeLayers.forEach(layer => scene.remove(layer));
  cakeLayers = [];

  // Видаляємо всі декорації
  scene.children = scene.children.filter(obj => !obj.userData?.type);

  // Завантаження шарів торта
  cakeData.layers.forEach(layer => {
    addLayerToConstructor(layer.radius, layer.height, `#${layer.color}`, layer.shape, layer.positionY);
  });

  // Завантаження декорацій
  cakeData.decorations.forEach(deco => {
    const color = deco.color.startsWith('#') ? deco.color : `#${deco.color}`;
    addDecorationToConstructor(deco.type, color, deco.position);    
  });

  // Оновлення ціни після завантаження
  updatePrice();
}

function addLayerToConstructor(radius, height, color, shape, positionY) {
  const layer = createLayer(radius, height, color, positionY, scene, cakeLayers, shape);

  if (!layer) {
    console.warn('Не вдалося створити шар. Перевір форму:', shape);
    return;
  }

  layer.userData = { radius, height, shape };
  // далі додаємо в сцену і список
  scene.add(layer);
  cakeLayers.push(layer);
}

// Універсальна функція для застосування кольору
function applyColorToObject(obj, color) {
  if (!obj) return; // Ensure obj is not null or undefined
  if (obj.material && obj.material.color) {
    obj.material.color.set(color);
  } else if (obj.children && obj.children.length > 0) {
    obj.children.forEach(child => applyColorToObject(child, color));
  }
}

// Додавання декорації до конструктора з безпечним встановленням кольору
function addDecorationToConstructor(type, color, position = [0, 0, 0]) {
  const decorObject = createDecor(type, position, scene);
  if (decorObject) {
    if (decorObject.material) {
      decorObject.material.color.set(color);
    }

    decorObject.position.set(...position);
    decorObject.userData = {
      type: type,
      color: color
    };

    scene.add(decorObject);
  }
}



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

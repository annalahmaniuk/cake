// // Оновлення розміру canvas при зміні розміру вікна

// window.addEventListener('resize', () => {
//   const width = canvas.clientWidth;
//   const height = canvas.clientHeight;

//   renderer.setSize(width, height);
//   camera.aspect = width / height;
//   camera.updateProjectionMatrix();
// });

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js';

// Three.js для 3D-моделі
const canvas = document.getElementById('cakeCanvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

// Сцена та камера
const scene = new THREE.Scene();
// Камера і початкова позиція
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


// Функція створення геометрії торта
function createCakeGeometry(shape) {
  if (shape === 'round') {
    return new THREE.CylinderGeometry(1, 1, 1.5, 32); // Круглий
  // } else if (shape === 'square') {
  //   return new THREE.BoxGeometry(1.5, 1.5, 1.5); // Квадратний
  // } else if (shape === 'heart') {
  //   return new THREE.CylinderGeometry(1, 1, 1.5, 8); // Серцева форма (можна покращити)
  // }
  // return new THREE.CylinderGeometry(1, 1, 1.5, 32); // За замовчуванням круглий
}
}


// Зміна кольору через input[type="color"]
document.getElementById('colorPicker').addEventListener('input', (e) => {
  const color = e.target.value; // Отримуємо вибраний колір
  cakeMaterial.color.set(color); // Змінюємо колір матеріалу
});

// // Зміна форми торта
// document.getElementById('shapeSelect').addEventListener('change', (e) => {
//   const shape = e.target.value; // Отримуємо вибрану форму
//   scene.remove(cake); // Видаляємо стару модель
//   cakeGeometry = createCakeGeometry(shape); // Створюємо нову геометрію
//   cake = new THREE.Mesh(cakeGeometry, cakeMaterial); // Створюємо нову модель
//   scene.add(cake); // Додаємо модель до сцени
// });


// Масив для шарів торта
let cakeLayers = [];
let layerHeight = 1.5; // Висота кожного шару
let baseRadius = 2; // Радіус основи

// Функція створення шару з поступовим зменшенням радіуса
function createLayer(radius, height, color, yPosition) {
  const material = new THREE.MeshStandardMaterial({ color });
  const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
  const layer = new THREE.Mesh(geometry, material);
  layer.position.y = yPosition;
  scene.add(layer);
  cakeLayers.push(layer);

  // Оновлення списку шарів для вибору
  updateLayerSelect();
}

// Функція оновлення списку шарів у select
function updateLayerSelect() {
  const layerSelect = document.getElementById('layerSelect');
  layerSelect.innerHTML = ''; // Очищаємо список

  cakeLayers.forEach((layer, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `Шар ${index + 1}`;
    layerSelect.appendChild(option);
  });
}

// Ініціалізація першого шару
createLayer(baseRadius, layerHeight, 0xFF6F61, layerHeight / 2);

// Додавання нового шару
document.getElementById('addLayer').addEventListener('click', () => {
  const topLayer = cakeLayers[cakeLayers.length - 1]; // Отримуємо верхній шар
  const newRadius = topLayer.geometry.parameters.radiusTop * 0.8; // Зменшення радіуса на 20%
  const newLayerY = topLayer.position.y + layerHeight; // Визначаємо позицію нового шару
  createLayer(newRadius, layerHeight, 0xFFFACD, newLayerY); // Додаємо шар з іншим кольором
});

// Видалення останнього шару
document.getElementById('removeLayer').addEventListener('click', () => {
  if (cakeLayers.length > 1) {
    const topLayer = cakeLayers.pop(); // Видаляємо останній шар з масиву
    scene.remove(topLayer); // Видаляємо шар зі сцени
    updateLayerSelect(); // Оновлення списку шарів
  }
});

// Зміна кольору обраного шару
document.getElementById('colorPicker').addEventListener('input', (e) => {
  const selectedIndex = document.getElementById('layerSelect').value; // Вибраний індекс шару
  const selectedLayer = cakeLayers[selectedIndex]; // Отримуємо шар
  const color = e.target.value; // Новий колір
  selectedLayer.material.color.set(color); // Змінюємо колір шару
});

function createCandle(position) {
  // Тіло свічки
  const candleBodyGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 16); // Тонше і вище тіло
  const candleBodyMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFDD }); // Світло-жовтий
  const candleBody = new THREE.Mesh(candleBodyGeometry, candleBodyMaterial);
  candleBody.position.copy(position); // Копіюємо позицію
  candleBody.position.y += 0.4; // Піднімаємо на висоту половини свічки

  // Полум'я свічки
  const flameGeometry = new THREE.ConeGeometry(0.03, 0.1, 16); // Полум'я стало пропорційним
  const flameMaterial = new THREE.MeshStandardMaterial({ color: 0xFF4500, emissive: 0xFF6347 }); // Червонувато-помаранчевий з ефектом сяйва
  const flame = new THREE.Mesh(flameGeometry, flameMaterial);
  flame.position.set(position.x, position.y + 0.85, position.z); // Полум'я прямо над тілом свічки

  // Група для об'єднання тіла свічки та полум'я
  const candleGroup = new THREE.Group();
  candleGroup.add(candleBody);
  candleGroup.add(flame);

  // Додаємо свічку до сцени
  scene.add(candleGroup);
  decorations.push(candleGroup);

  // Анімація полум'я
  let flameOffset = 0;
  function animateFlame() {
    flameOffset += 0.1;
    flame.position.y = position.y + 0.85 + Math.sin(flameOffset) * 0.02; // Ефект "підскакування"
    flame.rotation.z = Math.sin(flameOffset) * 0.1; // Нахил полум'я
    requestAnimationFrame(animateFlame);
  }
  animateFlame();

  return candleGroup;
}

function createBerry(position) {
  // Геометрія ягоди
  const berryGeometry = new THREE.SphereGeometry(
    Math.random() * 0.05 + 0.05, // Рандомний розмір від 0.05 до 0.1
    16,
    16
  );

  // Матеріал ягоди
  const berryColors = [0xFF0000, 0x8B0000, 0x800000]; // Відтінки червоного
  const berryMaterial = new THREE.MeshStandardMaterial({
    color: berryColors[Math.floor(Math.random() * berryColors.length)], // Випадковий колір
    roughness: 0.3, // Легкий блиск
    metalness: 0.2, // Додає ефект глянцю
  });

  // Створення ягоди
  const berry = new THREE.Mesh(berryGeometry, berryMaterial);
  berry.position.copy(position);
  berry.position.y += 0.05; // Легке підняття над поверхнею

  // Додаємо ягоду до сцени
  scene.add(berry);
  decorations.push(berry);

  // Легка анімація (імітація нерівностей)
  let offset = Math.random() * Math.PI * 2; // Унікальний зсув для кожної ягоди
  function animateBerry() {
    offset += 0.05;
    berry.position.y = position.y + 0.05 + Math.sin(offset) * 0.005; // Легке "тремтіння"
    requestAnimationFrame(animateBerry);
  }
  animateBerry();

  return berry;
}

function createDecor(type, position) {
  if (type === 'candle') {
    createCandle(position);
  } else if (type === 'berry') {
    // Геометрія ягоди
    const berryGeometry = new THREE.SphereGeometry(
      Math.random() * 0.05 + 0.05, // Випадковий розмір (0.05 до 0.1)
      16,
      16
    );

    // Матеріал ягоди
    const berryColors = [0xFF0000, 0x8B0000, 0x800000]; // Відтінки червоного
    const berryMaterial = new THREE.MeshStandardMaterial({
      color: berryColors[Math.floor(Math.random() * berryColors.length)], // Випадковий колір
      roughness: 0.3,
      metalness: 0.2,
    });

    const berry = new THREE.Mesh(berryGeometry, berryMaterial);
    berry.position.copy(position);
    berry.position.y += 0.05;
    scene.add(berry);
    decorations.push(berry);

    let offset = Math.random() * Math.PI * 2;
    function animateBerry() {
      offset += 0.05;
      berry.position.y = position.y + 0.05 + Math.sin(offset) * 0.005;
      requestAnimationFrame(animateBerry);
    }
    animateBerry();
  } else if (type === 'chocolate') {
    // Геометрія шматочка шоколаду
    const chocolateGeometry = new THREE.BoxGeometry(
      Math.random() * 0.2 + 0.1, // Ширина (рандомізована)
      0.1, // Товщина
      Math.random() * 0.15 + 0.1 // Довжина (рандомізована)
    );

    // Матеріал шматочка шоколаду
    const chocolateMaterial = new THREE.MeshStandardMaterial({
      color: 0x4B2E2E, // Глибокий шоколадний колір
      roughness: 0.7, // Матова текстура
      metalness: 0.1, // Легкий блиск
    });

    // Створення шоколаду
    const chocolate = new THREE.Mesh(chocolateGeometry, chocolateMaterial);
    chocolate.position.copy(position);
    chocolate.rotation.set(
      Math.random() * Math.PI, // Випадковий нахил по X
      Math.random() * Math.PI, // Випадковий нахил по Y
      Math.random() * Math.PI // Випадковий нахил по Z
    );
    scene.add(chocolate);
    decorations.push(chocolate);

    // // Анімація шоколаду
    // let offset = Math.random() * Math.PI * 2;
    // function animateChocolate() {
    //   offset += 0.03;
    //   chocolate.rotation.x += Math.sin(offset) * 0.005; // Легке хитання
    //   chocolate.rotation.z += Math.sin(offset) * 0.005; // Легке хитання
    //   requestAnimationFrame(animateChocolate);
    // }
    // animateChocolate();
  }
}


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(); // Додайте цю строку
let decorations = [];

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Перевірка перетинів з усіма шарами
  const intersects = raycaster.intersectObjects(cakeLayers);

  if (intersects.length > 0) {
    const intersectPoint = intersects[0].point; // Точка перетину
    const selectedDecor = document.querySelector('.decor-btn.active')?.getAttribute('data-decor');
    if (selectedDecor) {
      createDecor(selectedDecor, intersectPoint); // Створюємо декор у точці перетину
    }
  }
});




// Вибір декору
document.querySelectorAll('.decor-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.decor-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});


let selectedDecor = null; // Змінна для збереження вибраного елемента

// Додавання функції вибору декору
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Перевірка перетинів з усіма елементами декору
  const decorIntersects = raycaster.intersectObjects(decorations);

  if (decorIntersects.length > 0) {
    // Виділення вибраного елемента
    if (selectedDecor) {
      selectedDecor.material.emissive.setHex(0x000000); // Скидаємо попереднє виділення
    }
    selectedDecor = decorIntersects[0].object; // Зберігаємо вибраний елемент
    selectedDecor.material.emissive.setHex(0xff0000); // Виділяємо вибраний елемент червоним
  } else {
    // Якщо клік не по декору, знімаємо виділення
    if (selectedDecor) {
      selectedDecor.material.emissive.setHex(0x000000);
      selectedDecor = null;
    }
  }
});

// Додавання кнопки видалення вибраного елемента
document.getElementById('removeDecor').addEventListener('click', () => {
  if (selectedDecor) {
    scene.remove(selectedDecor); // Видаляємо зі сцени
    decorations = decorations.filter((decor) => decor !== selectedDecor); // Видаляємо з масиву
    selectedDecor = null; // Скидаємо вибір
  } else {
    console.warn('Жоден елемент не вибрано для видалення.');
  }
});

// Оновлення розміру canvas при зміні розміру вікна


// Додавання "столу"
function createTable() {
  const tableGeometry = new THREE.CylinderGeometry(4, 4, 0.2, 64); // Циліндр, що нагадує стіл
  const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x3E3C3C}); // Коричневий колір
  const table = new THREE.Mesh(tableGeometry, tableMaterial);
  table.position.y = -0.1; // Трохи нижче базового шару торта
  scene.add(table);
}

// Викликаємо функцію для створення столу
createTable();

scene.background = new THREE.Color(0xf0f0f0); // Світло-сірий фон




window.addEventListener('resize', () => {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});


// Анімація
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();


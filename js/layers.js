import * as THREE from 'three';

// Функція створення шару
export function createLayer(radius, height, color, yPosition, scene, cakeLayers) {
  const material = new THREE.MeshStandardMaterial({ color });
  const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
  const layer = new THREE.Mesh(geometry, material);
  layer.position.y = yPosition;
  scene.add(layer);
  cakeLayers.push(layer);

  // Оновлення списку шарів для вибору
  updateLayerSelect(cakeLayers);
}

// Функція оновлення списку шарів у select
export function updateLayerSelect(cakeLayers) {
  const layerSelect = document.getElementById('layerSelect');
  layerSelect.innerHTML = ''; // Очищаємо список

  cakeLayers.forEach((layer, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `Шар ${index + 1}`;
    layerSelect.appendChild(option);
  });
}

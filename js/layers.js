
import * as THREE from 'three';

export function createLayer(size, height, color, yPosition, scene, cakeLayers, shape) {
  const material = new THREE.MeshStandardMaterial({ color });
  let geometry;

  if (shape === "round") {
      geometry = new THREE.CylinderGeometry(size, size, height, 32);
  } else if (shape === "square") {
      geometry = new THREE.BoxGeometry(size * 2, height, size * 2);
  } else {
      geometry = new THREE.CylinderGeometry(size, size, height, 32);
  }

  const layer = new THREE.Mesh(geometry, material);
  layer.position.y = yPosition;

  layer.userData.radius = size;   // радіус саме того шару
layer.userData.height = height; // висота шару
layer.userData.shape = shape;


  scene.add(layer);
  if (cakeLayers) {
    cakeLayers.push(layer);
  }

  updateLayerSelect && updateLayerSelect(cakeLayers);
}


// Функція оновлення списку шарів у select
export function updateLayerSelect(cakeLayers) {
  const layerSelect = document.getElementById('layerSelect');
  layerSelect.innerHTML = ''; // Очищаємо список

  cakeLayers.forEach((_layer, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `Шар ${index + 1}`;
    layerSelect.appendChild(option);
  });
}

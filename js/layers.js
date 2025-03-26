import * as THREE from 'three';
// // // Функція створення шару
// // export function createLayer(radius, height, color, yPosition, scene, cakeLayers) {
// //   const material = new THREE.MeshStandardMaterial({ color });
// //   const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
// //   const layer = new THREE.Mesh(geometry, material);
// //   layer.position.y = yPosition;
// //   scene.add(layer);
// //   cakeLayers.push(layer);

// //   // Оновлення списку шарів для вибору
// //   updateLayerSelect(cakeLayers);
// // }

// // // Функція оновлення списку шарів у select
// // export function updateLayerSelect(cakeLayers) {
// //   const layerSelect = document.getElementById('layerSelect');
// //   layerSelect.innerHTML = ''; // Очищаємо список

// //   cakeLayers.forEach((layer, index) => {
// //     const option = document.createElement('option');
// //     option.value = index;
// //     option.textContent = `Шар ${index + 1}`;
// //     layerSelect.appendChild(option);
// //   });
// // }


// //2
// export function createLayer(size, height, color, yPosition, scene, cakeLayers, shape) {
//   const material = new THREE.MeshStandardMaterial({ color });
//   let geometry;

//   if (shape === "round") {
//       geometry = new THREE.CylinderGeometry(size, size, height, 32);
//   } else if (shape === "square") {
//       geometry = new THREE.BoxGeometry(size, height, size);
//   } else if (shape === "heart") {
//       const heartShape = new THREE.Shape();
//       heartShape.moveTo(0, 0);
//       heartShape.bezierCurveTo(-size / 2, size / 2, -size, size / 4, 0, -size / 2);
//       heartShape.bezierCurveTo(size, size / 4, size / 2, size / 2, 0, 0);
//       geometry = new THREE.ExtrudeGeometry(heartShape, { depth: height, bevelEnabled: false });
//   }

//   const layer = new THREE.Mesh(geometry, material);
//   layer.position.y = yPosition;
//   scene.add(layer);
//   cakeLayers.push(layer);

//   updateLayerSelect(cakeLayers);
// }

//  //Функція оновлення списку шарів у select
// export function updateLayerSelect(cakeLayers) {
//   const layerSelect = document.getElementById('layerSelect');
//   layerSelect.innerHTML = ''; // Очищаємо список

//   cakeLayers.forEach((layer, index) => {
//     const option = document.createElement('option');
//     option.value = index;
//     option.textContent = `Шар ${index + 1}`;
//     layerSelect.appendChild(option);
//   });
// }


export function createLayer(size, height, color, yPosition, scene, cakeLayers, shape) {
  const material = new THREE.MeshStandardMaterial({ color });
  let geometry;

  if (shape === "round") {
      geometry = new THREE.CylinderGeometry(size, size, height, 32);
  } else if (shape === "square") {
      geometry = new THREE.BoxGeometry(size, height, size);
  } else if (shape === "heart") {
      const heartShape = new THREE.Shape();
      heartShape.moveTo(0, size * 0.3);
      heartShape.bezierCurveTo(size, size, size, -size, 0, -size * 1.1);
      heartShape.bezierCurveTo(-size, -size, -size, size, 0, size * 0.3);

      const extrudeSettings = {
          depth: Math.abs(height) || 1, // Мінімальне значення 1
          bevelEnabled: false
      };


      console.log("size:", size, "height:", height);
if (!size || isNaN(size) || !height || isNaN(height)) {
    console.error("❌ Помилка: Неправильне значення size або height");
    return;
}

      geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
      geometry.rotateX(-Math.PI / 2);

      if (geometry.getAttribute('position')) {
          geometry.computeBoundingBox();
          const boundingBox = geometry.boundingBox;
          if (boundingBox) {
              const offset = (boundingBox.max.y - boundingBox.min.y) / 2 - boundingBox.min.y || 0;
              geometry.translate(0, offset, 0);
          }
      }
  }

  const layer = new THREE.Mesh(geometry, material);
  layer.position.y = yPosition;
  scene.add(layer);
  cakeLayers.push(layer);

  updateLayerSelect(cakeLayers);
}
 //Функція оновлення списку шарів у select
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
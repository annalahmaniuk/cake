
// import * as THREE from 'three';

// export function createDecor(type, position, scene) {
//   let deco = null;

//   if (type === 'candle') {
//     deco = createCandle(position, scene);
//   } else if (type === 'berry') {
//     deco = createBerry(position, scene);
//   } else if (type === 'chocolate') {
//     deco = createChocolate(position, scene);
//   } else if (type === 'sugarStar') {
//     deco = createSugarStar(position, scene);
//   } else if (type === 'nut') {
//     deco = createNut(position, scene);
//   } else if (type === 'glaze') {
//     deco = createGlaze(position, scene, 1);
//   } else if (type === 'confetti') {
//     deco = createConfetti(position, scene);
//   } else if (type === 'chocolateDrop') {
//     deco = createChocolateDrop(position, scene);
//   } else if (type === 'leaf') {
//     deco = createLeaf(position, scene);
//   } else if (type === 'candyCane') {
//     deco = createCandyCane(position, scene);
//   } else if (type === 'macaron') {
//     deco = createMacaron(position, scene);
//   } else if (type === 'chocolateStar') {
//     deco = createChocolateStar(position, scene);
//   }

//   return deco; // Повертаємо об'єкт декору
// }


// function createCandle(position, scene) {
//   const colorPicker = document.getElementById('candleColor'); 
//   const selectedColor = new THREE.Color(colorPicker.value); 

//   // Створення свічки
//   const candleBodyGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 16); 
//   const candleBodyMaterial = new THREE.MeshStandardMaterial({ color: selectedColor });
//   const candleBody = new THREE.Mesh(candleBodyGeometry, candleBodyMaterial);
//   candleBody.position.set(0, 0.4, 0); // Центруємо

//   // Полум’я
//   const flameGeometry = new THREE.ConeGeometry(0.03, 0.1, 16); 
//   const flameMaterial = new THREE.MeshStandardMaterial({ color: 0xFF4500, emissive: 0xFF6347 });
//   const flame = new THREE.Mesh(flameGeometry, flameMaterial);
//   flame.position.set(0, 0.85, 0); // Відносно групи

//   // Група
//   const candleGroup = new THREE.Group();
//   candleGroup.add(candleBody);
//   candleGroup.add(flame);
//   candleGroup.position.copy(position);
//   candleGroup.userData.type = 'candle';  // Зберігаємо тип декору

//   scene.add(candleGroup);

//   // Анімація полум’я
//   let flameOffset = 0;
//   function animateFlame() {
//     flameOffset += 0.1;
//     flame.position.y = 0.85 + Math.sin(flameOffset) * 0.02;
//     flame.rotation.z = Math.sin(flameOffset) * 0.1;
//     requestAnimationFrame(animateFlame);
//   }
//   animateFlame();
// }


// // Функція для створення ягоди
// function createBerry(position, scene) {
//   const berryGeometry = new THREE.SphereGeometry(Math.random() * 0.05 + 0.05, 16, 16);
//   const berryColors = [0xFF0000, 0x8B0000, 0x800000];
//   const berryMaterial = new THREE.MeshStandardMaterial({
//     color: berryColors[Math.floor(Math.random() * berryColors.length)],
//     roughness: 0.3,
//     metalness: 0.2,
//   });

//   const berry = new THREE.Mesh(berryGeometry, berryMaterial);
//   berry.position.copy(position);
//   berry.position.y += 0.05;
//   berry.userData.type = 'berry';  // Зберігаємо тип декору
//   scene.add(berry);

//   let offset = Math.random() * Math.PI * 2;
//   function animateBerry() {
//     offset += 0.05;
//     berry.position.y = position.y + 0.05 + Math.sin(offset) * 0.005;
//     requestAnimationFrame(animateBerry);
//   }
//   animateBerry();
// }

// // Функція для створення шоколаду
// function createChocolate(position, scene) {
//   const chocolateGeometry = new THREE.BoxGeometry(Math.random() * 0.2 + 0.1, 0.1, Math.random() * 0.15 + 0.1);
//   const chocolateMaterial = new THREE.MeshStandardMaterial({ color: 0x4B2E2E, roughness: 0.7, metalness: 0.1 });
//   const chocolate = new THREE.Mesh(chocolateGeometry, chocolateMaterial);
//   chocolate.position.copy(position);
//   chocolate.rotation.set(
//     Math.random() * Math.PI,
//     Math.random() * Math.PI,
//     Math.random() * Math.PI
//   );
//   chocolate.userData.type = 'chocolate';  // Зберігаємо тип декору
//   scene.add(chocolate);
// }

// // Функція для створення глазурі
// function createGlaze(position, scene, radius) {
//   const glazeGeometry = new THREE.CylinderGeometry(radius, radius, 0.05, 32, 32, true); // Тонка циліндрична глазур
//   const glazeMaterial = new THREE.MeshStandardMaterial({
//     color: 0x8B0000,  // Червона глазур
//     roughness: 0.1,
//     metalness: 0.2,
//     opacity: 0.8,
//     transparent: true,  // Зробити напівпрозорою
//   });

//   const glaze = new THREE.Mesh(glazeGeometry, glazeMaterial);
//   glaze.position.copy(position);
//   glaze.position.y += 0.02;  // Легке підняття для підстави
//   glaze.userData.type = 'glaze';  // Зберігаємо тип декору

//   scene.add(glaze);
// }

// // Функція для створення конфетті
// function createConfetti(position, scene) {
//   const confettiGeometry = new THREE.SphereGeometry(0.03, 8, 8); // Маленькі кульки конфетті
//   const confettiMaterial = new THREE.MeshStandardMaterial({
//     color: Math.random() * 0xffffff, // Випадковий колір для конфетті
//     roughness: 0.5,
//     metalness: 0.1,
//   });

//   const confetti = new THREE.Mesh(confettiGeometry, confettiMaterial);
//   confetti.position.copy(position);
//   confetti.position.y += 0.1; // Легке підняття для конфетті
//   confetti.userData.type = 'confetti';  // Зберігаємо тип декору

//   scene.add(confetti);
// }

// // Функція для створення шоколадної краплі
// function createChocolateDrop(position, scene) {
//   const dropGeometry = new THREE.SphereGeometry(0.05, 8, 8);
//   const dropMaterial = new THREE.MeshStandardMaterial({
//     color: 0x3E1C1C,  // Темно-коричневий колір для шоколадної краплі
//     roughness: 0.6,
//     metalness: 0.2,
//   });

//   const drop = new THREE.Mesh(dropGeometry, dropMaterial);
//   drop.position.copy(position);
//   drop.position.y += 0.05;  // Підняти трохи для розміщення на шарі
//   drop.userData.type = 'chocolateDrop';  // Зберігаємо тип декору

//   scene.add(drop);
// }

// // Функція для створення листа
// function createLeaf(position, scene) {
//   const leafGeometry = new THREE.PlaneGeometry(0.1, 0.2);
//   const leafMaterial = new THREE.MeshStandardMaterial({
//     color: 0x228B22, // Зелене листя
//     roughness: 0.4,
//     metalness: 0.1,
//     side: THREE.DoubleSide,  // Листя має бути двостороннім
//   });

//   const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
//   leaf.position.copy(position);
//   leaf.position.y += 0.1;  // Листя буде трохи підняте
//   leaf.rotation.set(0, Math.random() * Math.PI, Math.random() * Math.PI);
//   leaf.userData.type = 'leaf';  // Зберігаємо тип декору

//   scene.add(leaf);
// }

// // Функція для створення макарону
// function createMacaron(position, scene) {
//   const macaronGeometry = new THREE.SphereGeometry(0.05, 8, 8);
//   const macaronColors = [0xF08080, 0xFFD700, 0xADFF2F, 0x8A2BE2]; // Різні кольори макаронів
//   const macaronMaterial = new THREE.MeshStandardMaterial({
//     color: macaronColors[Math.floor(Math.random() * macaronColors.length)],
//     roughness: 0.3,
//     metalness: 0.1,
//   });

//   const macaron = new THREE.Mesh(macaronGeometry, macaronMaterial);
//   macaron.position.copy(position);
//   macaron.position.y += 0.05;  // Легке підняття
//   macaron.userData.type = 'macaron';  // Зберігаємо тип декору

//   scene.add(macaron);
// }



//3
import * as THREE from 'three';

export function createDecor(type, position, scene) {
  let deco = null;

  if (type === 'candle') {
    deco = createCandle(position);
  } else if (type === 'berry') {
    deco = createBerry(position);
  } else if (type === 'chocolate') {
    deco = createChocolate(position);
  } else if (type === 'sugarStar') {
    deco = createSugarStar(position);
  } else if (type === 'nut') {
    deco = createNut(position);
  } else if (type === 'glaze') {
    deco = createGlaze(position, 1);
  } else if (type === 'confetti') {
    deco = createConfetti(position);
  } else if (type === 'chocolateDrop') {
    deco = createChocolateDrop(position);
  } else if (type === 'leaf') {
    deco = createLeaf(position);
  } else if (type === 'candyCane') {
    deco = createCandyCane(position);
  } else if (type === 'macaron') {
    deco = createMacaron(position);
  } else if (type === 'chocolateStar') {
    deco = createChocolateStar(position);
  }

  if (deco) {
    scene.add(deco);
  }

  return deco; // Повертаємо об'єкт декору
}

// === Кожна функція нижче ТЕПЕР ПОВЕРТАЄ об'єкт ===

function createCandle(position) {
  const colorPicker = document.getElementById('candleColor'); 
  const selectedColor = new THREE.Color(colorPicker.value); 

  const candleBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.8, 16),
    new THREE.MeshStandardMaterial({ color: selectedColor })
  );
  candleBody.position.set(0, 0.4, 0);

  const flame = new THREE.Mesh(
    new THREE.ConeGeometry(0.03, 0.1, 16),
    new THREE.MeshStandardMaterial({ color: 0xFF4500, emissive: 0xFF6347 })
  );
  flame.position.set(0, 0.85, 0);

  const candleGroup = new THREE.Group();
  candleGroup.add(candleBody);
  candleGroup.add(flame);
  candleGroup.position.copy(position);
  candleGroup.userData.type = 'candle';
  candleGroup.userData.color = selectedColor.getHexString();  // Зберігаємо колір

  let flameOffset = 0;
  function animateFlame() {
    flameOffset += 0.1;
    flame.position.y = 0.85 + Math.sin(flameOffset) * 0.02;
    flame.rotation.z = Math.sin(flameOffset) * 0.1;
    requestAnimationFrame(animateFlame);
  }
  animateFlame();

  return candleGroup;
}

function createBerry(position) {
  const berryGeometry = new THREE.SphereGeometry(Math.random() * 0.05 + 0.05, 16, 16);
  const berryColors = [0xFF0000, 0x8B0000, 0x800000];
  const berryMaterial = new THREE.MeshStandardMaterial({
    color: berryColors[Math.floor(Math.random() * berryColors.length)],
    roughness: 0.3,
    metalness: 0.2,
  });

  const berry = new THREE.Mesh(berryGeometry, berryMaterial);
  berry.position.copy(position);
  berry.position.y += 0.05;
  berry.userData.type = 'berry';

  let offset = Math.random() * Math.PI * 2;
  function animateBerry() {
    offset += 0.05;
    berry.position.y = position.y + 0.05 + Math.sin(offset) * 0.005;
    requestAnimationFrame(animateBerry);
  }
  animateBerry();

  return berry;
}

function createChocolate(position) {
  const chocolate = new THREE.Mesh(
    new THREE.BoxGeometry(Math.random() * 0.2 + 0.1, 0.1, Math.random() * 0.15 + 0.1),
    new THREE.MeshStandardMaterial({ color: 0x4B2E2E, roughness: 0.7, metalness: 0.1 })
  );
  chocolate.position.copy(position);
  chocolate.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
  chocolate.userData.type = 'chocolate';
  return chocolate;
}

function createGlaze(position, radius) {
  const glaze = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, 0.05, 32, 32, true),
    new THREE.MeshStandardMaterial({
      color: 0x8B0000,
      roughness: 0.1,
      metalness: 0.2,
      opacity: 0.8,
      transparent: true,
    })
  );
  glaze.position.copy(position);
  glaze.position.y += 0.02;
  glaze.userData.type = 'glaze';
  return glaze;
}

function createConfetti(position) {
  const confetti = new THREE.Mesh(
    new THREE.SphereGeometry(0.03, 8, 8),
    new THREE.MeshStandardMaterial({
      color: Math.random() * 0xffffff,
      roughness: 0.5,
      metalness: 0.1,
    })
  );
  confetti.position.copy(position);
  confetti.position.y += 0.1;
  confetti.userData.type = 'confetti';
  return confetti;
}

function createChocolateDrop(position) {
  const drop = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0x3E1C1C, roughness: 0.6, metalness: 0.2 })
  );
  drop.position.copy(position);
  drop.position.y += 0.05;
  drop.userData.type = 'chocolateDrop';
  return drop;
}

function createLeaf(position) {
  const leaf = new THREE.Mesh(
    new THREE.PlaneGeometry(0.1, 0.2),
    new THREE.MeshStandardMaterial({
      color: 0x228B22,
      roughness: 0.4,
      metalness: 0.1,
      side: THREE.DoubleSide,
    })
  );
  leaf.position.copy(position);
  leaf.position.y += 0.1;
  leaf.rotation.set(0, Math.random() * Math.PI, Math.random() * Math.PI);
  leaf.userData.type = 'leaf';
  return leaf;
}

function createMacaron(position) {
  const macaronColors = [0xF08080, 0xFFD700, 0xADFF2F, 0x8A2BE2];
  const macaron = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 8, 8),
    new THREE.MeshStandardMaterial({
      color: macaronColors[Math.floor(Math.random() * macaronColors.length)],
      roughness: 0.3,
      metalness: 0.1,
    })
  );
  macaron.position.copy(position);
  macaron.position.y += 0.05;
  macaron.userData.type = 'macaron';
  return macaron;
}

// === Ті, що ще не реалізовані (заглушки) ===

function createSugarStar(position) {
  const star = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.05),
    new THREE.MeshStandardMaterial({ color: 0xffffcc })
  );
  star.position.copy(position);
  star.userData.type = 'sugarStar';
  return star;
}

function createNut(position) {
  const nut = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0xD2B48C })
  );
  nut.position.copy(position);
  nut.userData.type = 'nut';
  return nut;
}

function createCandyCane(position) {
  const cane = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.4, 16),
    new THREE.MeshStandardMaterial({ color: 0xFF0000 })
  );
  cane.position.copy(position);
  cane.userData.type = 'candyCane';
  return cane;
}

function createChocolateStar(position) {
  const star = new THREE.Mesh(
    new THREE.DodecahedronGeometry(0.05),
    new THREE.MeshStandardMaterial({ color: 0x5C2E2E })
  );
  star.position.copy(position);
  star.userData.type = 'chocolateStar';
  return star;
}

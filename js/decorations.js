import * as THREE from 'three';

// Функція для створення декору
export function createDecor(type, position, scene) {
  if (type === 'candle') {
    createCandle(position, scene);
  } else if (type === 'berry') {
    createBerry(position, scene);
  } else if (type === 'chocolate') {
    createChocolate(position, scene);
  } else if (type === 'sugarStar') {
    createSugarStar(position, scene);
  } else if (type === 'nut') {
    createNut(position, scene);
  } else if (type === 'glaze') {
    createGlaze(position, scene, 1); // Параметр для розміру глазурі
  } else if (type === 'confetti') {
    createConfetti(position, scene);
  } else if (type === 'chocolateDrop') {
    createChocolateDrop(position, scene);
  } else if (type === 'leaf') {
    createLeaf(position, scene);
  } else if (type === 'candyCane') {
    createCandyCane(position, scene);
  } else if (type === 'macaron') {
    createMacaron(position, scene);
  } else if (type === 'chocolateStar') {
    createChocolateStar(position, scene);
  }
}


function createCandle(position, scene) {
  const candleBodyGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 16); 
  const candleBodyMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFDD });
  const candleBody = new THREE.Mesh(candleBodyGeometry, candleBodyMaterial);
  candleBody.position.copy(position);
  candleBody.position.y += 0.4;

  const flameGeometry = new THREE.ConeGeometry(0.03, 0.1, 16); 
  const flameMaterial = new THREE.MeshStandardMaterial({ color: 0xFF4500, emissive: 0xFF6347 });
  const flame = new THREE.Mesh(flameGeometry, flameMaterial);
  flame.position.set(position.x, position.y + 0.85, position.z); 

  const candleGroup = new THREE.Group();
  candleGroup.add(candleBody);
  candleGroup.add(flame);

  scene.add(candleGroup);

  let flameOffset = 0;
  function animateFlame() {
    flameOffset += 0.1;
    flame.position.y = position.y + 0.85 + Math.sin(flameOffset) * 0.02;
    flame.rotation.z = Math.sin(flameOffset) * 0.1;
    requestAnimationFrame(animateFlame);
  }
  animateFlame();
}

function createBerry(position, scene) {
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
  scene.add(berry);

  let offset = Math.random() * Math.PI * 2;
  function animateBerry() {
    offset += 0.05;
    berry.position.y = position.y + 0.05 + Math.sin(offset) * 0.005;
    requestAnimationFrame(animateBerry);
  }
  animateBerry();
}

function createChocolate(position, scene) {
  const chocolateGeometry = new THREE.BoxGeometry(Math.random() * 0.2 + 0.1, 0.1, Math.random() * 0.15 + 0.1);
  const chocolateMaterial = new THREE.MeshStandardMaterial({ color: 0x4B2E2E, roughness: 0.7, metalness: 0.1 });
  const chocolate = new THREE.Mesh(chocolateGeometry, chocolateMaterial);
  chocolate.position.copy(position);
  chocolate.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  scene.add(chocolate);
}

function createSugarStar(position, scene) {
  const starGeometry = new THREE.SphereGeometry(0.05, 8, 8); 
  const starMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFF00,
    roughness: 0.5,
    metalness: 0.1,
  });

  const star = new THREE.Mesh(starGeometry, starMaterial);
  star.position.copy(position);
  star.position.y += 0.05;
  scene.add(star);

  let offset = Math.random() * Math.PI * 2;
  function animateStar() {
    offset += 0.05;
    star.position.y = position.y + 0.05 + Math.sin(offset) * 0.005;
    requestAnimationFrame(animateStar);
  }
  animateStar();
}

function createGlaze(position, scene, radius) {
  const glazeGeometry = new THREE.CylinderGeometry(radius, radius, 0.05, 32, 32, true); // Тонка циліндрична глазур
  const glazeMaterial = new THREE.MeshStandardMaterial({
    color: 0x8B0000,  // Червона глазур
    roughness: 0.1,
    metalness: 0.2,
    opacity: 0.8,
    transparent: true,  // Зробити напівпрозорою
  });

  const glaze = new THREE.Mesh(glazeGeometry, glazeMaterial);
  glaze.position.copy(position);
  glaze.position.y += 0.02;  // Легке підняття для підстави

  scene.add(glaze);
}

function createConfetti(position, scene) {
  const confettiGeometry = new THREE.SphereGeometry(0.03, 8, 8); // Маленькі кульки конфетті
  const confettiMaterial = new THREE.MeshStandardMaterial({
    color: Math.random() * 0xffffff, // Випадковий колір для конфетті
    roughness: 0.5,
    metalness: 0.1,
  });

  const confetti = new THREE.Mesh(confettiGeometry, confettiMaterial);
  confetti.position.copy(position);
  confetti.position.y += 0.1; // Легке підняття для конфетті

  scene.add(confetti);
}


function createChocolateDrop(position, scene) {
  const dropGeometry = new THREE.SphereGeometry(0.05, 8, 8);
  const dropMaterial = new THREE.MeshStandardMaterial({
    color: 0x3E1C1C,  // Темно-коричневий колір для шоколадної краплі
    roughness: 0.6,
    metalness: 0.2,
  });

  const drop = new THREE.Mesh(dropGeometry, dropMaterial);
  drop.position.copy(position);
  drop.position.y += 0.05;  // Підняти трохи для розміщення на шарі

  scene.add(drop);
}


function createLeaf(position, scene) {
  const leafGeometry = new THREE.PlaneGeometry(0.1, 0.2);
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x228B22, // Зелене листя
    roughness: 0.4,
    metalness: 0.1,
    side: THREE.DoubleSide,  // Листя має бути двостороннім
  });

  const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
  leaf.position.copy(position);
  leaf.position.y += 0.1;  // Листя буде трохи підняте

  // Можна обертати листя, щоб воно не було "плоским"
  leaf.rotation.set(0, Math.random() * Math.PI, Math.random() * Math.PI);

  scene.add(leaf);
}




function createMacaron(position, scene) {
  const macaronGeometry = new THREE.SphereGeometry(0.05, 8, 8);
  const macaronColors = [0xF08080, 0xFFD700, 0xADFF2F, 0x8A2BE2]; // Різні кольори макаронів
  const macaronMaterial = new THREE.MeshStandardMaterial({
    color: macaronColors[Math.floor(Math.random() * macaronColors.length)],
    roughness: 0.3,
    metalness: 0.1,
  });

  const macaron = new THREE.Mesh(macaronGeometry, macaronMaterial);
  macaron.position.copy(position);
  macaron.position.y += 0.05;  // Легке підняття

  scene.add(macaron);
}


// cakeCostCalculator.js

// Ціни для декорацій
const decorationPrices = {
  candle: 2,
  berry: 1,
  chocolate: 1.5,
  sugarStar: 1,
  nut: 1.2,
  glaze: 3,
  confetti: 0.5,
  chocolateDrop: 1.7,
  leaf: 0.8,
  candyCane: 2.5,
  macaron: 2,
  chocolateStar: 2.5,
};

// Функція для розрахунку вартості декорацій
export function calculateDecorationCost(decorations) {
  let totalDecorationCost = 0;
  
  decorations.forEach(type => {
    totalDecorationCost += decorationPrices[type] || 0;
  });

  return totalDecorationCost;
}

// Базова ціна одного шару торта
const baseLayerPrice = 5; // можна налаштувати

// Функція для розрахунку вартості одного шару
export function calculateLayerCost() {
  return baseLayerPrice;
}

// Функція для розрахунку загальної вартості торта з урахуванням шарів та декору
export function calculateCakeCost(layers, ingredients = [], decorations = []) {
  let totalCost = 0;

  // Додавання вартості всіх шарів
  totalCost += layers * calculateLayerCost();

  // Додавання вартості інгредієнтів (якщо є)
  ingredients.forEach(ingredient => {
    const unitPrice = ingredientPrices[ingredient.name] || 0;
    totalCost += unitPrice * ingredient.quantity;
  });

  // Додавання вартості декорацій
  totalCost += calculateDecorationCost(decorations);

  return totalCost;
}

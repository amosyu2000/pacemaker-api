import mongoose from 'mongoose';

// Generic JSON response to invalid/unsuccessful requests
export function failedJson(reason) {
  return {
    success: false,
    reason: reason,
  };
}

// Similar to failedJson() but includes specific implementation for Error objects
export function errorJson(error) {
  
  // Removes the undesired formatting that is built-in to Schema validation errors
  // https://stackoverflow.com/a/64256430
  if (error instanceof mongoose.Document.ValidationError) {
    const errorList = Object.entries(error.errors).map(([,e]) => e.message);
    return failedJson(errorList.join(' '));
  }

  // Other errors
  return failedJson(error.message);
}

export function randomFood() {
  const food = [
    "almond", "apple", "apricot", "avocado", "bacon", 
    "bagel", "banana", "beef", "broccoli", "burger", 
    "butter", "cake", "carrot", "celery", "cheese", 
    "cherry", "coconut", "coffee", "cookie", "corn", 
    "curry", "egg", "garlic", "granola", "grape", 
    "honey", "hummus", "kale", "kiwi", "lemon", 
    "lettuce", "lime", "lobster", "mango", "melon", 
    "milk", "mint", "muffin", "noodle", "onion", 
    "orange", "peach", "pecan", "pepper", "pickle", 
    "pizza", "potato", "pumpkin", "raisin", "ramen", 
    "rice", "rye", "salmon", "salsa", "sausage", 
    "soup", "soy", "spinach", "squash", "steak", 
    "sugar", "sushi", "taco", "tea", "toast", 
    "tomato", "tuna", "turkey", "walnut", 
    "water", "yogurt"
  ];
  return food[Math.floor(Math.random() * food.length)];
}
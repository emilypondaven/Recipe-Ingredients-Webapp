import React from "react";

export default function FoodItemInput(props) {
  const { handleAddFoodItem, foodItemValue, setFoodItemValue, foodItems } =
    props;

  function checkFoodItemExists(foodItemToCheck) {
    const foodItemExists = foodItems.some(
      (foodItem) => foodItem.toLowerCase() === foodItemToCheck.toLowerCase()
    );
    return foodItemExists;
  }

  // Check that input is not empty and does not already exist
  function handleInput() {
    if (foodItemValue.trim() && !checkFoodItemExists(foodItemValue)) {
      handleAddFoodItem(foodItemValue);
      setFoodItemValue("");
    }
  }

  return (
    <header>
      <input
        value={foodItemValue}
        onChange={(e) => setFoodItemValue(e.target.value)}
        placeholder="Enter ingredients you have..."
      />
      <button onClick={handleInput}>Add</button>
    </header>
  );
}

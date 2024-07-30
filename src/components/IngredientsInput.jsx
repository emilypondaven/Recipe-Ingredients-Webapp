import React from "react";

export default function IngredientsInput(props) {
  const {
    handleAddIngredients,
    ingredientValue,
    setIngredientValue,
    ingredients,
  } = props;

  function checkIngredientExists(ingredientToCheck) {
    const ingredientExists = ingredients.some(
      (ingredient) =>
        ingredient.value.toLowerCase() === ingredientToCheck.toLowerCase()
    );
    return ingredientExists;
  }

  // Check that input is not empty and does not already exist
  function handleInput() {
    if (
      ingredientValue.value.trim() &&
      !checkIngredientExists(ingredientValue.value)
    ) {
      handleAddIngredients(ingredientValue);
      setIngredientValue((prevIngredient) => {
        return { ...prevIngredient, value: "" };
      });
    }
  }

  return (
    <header>
      <input
        value={ingredientValue.value}
        onChange={(e) =>
          setIngredientValue((prevIngredient) => {
            return { ...prevIngredient, value: e.target.value };
          })
        }
        placeholder="Enter ingredient..."
      />
      <label>
        <select
          value={ingredientValue.group}
          onChange={(e) =>
            setIngredientValue((prevIngredient) => {
              return { ...prevIngredient, group: e.target.value };
            })
          }
        >
          <option value="Meat">Meat</option>
          <option value="Carbohydrate">Carbohydrate</option>
          <option value="Fruit & Veg">Fruit & Veg</option>
          <option value="Dairy">Dairy</option>
          <option value="Drinks">Drinks</option>
          <option value="Sweets & Chips">Sweets & Chips</option>
        </select>
      </label>
      <button onClick={handleInput}>Add</button>
    </header>
  );
}

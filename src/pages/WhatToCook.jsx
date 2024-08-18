import React, { useContext } from "react";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import FoodItemInput from "../components/FoodItemInput";
import RecipeList from "../components/RecipeList";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../config/Firebase";
import { AuthContext } from "../components/AuthProvider"

export default function WhatToCook({ likedRecipes, setLikedRecipes }) {
  const { user } = useContext(AuthContext);

  const SPOONACULAR_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

  const [foodItems, setFoodItems] = useState([]);
  const [foodItemValue, setFoodItemValue] = useState("");
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);

  const getExistingFoodItems = async () => {
    const docRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(docRef)
    const docData = userDoc.data();

    if (!("existingFoodItems" in docData)) {
      await setDoc(docRef, { existingFoodItems: [] }, { merge: true })
    } else {
      setFoodItems(userDoc.get("existingFoodItems"));
    }
  };

  useEffect(() => {
    getExistingFoodItems()
  }, [])

  // PROBLEM: Works but maybe should make it so state/database always in sync
  async function handleAddFoodItem(newFoodItem) {
    if (!foodItems.includes(newFoodItem)) {
      setFoodItems((oldFoodItems) => {
        return [...oldFoodItems, newFoodItem];
      });
    }
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
      existingFoodItems: arrayUnion(newFoodItem) // Replace 'existingFood' with your field name
    });

  }

  async function handleDeleteFoodItem(newFoodItem) {
    const newFoodItemList = foodItems.filter((foodItem) => {
      return foodItem != newFoodItem;
    });
    setFoodItems(newFoodItemList);

    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
      existingFoodItems: arrayRemove(newFoodItem) // Replace 'existingFood' with your field name
    });

  }

  function capitaliseFoodItem(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  function formatFoodItems() {
    const foodItemsString = foodItems.reduce((accumulator, current, index) => {
      if (index === 0) {
        return `&ingredients=${current}`;
      } else {
        return `${accumulator},+${current}`;
      }
    }, "");

    return foodItemsString;
  }

  async function generateRecipes() {
    const url =
      "https://api.spoonacular.com/recipes/findByIngredients" +
      `?apiKey=${SPOONACULAR_KEY}` +
      `${formatFoodItems()}&number=5`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Organize recipes by fetching instructions for each recipe
      const organizedRecipes = await organiseSuggestedRecipes(data);

      // Update state with organized recipes
      setSuggestedRecipes(organizedRecipes);
    } catch (err) {
      console.error(err);
    }
  }

  // Function to organize recipes including their instructions
  async function organiseSuggestedRecipes(allRecipeInformation) {
    // Map over all recipes and fetch instructions
    const recipesWithInstructions = await Promise.all(
      allRecipeInformation.map(async (recipe) => {
        const instructions = await getInstructions(recipe);

        return {
          id: recipe.id,
          name: recipe.title,
          image: recipe.image,
          ingredientsList: [
            ...recipe.missedIngredients.map((i) => i.original),
            ...recipe.usedIngredients.map((i) => i.original),
          ],
          ingredientNames: [
            ...recipe.missedIngredients.map((i) => i.name),
            ...recipe.usedIngredients.map((i) => i.name),
          ],
          usedIngredientNames: [...recipe.usedIngredients.map((i) => i.name)],
          instructions: instructions
        };
      })
    );

    return recipesWithInstructions;
  }

  // Updated getInstructions function
  async function getInstructions(recipe) {
    const url = `https://api.spoonacular.com/recipes/${recipe.id}/analyzedInstructions?apiKey=${SPOONACULAR_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data[0] && data[0].steps ? data[0].steps.map((i) => i.step) : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  useEffect(() => {
    localStorage.setItem("existingFoodItems", JSON.stringify(foodItems));
  }, [foodItems]);

  useEffect(() => {
    localStorage.setItem(
      "existingFoodItemRecipes",
      JSON.stringify(suggestedRecipes)
    );
  }, [suggestedRecipes]);

  return (
    <div>
      <NavBar format="topnav" />
      <main>
        <FoodItemInput
          foodItems={foodItems}
          handleAddFoodItem={handleAddFoodItem}
          foodItemValue={foodItemValue}
          setFoodItemValue={setFoodItemValue}
        />
        {foodItems.map((foodItem, foodItemIndex) => {
          return (
            <button
              className="foodItemButtons"
              key={foodItemIndex}
              onClick={() => handleDeleteFoodItem(foodItem)}
            >
              {capitaliseFoodItem(foodItem)}
            </button>
          );
        })}
        <button className="recipeSearchButtons" onClick={generateRecipes}>
          Search
        </button>
        {suggestedRecipes && (
          <RecipeList
            recipes={suggestedRecipes} likedRecipes={likedRecipes} setLikedRecipes={setLikedRecipes}
          />
        )}
      </main>
    </div>
  );
}

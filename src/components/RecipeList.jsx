import React, { useContext } from "react";
import RecipeCard from "./RecipeCard";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { AuthContext } from "./AuthProvider"

export default function RecipeList({ recipes, likedRecipes, setLikedRecipes }) {
  const { user } = useContext(AuthContext)

  const removeSavedLikedRecipe = async (id) => {
    const recipeRef = doc(
      db,
      "users",
      user.uid,
      "likedRecipes",
      id.toString()
    );
    await deleteDoc(recipeRef);
  };

  const saveLikedRecipe = async (id, recipe) => {
    console.log(id)
    const recipeRef = doc(
      db,
      "users",
      user.uid,
      "likedRecipes",
      id.toString()
    );
    await setDoc(recipeRef, recipe);
  }


  const handleLikeRecipe = (recipeId) => {
    setLikedRecipes( (prevLiked) => {
      // Check if the recipe is already liked
      const isLiked = prevLiked.some(recipe => recipe.id === recipeId);
      if (isLiked) {
        // Remove the recipe from the liked list
        removeSavedLikedRecipe(recipeId)
        return prevLiked.filter(recipe => recipe.id !== recipeId);
      } else {
        // Add the recipe to the liked list
        const recipeToLike = recipes.find(recipe => recipe.id === recipeId);
        saveLikedRecipe(recipeId, recipeToLike)
        return [...prevLiked, recipeToLike];
      }
    });
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe, recipeIndex) => (
        <RecipeCard
          key={recipeIndex}
          id={recipe.id}
          name={recipe.name}
          image={recipe.image}
          ingredientsList={recipe.ingredientsList}
          usedIngredientNames={recipe.usedIngredientNames}
          instructions={recipe.instructions} 
          liked={recipe.liked}
          onLike={() => handleLikeRecipe(recipe.id)}
          likedRecipes={likedRecipes}
        />
      ))}
    </div>
  );
}

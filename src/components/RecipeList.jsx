import React, { useState } from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, likedRecipes, setLikedRecipes }) {

  const handleLikeRecipe = (recipeId) => {
    setLikedRecipes((prevLiked) => {
      // Check if the recipe is already liked
      const isLiked = prevLiked.some(recipe => recipe.id === recipeId);
      if (isLiked) {
        // Remove the recipe from the liked list
        return prevLiked.filter(recipe => recipe.id !== recipeId);
      } else {
        // Add the recipe to the liked list
        const recipeToLike = recipes.find(recipe => recipe.id === recipeId);
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

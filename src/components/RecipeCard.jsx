import React, { useEffect } from 'react';

export default function RecipeCard(props) {

    const {
        name, image, ingredientsList, usedIngredientNames, 
        id, instructions, onLike, likedRecipes
    } = props

    function presentInstructions() {
        if (instructions.length === 0) { return (
            <p>No instructions provided</p>
        )} else { return (
            instructions.map((step, index) => (
                <li key={index}>{step}</li>
            ))
        )}
    }

    return (
        <div className="recipe-card">
            <img className="recipe-image" src={image} alt={name} />
            <div className="recipe-details">
                <h3 className="recipe-title">{name}</h3>
                <ul className="usedIngredients">
                    {usedIngredientNames.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <button className="like-button" onClick={onLike}>
                    {likedRecipes.some(recipe => recipe.id == id) ? 'Unlike' : 'Like'}
                </button>
                <ul className="ingredient-list">
                    {ingredientsList.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <h3>Instructions</h3>
                    <ul>
                        {presentInstructions()}
                    </ul>
                    
            </div>
        </div>
    );
}
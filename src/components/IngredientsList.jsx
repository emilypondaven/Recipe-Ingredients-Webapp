import React from 'react'
import FoodGroupCard from './FoodGroupCard'

export default function IngredientsList(props) {
    const { ingredients } = props
    
    // Groups the ingredients into their specific food group
    const groupedIngredients = ingredients.reduce((acc, ingredient) => {
        if (!acc[ingredient.group]) {
          acc[ingredient.group] = [];
        }
        acc[ingredient.group].push(ingredient);
        return acc;
      }, {});

    return (
        <div>
            {Object.keys(groupedIngredients).map(foodGroup =>
                <FoodGroupCard
                    key={foodGroup}
                    foodGroup={foodGroup}
                    ingredientGrouped={groupedIngredients[foodGroup]}
                    {...props}
                />
            )}
        </div>
    )
}
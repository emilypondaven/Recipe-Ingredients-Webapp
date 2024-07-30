import React from 'react'
import IngredientsCard from "./IngredientsCard"

export default function FoodGroupCard(props) {

    return (
        <div>
            <h2>{props.foodGroup}</h2>
            <ul>
                {props.ingredientGrouped.map(ingredient => {
                    return (
                        <IngredientsCard 
                            key={ingredient.value}
                            ingredient={ingredient.value}
                            checked={ingredient.checked}
                            {...props}
                        />
                    )
                })}
            </ul>
        </div>
    )
}
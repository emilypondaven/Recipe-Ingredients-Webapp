import React from 'react'

export default function IngredientsCard(props) {
    const { 
        ingredient, 
        checked, 
        handleDeleteIngredient, 
        handleEditIngredient, 
        handleCheckedIngredient
    } = props

    function capitaliseIngredient(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return (
        <li type="checkbox" className='ingredientItem'>
            <label>
                <input
                    type="checkbox" 
                    checked={checked}
                    id="ingredientCheckbox"
                    className={checked ? "checked" : ""}
                    onChange={() => handleCheckedIngredient(ingredient)} />
                <span>{capitaliseIngredient(ingredient)}</span>
            </label>
            <div className='actionContainer'>
                <button 
                    onClick={() => handleEditIngredient(ingredient)}
                    className="fa-solid fa-pen-to-square">
                </button>
                <button 
                    onClick={() => handleDeleteIngredient(ingredient)}
                    className="fa-regular fa-trash-can">
                </button>
            </div>
        </li>
    )
}

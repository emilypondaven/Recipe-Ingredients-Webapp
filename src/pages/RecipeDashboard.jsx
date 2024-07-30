import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import NavBar from "../components/NavBar";
import RecipeList from "../components/RecipeList";

export default function RecipeDashboard({
  boughtIngredients,
  likedRecipes,
  setLikedRecipes,
}) {
  const [foodNotes, setFoodNotes] = useState(
    JSON.parse(localStorage.getItem("foodNotes")) || ""
  );

  const [showShoppingTrends, setShowShoppingTrends] = useState(false);

  useEffect(() => {
    localStorage.setItem("foodNotes", JSON.stringify(foodNotes));
  }, [foodNotes]);

  const options = {
    vAxis: { title: "Number of food items" },
    hAxis: { title: "Week" },
    seriesType: "bars", // or "area"
    series: { 6: { type: "line" } },
    animation: {
      startup: true,
      easing: "out",
      duration: 1500,
    },
  };

  function getData() {
    return [
      [
        "Week",
        "Meat",
        "Carbohydrates",
        "Fruit & Veg",
        "Dairy",
        "Drinks",
        "Sweets & Chips",
        "Average"
      ],
      ...boughtIngredients,
    ];
  }

  return (
    <div>
      <NavBar format="topnav" />
      <div className="foodNotes">
        <h3>Meal Planning Notes</h3>
        <textarea
          value={foodNotes}
          onChange={(e) => setFoodNotes(e.target.value)}
          placeholder="Write any meal planning here..."
          className="foodNotes"
          row="5"
          col="30"
        />
      </div>
      {boughtIngredients.length !== 0 ? <div className="shoppingTrends">
        <button onClick={(e) => setShowShoppingTrends((prev) => !prev)}>
          {!showShoppingTrends
            ? "Show Food Shopping Trends"
            : "Hide Food Shopping Trends"}
        </button>
        {showShoppingTrends ? (
          <Chart
            chartType="ComboChart"
            width="100%"
            height="300px"
            data={getData()}
            options={options}
          />
        ) : (
          ""
        )} 
      </div> : ""}
      {likedRecipes && (
        <RecipeList
          recipes={likedRecipes}
          likedRecipes={likedRecipes}
          setLikedRecipes={setLikedRecipes}
        />
      )}
    </div>
  );
}

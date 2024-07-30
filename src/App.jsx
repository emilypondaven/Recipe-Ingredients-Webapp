import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDashboard from "./pages/RecipeDashboard";
import ShoppingList from "./pages/ShoppingList";
import WhatToCook from "./pages/WhatToCook";

function App() {
  const [likedRecipes, setLikedRecipes] = useState(
    JSON.parse(localStorage.getItem("likedRecipes")) || []
  );

  const [boughtIngredients, setBoughtIngredients] = useState(
    JSON.parse(localStorage.getItem("boughtIngredients")) || []
  );

  useEffect(() => {
    localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
  }, [likedRecipes]);

  useEffect(() => {
    localStorage.setItem(
      "boughtIngredients",
      JSON.stringify(boughtIngredients)
    );
  }, [boughtIngredients]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/recipe-dashboard"
          element={
            <RecipeDashboard
              likedRecipes={likedRecipes}
              setLikedRecipes={setLikedRecipes}
              boughtIngredients={boughtIngredients}
              setBoughtIngredients={setBoughtIngredients}
            />
          }
        />
        <Route
          path="/shopping-list"
          element={
            <ShoppingList
              boughtIngredients={boughtIngredients}
              setBoughtIngredients={setBoughtIngredients}
            />
          }
        />
        <Route
          path="/what-to-cook"
          element={
            <WhatToCook
              likedRecipes={likedRecipes}
              setLikedRecipes={setLikedRecipes}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

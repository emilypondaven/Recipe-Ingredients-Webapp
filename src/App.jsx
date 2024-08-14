import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDashboard from "./pages/RecipeDashboard";
import ShoppingList from "./pages/ShoppingList";
import WhatToCook from "./pages/WhatToCook";
import SnackRecommendation from "./pages/SnackRecommendation";
import { doc, collection, getDocs } from "firebase/firestore";
import { db } from "./config/Firestore";

function App() {
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [boughtIngredients, setBoughtIngredients] = useState([]);

  const getLikedRecipes = async () => {
    const likedRecipesRef = collection(
      db,
      "users",
      "4A9NGq8eZsQoI4Wf5ner",
      "likedRecipes"
    );
    const snapshot = await getDocs(likedRecipesRef);

    // Map over the documents and extract their data
    const items = snapshot.docs.map((doc) => ({
      id: doc.id, // Get document ID if needed
      ...doc.data(), // Spread the document data
    }));

    // Update the state with the fetched items
    setLikedRecipes(items)
  };

  const savedLikedRecipes = async () => {
    const likedRecipesRef = collection(
      db,
      "users",
      "4A9NGq8eZsQoI4Wf5ner",
      "likedRecipes"
    );
    const snapshot = await getDocs(likedRecipesRef);

    // Map over the documents and extract their data
    const items = snapshot.docs.map((doc) => ({
      id: doc.id, // Get document ID if needed
      ...doc.data(), // Spread the document data
    }));

    // Update the state with the fetched items
    setLikedRecipes(items)
  };

  const getBoughtIngredients = async () => {
    const boughtIngredientsRef = collection(
      db,
      "users",
      "4A9NGq8eZsQoI4Wf5ner",
      "boughtIngredients"
    );
    const snapshot = await getDocs(boughtIngredientsRef);

    // Map over the documents and extract their data
    const items = snapshot.docs.map((doc) => ({
      id: doc.id, // Get document ID if needed
      ...doc.data(), // Spread the document data
    }));

    // Update the state with the fetched items
    setBoughtIngredients(items);
  };

  useEffect(() => {
    getLikedRecipes();
    getBoughtIngredients();
  }, []);

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
        <Route
          path="/snack-recommendations"
          element={
            <SnackRecommendation />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

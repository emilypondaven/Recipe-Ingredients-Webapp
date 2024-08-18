import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDashboard from "./pages/RecipeDashboard";
import ShoppingList from "./pages/ShoppingList";
import WhatToCook from "./pages/WhatToCook";
import Auth from "./pages/Auth"
import SnackRecommendation from "./pages/SnackRecommendation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/Firebase";
import { AuthContext } from "./components/AuthProvider"

function App() {
  const { user } = useContext(AuthContext);
  const [likedRecipes, setLikedRecipes] = useState([]);

  const getLikedRecipes = async () => {
    console.log("it is run")
    try {
      const likedRecipesRef = collection(
        db,
        "users",
        user.uid,
        "likedRecipes"
      );

      const snapshot = await getDocs(likedRecipesRef);
  
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setLikedRecipes(items);
    } catch (error) {
      console.error("Error fetching liked recipes:", error);
    }
  };

  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Auth />} />
        <Route exact path="/home" element={<Home 
          getLikedRecipes={getLikedRecipes}
        />} />
        <Route
          path="/recipe-dashboard"
          element={
            <RecipeDashboard
              likedRecipes={likedRecipes}
              setLikedRecipes={setLikedRecipes}
            />
          }
        />
        <Route
          path="/shopping-list"
          element={
            <ShoppingList/>
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

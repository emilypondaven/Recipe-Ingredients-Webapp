import React, { useContext } from "react";
import { useState, useEffect } from "react";
import IngredientsInput from "../components/IngredientsInput";
import IngredientsList from "../components/IngredientsList";
import NavBar from "../components/NavBar";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  updateDoc,
  setDoc,
  getDoc,
  increment
} from "firebase/firestore";
import { db } from "../config/Firebase";
import { AuthContext } from "../components/AuthProvider"

function ShoppingList() {
  const { user } = useContext(AuthContext);
  // List of all the ingredient names, their food group, and their checked values
  const [ingredients, setIngredients] = useState([]);

  // Ingredient typed into the input bar
  const [ingredientValue, setIngredientValue] = useState({
    value: "",
    group: "Meat",
  });

  const getIngredients = async () => {
    const shoppingListRef = collection(
      db,
      "users",
      user.uid,
      "shoppingList"
    );
    const snapshot = await getDocs(shoppingListRef);

    // Map over the documents and extract their data
    const items = snapshot.docs.map((doc) => ({
      id: doc.id, // Get document ID if needed
      ...doc.data(), // Spread the document data
    }));

    // Update the state with the fetched items
    setIngredients(items);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  function getWeekIdentifier(date) {
    const week = Math.ceil((date.getDate() - date.getDay() + 1) / 7);
    return `week ${week}`;
  }

  // Functions handling adding, deleting, editing, and checking ingredients list

  async function handleAddIngredients(newIngredient) {
    if (!ingredients.includes(newIngredient.value)) {
      const newIngredientsList = [
        ...ingredients,
        {
          value: newIngredient.value,
          group: newIngredient.group,
          checked: false,
        },
      ];
      setIngredients(newIngredientsList);

      // Add to firestore
      const shoppingListRef = doc(
        db,
        "users",
        user.uid,
        "shoppingList",
        newIngredient.value
      );
      await setDoc(shoppingListRef, {
        value: newIngredient.value,
        group: newIngredient.group,
        checked: false,
      });
    }
  }

  async function handleDeleteIngredient(handleIngredient) {
    const newIngredientsList = ingredients.filter((ingredient) => {
      return ingredient.value != handleIngredient;
    });
    setIngredients(newIngredientsList);

    // Delete from firestore
    const ingredientRef = doc(
      db,
      "users",
      user.uid,
      "shoppingList",
      handleIngredient
    );
    await deleteDoc(ingredientRef);
  }

  function handleEditIngredient(handleIngredient) {
    const groupToEdit = ingredients.find(
      (ingredient) => ingredient.value === handleIngredient
    ).group;

    setIngredientValue({ value: handleIngredient, group: groupToEdit });
    handleDeleteIngredient(handleIngredient);
  }

  async function handleCheckedIngredient(handleIngredient) {
    // Update the ingredients list
    const newIngredientsList = ingredients.map((ingredient) =>
      ingredient.value === handleIngredient
        ? { ...ingredient, checked: !ingredient.checked }
        : ingredient
    );
    setIngredients(newIngredientsList);

    // Update the firestore
    const ingredientRef = doc(
      db,
      "users",
      user.uid,
      "shoppingList",
      handleIngredient
    );
    const docSnap = await getDoc(ingredientRef);
    const prevChecked = docSnap.data()["checked"];
    await updateDoc(ingredientRef, {
      checked: !prevChecked,
    });

    // Update the bought ingredients list
    const weekId = getWeekIdentifier(new Date());
    const ingredientInformation = ingredients.find(
      (ingredient) => ingredient.value === handleIngredient
    );
    !ingredientInformation.checked
      ? addToBoughtIngredients(weekId, ingredientInformation.group)
      : removeFromBoughtIngredients(weekId, ingredientInformation.group);
  }

  async function addToBoughtIngredients(week, itemToUpdate) {
    const ingredientRef = doc(
      db,
      "users",
      user.uid,
      "boughtIngredients",
      week
    );
    const ingredientSnapshot = await getDoc(ingredientRef); // Fix the typo here
  
    if (!ingredientSnapshot.exists()) {
      await setDoc(ingredientRef, {
        Meat: 0,
        Carbohydrate: 0,
        "Fruit & Veg": 0, 
        Dairy: 0,
        Drinks: 0,
        "Sweets & Chips": 0,
      });
    }
  
    await updateDoc(ingredientRef, {
      [itemToUpdate]: increment(1) // Replace the semicolon with a comma
    });
  }

  async function removeFromBoughtIngredients(week, itemToRemove) {
    const ingredientRef = doc(
      db,
      "users",
      user.uid,
      "boughtIngredients",
      week
    );
    const ingredientData = (await getDoc(ingredientRef)).data()

    if (ingredientData[itemToRemove] != 0) {
      await updateDoc(ingredientRef, {
        [itemToRemove]: increment(-1)
      });
    }
  }

  return (
    <div>
      <NavBar format="topnav" />
      <main>
        <IngredientsInput
          ingredients={ingredients}
          handleAddIngredients={handleAddIngredients}
          ingredientValue={ingredientValue}
          setIngredientValue={setIngredientValue}
        />
        <IngredientsList
          ingredients={ingredients}
          handleDeleteIngredient={handleDeleteIngredient}
          handleEditIngredient={handleEditIngredient}
          handleCheckedIngredient={handleCheckedIngredient}
        />
      </main>
    </div>
  );
}

export default ShoppingList;

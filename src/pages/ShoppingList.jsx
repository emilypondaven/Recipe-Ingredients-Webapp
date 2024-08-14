import React from "react";
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
} from "firebase/firestore";
import { db } from "../config/Firestore";

function ShoppingList({ boughtIngredients, setBoughtIngredients }) {
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
      "4A9NGq8eZsQoI4Wf5ner",
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
        "4A9NGq8eZsQoI4Wf5ner",
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
      "4A9NGq8eZsQoI4Wf5ner",
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
      "4A9NGq8eZsQoI4Wf5ner",
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

  function addToBoughtIngredients(week, itemToUpdate) {
    // Check if the week exists in the data
    setBoughtIngredients((prevIngredients) => {
      let newIngredients = [...prevIngredients];
      let weekIndex = newIngredients.findIndex((value) => value[0] === week);
      const itemIndex = getIndexFromFoodGroup(itemToUpdate);
      if (weekIndex === -1) {
        newIngredients = [[week, 0, 0, 0, 0, 0, 0, 0]];
        weekIndex = 0;
      }

      newIngredients[weekIndex][itemIndex] += 1;
      // Calculate the average
      newIngredients[weekIndex][7] = calculateAverage(
        newIngredients[weekIndex]
      );
      return newIngredients;
    });
  }

  function removeFromBoughtIngredients(week, itemToRemove) {
    setBoughtIngredients((prevIngredients) => {
      const newIngredients = [...prevIngredients];
      const weekIndex = newIngredients.findIndex((value) => value[0] === week);
      const itemIndex = getIndexFromFoodGroup(itemToRemove);
      newIngredients[weekIndex][itemIndex] -= 1;

      // Calculate the average
      newIngredients[weekIndex][7] = calculateAverage(
        newIngredients[weekIndex]
      );

      return newIngredients;
    });
  }

  function getIndexFromFoodGroup(i) {
    if (i === "Meat") return 1;
    if (i === "Carbohydrate") return 2;
    if (i === "Fruit & Veg") return 3;
    if (i === "Dairy") return 4;
    if (i === "Drinks") return 5;
    if (i === "Sweets & Chips") return 6;
  }

  function calculateAverage(data) {
    const values = data.slice(1, -1);
    const average = values.reduce((acc, val) => acc + val, 0) / values.length;

    return average;
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

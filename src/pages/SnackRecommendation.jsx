import React, { useState } from "react";
import NavBar from "../components/NavBar";

export default function SnackRecommendation() {
  const [refresh, setRefresh] = useState(false);
  const [healthy, setHealthy] = useState(true);
  const [snackList, setSnackList] = useState([]);

  const snacks = {
    unhealthy: [
      { item: "Protein bar", healthy: false },
      { item: "Store-bought popcorn", healthy: false },
      { item: "Seaweed chips", healthy: false },
      { item: "Pringles chips", healthy: false },
      { item: "Pretzels", healthy: false },
      { item: "Chocolate sweets", healthy: false },
      { item: "Crackers", healthy: false },
      { item: "Chocolate-chip Cookies", healthy: false },
      { item: "Oatmeal cookies", healthy: false },
      { item: "Brownies", healthy: false },
      { item: "Oreos", healthy: false },
      { item: "Reeses", healthy: false },
      { item: "Donuts", healthy: false },
      { item: "Digestives", healthy: false },
    ],
    healthy: [
      { item: "Apple slices with peanut butter", healthy: true },
      { item: "Mixed nuts", healthy: true },
      { item: "Carrot sticks with hummus", healthy: true },
      { item: "Kale chips", healthy: true },
      { item: "Berries", healthy: true },
      { item: "Rice cake", healthy: true },
      { item: "Avocado toast", healthy: true },
      { item: "Dark chocolate", healthy: true },
      { item: "Grapes", healthy: true },
      { item: "Mango", healthy: true },
      { item: "Banana", healthy: true },
      { item: "Chia pudding", healthy: true },
      { item: "Air-popped popcorn", healthy: true },
    ],
  };

  function generateSnackList() {
    const newSnackList = [];
    const data = healthy ? snacks.healthy : snacks.unhealthy;
    for (let i = 0; i < 3; i++) {
      let randomSnack = data[Math.floor(Math.random() * snacks.healthy.length)]
      while (newSnackList.includes(randomSnack)) {
        randomSnack = data[Math.floor(Math.random() * snacks.healthy.length)];
        console.log(newSnackList, randomSnack)
      }
      newSnackList.push(randomSnack);
    }

    setSnackList(newSnackList);
  }

  function handleClick() {
    setRefresh(true);
    generateSnackList();
  }

  return (
    <div>
      <NavBar format="topnav" />
      <div className="snackGenerator">
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <button style={{width:"80%"}} onClick={handleClick}>
            {refresh ? "Refresh" : "Give me some snacks"}
            </button>
            <button style={{backgroundColor: !healthy ? "#EDCCCB" : "#D0DFB3", width: "6em" }} onClick={() => setHealthy((prev) => !prev)}>{healthy ? "Healthy snacks" : "Unhealthy snacks"}</button>
        </div>
        <div className="snackList">
          {snackList.map((snack, index) => (
            <span key={index}>{snack.item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

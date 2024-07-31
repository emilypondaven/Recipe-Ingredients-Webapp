import React, { useState } from 'react'
import NavBar from "../components/NavBar"

export default function SnackRecommendation() {
    const [ refresh, setRefresh ] = useState(false)
    const [ snackList, setSnackList] = useState([])

    const snacks = [
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
    ]

    function generateSnackList() {
        let newSnackList = []
        for (let i=0; i < 3; i++) {
            newSnackList.push(snacks[(Math.floor(Math.random() * snacks.length))])
        }

        setSnackList(newSnackList)
    }

    function handleClick() {
        setRefresh(true)
        generateSnackList()
    }

  return (
    <div>
        <NavBar format="topnav" />
        <div className="snackGenerator">
            <button onClick={handleClick}>{refresh ? "Refresh" : "Give me some snacks"}</button>
            <div className="snackList">
                {snackList.map((snack, index) => (
                    <span key={index} style={{backgroundColor: snack.healthy ? "#CFE8B5" : "#E8B7B5"}}>{snack.item}</span>
                ))}
            </div>
        </div>
    </div>
  )
}
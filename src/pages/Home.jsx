import React, { useContext, useEffect } from 'react'
import NavBar from '../components/NavBar'

export default function Home({ getLikedRecipes }) {

  useEffect(() => {
    getLikedRecipes();
  }, []);

  return (
    <div>
        <NavBar format="homeButtons"/>
    </div>
  )
}

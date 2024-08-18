import React, { useContext, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { AuthContext } from "../components/AuthProvider"

export default function Home({ getLikedRecipes }) {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if ( user ) {
      getLikedRecipes();
    }
  }, [user]);

  return (
    <div>
        <NavBar format="homeButtons"/>
    </div>
  )
}

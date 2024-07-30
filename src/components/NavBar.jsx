import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar(props) {
    const { format } = props

    return (
        <nav className={format}>
            <ul>
                <li><NavLink to="/recipe-dashboard">Recipes Dashboard</NavLink></li>
                <li><NavLink to="/shopping-list">Shopping List</NavLink></li>
                <li><NavLink to="/what-to-cook">What to Cook?</NavLink></li>
            </ul>
        </nav>
  )
}

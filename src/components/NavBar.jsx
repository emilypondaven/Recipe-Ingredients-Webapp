import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from "./AuthProvider"

export default function NavBar(props) {
    const { format } = props
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            logOut();
            navigate("/"); // Redrecit to the login or home page after logging out
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    return (
        <nav className={format}>
            <ul>
                <li><NavLink to="/recipe-dashboard">Recipes Dashboard</NavLink></li>
                <li><NavLink to="/shopping-list">Shopping List</NavLink></li>
                <li><NavLink to="/what-to-cook">What to Cook?</NavLink></li>
                <li><NavLink to="/snack-recommendations">Snack Inspo</NavLink></li>
                {format == "topnav" && <li><NavLink to="/" onClick={handleLogout}>Logout</NavLink></li>}
            </ul>
        </nav>
  )
}

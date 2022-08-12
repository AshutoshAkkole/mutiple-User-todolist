import React from "react";

function Navbar() {
    return (
        <nav className="nav">
                <img src="logo.png" alt="logo-img" />
            <ul>
                <li>Home</li>
                <li>Create</li>
            </ul>
                <img src="logo.png" alt="profile-img" className="circle-img" />
        </nav>
    )
}

export default Navbar;
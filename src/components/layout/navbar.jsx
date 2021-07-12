import React from 'react';
import '../scss/navbar.scss';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-wrapper">
                <h1>React Todo Tracker</h1>
                <ul className="nav-list">
                    <li><a className="nav-links" href="/addtodo">Add Todo</a></li>
                    <li><a className="nav-links" href="/">About</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;

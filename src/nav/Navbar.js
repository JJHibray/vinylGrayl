import React, { Component } from "react"
import { NavbarBrand } from 'reactstrap'
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "../nav/Navbar.css"

// navbar navbar-light light-green


class NavBar extends Component {
    render() {
        return (
            <nav style={{ backgroundColor: '#333', borderColor: '#797a77' }}
            className="navbar flex-md-nowrap p-0 shadow"
            >
                 <NavbarBrand href="/">Vinyl Grayl</NavbarBrand>
                <ul  className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">MyCollection</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/watchlist">Watchlist</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/holyGrayl">Holy Grayl</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/" onClick={() => sessionStorage.clear()} className="nav-link" to="/">Logout</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar
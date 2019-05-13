import React, { Component } from "react"
import { NavbarBrand } from 'reactstrap'
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light light-green flex-md-nowrap p-0 shadow"> 
                 <NavbarBrand href="/">Vinyl Grayl</NavbarBrand>
                <ul className="nav nav-pills nav-fill">
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
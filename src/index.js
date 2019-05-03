import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import './Index.css'
import VinylGrayl from "./VinylGrayl"






ReactDOM.render(
  <Router>
    <VinylGrayl />
  </Router>
  , document.getElementById('root'))
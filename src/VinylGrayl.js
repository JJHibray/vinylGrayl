import React, { Component } from "react";
import Navbar from "./nav/Navbar";
import ApplicationViews from "./components/ApplicationViews";




class VinylGrayl extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="Vinyl">
        <ApplicationViews />
        </div>
      </React.Fragment>
    );
  }
}

export default VinylGrayl;
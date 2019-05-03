import React, { Component } from "react";
import Navbar from "./nav/Navbar";
import ApplicationViews from "./components/ApplicationViews";



class VinylGrayl extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default VinylGrayl;
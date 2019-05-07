import React, { Component } from "react";

export default class CollectionForm extends Component {
    // Set initial state
    state = {
      artistName: "",
      albumTitle: "",
      year:"",
      condition: "",
      watchList: false,
      holyGrayl: false
    };

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
      const stateToChange = {};
      stateToChange[evt.target.id] = evt.target.value;
      this.setState(stateToChange);
    };

    constructNewRecord = evt => {
        evt.preventDefault();
        let userId = sessionStorage.getItem("userId")
        userId = parseInt(userId)
        const record = {
        artistName: this.state.artistName,
        albumTitle: this.state.albumTitle,
        year: this.state.year,
        condition: this.state.condition,
        watchList: this.state.watchList,
        holyGrayl: this.state.holyGrayl,
        date: new Date(),
        userId: userId

    }
    this.props
        .addRecord(record)
    .then(() => this.props.history.push("/"))
}


    render() {
        return (
          <React.Fragment>
            <form className="NewsForm">
              <div className="form-group">
                <label htmlFor="artistName">Artist Name</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="artistName"
                  placeholder="Artist Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="albumTitle">Album Title</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="albumTitle"
                  placeholder="Album Title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="year">Year</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="year"
                  placeholder="Year of Issue"
                />
              </div>
              <div className="form-group">
                <label htmlFor="condition">Condition</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="condition"
                  placeholder="Condition"
                />
              </div>
              <button
                type="submit"
                onClick={this.constructNewRecord}
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </React.Fragment>
        );
      }
    }
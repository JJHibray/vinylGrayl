import React, { Component } from "react";

export default class CollectionForm extends Component {
    // Set initial state
    state = {
      artistName: "",
      albumTitle: "",
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
        const record = {
        artistName: this.state.artistName,
        albumTitle: this.state.albumTitle,
        condition: this.state.condition,
        watchList: this.state.watchList,
        holyGrayl: this.state.holyGrayl,
        date: new Date()

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
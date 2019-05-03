import React, { Component } from "react"
import CollectionManager from "../../modules/CollectionManager";

export default class CollectionEditForm extends Component {

state = {
    artistName:"",
    albumTitle:"",
    condition:""
}

handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
}

updateExistingRecords = evt => {
    evt.preventDefault()

    if (this.state.title === "") {
      window.alert("Please add record");
    } else {
      const editedRecords = {
        id: this.props.match.params.recordId,
        artistName: this.state.artistName,
        albumTitle: this.state.albumTitle,
        condition: this.state.condition,
        watchList: false,
        holyGrayl: false
      };
  this.props.editRecord(editedRecords)
  .then(() => this.props.history.push("/"))
  }
}

componentDidMount() {
    CollectionManager.getOneRecord(this.props.match.params.recordId)
    .then(record => { console.log(record)
      this.setState({
        artistName: record.artistName,
        albumTitle: record.albumTitle,
        condition: record.condition
      });
    });
  }

render() { console.log(this.props.myCollection)
    return (
      <React.Fragment>
        <form className="RecordForm">
          <div className="form-group">
            <label htmlFor="artistName">Artist Name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="artistName"
              value = {this.state.artistName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="albumTitle">albumTitle</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="albumTitle"
              value= {this.state.albumTitle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="condition">URL</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="condition"
              value= {this.state.condition}
            />
          </div>
          <button
            type="submit"
            onClick={this.updateExistingRecords}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
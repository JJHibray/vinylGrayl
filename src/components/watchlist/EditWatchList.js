import React, { Component } from "react"
import { storage } from "../firebase/Firebase"
import CollectionManager from "../../modules/CollectionManager";

export default class EditWatchList extends Component {

state = {
    artistName:"",
    albumTitle:"",
    year:"",
    condition:"",
    imageURL:""
}

handlePhoto = event => {
  if (event.target.files[0]) {
    const image = event.target.files[0]
    this.setState({
      imageURL: image
    })
  }
}

handleUpload = () => {
  const image = this.state.imageURL
  const uploadTask = storage.ref(`images/${image.name}`).put(image)
  uploadTask.on("state_changed",
  (snapshot) => {
    this.setState({
      loadMin: snapshot.bytesTransferred,
      loadMax: snapshot.totalBytes
    })
  },
  (error) => {

  },
  () => {
    storage.ref("images").child(image.name).getDownloadURL().then(imageURL => {
      this.setState({ imageURL })
    })
  }
  )
}

handleImage = () => {
  if(this.state.imageURL !== "") {
    return <img className="img-fluid" src={this.state.imageURL} alt="albumCover" />
  }
}

handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
}

updateExistingRecords = evt => {
    evt.preventDefault()

    let userId = sessionStorage.getItem("userId")
        userId = parseInt(userId)

    if (this.state.title === "") {
      window.alert("Please add record");
    } else {

      const editedRecords = {
        id: this.props.match.params.recordId,
        artistName: this.state.artistName,
        albumTitle: this.state.albumTitle,
        year: this.state.year,
        condition: this.state.condition,
        watchList: true,
        holyGrayl: false,
        imageURL: this.state.imageURL,
        userId: userId
      };
  this.props.editRecord(editedRecords)
  .then(() => this.props.history.push("/watchlist"))
  }
}

componentDidMount() {
    CollectionManager.getOneRecord(this.props.match.params.recordId)
    .then(record => { console.log(record)
      this.setState({
        artistName: record.artistName,
        albumTitle: record.albumTitle,
        year: record.year,
        condition: record.condition,
        imageURL: record.imageURL
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
                <label htmlFor="year">Year</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="year"
                  value= {this.state.year}
                />
              </div>
              <div>
        <label htmlFor="condition">
          Select Album Condition:
          <select value={this.state.value} onChange={this.handleFieldChange} id="condition">
            <option value="Mint">Mint</option>
            <option value="Excellent">Excellent</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
            <option value="Poor">Poor</option>
          </select>
        </label>
      </div>
      <div className="">
                <label htmlFor="imageURL">Upload Album Cover Image</label>
                <input
                  type="file"
                  required
                  className="label"
                  onChange={this.handlePhoto}
                  id="imageURL"
                  placeholder="Upload Album Cover"
                />
                <button
                type="button"
                onClick={this.handleUpload}
                className="btn btn-primary"
              >
                Upload
              </button>
              {this.handleImage()}
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
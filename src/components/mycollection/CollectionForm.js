import React, { Component } from "react";
import { storage } from "../firebase/Firebase"


export default class CollectionForm extends Component {
    // Set initial state
    state = {
      artistName: "",
      albumTitle: "",
      year:"",
      condition: "",
      watchList: false,
      holyGrayl: false,
      imageURL:""
    };




    // Update state whenever an input field is edited
    handleFieldChange = evt => {
      const stateToChange = {};
      stateToChange[evt.target.id] = evt.target.value;
      this.setState(stateToChange);
    };

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
        imageURL: this.state.imageURL,
        userId: userId

    }
    this.props
        .addRecord(record)
    .then(() => this.props.history.push("/"))
}


    render() {
        return (
          <React.Fragment>
            <form className="header">
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
              <div>
        <label htmlFor="condition">
          Select Album Condition:
          <select value={this.state.value} onChange={this.handleFieldChange} id="condition">
            <option value=""></option>
            <option value="Mint">Mint</option>
            <option value="Excellent">Excellent</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
            <option value="Poor">Poor</option>
          </select>
        </label>
      </div>
      <div className="addImage">
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
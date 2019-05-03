import React, { Component } from "react";
import { Route } from "react-router-dom"
import CollectionManager from "../modules/CollectionManager"
import CollectionList from "./mycollection/CollectionList"
import CollectionEditForm from "./mycollection/CollectionEditForm"
import CollectionForm from "./mycollection/CollectionForm";
import WatchList from "./watchlist/WatchList"
import WatchListForm from "./watchlist/WatchListForm"
import EditWatchList from "./watchlist/EditWatchList"

export default class ApplicationViews extends Component {

    state = {
      "users": [],
      "myCollection": [],
      "watchList":[]
    }

componentDidMount() {
    CollectionManager.getAllRecords().then(allRecords => {
        this.setState({
            myCollection: allRecords,
            watchlist: allRecords
        })
    })
}

addRecord = record => {
    return CollectionManager.post(record)
    .then(() => CollectionManager.getAllRecords())
    .then(allRecords =>
      this.setState({
        myCollection: allRecords,
        watchList: allRecords
      })
    )
   }
   deleteRecord = id => {
       return CollectionManager.removeAndListRecords(id)
       .then(allRecords => this.setState({
        myCollection: allRecords,
        watchList: allRecords
       })
       )
   }

   editRecord = (editedRecord) => {
    return CollectionManager.putRecord(editedRecord)
    .then(() => CollectionManager.getAllRecords())
    .then(record => {
      this.setState({
        myCollection: record,
        watchList: record
      })
    });
  };



render() {
    return (
        <React.Fragment>
            <Route exact path="/" render={(props) => {
                return <CollectionList {...props}
                myCollection={this.state.myCollection}
                deleteRecord={this.deleteRecord} />
            }} />
        <Route exact path="/myCollection/new" render={(props) => {
            return <CollectionForm {...props} myCollection={this.state.myCollection}
            addRecord={this.addRecord} />
        }} />
        <Route
          path="/myCollection/:recordId(\d+)/edit" render={props => {
            return <CollectionEditForm {...props} myCollection={this.state.articles} editRecord={this.editRecord}/>
         }}
        />
        <Route exact path="/watchlist" render={(props) => {
                return <WatchList {...props}
                watchList={this.state.watchList}
                deleteRecord={this.deleteRecord}
                myCollection={this.state.myCollection}
                />
                }} />
        <Route exact path="/watchlist/new" render={(props) => {
            return <WatchListForm {...props} myCollection={this.state.myCollection}
            addRecord={this.addRecord} />
        }} />
        <Route
          path="/watchlist/:recordId(\d+)/edit" render={props => {
            return <EditWatchList {...props} myCollection={this.state.articles}
             editRecord={this.editRecord}
             />
         }}
        />
    </React.Fragment>

    )
}
}

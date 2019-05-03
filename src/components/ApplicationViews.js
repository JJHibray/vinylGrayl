import React, { Component } from "react";
import { Route } from "react-router-dom"
import CollectionManager from "../modules/CollectionManager"
import CollectionList from "./mycollection/CollectionList"
import CollectionEditForm from "./mycollection/CollectionEditForm"
import CollectionForm from "./mycollection/CollectionForm";
import WatchList from "./watchlist/WatchList"
import WatchListForm from "./watchlist/WatchListForm"
import EditWatchList from "./watchlist/EditWatchList"
import HolyGraylList from "./holygrayl/HolyGraylList"
import HolyGraylForm from "./holygrayl/HolyGraylForm"
import EditHolyGrayl from "./holygrayl/EditHolyGrayl"

export default class ApplicationViews extends Component {

    state = {
      "users": [],
      "myCollection": [],
      "watchList":[],
      "holyGrayl":[]
    }

componentDidMount() {
    CollectionManager.getAllRecords().then(allRecords => {
        this.setState({
            myCollection: allRecords,
            watchlist: allRecords,
            holyGrayl: allRecords
        })
    })
}

addRecord = record => {
    return CollectionManager.post(record)
    .then(() => CollectionManager.getAllRecords())
    .then(allRecords =>
      this.setState({
        myCollection: allRecords,
        watchList: allRecords,
        holyGrayl: allRecords
      })
    )
   }
   deleteRecord = id => {
       return CollectionManager.removeAndListRecords(id)
       .then(allRecords => this.setState({
        myCollection: allRecords,
        watchList: allRecords,
        holyGrayl: allRecords
       })
       )
   }

   editRecord = (editedRecord) => {
    return CollectionManager.putRecord(editedRecord)
    .then(() => CollectionManager.getAllRecords())
    .then(record => {
      this.setState({
        myCollection: record,
        watchList: record,
        holyGrayl: record
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
        <Route exact path="/holyGrayl" render={(props) => {
                return <HolyGraylList {...props}
                holyGrayl={this.state.watchList}
                deleteRecord={this.deleteRecord}
                myCollection={this.state.myCollection}
                />
                }} />
        <Route exact path="/holyGrayl/new" render={(props) => {
            return <HolyGraylForm {...props} myCollection={this.state.myCollection}
            addRecord={this.addRecord} />
        }} />
        <Route
          path="/holyGrayl/:recordId(\d+)/edit" render={props => {
            return <EditHolyGrayl {...props} myCollection={this.state.articles}
             editRecord={this.editRecord}
             />
         }}
        />
    </React.Fragment>

    )
}
}

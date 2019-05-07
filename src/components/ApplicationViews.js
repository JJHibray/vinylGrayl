import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom"
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
import UserManager from "../modules/UserManager"
import Login from "./login/Login"
import Register from "./login/Register"

export default class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("userId") !== null

    state = {
      "users": [],
      "myCollection": [],
      "watchList":[],
      "holyGrayl":[],

    }

componentDidMount() {
    this.loadRecords()
}

onLogin = () => {
   this.loadRecords()

}

loadRecords = () => {
CollectionManager.getAllRecords().then(allRecords => {
  this.setState({
      myCollection: allRecords,
      watchList: allRecords,
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

  addToCollection = (patchedRecord) => {
  return CollectionManager.patchRecord(patchedRecord)
  .then(() => CollectionManager.getAllRecords())
  .then(record => {
    this.setState({
      myCollection: record,
      watchList: record,
      holyGrayl: record
    })
  });
}

  postUser = (newUser) => {
    return UserManager.postUser(newUser)
}

render() {
    return (
        <React.Fragment>
            <Route
              exact path="/login" render={props =>{
                return <Login users={this.state.users} {...props} postUser={this.postUser} onLogin={this.onLogin}/>
              }}
              />
            <Route exact path="/register" render={props => {
                return <Register users={this.state.users} {...props} postUser={this.postUser}/>
              }
            } />
            <Route exact path="/" render={(props) => {
              if(this.isAuthenticated()) {
                return <CollectionList {...props}
                myCollection={this.state.myCollection}
                deleteRecord={this.deleteRecord} />
              } else {
                return <Redirect to="/login"/>
              }
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
          if(this.isAuthenticated()) {
                return <WatchList {...props}
                watchList={this.state.watchList}
                deleteRecord={this.deleteRecord}
                addToCollection={this.addToCollection}
                myCollection={this.state.myCollection}
                />
              } else {
                return <Redirect to="/login"/>
              }
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
           if(this.isAuthenticated()) {
                return <HolyGraylList {...props}
                holyGrayl={this.state.watchList}
                deleteRecord={this.deleteRecord}
                myCollection={this.state.myCollection}
                addToCollection={this.addToCollection}
                />
              } else {
                return <Redirect to="/login"/>
              }
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

import React, { Component } from "react";
import UserManager from "../../modules/UserManager"

export default class Login extends Component {

state = {
    email:"",
    password:""
}

handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
}

handleLogin = async () => {
const promise = await UserManager.getAllUsers()
let userLogin = await promise.find(user =>
    user.email.toLowerCase()===this.state.email.toLowerCase()
    && user.password.toLowerCase()===this.state.password.toLowerCase()
    )
    if (await userLogin) {
        sessionStorage.setItem("userId", userLogin.id)
        // let recordPromise = await CollectionManager.getAllRecords()
        this.props.onLogin()
        this.props.history.push("/")
    }

    // UserManager.getAllUsers()
    // .then(users => {
    // let userLogin = users.find(user =>
    // user.email.toLowerCase()===this.state.email.toLowerCase()
    // && user.password.toLowerCase()===this.state.password.toLowerCase()
    // )
    // if (userLogin) {
    //     sessionStorage.setItem("userId", userLogin.id)
    //     CollectionManager.getAllRecords()
    //     .then(() => this.props.history.push("/"))
      else {
                window.alert ("There was an error with your login, please try again or re-register")

        }
    }


render(){
return(
    <div>
        <form onSubmit={this.handleLogin}>
            <h1 className="LoginEmail">Sign In</h1>
            <label>
                <input onChange={this.handleFieldChange} type="email"
                id="email"
                placeholder="email address"
                required="" />
            </label>
            <label>
                <input onChange={this.handleFieldChange} type="password"
                id="password"
                placeholder="password"
                required="" />
                <button type="button"
                onClick={this.handleLogin}> Sign In
                </button>
            </label>
        </form>

        <button type="button"
        onClick={() => {
            this.props.history.push("/register")
        }}>Register</button>
    </div>
)
}

}
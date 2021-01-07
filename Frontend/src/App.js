import React, { Component } from 'react';
import Login from "./components/Others/Login"
import './App.css';
import FeedContainer from "./components/Others/FeedContainer"
import CheckoutContainer from "./components/Orders/components/CheckoutContainer"
import DashBoard from './components/Dashboard';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import CreateAccount from "./components/Others/CreateAccount"
import cookie from 'react-cookies'
import { config } from './Constants'
class App extends Component {
  state = {
    newUser: {
      firstName: "",
      lastName: "",
      username: "",
      role: 0,
      email: "",
      password: "",
    },
    existingUser: {
      email: "",
      password: ""
    },
    loading: true,
    currentUser: null,
    squareApplicationID: "",
    squareAccessKey: "",
    squareLocationId: "",
    apiKey: ""
  }

  updateUser = (user) => {
    this.setState({
      currentUser: user,
      loading: false,
      favoriteTrucks: user.favorites
    })
  }

  doFetch = (url, method, body, newState) => {
    fetch(`${config.url.BASE_URL}/${url}`, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
        token: cookie.load('jwt')
      },
      body: JSON.stringify({ body })
    }
    ).then(resp => resp.json())
      .then(res => this.setState({ newState }))
  }


  componentDidMount() {
    if (cookie.load("jwt")) {
      fetch(`${config.url.BASE_URL}/users/login`, {
        method: "POST",
        crossDomain: 'true',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Accept: 'application/json'
        },
        body: JSON.stringify({
          user: {
            token: cookie.load('jwt')
          }
        })
      }).then(response => {
        if (response.ok) {
          return response.json()

        } else {
          alert("Incorrect Email or Password")
        }
      })
        .then(data => {
          if (data.authenticated) {
            cookie.save('jwt', data.token, { maxAge: 3600 })
            this.setState({ currentUser: data.user, favoriteTrucks: data.user.favorites })
          }
        }).catch((e) => console.error(e))
    }



    fetch(`${config.url.BASE_URL}/locations`, {
      headers: {
        token: cookie.load('jwt')
      }

    })
      .then(res => res.json())
      .then(data => this.setState({ apiKey: data[0], squareAccessKey: data[1], squareApplicationID: data[2], squareLocationId: data[3] }))

  }
  //   fetch(`${config.url.BASE_URL}/updates`, {
  //     headers: {
  //       token: cookie.load('jwt')
  //     }

  //   })
  //     .then(res => res.json())
  //     .then(data => this.setState({ updates: data }))
  // }





  handleUserLogOut = (event) => {
    event.preventDefault()
    const r = window.confirm("Do you really want to Sign Out?")
    if (r === true) {
      fetch(`${config.url.BASE_URL}/users/logout`, {

        method: 'DELETE'

      })
      cookie.remove('jwt')

      this.setState({ currentUser: null })

    }
  }


  handleCreateAccountSubmit = (event) => {
    event.preventDefault()

    fetch(`${config.url.BASE_URL}/users`, {
      method: "POST",

      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: this.state.newUser })
    })
      .then(res => res.json())
      .then(res => { this.setState({ currentUser: res, existingUser: { ...this.state.existingUser, email: res.email, password: res.password } }) }, this.handleLoginSubmit())

      .catch(e => console.error(e))

  }


  handleCreateAccountChange = (event) => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        [event.target.id]: event.target.value
      }
    })

  }
  handleCreateAccountOwnerChange = (event) => {

    event.currentTarget.classList.length < 4 ?
      this.setState(
        {
          newUser: {
            ...this.state.newUser,
            role: 1
          }
        }) :
      this.setState(
        {
          newUser: {
            ...this.state.newUser,
            role: 0
          }
        })
  }

  handleLoginChange = (event) => {
    this.setState({
      existingUser: {
        ...this.state.existingUser,
        [event.target.id]: event.target.value
      }
    })
  }
  handleLoginSubmit = (event) => {
    event.preventDefault()
    fetch(`${config.url.BASE_URL}/users/login`, {
      method: "POST",
      crossDomain: 'true',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: this.state.existingUser.email,
          password: this.state.existingUser.password,
        }
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json()

        } else {
          alert("Incorrect Email or Password")
        }
      })
      .then(data => {
        if (data.authenticated) {
          cookie.save('jwt', data.token, { maxAge: 3600 })
          this.setState({ currentUser: data.user, favoriteTrucks: data.user.favorites })
        }
        else {
          alert("Incorrect Email or Password")
        }
      }).catch((e) => console.error(e))
  }



  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route exact path="/login" render={() => this.state.currentUser ? <Redirect to="/home" /> :

              <Login handleLoginChange={this.handleLoginChange} handleLoginSubmit={this.handleLoginSubmit} />} />
            <Route path="/register" render={() => <CreateAccount owner={this.state.owner} handleCreateAccountSubmit={this.handleCreateAccountSubmit} handleCreateAccountOwnerChange={this.handleCreateAccountOwnerChange} handleCreateAccountChange={this.handleCreateAccountChange} />} />
            <Route path="/home" render={() => this.state.currentUser ? <DashBoard apiKey={this.state.apiKey} user={this.state.currentUser} favoriteTrucks={this.state.favoriteTrucks} handleUserLogOut={this.handleUserLogOut} /> : <Redirect to="/login" />} />
            <Route path="/feed" render={() => this.state.currentUser ? <FeedContainer updates={this.state.updates} user={this.state.currentUser} /> : <Redirect to="/login" />} />
            <Route path="/orders" render={() => this.state.currentUser ? <CheckoutContainer squareApplicationID={this.state.squareApplicationID} squareAccessKey={this.state.squareAccessKey} squareLocationId={this.state.squareLocationId} /> : <Redirect to="/login" />} />

          </Switch>
        </Router>

      </div >
    )
  }
}



export default App;

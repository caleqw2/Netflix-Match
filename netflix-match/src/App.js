import React, { useState, useEffect, Component } from 'react';
import './App.css';
import { Helmet } from 'react-helmet'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavigationBar from './components/NavigationBar.js';
import Question1 from './components/Question1.js';
import Home from './components/Home.js';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import Watchlist from './components/Watchlist.js';
import Quiz from './components/Quiz.js';
import Account from './components/Account.js';
import About from './components/About.js';
import Results from './components/Results.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userID: -1
    };

    this.setUsername = this.setUsername.bind(this);
    this.setUserID = this.setUserID.bind(this);
  }

  setUsername(username) {
    this.setState({username: username});
  }

  setUserID(userID) {
    this.setState({userID: userID});
  }

  render() {
    const TITLE = 'My Page Title';
    console.log("App is being reloaded! Omg!");
    return (
      <Router>
        <div>
          <NavigationBar username={this.state.username} userID={this.state.userID}/>

          <Switch>
            <Route path="/About" component={About} />
            <Route path="/Account" component={() => <Account userID={this.state.userID} setUsername={this.setUsername} setUserID={this.setUserID}/>} />
            <Route path="/Quiz" component={Quiz} />
            <Route path="/Watchlist" component={() => <Watchlist username={this.state.username} userID={this.state.userID} />} />
            <Route path="/Results" component={Results} />
            <Route path="/" component={() => <Home setUsername={this.setUsername} setUserID={this.setUserID} />}/>
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;

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


class App extends Component {
  render() {
    const TITLE = 'My Page Title';

    return (
      <Router>
        <div>
          <NavigationBar/>

          <Switch>
            <Route path="/About" component={About} />
            <Route path="/Account" component={Account} />
            <Route path="/Quiz" component={Quiz} />
            <Route path="/Watchlist" component={Watchlist} />
            <Route path="/" component={Home} />
          </Switch>

          
        </div>
      </Router>
    );
  }
}

export default App;

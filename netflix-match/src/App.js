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

class App extends Component {
  render() {
    const TITLE = 'My Page Title';

    return (
      <Router>
        <div>
          <NavigationBar/>

          <Switch>
            <Route path="/" component={Home} />
            <Route path="/q1" component={Question1} />
          </Switch>

          {/* <div style={{height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Link to="/q1" className="btn btn-primary">Start Quiz</Link>
          </div> */}

          
        </div>
      </Router>
    );
  }
}

export default App;

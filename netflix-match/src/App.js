import React, { useState, useEffect, Component } from 'react';
import './App.css';
import { Helmet } from 'react-helmet'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from './components/NavigationBar.js';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

class App extends Component {


  render() {
    const TITLE = 'My Page Title';

    return (
      <div>
          <NavigationBar/>

          <div>
            <p>Netflix Match</p>
          </div>
      </div>
    );
  }
}

export default App;

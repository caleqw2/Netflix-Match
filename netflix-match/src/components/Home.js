import React, { useState, useEffect, Component } from 'react';
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavigationBar from './NavigationBar.js';
import Question1 from './Question1.js';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

class Home extends Component {
  render() {
    const TITLE = 'My Page Title';

    return (
      
        <div>

          <div style={{height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Link to="/Quiz" className="btn btn-primary">Start Quiz</Link>
          </div>

          
        </div>
       
    );
  }
}

export default Home;

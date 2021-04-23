import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Helmet } from 'react-helmet'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }`;

function App() {
  const [placeholder, setPlaceholder] = useState('Hi');
/*
  useEffect(() => {
    fetch('/show_beth_adv_query_result').then(res => res.json()).then(data => {
      setPlaceholder(data.result);
    });
  }
  , []);*/

  const TITLE = 'My Page Title'

class MyComponent extends React.PureComponent {
  render () {
    return (
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      </>
    )
  }
}
  return (

    
    <div className="App">
      <header className="App-header">
        

          <view> <Styles>
          <Navbar expand="lg">
            <Navbar.Brand href="/">Tutorial</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Form className="form-center">
              <FormControl type="text" placeholder="Search" className="" />
            </Form>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item> 
                <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Styles>
             <p>
               Netflix Match
             </p>
            
             <p>Flask says {placeholder}</p>
     </view>

    
      </header>
    </div>
  );
}

export default App;

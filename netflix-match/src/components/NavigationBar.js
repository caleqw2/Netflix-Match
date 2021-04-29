import React, { Component } from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; };
    width: 100%
    margin-right: 5px;
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
  }

  .title_text {
    position: absolute !important;
    left: 25%;
    right: 25%;
    color: white;
    text-align: center;
  }
  .navBarLink {
    margin: 5px;
  }
`;

class NavigationBar extends Component {
  render() {
    return (
      <Styles>
        <Navbar expand="lg">
          <Navbar.Brand><Link className='navBarLink' to="/">Home</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          {/* BELOW is a search bar we might want later but don't need here, so don't delete yet pls */}
          {/* <Form className="form-center">
            <FormControl type="text" placeholder="Search" className="" />
          </Form> */}
          <div>
            <h1 className="title_text">Netflix Match</h1>
            <h3 style={{color: "white", fontSize: 20}}>Welcome {this.props.username}! {this.props.userID}</h3>
          </div>
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item><Link className='navBarLink' to="/Watchlist">Watchlist     </Link></Nav.Item> 
              <Nav.Item><Link className='navBarLink' to="/Account">Account      </Link></Nav.Item>
              <Nav.Item><Link className='navBarLink' to="/About">About         </Link></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
    );
  }
}

export default NavigationBar;
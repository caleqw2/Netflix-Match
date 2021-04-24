import React, { Component } from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; };
    width: 100%
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
`;

class NavigationBar extends Component {
  render() {
    return (
      <Styles>
        <Navbar expand="lg">
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          {/* <Form className="form-center">
            <FormControl type="text" placeholder="Search" className="" />
          </Form> */}
          <h1 className="title_text">Netflix Match!</h1>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item><Nav.Link href="/watchlist">Watchlist</Nav.Link></Nav.Item> 
              <Nav.Item><Nav.Link href="/account">Account</Nav.Link></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Styles>
    );
  }
}

export default NavigationBar;

// export const NavigationBar = () => (
//   <Styles>
//     <Navbar expand="lg">
//       <Navbar.Brand href="/">Tutorial</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav"/>
//       <Form className="form-center">
//         <FormControl type="text" placeholder="Search" className="" />
//       </Form>
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="ml-auto">
//           <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item> 
//           <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   </Styles>
// )


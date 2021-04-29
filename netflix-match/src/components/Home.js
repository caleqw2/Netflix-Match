import React, { useState, useEffect, Component } from 'react';
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavigationBar from './NavigationBar.js';
import Question1 from './Question1.js';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

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
  .btn btn-primary {
    margin: 5px;
  }
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.submitUsername = this.submitUsername.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }

  submitUsername(event) {
    if (this.state.username != "") {
      this.props.setUsername(this.state.username);
    }

    this.handleCreateUser();
  }

  handleCreateUser() {
    const url = `/create_or_get_user/${this.state.username}`
    fetch(url).then(res => res.json()).then(data => {
        this.props.setUserID(data.user_id);
    });
}

  render() {

    return (
      
        <div>

          <div style={{paddingTop : "50px", height: "90vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <form>
              <label>
                  Please Enter Username:
                  <input type="text" value={this.state.username} onChange={this.handleChangeUsername} />
              </label>
            </form>
            <div style={{float : 'left', paddingRight : '15px', paddingLeft : '15px'}}>
            <button onClick={this.submitUsername} >Submit</button>
            </div>
            <div style={{ paddingRight : '15px'}}>
            <Link to="/Quiz" className="btn btn-primary">Start Quiz</Link>
            </div>

          </div>

          
        </div>
       
    );
  }
}

export default Home;

import React, { useState, useEffect, Component } from 'react';
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import NavigationBar from './NavigationBar.js';
import Question1 from './Question1.js';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

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

          <div style={{height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <form>
              <label>
                  Please Enter Username:
                  <input type="text" value={this.state.username} onChange={this.handleChangeUsername} />
              </label>
            </form>

            <button onClick={this.submitUsername}>Submit</button>

            <Link to="/Quiz" className="btn btn-primary">Start Quiz</Link>
          </div>

          
        </div>
       
    );
  }
}

export default Home;

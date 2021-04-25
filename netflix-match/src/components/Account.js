import React, { useState, useEffect, Component, Button } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


class Account extends Component {

    // deleteAccount = () => {

    // }


  render() {
    const TITLE = 'My Page Title';

    return (
        <div style={{height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <p>Your Account</p>
        </div>
      
    );
  }
}

export default Account;
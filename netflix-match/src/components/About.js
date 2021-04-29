import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


class About extends Component {


  render() {
    const TITLE = 'My Page Title';

    return (
      <p style={{paddingTop : "50px", height: "90vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>Welcome to Netflix Match! Take our quiz to recieve Netflix recommendations based on your interests. You can also make an account and view/make changes to your watchlist later!</p>
    );
  }
}

export default About;
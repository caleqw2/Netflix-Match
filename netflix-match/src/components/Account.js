import React, { useState, useEffect, Component, Button } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import pic from '../delete_account.jpg';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletedText: "placeholder"
    };

    this.deleteAccount = this.deleteAccount.bind(this);
  }

    deleteAccount = () => {
      if (this.props.userID != -1) {
        fetch(`/delete_user/${this.props.userID}`).then(res => res.json()).then(data => {
          this.setState(state => ({
            deletedText: data.result
          }));

          this.props.setUserID(-1);
          this.props.setUsername("");
        });
      }
    }


  render() {
    const TITLE = 'My Page Title';

    return (
        <div style={{height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img src={pic}/>
            <button onClick={this.deleteAccount}>Delete My Account</button>
            <p>You just deleted: {this.state.deletedText}. Have a nice life!</p>
        </div>
    );
  }
}

export default Account;
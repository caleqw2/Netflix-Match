import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import NavigationBar from './NavigationBar.js';

class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      create_query_result: 'Click to reveal',
      update_query_result: 'Click to reveal',
      delete_query_result: 'Click to reveal',
      display_watchlist_result: 'Watchlist result',
      lookup_result: 'Click to reveal',
      user_name: '',
      media_name: '',
      watched: '',
      keyword: '',
      watchlist: ''
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeMediaName = this.handleChangeMediaName.bind(this);
    this.handleChangeWatched = this.handleChangeWatched.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    this.getWatchlist = this.getWatchlist.bind(this);
    
    this.createWatchlistEntry = this.createWatchlistEntry.bind(this);
    this.updateWatchlistEntry = this.updateWatchlistEntry.bind(this);
    this.deleteWatchlistEntry = this.deleteWatchlistEntry.bind(this);
    this.lookUpShow = this.lookUpShow.bind(this);
  }

  createWatchlistEntry() {    
    fetch(`/create_user_watch_list_entry?user_name=${this.props.username}&media_name=${this.state.media_name}&watched=${this.state.watched}`).then(res => res.json()).then(data => {
      this.setState(state => ({
        create_query_result: data.result
      }));
      this.getWatchlist();
    });

    
  }

  lookUpShow() {
    console.log(this.state.keyword);
    fetch(`/look_up_show_name?keyword=${this.state.keyword}`).then(res => res.json()).then(data => {
      this.setState(state => ({
        lookup_result: data.result
      }));
    });
  }

  updateWatchlistEntry() {
    fetch(`/update_user_watch_list_entry?user_name=${this.props.username}&media_name=${this.state.media_name}&watched=${this.state.watched}`).then(res => res.json()).then(data => {
      this.setState(state => ({
        update_query_result: data.result
      }));

      this.getWatchlist();
    });
  }

  displayWatchlist() {
    fetch(`/display_watchlist`).then(res => res.json()).then(data => {
      this.setState(state => ({
        display_watchlist_result: data.result
      }));
    });
  }

  getWatchlist() {
    fetch(`/get_watchlist/${this.props.userID}`).then(res => res.json()).then(data => {
      this.setState(state => ({
        watchlist: data.result
      }));
    });
  }

  deleteWatchlistEntry() {
    fetch(`/delete_user_watch_list_entry?user_name=${this.props.username}&media_name=${this.state.media_name}`).then(res => res.json()).then(data => {
      this.setState(state => ({
        delete_query_result: data.result
      }));
      this.getWatchlist();
    });
  }

  handleChangeUsername(event) {
    this.setState({user_name: event.target.value});
  }

  handleChangeMediaName(event) {
    this.setState({media_name: event.target.value});
  }

  handleChangeWatched(event) {
    this.setState({watched: event.target.value});
  }

  handleChangeKeyword(event) {
    this.setState({keyword: event.target.value});
  }

  handleSubmit(event) {
    alert('Username: ' + this.props.username + ' Media ID: ' + this.state.media_name + ' Watched: ' + this.state.watched);
    event.preventDefault();
  }

  componentDidMount() {
    this.getWatchlist();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
 
        <form onSubmit={this.handleSubmit}>

          <label>
            Media Name:
            <input type="text" value={this.state.media_name} onChange={this.handleChangeMediaName} />
          </label>

          <label>
            Watched (true or false):
            <input type="text" value={this.state.watched} onChange={this.handleChangeWatched} />
          </label>
        </form>

        <button onClick={this.createWatchlistEntry}>Create Watchlist Entry</button>
        <h3> Data from create watchlist entry: </h3>
        <p>{this.state.create_query_result} </p>

        <button onClick={this.updateWatchlistEntry}>Update Watchlist Entry</button>
        <h3>Data from update watchlist entry:</h3> 
        <p>{this.state.update_query_result} </p>

        <button onClick={this.deleteWatchlistEntry}>Delete Watchlist Entry</button>
        <h3>Data from delete watchlist entry:</h3> 
        <p>{this.state.delete_query_result} </p>

        <form>
          <label>
              Keyword Search:
              <input type="text" value={this.state.keyword} onChange={this.handleChangeKeyword} />
          </label>
        </form>

        {/* <Form className="form-center">
            <FormControl type="text" placeholder="Search" className="" />
        </Form> */}

        <button onClick={this.lookUpShow}>Keyword Search</button>
        <h3> Keyword Search Results: </h3>
        <p>{this.state.lookup_result}</p>

        <h2>Watchlist:</h2>
        <p>{this.state.watchlist}</p>

        </header>
      </div>
    );
  }
}

export default Watchlist;
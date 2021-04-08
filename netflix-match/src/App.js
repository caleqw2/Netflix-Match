import React from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avd_query_result: 'Click to reveal',
      create_query_result: 'Click to reveal',
      update_query_result: 'Click to reveal',
      lookup_result: 'Click to reveal',
      user_id: '',
      media_id: '',
      watched: '',
      keyword: ''
    };

    this.handleChangeUserID = this.handleChangeUserID.bind(this);
    this.handleChangeMediaID = this.handleChangeMediaID.bind(this);
    this.handleChangeWatched = this.handleChangeWatched.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    
    this.advancedQuery = this.advancedQuery.bind(this);
    this.createWatchlistEntry = this.createWatchlistEntry.bind(this);
    this.updateWatchlistEntry = this.updateWatchlistEntry.bind(this);
    this.deleteWatchlistEntry = this.deleteWatchlistEntry.bind(this);
    this.lookUpShow = this.lookUpShow.bind(this);
  }

  advancedQuery() {
    fetch('/show_beth_adv_query_result').then(res => res.json()).then(data => {
      this.setState(state => ({
        avd_query_result: data.result
      }));
    });
  }

  createWatchlistEntry() {    
    fetch(`/create_user_watch_list_entry?user_id=${this.state.user_id}&media_id=${this.state.media_id}&watched=${this.state.watched}`).then(res => res.json()).then(data => {
      this.setState(state => ({
        create_query_result: data.result
      }));
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
    fetch(`/update_user_watch_list_entry?user_id=${this.state.user_id}&media_id=${this.state.media_id}&watched=${this.state.watched}`).then(res => res.json()).then(data => {
      this.setState(state => ({
        update_query_result: data.result
      }));
    });
  }

  deleteWatchlistEntry() {
    fetch(`/delete_user_watch_list_entry?user_id=${this.state.user_id}&media_id=${this.state.media_id}`).then(res => res.json()).then(data => {
      this.setState(state => ({
        delete_query_result: data.result
      }));
    });
  }

  handleChangeUserID(event) {
    this.setState({user_id: event.target.value});
  }

  handleChangeMediaID(event) {
    this.setState({media_id: event.target.value});
  }

  handleChangeWatched(event) {
    this.setState({watched: event.target.value});
  }

  handleChangeKeyword(event) {
    this.setState({keyword: event.target.value});
  }

  handleSubmit(event) {
    alert('User ID: ' + this.state.user_id + ' Media ID: ' + this.state.media_id + ' Watched: ' + this.state.watched);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        
        <button onClick={this.advancedQuery}>Do Advanced Query</button>
        <p> Data from advanced query: {this.state.avd_query_result} </p>

        <form onSubmit={this.handleSubmit}>
          <label>
            User ID:
            <input type="text" value={this.state.user_id} onChange={this.handleChangeUserID} />
          </label>

          <label>
            Media ID:
            <input type="text" value={this.state.media_id} onChange={this.handleChangeMediaID} />
          </label>

          <label>
            Watched (true or false):
            <input type="text" value={this.state.watched} onChange={this.handleChangeWatched} />
          </label>

          <input type="submit" value="Submit" />
        </form>

        <button onClick={this.createWatchlistEntry}>Create Watchlist Entry</button>
        <p> Data from create watchlist entry: {this.state.create_query_result} </p>

        <button onClick={this.updateWatchlistEntry}>Update Watchlist Entry</button>
        <p> Data from update watchlist entry: {this.state.update_query_result} </p>

        <button onClick={this.deleteWatchlistEntry}>Delete Watchlist Entry</button>

        <form>
          <label>
              Keyword Search:
              <input type="text" value={this.state.keyword} onChange={this.handleChangeKeyword} />
          </label>
        </form>

        <button onClick={this.lookUpShow}>Keyword Search</button>
        <p> Keyword Search Results: {this.state.lookup_result} </p>

        </header>
      </div>
    );
  }
}

export default App;
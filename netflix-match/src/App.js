import React from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avd_query_result: 'Click to reveal',
      create_query_result: 'Click to reveal',
      user_name: '',
      media_name: '',
      watched: ''
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeMedianame = this.handleChangeMedianame.bind(this);
    this.handleChangeWatched = this.handleChangeWatched.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.advancedQuery = this.advancedQuery.bind(this);
  }

  advancedQuery() {
    fetch('/show_beth_adv_query_result').then(res => res.json()).then(data => {
      this.setState(state => ({
        avd_query_result: data.result
      }));
    });
  }

  createWatchlistEntry() {
    fetch('/create_user_watch_list_entry?user_id=' + this.state.user_id + '&media_id=' 
      + this.state.media_id + '&watched=' + this.state.watched).then(res => res.json()).then(data => {
      this.setState(state => ({
        create_query_result: data.result
      }));
    });
  }

  handleChangeUsername(event) {
    this.setState({user_name: event.target.value});
  }

  handleChangeMedianame(event) {
    this.setState({media_name: event.target.value});
  }

  handleChangeWatched(event) {
    this.setState({watched: event.target.value});
  }

  handleSubmit(event) {
    alert('Username: ' + this.state.user_name + ' ' + 'Media name: ' + this.state.media_name + ' ' + 'Watched: ' + this.state.watched);
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
            Username:
            <input type="text" value={this.state.user_name} onChange={this.handleChangeUsername} />
          </label>

          <label>
            Media Name:
            <input type="text" value={this.state.media_name} onChange={this.handleChangeMedianame} />
          </label>

          <label>
            Watched (true or false):
            <input type="text" value={this.state.watched} onChange={this.handleChangeWatched} />
          </label>

          <input type="submit" value="Submit" />
        </form>

        <button onClick={this.createWatchlistEntry}>Create Watchlist Entry</button>
        <p> Data from create watchlist entry: {this.state.create_query_result} </p>

        </header>
      </div>
    );
  }
}

export default App;
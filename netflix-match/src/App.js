import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      movieSearchArg: '',
      insertActorNameArg: '',
      insertActorMovieArg: '',
      updateActorOldName: '',
      updateActorNewName: '',
      deleteActorName: '',
      ageRating: '',
      results: 'No results yet!' // no
    };

    // No idea how/why this works
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    this.handleChangeMovieSearchArg = this.handleChangeMovieSearchArg.bind(this);
    this.handleChangeInsertActorNameArg = this.handleChangeInsertActorNameArg.bind(this);
    this.handleChangeInsertActorMovieArg = this.handleChangeInsertActorMovieArg.bind(this);
    this.handleChangeUpdateActorOldName = this.handleChangeUpdateActorOldName.bind(this);
    this.handleChangeUpdateActorNewName = this.handleChangeUpdateActorNewName.bind(this);
    this.handleChangeDeleteActorName = this.handleChangeDeleteActorName.bind(this);
    this.handleChangeAgeRating = this.handleChangeAgeRating.bind(this);

    this.handleKeywordSearchSubmit = this.handleKeywordSearchSubmit.bind(this);
    this.handleMovieSearchArgSubmit = this.handleMovieSearchArgSubmit.bind(this);
    this.handleInsertActorSubmit = this.handleInsertActorSubmit.bind(this);
    this.handleUpdateActorSubmit = this.handleUpdateActorSubmit.bind(this);
    this.handleDeleteActorSubmit = this.handleDeleteActorSubmit.bind(this);
    this.handleAdvancedQuerySubmit = this.handleAdvancedQuerySubmit.bind(this);

  }

  // Enables text boxes to be editable

  handleChangeKeyword(event) {
    this.setState({ keyword: event.target.value });
  }

  handleChangeMovieSearchArg(event) {
    this.setState({ movieSearchArg: event.target.value });
  }

  handleChangeInsertActorNameArg(event) {
    this.setState({ insertActorNameArg: event.target.value });
  }

  handleChangeInsertActorMovieArg(event) {
    this.setState({ insertActorMovieArg: event.target.value });
  }

  handleChangeUpdateActorOldName(event) {
    this.setState({ updateActorOldName: event.target.value });
  }

  handleChangeUpdateActorNewName(event) {
    this.setState({ updateActorNewName: event.target.value });
  }

  handleChangeDeleteActorName(event) {
    this.setState({ deleteActorName: event.target.value });
  }

  handleChangeAgeRating(event) {
    this.setState({ ageRating: event.target.value });
  }

  // Handlers for submit buttons

  handleKeywordSearchSubmit(event) {
    if (this.state.keyword) {
      let results = `Searching for actors with keyword: "${this.state.keyword}"...\n\n`;

      const url = `/keyword_search/${this.state.keyword}`
      fetch(url).then(res => res.json()).then(data => {
        results += data.result;
        this.setState({ results: results, keyword: '' });
      });

      event.preventDefault();
    }
  }

  handleMovieSearchArgSubmit(event) {
    if (this.state.movieSearchArg) {
      let results = `Searching all movies with: "${this.state.movieSearchArg}"...\n\n`;

      const url = `/movie_search/${this.state.movieSearchArg}`
      fetch(url).then(res => res.json()).then(data => {
        results += data.result;
        this.setState({ results: results, movieSearchArg: '' })
      });

      event.preventDefault();
    }
  }

  handleInsertActorSubmit(event) {
    if (this.state.insertActorNameArg && this.state.insertActorMovieArg) {
      let results = `Inserting new actor "${this.state.insertActorNameArg}" into movie with ID = "${this.state.insertActorMovieArg}"...\n\n`;

      const url = `/insert_actor/${this.state.insertActorNameArg}/${this.state.insertActorMovieArg}`
      fetch(url).then(res => res.json()).then(data => {
        results += data.result;
        this.setState({ results: results, insertActorMovieArg: '', insertActorNameArg: '' })
      });

      event.preventDefault();
    }
  }

  handleUpdateActorSubmit(event) {
    if (this.state.updateActorOldName && this.state.updateActorNewName) {
      let results = `Changing actor "${this.state.updateActorOldName}"'s name to "${this.state.updateActorNewName}"...\n\n`;

      const url = `/update_actor/${this.state.updateActorOldName}/${this.state.updateActorNewName}`
      fetch(url).then(res => res.json()).then(data => {
        results += data.result;
        this.setState({ results: results, updateActorNewName: '', updateActorOldName: '' })
      });

      event.preventDefault();
    }
  }

  handleDeleteActorSubmit(event) {
    if (this.state.deleteActorName) {
      let results = `Deleting actor "${this.state.deleteActorName}" from all movies...\n\n`;

      const url = `/delete_actor/${this.state.deleteActorName}`
      fetch(url).then(res => res.json()).then(data => {
        results += data.result;
        this.setState({ results: results, deleteActorName: '' })
      });

      event.preventDefault();
    }
  }

  handleAdvancedQuerySubmit(event) {
    if (this.state.ageRating) {
      let results = `Finding number of ${this.state.ageRating}-rated movies in each genre...\n\n`;

      const url = `/advanced_query/${this.state.ageRating}`
      fetch(url).then(res => res.json()).then(data => {
        results += data.result;
        this.setState({ results: results, ageRating: '' })
      });

      event.preventDefault();
    }
  }

  // ------- UI code -----------------------

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>CS411 Netflix Match Stage 4: Cale Wolf (Actors)</h1>

          <div class="flex-contain">
            {/* User Info Entry */}
            <div class="enter-info">
              {/* Searching Functions */}
              <h2>Search</h2>
              <p>Find actor names by keyword.</p>
              <form onSubmit={this.handleKeywordSearchSubmit}>
                <input type="text" value={this.state.keyword} placeholder="Keyword (i.e. 'Leonard')" onChange={this.handleChangeKeyword} />
                <input type="submit" value="Search" />
              </form>
              <p>Find all movies an actor has starred in.</p>
              <form onSubmit={this.handleMovieSearchArgSubmit}>
                <label>
                  <input type="text" value={this.state.movieSearchArg} placeholder="i.e. 'Leonardo DiCaprio'" onChange={this.handleChangeMovieSearchArg} />
                </label>
                <input type="submit" value="Search" />
              </form>

              {/* Insert */}
              <h2>Insert</h2>
              <p>Add an actor to a movie. Create the actor if they don't exist.</p>
              <form onSubmit={this.handleInsertActorSubmit}>
                <input type="text" value={this.state.insertActorNameArg} placeholder="Actor name" onChange={this.handleChangeInsertActorNameArg} />
                <input type="text" value={this.state.insertActorMovieArg} placeholder="media_id" onChange={this.handleChangeInsertActorMovieArg} />
                <input type="submit" value="Add Actor" />
              </form>

              {/* Update */}
              <h2>Update</h2>
              <p>Change an actor's name.</p>
              <form onSubmit={this.handleUpdateActorSubmit}>
                <input type="text" value={this.state.updateActorOldName} placeholder="Old actor name" onChange={this.handleChangeUpdateActorOldName} />
                <input type="text" value={this.state.updateActorNewName} placeholder="New actor name" onChange={this.handleChangeUpdateActorNewName} />
                <input type="submit" value="Change Name" />
              </form>

              {/* Delete */}
              <h2>Delete</h2>
              <p>Delete an actor from the database.</p>
              <form onSubmit={this.handleDeleteActorSubmit}>
                <input type="text" value={this.state.deleteActorName} placeholder="Actor name" onChange={this.handleChangeDeleteActorName} />
                <input type="submit" value="Delete" />
              </form>

              {/* Advanced Query */}
              <h2>Advanced Query</h2>
              <p>Find the number of movies with a particular age rating per genre.</p>
              <p>Some choices: G, PG, PG-13, R</p>
              <form onSubmit={this.handleAdvancedQuerySubmit}>
                <input type="text" value={this.state.ageRating} placeholder="Age rating (i.e. 'PG-13')" onChange={this.handleChangeAgeRating} />
                <input type="submit" value="Submit" />
              </form>

              <h4>Suggestion: Use media_id 10,000 ("Test Movie") to test/demo</h4>
            </div>

            {/* Query Results */}
            <div class="results">
              <h2>Results:</h2>
              <pre style={{ color: "red" }}>{this.state.results}</pre>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
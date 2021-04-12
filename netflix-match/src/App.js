import React from 'react';
//import logo from './logo.svg';
import './App.css';
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      alice_query_result: 'Click to see',
      create_media_result : 'Click to see',
      update_media_result : 'Click to see',
      lookup_media_result : 'Click to see',
      delete_media_result : 'Click to see',
      media_type : '',
      media_title : '',
      // director : '',
      // country : '',
      // date_added : '',
      // release_year : '',
      // age_rating : '',
      // duration : '',
      // description : '',
      genre : '',
      new_title : '',
      results : 'Nothing yet...'
    };

    this.aliceQuery = this.aliceQuery.bind(this);
    this.createMedia = this.createMedia.bind(this);
    this.updateMedia = this.updateMedia.bind(this);
    this.lookupMedia = this.lookupMedia.bind(this);
    this.deleteMedia = this.deleteMedia.bind(this);

    this.changeMediaType = this.changeMediaType.bind(this);
    this.changeMediaTitle = this.changeMediaTitle.bind(this);
    this.changeDirector = this.changeDirector.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
    this.changeDateAdded = this.changeDateAdded.bind(this);
    this.changeReleaseYear = this.changeReleaseYear.bind(this);
    this.changeAgeRating = this.changeAgeRating.bind(this);
    this.changeDuration = this.changeDuration.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeGenre = this.changeGenre.bind(this);
    this.changeNewTitle = this.changeNewTitle.bind(this);
  }
  aliceQuery() {
    // if (this.state.changeGenre && this.state.changeCountry) {
      // let results = `looking.....`;
      fetch('/alice_query').then(res => res.json()).then(data => {
        this.setState(state => ({
        alice_query_result : data.result,
        results : data.result
        }));
      });
  }

  createMedia() {
    if (this.state.changeMediaType && this.state.changeMediaTitle && this.state.changeDirector && this.state.changeCountry && this.state.changeDateAdded && this.state.changeReleaseYear && this.state.changeAgeRating && this.state.changeDuration && this.state.changeDescription) {
      const location = `/create_media/${this.state.changeMediaType}/${this.state.changeMediaTitle}/${this.state.changeDirector}/${this.state.changeCountry}/${this.state.changeDateAdded}/${this.state.changeReleaseYear}/${this.state.changeAgeRating}/${this.state.changeDuration}/${this.state.changeDescription}`
      fetch(location).then(res => res.json()).then(data => {
        this.setState(state => ({
        create_media_result : data.result,
        results : data.result
        }));
      });
    }
  }

  updateMedia() {
    if (this.state.changeMediaTitle && this.state.changeNewTitle) {
      fetch(`/update_media/${this.state.changeMediaTitle}/${this.state.changeNewTitle}`).then(res => res.json()).then(data => {
        this.setState(state => ({
        update_media_result : data.result
        }));
      });
    }
  }

  lookupMedia() {
    if (this.state.changeMediaTitle) {
      fetch(`/lookup_media/${this.state.changeMediaTitle}`).then(res => res.json()).then(data => {
        this.setState(state => ({
        lookup_media_result : data.result
        }));
      });
    }
  }

  deleteMedia() {
    if (this.state.changeMediaTitle) {
      fetch(`/delete_media/${this.state.changeMediaTitle}`).then(res => res.json()).then(data => {
        this.setState(state => ({
        delete_media_result : data.result,
        results : data.result
        }));
      });
    }
  }

  changeMediaType(event) {
    this.setState({media_type : event.target.value});
  }

  changeMediaTitle(event) {
    this.setState({media_title : event.target.value});
  }

  changeDirector(event) {
    this.setState({director : event.target.value});
  }

  changeCountry(event) {
    this.setState({country : event.target.value});
  }

  changeDateAdded(event) {
    this.setState({date_added : event.target.value});
  }

  changeReleaseYear(event) {
    this.setState({release_year : event.target.value});
  }

  changeAgeRating(event) {
    this.setState({age_rating : event.target.value});
  }

  changeDuration(event) {
    this.setState({duration : event.target.value});
  }

  changeDescription(event) {
    this.setState({description : event.target.value});
  }

  changeGenre(event) {
    this.setState({genre : event.target.value});
  }

  changeNewTitle(event) {
    this.setState({new_title : event.target.value});
  }
  
  render() {
    return (
    <div className="App">
        <header className="App-header">
          <h1>CS411 Netflix Match Alice's Stage 4</h1>

          <div class="flex-contain">
            {/* User Info Entry */}
            <div class="enter-info">
              {/* Searching Functions */}
              <h2>Run Alice's Advanced Query</h2> 
              <button onClick={this.aliceQuery}>Run Query</button>
              <p>Results of Advanced Query:</p>
              <p>{this.state.alice_query_result} </p>

              <h2>Search in Media table</h2>
              <p>Find media by keyword.</p>
              <form onSubmit={this.lookupMedia}>
                <input type="text" value={this.state.media_title} placeholder="title (i.e. 'Story')" onChange={this.changeMediaTitle} />
                <input type="submit" value="Search" />
              </form>

              {/* Insert */}
              <h2>Insert into Media Table</h2>
              <p>Add media using media title and media type. Create the media if it doesn't exist.</p>
              <form onSubmit={this.createMedia}>
                <input type="text" value={this.state.media_title} placeholder="Title" onChange={this.changeMediaTitle} />
                <input type="text" value={this.state.media_type} placeholder="Type" onChange={this.changeMediaType} />
                <input type="submit" value="Add media" />
              </form>

              {/* Update */}
              <h2>Update Media table</h2>
              <p>Change media title.</p>
              <form onSubmit={this.updateMedia}>
                <input type="text" value={this.state.changeMediaTitle} placeholder="Current title" onChange={this.changeMediaTitle} />
                <input type="text" value={this.state.changeNewTitle} placeholder="New title" onChange={this.changeNewTitle} />
                <input type="submit" value="Change title" />
              </form>

              {/* Delete */}
              <h2>Delete from Media table</h2>
              <p>Delete media from the database.</p>
              <form onSubmit={this.deleteMedia}>
                <input type="text" value={this.state.media_title} placeholder="media name" onChange={this.changeMediaTitle} />
                <input type="submit" value="Delete media" />
              </form>
              <p>{this.state.delete_media_result}</p>
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

// return (
//   <div className="App">
//     <header className="App-header">
//     <h1>CS411 Netflix Match Alice's Stage 4: Media</h1>
//     <h3>Alice's advanced query: </h3>
//     <form onSubmit={this.aliceQuery}>
//       <input type="text" value={this.state.genre} placeholder="Keyword (i.e. 'Horror')" onChange={this.changeGenre} />
//       <input type="text" value={this.state.country} placeholder="Keyword (i.e. 'Australia')" onChange={this.changeCountry} />
//       <input type="submit" value="Search" />
//       <output type = "results" value = {this.state.alice_query_result} />
//     </form>
//     {/* <p>Find all movies an actor has starred in.</p>
//     <form onSubmit={this.handleMovieSearchArgSubmit}>
//       <label>
//         <input type="text" value={this.state.aliceQuery} placeholder="i.e. 'Leonardo DiCaprio'" onChange={this.handleChangeMovieSearchArg} />
//       </label>
//       <input type="submit" value="Search" />
//           </form>
//     <p>{this.state.alice_query_result} </p> */}

//     <form onSubmit={this.handleSubmit}>
//       <label>
//         Media Name:
//         <input type="text" value={this.state.media_name} onChange={this.handleChangeMediaName} />
//       </label>

//       <label>
//         Watched (true or false):
//         <input type="text" value={this.state.watched} onChange={this.handleChangeWatched} />
//       </label>

//       <input type="submit" value="Submit" />
//     </form>

//     <button onClick={this.createMedia}>Create Media Entry</button>
//     <h3> Data from create media entry: </h3>
//     <p>{this.state.create_media_result} </p>

//     <button onClick={this.updateMedia}>Update Media Entry</button>
//     <h3>Data from update media entry:</h3> 
//     <p>{this.state.update_media_result} </p>

//     <button onClick={this.lookupMedia}>Lookup Media Entry</button>
//     <h3>Data from lookup media entry:</h3> 
//     <p>{this.state.lookup_media_result} </p>

//     {/* <button onClick={this.deleteMedia}>Delete Media Entry</button>
//     <h3>Data from delete media entry:</h3> 
//     <p>{this.state.delete_media_result} </p> */}

//     <h2>Delete</h2>
//     <p>Delete an actor from the database.</p>
//     <form onSubmit={this.deleteMedia}>
//       <input type="text" value={this.state.media_title} placeholder="Media name" onChange={this.changeMediaTitle} />
//       <input type="submit" value="Delete" />
//     </form>

//     <form>
//       <label>
//           Media Search:
//           <input type="text" value={this.state.media_title} onChange={this.changeMediaTitle} />
//       </label>
//     </form>

//     <h3> Media Search Results: </h3>
//     <button onClick={this.lookupMedia}>Keyword Search</button>
//     <p>{this.state.lookup_media_result}</p>

//     </header>
//   </div>
// );

// function App() {
//   const [placeholder, setPlaceholder] = useState('Hi');

//   useEffect(() => {
//     fetch('/show_beth_adv_query_result').then(res => res.json()).then(data => {
//       setPlaceholder(data.result);
//     });
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <p>Flask says {placeholder}</p>
//       </header>
//     </div>
//   );
// }

export default App;
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Helmet } from 'react-helmet'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';

function App() {
  const [placeholder, setPlaceholder] = useState('Hi');

  useEffect(() => {
    fetch('/show_beth_adv_query_result').then(res => res.json()).then(data => {
      setPlaceholder(data.result);
    });
  }, []);

  const TITLE = 'My Page Title'

class MyComponent extends React.PureComponent {
  render () {
    return (
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      </>
    )
  }
}
  return (

    
    <div className="App">
      <header className="App-header">
        { <p>
          Netflix Match
        </p>
        /*
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <p>Flask says {placeholder}</p>
      </header>
    </div>
  );
}

export default App;

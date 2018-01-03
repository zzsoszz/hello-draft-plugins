import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "font-awesome/css/font-awesome.min.css";
import MyDraftEditor from "./MyDraftEditor";



class App extends Component {
  render() {
    return (
        <div className="App">
          <MyDraftEditor />
        </div>
    );
  }
}

export default App;

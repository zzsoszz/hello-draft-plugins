import React, { Component } from 'react';
import logo from './logo.svg';
import style from './App.css';
import "./plugin.css";

import MyDraftEditor from "./MyDraftEditor";



class App extends Component {
  render() {
    return (
        <div className={style.App}>
          <MyDraftEditor />
            <div className="best">
                dddddd
            </div>
        </div>
    );
  }
}

export default App;

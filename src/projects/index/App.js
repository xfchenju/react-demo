/*
 * @Description: 
 * @Author: chenju
 * @Date: 2020-09-10 15:42:09
 * @LastEditors: chenju
 * @LastEditTime: 2020-09-10 15:59:02
 */
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from 'components/Hello.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          This is index project.
        </p>
        <Hello></Hello>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

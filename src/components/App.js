import React, { Component } from 'react';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="app">
		  <Header />

		  <main role="main">
		  	{this.props.children}
		  </main>
      </div>
    );
  }
}

export default App;

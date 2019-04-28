import React, { Component, Fragment } from 'react';
import NavBar from './components/NavBar';
import MainPage from './pages/MainPage';


class App extends Component {

  render() {
    return (
      <Fragment>
        {/* <NavBar /> */}
        <MainPage />
      </Fragment>
    );
  }
}

export default App;

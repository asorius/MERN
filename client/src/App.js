import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import jwt_decode from 'jwt-decode';
import SetAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
//layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
//
//dynamic components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import setAuthToken from './utils/setAuthToken';
import { decode } from 'punycode';
//

//check for token
if (localStorage.token) {
  //set auth token header auth
  setAuthToken(localStorage.token);
  const decoded = jwt_decode(localStorage.token);
  //set user and autheticate it
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decode.exp < currentTime) {
    store.dispatch(setCurrentUser(decoded));
    window.location.href = '/login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

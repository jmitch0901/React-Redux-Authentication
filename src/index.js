import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import SignUp from './components/auth/signup';
import Feature from './components/feature';
import Authentication from './components/hocs/require-auth';
import Welcome from './components/welcome';

import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers); //create app state before rendering
const token = localStorage.getItem('token');
//if we have a token, we need to consider that the user is signed in
//BEFORE we render

if(token){
  //we need to update application state
  //dispatch is a attribute off the store!!!
  store.dispatch({ type:AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={SignIn} />
        <Route path="signout" component={SignOut} />
        <Route path="signup" component={SignUp} />
        <Route path="feature" component={Authentication(Feature)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));

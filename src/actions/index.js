import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = `http://localhost:8082`;

export function signInUser({ email,password }) {

  /*
    Since our signin action creator can dispatch
    more than one actions, we need to dispatch
    a FUNCTION instead of an OBJECT!

    The purpose is because we need direct access to
    the dispatcher.  This dispatcher is what our actions
    are throw into, and then pipes that action, through middleware,
    to all our reducers.
  */

  return function(dispatch){ // <- have access to dispatch because of redux-thunk middleware
    //We can place a TON of logic here to determine which action
    // to dipatch!

    //Submit email/password to the server

    //If request is good...
      // - Update state to indicate user is authenticated
      // - Save the JWT token
      // - Redirect to the route `/feature`
    //If request is BAD...
    // - Show an error to the user

    axios.post(`${ROOT_URL}/signin`,{email,password})
      .then(response => {

        dispatch({ type: AUTH_USER });
        localStorage.setItem('token',response.data.token);
        browserHistory.push('/feature');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info.'));
      })
      ;

  };

};

export function signUpUser({ email,password }){

  return function(dispatch){
    axios.post(`${ROOT_URL}/signup`,{ email,password })
      .then(response => {

        dispatch({ type:AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(response => dispatch(authError(response.data.error)));
  };


}

export function authError(error){
  return{
    type: AUTH_ERROR,
    payload:error
  }
}

export function signOutUser(){
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}

export function fetchMessage(){
  return function(dispatch) {
    axios.get(ROOT_URL,{
        headers:{ authorization: localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({type:FETCH_MESSAGE,payload:response.data.message})
      })
      .catch(response => {

      });
  };
}

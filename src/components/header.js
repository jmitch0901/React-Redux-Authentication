import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class Header extends Component{

  _renderAuthButtons(){

    if(this.props.isAuthenticated){
      return (
        <li className="nav-item" key={3}>
        <Link to="/signout" className="nav-link">Sign Out</Link>
        </li>
      );
    } else {
      return [ //USE BRACKETS TO WRAP SIBLINGS, USE COMMA!!!

        <li className="nav-item" key={1}>
          <Link to="/signin" className="nav-link">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </li>
      ];

    }

  }

  render(){
    return(
      <nav className="navbar navbar-light">
      <Link to="/" className="navbar-brand">Home</Link>
        <ul className="nav navbar-nav">
          { this._renderAuthButtons() }
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return { isAuthenticated: state.auth.authenticated };
}

export default connect(mapStateToProps,actions)(Header);

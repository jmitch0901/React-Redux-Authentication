import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class SignIn extends Component {

  _handleFormSubmit({ email,password }){
    this.props.signInUser({email,password});
  }

  _renderAlert(){
    if(this.props.errorMessage){
      return(
          <div className="alert alert-danger">
            <strong>
              Oops! { this.props.errorMessage }
            </strong>
          </div>
      );
    }
  }

  render(){

    const { handleSubmit, fields:{ email,password } } = this.props;


    return(
      <form onSubmit={handleSubmit(this._handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control"></input>
        </fieldset>
        <fieldset>
          <label>Password:</label>
          <input {...password} type="password" className="form-control"></input>
        </fieldset>
        { this._renderAlert() }
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state){
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  form: 'signin',
  fields: ['email','password']
}, mapStateToProps, actions)(SignIn);

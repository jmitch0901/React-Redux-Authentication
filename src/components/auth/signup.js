import React, { Component } from 'react';
import * as actions from '../../actions';
import { reduxForm } from 'redux-form';

class SignUp extends Component{


  _handleFormSubmit(formProps){

    //Call action creator to sign up the user
    //we can assume that form is valid at this point because of redux formProps
    this.props.signUpUser(formProps);

  }

  _renderAlert(){
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }


  render(){
    const { handleSubmit, fields:{email,password,passwordConfirm}} = this.props;
    return(
      <form onSubmit={handleSubmit(this._handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control"></input>
          { email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control"></input>
          { password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input {...passwordConfirm} type="password" className="form-control"></input>
          { passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        { this._renderAlert() }
        <button className="btn btn-primary" action="submit">Sign Up</button>

      </form>
    );
  }
}

function validate(formProps){
  const errors = {};

  if(!formProps.email){
    errors.email = 'Please enter an email';
  }

  if(!formProps.password){
    errors.password = 'Please enter a password';
  }

  if(!formProps.passwordConfirm){
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if(formProps.password !== formProps.passwordConfirm){
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state){
  return{
    errorMessage:state.auth.error
  };
}

export default reduxForm({
  form:'signup',
  fields:['email','password','passwordConfirm'],
  validate
},mapStateToProps,actions)(SignUp);

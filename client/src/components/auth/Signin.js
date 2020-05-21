import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import {compose} from "redux"
import{connect} from "react-redux"
import * as actions from "../../actions"

class Signin extends Component {
  onSubmit = (formProps) => {
    this.props.signin(formProps,()=>{
      this.props.history.push("/feature")
    })
  }  
  render() {

    const {handleSubmit} = this.props
    // console.log("this props",this.props)

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field name="email" autoComplete="none" type="text" component="input" />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field name="password" autoComplete="none" type="password" component="input" />
        </fieldset>
          <div>{this.props.errorMessage}</div>
        <button>Sign in</button>
      </form>
    );
  }
}
function mapState(state){
  return {errorMessage:state.auth.errorMessage}
}

export default  compose(
    connect(mapState,actions),
    reduxForm({ form: "signin" })
)(Signin);

import React, { Component } from 'react';
import '../Style.css';
import BackG from '../Images/CFRIrelandC.png';
import { login } from '../Action/UserActions';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
      };
    }
    componentWillMount() {
   if (this.props.user !== null) {
     this.props.history.push('/');
   }
 }

 componentWillReceiveProps(nextProps) {
   if (nextProps.user !== null) {
     nextProps.history.push('/');
   }
 }
    submitLogin = (event) =>  {
           event.preventDefault();
           this.props.login(this.state.email, this.state.password).catch(err => {window.alert(err);});
}

  render() {
return (
<div>
  <img src ={BackG} className ="FrontPage" alt="backgroundLogo"/>
  <div className="LoginDivForm">
    <form className="LoginForm" onSubmit={event => { this.submitLogin(event);}}>
      <label className="Logintitle">Log In</label>
      <input name="email" className="textInputEmail" type="text"  onChange={(event) => this.setState({ email: event.target.value })} placeholder="Email"/>
      <input name="password" className="textInputPassword" type="password"  onChange={(event) => this.setState({ password: event.target.value })} placeholder="Password"/>
      <div className="button-container"><div className="button-in-line"><button className="LoginButton" type="submit">Log In</button></div>
        <div className="button-in-line"><button className ="RegisterBtn" onClick={() => {this.props.history.push("/Register");}}>Register Button</button></div></div>
        </form>
  </div>
</div>

    );
  }
}

function mapStateToProps(state, ownProps) {
  return { user: state.user };
}
let form = reduxForm({
  form: 'LoginForm'
})(Login);

form = connect(mapStateToProps, { login })(form);

export default form;

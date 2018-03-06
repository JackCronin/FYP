import React, { Component } from 'react';
import '../Style.css';
import BackG from '../Images/CFRIrelandC.png';
import { login, getUser } from '../Action/UserActions';
import { connect } from 'react-redux';
class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
      };
    }
   componentWillMount() {
    this.props.getUser();
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.user.email !== undefined) {
        this.props.history.push('/');
      }
    }
 submitLogin = (event) =>  {
        event.preventDefault();
        this.props.login(this.state.email, this.state.password).catch(err => {console.log(err);});

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
      <input className="LoginButton" type="submit" value="Log In" />
      <button className ="RegisterBtn" onClick={() => {this.props.history.push("/Register");}}>Register Button</button>
    </form>
  </div>
</div>

    );
  }
}

function mapStateToProps(state, ownProps) {
  return { user: state.user };
}
export default connect(mapStateToProps, { login, getUser })(Login);

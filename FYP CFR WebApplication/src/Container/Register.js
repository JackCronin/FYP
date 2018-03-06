import React, { Component } from 'react';
import '../Style.css';
import BackG from '../Images/CFRIrelandC.png';
import { RegisterUser, RegisterUserOnDatabase } from '../Action/UserActions';
import { connect } from 'react-redux';
class Register extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        name :'',
        date_of_birth :'',
        group_name : ''
      };
    }

 submitRegister = (event) =>  {
        event.preventDefault();
        this.props.RegisterUser(this.state.email, this.state.password).catch(err => {console.log(err);}).then(() => {
        this.props.history.replace('/');
        this.props.RegisterUserOnDatabase(this.state.email,this.state.date_of_birth,this.state.name,this.state.group_name)
    }).catch(err => {
      console.log(err);})
}

  render() {
return (
  <div>
    <img src ={BackG} className ="FrontPage" alt="backgroundLogo"/>
    <div className="LoginDivForm">
      <form className="LoginForm" onSubmit={event => { this.submitRegister(event);}}>
        <label className="Logintitle">Register</label>
        <input name="email" className="textInputEmail" type="text"  onChange={(event) => this.setState({ email: event.target.value })} placeholder="Email"/>
        <input name="password" className="textInputPassword" type="password"  onChange={(event) => this.setState({ password: event.target.value })} placeholder="Password"/>
        <input name="name" className="textInputName" type="text"  onChange={(event) => this.setState({ name: event.target.value })} placeholder="Name"/>
        <input name="date_of_birth" className="textInputName" type="text"  onChange={(event) => this.setState({ date_of_birth: event.target.value })} placeholder="Date Of Birth"/>
        <input name="group_name" className="textInputName" type="text"  onChange={(event) => this.setState({ group_name: event.target.value })} placeholder="Group Name"/>
        <input className="LoginButton" type="submit" value="Go Back" onClick={() => {this.props.history.push("/Login");}} />
        <button className ="RegisterBtn">Register Button</button>
      </form>
    </div>
  </div>

    );
  }
}


export default connect(null, { RegisterUser,RegisterUserOnDatabase })(Register);

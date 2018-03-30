import React, { Component } from 'react';
import '../Style.css';
import BackG from '../Images/CFRIrelandC.png';
import { RegisterUser } from '../Action/UserActions';
import { RegisterGroup } from '../Action/GroupActions';
import { connect } from 'react-redux';
class Register extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        name :'',
        date_of_birth :'',
        group_name_mem : '',
        group_name : '',
        group_location:'',
        showGroupDialog: false,
        groupemail:''


      };
    }

changeCheckbox = () => {
    if (this.refs.myCheck1.checked === true) {
    console.log("here");
      this.setState({ showGroupDialog: true });
    } else {
      console.log("there");
      this.setState({ showGroupDialog: false });
    }
  };
 submitMemberRegister = (event) =>  {
        event.preventDefault();
        this.props.RegisterUser(this.state.email,this.state.password,this.state.date_of_birth,this.state.name,this.state.group_name_mem).catch(err => {console.log(err);}).then(() => {
        this.props.history.replace('/');
    })
}
submitGroupRegister = (event) =>  {
       event.preventDefault();
       this.props.RegisterGroup(this.state.groupemail,this.state.group_location,this.state.group_name)
       this.props.history.replace('/Login');

}

  renderMemberRegister() {
return (
  <div>
    <form className="LoginForm" onSubmit={event => { this.submitMemberRegister(event);}}>
      <label className="Logintitle">Register Member</label>
      <input type="checkbox" className="Register-Check" ref="myCheck1" onChange={this.changeCheckbox}/><span className="register-Check-Label">Register Group?</span>
      <input name="email" className="textInputEmail" type="text"  onChange={(event) => this.setState({ email: event.target.value })} placeholder="Email"/>
      <input name="password" className="textInputPassword" type="password"  onChange={(event) => this.setState({ password: event.target.value })} placeholder="Password"/>
      <input name="name" className="textInputName" type="text"  onChange={(event) => this.setState({ name: event.target.value })} placeholder="Name"/>
      <input name="date_of_birth" className="textInputName" type="text"  onChange={(event) => this.setState({ date_of_birth: event.target.value })} placeholder="Date Of Birth"/>
      <input name="group_name_mem" className="textInputName" type="text"  onChange={(event) => this.setState({ group_name_mem: event.target.value })} placeholder="Group Name"/>
      <div className="button-container"><div className="button-in-line"><button className="LoginButton" type="submit" onClick={() => {this.props.history.push("/Login");}} >Go Back</button></div>
        <div className="button-in-line"><button className ="RegisterBtn">Register Button</button></div></div>
    </form>

  </div>

    );
  }
  renderGroupRegister() {
return (
  <div>
    <form className="LoginForm" onSubmit={event => { this.submitGroupRegister(event);}}>
      <label className="Logintitle">Register Group</label>
      <input type="checkbox" className="Register-Check" ref="myCheck1" onChange={this.changeCheckbox} checked/><span className="register-Check-Label">Register Group?</span>
      <input name="group_name" className="textInputName" type="text"  onChange={(event) => this.setState({ group_name: event.target.value })} placeholder="Group Name"/>
      <input name="groupemail" className="textInputEmail" type="text"  onChange={(event) => this.setState({ groupemail: event.target.value })} placeholder="Group Email"/>
      <input name="group_location" className="textInputName" type="text"  onChange={(event) => this.setState({ group_location: event.target.value })} placeholder="Group Location"/>
      <div className="button-container"><div className="button-in-line"><button className="LoginButton" type="submit" onClick={() => {this.props.history.push("/Login");}}>Go Back</button></div>
        <div className="button-in-line"><button className ="RegisterBtn">Register Button</button></div></div>
    </form>

  </div>

    );
  }
  render() {
      return (
        <div>
          <img src ={BackG} className ="FrontPage" alt="backgroundLogo"/>
          <div className="LoginDivForm">
            {this.state.showGroupDialog === false && this.renderMemberRegister()}
            {this.state.showGroupDialog  && this.renderGroupRegister()}
          </div>
        </div>
          );
          }
}


export default connect(null, { RegisterUser,RegisterGroup })(Register);

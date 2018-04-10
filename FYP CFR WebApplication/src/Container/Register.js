import React, { Component } from 'react';
import '../Style.css';
import BackG from '../Images/CFRIrelandC.png';
import { RegisterUser } from '../Action/UserActions';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
class Register extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        name :'',
        date_of_birth :'',
        phone_number:'',
        group_name_mem : '',
        showGroupDialog: false,
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

//submit memeber with details and call fucntion 
 submitMemberRegister = (event) =>  {
        event.preventDefault();
        if(this.state.email && this.state.password && this.state.date_of_birth && this.state.name && this.state.group_name_mem && this.state.phone_number){
        this.props.RegisterUser(this.state.email,this.state.password,this.state.date_of_birth,this.state.name,this.state.group_name_mem,this.state.phone_number).catch(err => {window.alert(err);})
}
      else{
        window.alert("Please fill in all information");
      }

}

  render() {
      return (
        <div>
          <img src ={BackG} className ="FrontPage" alt="backgroundLogo"/>
          <div className="LoginDivForm">
            <form className="LoginForm" onSubmit={event => { this.submitMemberRegister(event);}}>
              <label className="Logintitle">Register</label>
              <input name="email" className="textInputEmail" type="text"  onChange={(event) => this.setState({ email: event.target.value })} placeholder="Email"/>
              <input name="password" className="textInputPassword" type="password"  onChange={(event) => this.setState({ password: event.target.value })} placeholder="Password"/>
              <input name="name" className="textInputName" type="text"  onChange={(event) => this.setState({ name: event.target.value })} placeholder="Name"/>
              <input name="date_of_birth" className="textInputName" type="date"  onChange={(event) => this.setState({ date_of_birth: event.target.value })} placeholder="Date Of Birth"/>
              <input name="phone_number" className="textInputName" type="text"  onChange={(event) => this.setState({ phone_number: event.target.value })} placeholder="Phone Number"/>
              <select className="selectInput" onChange={event => this.setState({ group_name_mem: event.target.value })}>
                <option value="" disabled selected>Select your group - Cant Find Group ? Select TempCFRGroup!</option>
                {_.map(this.props.groupData, (post, key) => {
                  return <option value={key} >{this.props.groupData[key].GroupName}</option>
                })}
              </select>

              <div className="button-container"><div className="button-in-line"><button className="LoginButton" type="submit" onClick={() => {this.props.history.push("/Login");}} >Go Back</button></div>
                <div className="button-in-line"><button className ="RegisterBtn">Register Button</button></div></div>
            </form>

          </div>
        </div>
          );
          }
}

function mapStateToProps(state) {
return { user: state.user,groupData: state.group,userData: state.databaseUser };
}
let form = reduxForm({
 form: 'RegForm'
})(Register);
export default connect(mapStateToProps, { RegisterUser })(Register);

import React, { Component } from 'react';
import '../Style.css';
import { RegisterGroup } from '../Action/GroupActions';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
class RegisterGroupComponant extends Component {
  constructor(props) {
      super(props);
      this.state = {
        group_name : '',
        group_location:'',
        groupemail:''


      };
    }
    //set state of associate states 
submitGroupRegister = (event) =>  {
       event.preventDefault();
       this.props.RegisterGroup(this.state.groupemail,this.state.group_location,this.state.group_name)

}
//render to screen 
render() {
return (
  <div className="Display-RegisterGroup-Container">
    <form  className ="table-display" onSubmit={event => { this.submitGroupRegister(event);}}>
      <p className ="row-display">
        <label className="cell-display">Group Name</label>
        <input className="cell-display" name="group_name"  type="text"  onChange={(event) => this.setState({ group_name: event.target.value })} />
      </p>
      <p className ="row-display">
        <label className="cell-display">Group Email</label>
        <input className="cell-display" name="groupemail"  type="text"  onChange={(event) => this.setState({ groupemail: event.target.value })} />
      </p>
      <p className ="row-display">
        <label className="cell-display">Group Location</label>
        <input className="cell-display" name="group_location"  type="text"  onChange={(event) => this.setState({ group_location: event.target.value })} />
      </p>
      <div className="button-container">
        <div className="button-in-line"><button>Sumbit Group</button></div></div>
    </form>
  </div>

    );
  }
}
//set props to current state 
function mapStateToProps(state) {
  const checkedUser = state.user || {};
  return { uid: checkedUser.uid, userData: state.databaseUser,userLoading: state.loading.user };
}
let form = reduxForm({
  form: 'RegistGroupForm'
})(RegisterGroupComponant);
form = connect( mapStateToProps,{ RegisterGroup })(form);
export default form;

import React, { Component } from "react";
import "../Style.css";
import { connect } from 'react-redux';
import SideNavigation from "../Componant/SideNavigation"
import UserHeader from "../Componant/UserHeader"
import {reduxForm } from 'redux-form';
import { getUser, logout } from '../Action/UserActions';
class AlertSetting extends Component {
  componentWillMount(){
    this.props.getUser();
    if (this.props.user.loading === false && this.props.user.email === undefined) {
        this.props.history.replace('/Login');
      }
  }
  componentWillReceiveProps(nextProps){
   if(nextProps.user.loading === false  && nextProps.user.email === undefined){
    this.props.history.replace('/Login');
    }
  }
render() {
    return (
      <div>
        <UserHeader />
        <button className ="SignOutBtn" onClick={() => {this.props.logout();}}>Sign out</button>
        <div className="wrapper">
          <SideNavigation />
          <div className="content">
            <h2>Alert Settings</h2>
          </div>
        </div>
        <div className="footer">Footer </div>
      </div>
    );
  }
}
let form = reduxForm({
 form: 'NewPost'
})(AlertSetting);
form = connect((state, ownProps) => ({
  user: state.user
}),{getUser,logout}
)(form);
export default form;

import React, { Component } from "react";
import "../Style.css";
import { connect } from 'react-redux';
import SideNavigation from "../Componant/SideNavigation"
import UserHeader from "../Componant/UserHeader"
import {reduxForm } from 'redux-form';
import { getUser, logout } from '../Action/UserActions';
class AlertSetting extends Component {
  componentDidUpdate() {
    const { userLoading, user } = this.props;
    if (userLoading === false && !user) {
      this.props.history.push('/Login');
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

import React, { Component } from "react";
import "../Style.css";
import { connect } from 'react-redux';
import SideNavigation from "../Componant/SideNavigation"
import UserHeader from "../Componant/UserHeader"
import {reduxForm, Field } from 'redux-form';
import { getUser, logout } from '../Action/UserActions';
import { getFiles } from '../Action/FileActions';
import _ from 'lodash';
import firebase from "firebase";
class MyDocuments extends Component {

  componentWillMount(){


    this.props.getUser();
    if (this.props.user.loading === false && firebase.auth().currentUser === null) {
        this.props.history.replace('/Login');
      }else if(this.props.user.loading === false && firebase.auth().currentUser !== null){
      console.log(this.props.user.loading);
      console.log(firebase.auth().currentUser);
      }
  }
  componentWillReceiveProps(nextProps){
    if (this.props.user.loading === false && firebase.auth().currentUser === null) {
        this.props.history.replace('/Login');
      }else if(this.props.user.loading === false && firebase.auth().currentUser !== null){
      console.log(this.props.user.loading);
      console.log(firebase.auth().currentUser);
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
            <h2>My Documents</h2>
            </div>
        </div>
        <div className="footer">Footer</div>
      </div>
    );
  }
}

let form = reduxForm({
 form: 'DocDisplay'
})(MyDocuments);
form = connect((state, ownProps) => ({
  user: state.user,
  files :state.files
}),{getUser,logout,getFiles}
)(form);
export default form;

import React, { Component } from "react";
import "../Style.css";
import { connect } from 'react-redux';
import SideNavigation from "../Componant/SideNavigation"
import UserHeader from "../Componant/UserHeader"
import {reduxForm } from 'redux-form';
import { getUser, logout } from '../Action/UserActions';
import { uploadFile,uploadFileDetailsToDB} from '../Action/FileActions';
class AddDocuments extends Component {

    submitFile = (event) =>  {
           event.preventDefault();
           var myFile= document.getElementById('file').files[0];
           this.props.uploadFile(myFile).catch(err => {console.log(err);}).then(() => {
            this.props.uploadFileDetailsToDB(myFile).catch(err => {console.log(err);});
       });
     }
render() {
return (
      	<div>
          <UserHeader />
          <button className ="SignOutBtn" onClick={() => {this.props.logout();}}>Sign out</button>
          <div className="wrapper">
            <SideNavigation />
            <div className="content">
              <h2>Add Documents</h2>
              <form onSubmit={event => { this.submitFile(event);}}>
                <input type="file" id="file"/>
                <button>Upload File</button>
              </form>
            </div>
        </div>
        <div className="footer">Footer </div>
      </div>
    );
  }
}
let form = reduxForm({
 form: 'FileUploader'
})(AddDocuments);
form = connect((state, ownProps) => ({
  user: state.user
}),{getUser,logout,uploadFile,uploadFileDetailsToDB}
)(form);
export default form;

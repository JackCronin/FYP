import React, { Component } from "react";
import "../Style.css";
import { connect } from "react-redux";
import SideNavigation from "../Componant/SideNavigation";
import UserHeader from "../Componant/UserHeader";
import InputField from "../Componant/InputField";
import { getUser } from "../Action/UserActions";
import { uploadFile } from "../Action/FileActions";
class AddDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TypeOfUpload: "Insurance",
      ExpiryDate:"",
      show: false
    };

  }
  componentDidUpdate() {
    const { userLoading, user } = this.props;
      if (userLoading === false && !user) {
      this.props.history.push('/Login');
    }
  }
//submit file details and call function
  submitFile = event =>{
    event.preventDefault();
    var typeofupload = this.state.TypeOfUpload;
    var HasTimer =this.state.show;
    var expirydate = this.state.ExpiryDate;
    var myFile = document.getElementById("UpFile").files[0];
    if(myFile !== null || myFile !== undefined){
    this.props.uploadFile(myFile,typeofupload,HasTimer,expirydate);
}
else{
  window.alert("Please Choose A PDF To Upload");
}
}
//if checked render expiry date 
displayExpiryDate = () => {
    if (this.refs.myCheck.checked === true) {
    console.log("here");
      this.setState({ show: true });
    } else {
      console.log("there");
      this.setState({ show: false });
    }
  };

  render() {
    return (
      <div>
        <UserHeader />
        <div className="wrapper">
          <SideNavigation />
          <div className="content">
            <h2 className="h1title">Add Documents</h2>
            <div>
              <form className="AddDocForm" onSubmit={event => {this.submitFile(event);}}>
                <label>Please Select Type of Upload : </label>
                <select onChange={event => this.setState({ TypeOfUpload: event.target.value })}  >
                  <option defaultValue="Insurance">Insurance Form  </option>
                  <option value="gardaVet">Garda Vetting Form</option>
                  <option value="license">License</option>
                </select>
                <br />
                <label>Would You Like To Set An Expiriy Date ? </label>
                <input type="checkbox" ref="myCheck" onChange={this.displayExpiryDate}/>
                {this.state.show && <InputField id="ExpiryDate" type="date" label="Form Expiry Date?"
                  inputAction={(event) => this.setState({ ExpiryDate: event.target.value })}  />}
                <br />
                <button>Upload File</button>
                <input type="file" id="UpFile"  />
              </form>
            </div>
          </div>

          <div id="myBar"></div>
        </div>
        <div className="footer">Footer </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const checkedUser = state.user || {};
  return { user : state.user, uid: checkedUser.uid, userData: state.databaseUser,userLoading: state.loading.user ,fileData: state.files};
}
export default connect(mapStateToProps, { getUser, uploadFile })(AddDocuments);

import React, { Component } from "react";
import "../Style.css";
import { connect } from 'react-redux';
import SideNavigation from "../Componant/SideNavigation"
import UserHeader from "../Componant/UserHeader"
import {reduxForm } from 'redux-form';
import ImageComponant from "../Componant/ImageComponant"
import { uploadImage } from "../Action/FileActions";
import { updateUser } from "../Action/UserActions";
import _ from 'lodash';
class MyProfile extends Component {
  constructor(props) {
      super(props);
      this.state = {
  showEditDetails:false,
   name:this.props.userData[this.props.uid].name,
   date_of_birth:this.props.userData[this.props.uid].date_of_birth,
   about:this.props.userData[this.props.uid].AboutMe,
   email:this.props.userData[this.props.uid].email,
   phone_number:this.props.userData[this.props.uid].phone_number

      };
    }
  componentDidUpdate() {
    const { userLoading, user } = this.props;
    if (userLoading === false && !user ) {
      this.props.history.push('/Login');
    }
  }
  handleButtonClickChangeImage = () => {
    var myImage = document.getElementById("ProfilePicFile").files[0];
    var fileType = myImage["type"];
    console.log(fileType);
    if(fileType === "image/jpeg" || fileType === "image/png"){
          this.props.uploadImage(myImage);
    }

      console.log("Change Image");

  }
  handleButtonSubmitDetails=() =>{
    this.props.updateUser(this.state.name, this.state.about,this.state.date_of_birth,this.state.email,this.state.phone_number);
    this.setState({ showEditDetails: false });


  }
  changeCheckbox = () => {
      if (this.refs.myCheckED.checked === true) {
      console.log(this.state.showEditDetails);
        this.setState({ showEditDetails: true });
      } else {
        console.log("there");
        this.setState({ showEditDetails: false });
      }
    };
  renderMyProfile = () =>{
    const { userData, uid } = this.props;
    console.log(userData);
    return _.map(_.filter(userData, (user, key) => {
      return key === uid;
    }), (user, key) => {
      return (
        <div>
          <div className="Image-Container"><ImageComponant src={user.ProfilePicURL} alttext="profilepic"/></div>
          <input className="Choose-Image-Btn" type="file" id="ProfilePicFile"  onChange={()=>this.handleButtonClickChangeImage()}/>

          <div className="Display-Details-Container">
            <div className="Display-Details">
              <div className="column">
                <p className="Profile-Details-Label">Name : </p>
                <p className="Profile-Details-Label">Date of Birth : </p>
                <p className="Profile-Details-Label">Email : </p>
                <p className="Profile-Details-Label">Phone Number : </p>
              </div>
              <div className="column">
                <p className="Profile-Details">{user.name}</p>
                <p className="Profile-Details">{user.date_of_birth}</p>
                <p className="Profile-Details">{user.email}</p>
                <p className="Profile-Details">{user.phone_number}</p>
              </div>
            </div>
          </div>
          <h2>About Me</h2>
          <div className="Display-Details-Container">
            <p className="Profile-Details">{user.AboutMe}</p>
          </div>
          <span className="Edit-Details-Label"> Edit Details ?</span><input type="checkbox" className="Edit-Details-Btn" ref="myCheckED" onChange={this.changeCheckbox} />
        </div>
            );
            });
            }
  renderEditDetails() {
        const { userData, uid } = this.props;
        console.log(userData);
        return _.map(_.filter(userData, (user, key) => {
          return key === uid;
        }), (user, key) => {
          return (
            <div>
              <div className="Image-Container"><ImageComponant src={user.ProfilePicURL} alttext="profilepic"/></div>
              <input className="Choose-Image-Btn" type="file" id="ProfilePicFile"  onChange={()=>this.handleButtonClickChangeImage()}/>

              <div className="Display-Details-Container">
                <form className ="table-display">
                  <p className ="row-display">
                    <label className="cell-display">Name : </label>
                    <input name="name" type="text" className="cell-display" onChange={(event) => this.setState({ name: event.target.value })} placeholder={user.name}></input>
                  </p>
                  <p className ="row-display">
                    <label className="cell-display">Date of Birth : </label>
                    <input name="date_of_birth" type="text" className="cell-display" onChange={(event) => this.setState({ date_of_birth: event.target.value })} placeholder={user.date_of_birth}></input>
                  </p>
                  <p className ="row-display">
                    <label className="cell-display">Email : </label>
                    <input name="email" type="text" className="cell-display" onChange={(event) => this.setState({ email: event.target.value })} placeholder={user.email} ></input>
                  </p>
                  <p className ="row-display">
                    <label className="cell-display">Phone Number : </label>
                    <input name="phone_number" type="text" className="cell-display" onChange={(event) => this.setState({ phone_number: event.target.value })} placeholder={user.email} ></input>
                  </p>
                </form>
              </div>

              <h2>About Me</h2>
              <div className="Display-Details-Container">
                <form>
                  <textarea className ="About-textarea" rows="4" cols="50" onChange={(event) => this.setState({ about: event.target.value })}>
                    {user.AboutMe}
                  </textarea>
                </form>
              </div>
              <span className="Edit-Details-Label"> Edit Details ?</span><input type="checkbox" className="Edit-Details-Btn" ref="myCheckED" onChange={this.changeCheckbox} checked/>
              <button className="Edit-Details-Btn" type="submit" onClick={()=>this.handleButtonSubmitDetails()}>Save Details</button>
            </div>
                );
                });
                }

render() {
    return (
      <div>
        <UserHeader />
        <div className="wrapper">
          <SideNavigation />
          <div className="content">
            <h2 className="h1title">My Profile</h2>
            {this.state.showEditDetails === false && this.renderMyProfile()}
            {this.state.showEditDetails  && this.renderEditDetails()}

            <div id="myBar"></div>
          </div>
        </div>
        <div className="footer">My Profile </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const checkedUser = state.user || {};
  return { uid: checkedUser.uid ,user : state.user,  userData: state.databaseUser,userLoading: state.loading.user };
}
let form = reduxForm({
 form: 'NewGroup'
})(MyProfile);

export default connect(mapStateToProps,{uploadImage,updateUser})(MyProfile)

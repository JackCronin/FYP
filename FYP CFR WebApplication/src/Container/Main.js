import React, { Component } from "react";
import "../Style.css";
import { connect } from 'react-redux';
import MainImage from '../Images/CFR_IrelandNice.png';
import SideNavigation from "../Componant/SideNavigation"
import UserHeader from "../Componant/UserHeader"
import _ from 'lodash';
import { logout } from '../Action/UserActions';
class Main extends Component {
  componentDidUpdate() {
    const { userLoading, user } = this.props;
      if (userLoading === false && !user ) {
      this.props.history.push('/Login');
    }
  }

renderUsers() {
      const { userData, uid } = this.props;
      console.log(userData);
      return _.map(_.filter(userData, (user, key) => {
        return key === uid;
      }), (user, key) => {
        return (
          <div>
            <div >
              <br /><h2 className="simplestyle">Welcome <strong>{user.name}</strong> to the Document Management System For the Community First Responders.</h2><br />
              <p className="homepara">This Document Management System (DMS) can be used to upload, delete and view your documents.
                You can also set a reminders on files like Insurance forms, Garda Vetting forms and licenses and you will be reminded a week before the form is due
                to expire. This functionality can found in the <strong>Add Documents</strong> header in the side navigation. Documents are viewed and managed in the <strong>My Documents</strong> header.
              </p>
              <p className="homepara">Not only is the DMS ideal for document storage you can also manage your CFR groups from here, in the header <strong>My Group</strong> you can view your group details including the other members of your group. If you are a
              group leader you can also add and remove members from your group in this header.</p>
              <p className="homepara">You can view and edit your profile in the <strong>My Profile</strong> header.</p>
                </div>
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
            <h1 className="h1title">Homepage</h1>
            <img src ={MainImage}  alt="homepage background" className="homepage-image" size="width:60%; height:200px;"/>
            {this.renderUsers()}
          </div>
        </div>
        <div className="footer">Footer </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const checkedUser = state.user || {};
  return { uid: checkedUser.uid, userData: state.databaseUser,userLoading: state.loading.user };
}

export default connect(mapStateToProps, { logout })(Main);

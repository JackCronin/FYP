import React, { Component } from "react";
import "../Style.css";
import { connect } from 'react-redux';
import SideNavigation from "../Componant/SideNavigation"
import UserHeader from "../Componant/UserHeader"
import {reduxForm } from 'redux-form';
import _ from 'lodash';
class MyGroups extends Component {

  componentDidUpdate() {
    const { userLoading, user } = this.props;
    if (userLoading === false && !user) {
      this.props.history.push('/Login');
    }
  }
  renderMemberName(groups){
  const { userData } = this.props;
  Object.keys(groups.Members).forEach(function(uid) {
//console.log(userData[key].name);
  return _.map(_.filter(userData, (user, key) => {
      return key !== "duck"
  }), (user, key) => {
    return (
  <div>
    <h2>Members : </h2>
  </div>
    );
    });
})
    }
    renderGroupsDetails() {
      const { groupData, uid } = this.props;
      return _.map(_.filter(groupData, (groups, key) => {
          return groupData[key].Members;
      }), (groups, key) => {
        return (
          <div>
            <div >
              {console.log(groups)}
              <h1>{groups.GroupName}</h1>
              <h2>Group Email : {groups.GroupEmail}</h2>
              <h2>Group Location : {groups.GroupLocation}</h2>
              {this.renderMemberName(groups)}
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
            <div>
              {this.renderGroupsDetails()}
            </div>
          </div>
        </div>
        <div className="footer">Footer </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const checkedUser = state.user || {};
  return { uid: checkedUser.uid ,user : state.user,  userData: state.databaseUser,userLoading: state.loading.user ,groupData: state.group};
}
let form = reduxForm({
 form: 'NewGroup'
})(MyGroups);

export default connect(mapStateToProps)(MyGroups)

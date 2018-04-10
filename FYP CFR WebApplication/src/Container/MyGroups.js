import React, { Component } from "react";
import "../Style.css";
import { connect } from 'react-redux';
import SideNavigation from "../Componant/SideNavigation"
import UserHeader from "../Componant/UserHeader"
import RegisterGroupComponant from "../Componant/RegisterGroupComponant"
import RosterComponant from "../Componant/RosterComponant"
import CreateRosterComponant from "../Componant/CreateRosterComponant"
import CreateRosterComponantPrev from "../Componant/CreateRosterComponantPrev"
import AddRemoveUserFromGroupComponantPrev from "../Componant/AddRemoveUserFromGroupComponantPrev"
import {reduxForm } from 'redux-form';
import _ from 'lodash';
class MyGroups extends Component {
  constructor(props) {
      super(props);
      this.state = {
      regGroup:false,
      createRoster:false,
      createRosterPrev:false,
      managerusers:false
      };
    }
  componentDidUpdate() {
    const { userLoading, user } = this.props;
      if (userLoading === false && !user ) {
      this.props.history.push('/Login');
    }
  }
  //render memeber names 
  renderMemberName(groups){
      const { userData } = this.props;
      let membersToRender = []
      Object.keys(groups.Members).forEach(function(user) {
        console.log("Key is =" + user)
        console.log(userData[user].name);
        let el =
        <div>
          <ul><li>
            {userData[user].name}  {userData[user].email} {userData[user].phone_number}
          </li></ul>
        </div>;
        membersToRender.push(el)
      })
      return membersToRender
    }
    //render details from group object 
    renderGroupsDetails() {
      const { groupData, uid ,userData} = this.props;

      return _.map(_.filter(groupData, (groups, key) => {
          if(groupData[key].Members)
          return groupData[key].Members[uid];
      }), (groups, key) => {
        return (
          <div>
            <div >
              {console.log(groups)}
              <h2 className="h1title">{groups.GroupName}</h2>
              <h2 className="simplestyle">Group Leader : {this.props.userData[groups.GroupLeader].name}</h2>
              <h2 className="simplestyle">Group Email : {groups.GroupEmail}</h2>
              <h2 className="simplestyle">Group Location : {groups.GroupLocation}</h2>
              <h2 className="simplestyle">Members  </h2>
              <div className="Display-Details-Container"><p className="simplestyle">{this.renderMemberName(groups)}</p></div>
              {groups.GroupName === "TempCFRGroup" && this.renderTempWarning()}
              {groups.GroupLeader === this.props.uid && this.renderGroupLeaderOptions()}
              </div>
          </div>
        );
        });
      }
      handleButtonCreateGroup()  {
        if(this.state.regGroup){
            this.setState({regGroup : false})
        }else
      this.setState({regGroup : true})
      }
      renderCreateGroup()  {
      return (
        <div><RegisterGroupComponant /></div>
          );
      }
      renderTempWarning() {
        return (
            <div>
              <br /><br />
              <p className="simplestyle">This Group is for users whos group has not been created yet,
                if you are the <strong>Group Leader</strong> of your group please click <strong>Create Group</strong>, otherwise wait for your Group Leader
              to create your group and add you.</p>
              <button type="button" className="simplestyle" onClick={()=>this.handleButtonCreateGroup()}>Create Group</button>
              {this.state.regGroup && this.renderCreateGroup()}
                </div>
                );
}
handleButtonMemberManage(){
    if(this.state.managerusers){
      this.setState({managerusers : false})
  }else
this.setState({managerusers : true})
}

handleButtonCreateSchedule(){
  if(this.state.createRoster){
      this.setState({createRoster : false})
  }else
this.setState({createRoster : true})
}

handleButtonCreateSchedulePrevious(){
  if(this.state.createRosterPrev){
      this.setState({createRosterPrev : false})
  }else
this.setState({createRosterPrev : true})
}

renderGroupLeaderOptions() {
  return (
      <div>
        <br /><br />
        <p className="simplestyle">As Group Leader you have access to following functions : <strong>Add/Remove Member, Edit Group Timetable, Edit Group Details</strong></p>
        <button type="button" className="simplestyle" onClick={()=>this.handleButtonMemberManage()}>Add/Remove Member</button>
        <button type="button" className="simplestyle" onClick={()=>this.handleButtonCreateSchedule()}>Create New Group Schedule</button>
        <button type="button" className="simplestyle" onClick={()=>this.handleButtonCreateSchedulePrevious()}>Create Group Schedule From Previous</button>
        <button type="button" className="simplestyle" >Edit Group Details</button>
        {this.state.regGroup && this.renderCreateGroup()}
      </div>
          );
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
            <RosterComponant />
            {this.state.createRoster && <CreateRosterComponant />}
            {this.state.createRosterPrev && <CreateRosterComponantPrev />}
            {this.state.managerusers && <AddRemoveUserFromGroupComponantPrev />}
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

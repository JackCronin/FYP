import React, { Component } from "react";
import "../Style.css";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { RemoveUserFromGroup} from "../Action/GroupActions";
import _ from "lodash";
//componant to remove/add user to/from group
class AddRemoveUserFromGroupComponantPrev extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberToAdd: "",
      memberToRemove: "",
      GroupID: this.props.userData[this.props.uid].Group
    };
  }
  //get names from user object and render to screen 
  renderMemberName(groups){
      const { userData } = this.props;
      let membersToRender = []
      let toRender = []
      Object.keys(groups.Members).forEach(function(user) {
        membersToRender.push(user)
      })
      var MakeItem = function(X) {
        return (
          <option key={X} value={X}>
            {userData[X].name}
              </option>
        );
      };
      toRender.push(
        <select
          onChange={event => this.setState({ memberToRemove: event.target.value })}
        >
          <option value="" disabled selected>
            Select Member To Remove
          </option>
          {membersToRender.map(MakeItem)}
        </select>
      );

      return toRender;
    };
//get group mmebers from group object 
    renderGroupsDetails() {
      const { groupData, uid ,userData} = this.props;

      return _.map(_.filter(groupData, (groups, key) => {
          if(groupData[key].Members)
          return groupData[key].Members[uid];
      }), (groups, key) => {
        return (
          <div>
            {console.log("key is =" +key)}
            {this.renderMemberName(groups)}
          </div>
        );
        });
      }
//call the member to remove function if data is there
  SubmitRemoveUser = () =>{
if(this.state.memberToRemove && this.state.GroupID){
    //RemoveUserFromGroup(this.state.memberToRemove,this.state.GroupID);
}else{
  window.alert("Please Fill in All Data");
}
  }
//render to screen 
  render() {
    return (
      <div className="simplestyle">
        {this.renderGroupsDetails()}
        <button type="button" onClick={() =>{this.SubmitRemoveUser()}}>
          Remove User
        </button>
      </div>
    );
  }
}
// set values of props to current state 
function mapStateToProps(state) {
  const checkedUser = state.user || {};
  return {
    uid: checkedUser.uid,
    userData: state.databaseUser,
    userLoading: state.loading.user,
    groupData: state.group,
    scheduleData: state.schedule
  };
}
let form = reduxForm({
  form: "AddRemoveUserForm"
})(AddRemoveUserFromGroupComponantPrev);
form = connect(mapStateToProps, { RemoveUserFromGroup })(form);
export default form;

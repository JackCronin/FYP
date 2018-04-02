import React, { Component } from "react";
import "../Style.css";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { UploadSchedule } from "../Action/ScheduleActions";
import _ from "lodash";
class CreateRosterComponantPrev extends Component {
  renderSelectOptions= ()=>{
    const { groupData,uid,scheduleData } = this.props;
    let membersToRender = []
    var currentgroup;
    _.map(groupData, (groups, key) => {
    _.map(groupData[key].Members, (group, keys) => {
    if(keys === uid){currentgroup = key}
  })
})
_.map(_.filter(scheduleData, (schedule, key) => {
  if(scheduleData[key].Group)
  return scheduleData[key].Group === currentgroup && key === groupData[currentgroup].currentSchedule
}), (schedule, key) => {
  let el =
  <select className="selectInput" onChange={event => this.setState({ group_name_mem: event.target.value })}>
    <option value="" disabled selected>Select your group - Cant Find Group ? Select TempCFRGroup!</option>
    {_.map(schedule, (sched, key) => {
      return <option value={key} >{sched.date}</option>
    })}
  </select>
  membersToRender.push(el)
  })
        return membersToRender
  }

render() {
    return (
    <div>
      {this.renderSelectOptions()}
    </div>
    );
  }
}
function mapStateToProps(state) {
  const checkedUser = state.user || {};
  return { uid: checkedUser.uid, userData: state.databaseUser,userLoading: state.loading.user,groupData: state.group,scheduleData : state.schedule };
}
let form = reduxForm({
  form: "CreateRosterForm"
})(CreateRosterComponantPrev);
form = connect(mapStateToProps, { UploadSchedule })(form);
export default form;

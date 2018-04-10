import React, { Component } from "react";
import "../Style.css";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { UploadSchedule ,UploadScheduleFromPrev} from "../Action/ScheduleActions";
import _ from "lodash";
class CreateRosterComponantPrev extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeToCopy: "",
      date:''
    };
  }
  //create options for select input field and render 
  renderSelectOptions = () => {
    const { groupData, uid, scheduleData } = this.props;
    let membersToRender = [];
    let toRender = [];
    var currentgroup;
    _.map(groupData, (groups, key) => {
      _.map(groupData[key].Members, (group, keys) => {
        if (keys === uid) {
          currentgroup = key;
        }
      });
    });
    _.map(
      _.filter(scheduleData, (schedule, key) => {
        if (scheduleData[key].Group)
          if (scheduleData[key].Group === currentgroup) {
            membersToRender.push(key);
          }
        return scheduleData[key].Group === currentgroup;
      }),
      (schedule, key) => {
        console.log(schedule);
      }
    );
    var MakeItem = function(X) {
      return (
        <option key={X} value={X}>
          {scheduleData[X].date_of_upload}
        </option>
      );
    };
    toRender.push(
      <form>
        <label className="cell-display">Mondays Date : </label>
        <input
          name="name"
          type="date"
          className="cell-display"
          onChange={event => this.setState({ date: event.target.value })}
        />
      </form>
    );
    toRender.push(
      <select
        onChange={event => this.setState({ nodeToCopy: event.target.value })}
      >
        <option value="" disabled selected>
          Select Schedule To Copy
        </option>
        {membersToRender.map(MakeItem)}
      </select>
    );

    return toRender;
  };
//if data is their call fucntion 
  SubmitSchedule = () =>{
if(this.state.nodeToCopy && this.state.date){
    UploadScheduleFromPrev(this.state.date,this.state.nodeToCopy);
}else{
  window.alert("Please Fill in All Data");
}
  }
//render to screen 
  render() {
    return (
      <div className="simplestyle">
        {this.renderSelectOptions()}
        <button type="button" onClick={() =>{this.SubmitSchedule()}}>
          Make Schedule
        </button>
      </div>
    );
  }
}
//set props data to current states 
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
  form: "CreateRosterForm"
})(CreateRosterComponantPrev);
form = connect(mapStateToProps, { UploadSchedule,UploadScheduleFromPrev })(form);
export default form;

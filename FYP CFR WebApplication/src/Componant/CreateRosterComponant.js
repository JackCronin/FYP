import React, { Component } from "react";
import "../Style.css";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { UploadSchedule } from "../Action/ScheduleActions";
import _ from "lodash";
class CreateRosterComponant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      WeekA: {
        Monday1: "",Tuesday1: "",Wednesday1: "",Thursday1: "",Friday1: "",Saturday1: "",  Sunday1: ""
      },
      WeekB: {
        Monday2: "",Tuesday2: "",Wednesday2: "",Thursday2: "",Friday2: "",Saturday2: "",Sunday2: ""
      },
      WeekC: {
        Monday3: "",Tuesday3: "",Wednesday3: "",Thursday3: "",Friday3: "",Saturday3: "",Sunday3: ""
      },
      hour_block: "8",
      complete: false
    };
  }

  renderRosterData(event1, event2, event3) {
    const { userData, groupData, uid } = this.props;
    let membersToRender = [];
    let toRender = [];
    _.map(
      _.filter(groupData, (groups, key) => {
        if (groupData[key].Members) return groupData[key].Members[uid];
      }),
      (groups, key) => {
        Object.keys(groups.Members).forEach(function(user) {
          membersToRender.push(user);
        });
      }
    );

    var MakeItem = function(X) {
      return (
        <option key={X} value={X}>
          {userData[X].name}
        </option>
      );
    };
    toRender.push(
      <select onChange={event1}>
        <option value="" disabled selected>
          Select Member
        </option>
        {membersToRender.map(MakeItem)}
      </select>
    );
    if (this.state.hour_block === "8") {
      toRender.push(
        <select onChange={event2}>
          <option value="" disabled selected>
            Select Member
          </option>
          {membersToRender.map(MakeItem)}
        </select>
      );
      toRender.push(
        <select onChange={event3}>
          <option value="" disabled selected>
            Select Member
          </option>
          {membersToRender.map(MakeItem)}
        </select>
      );
    }
    if (this.state.hour_block === "12") {
      toRender.push(
        <select onChange={event2}>
          <option value="" disabled selected>
            Select Member
          </option>
          {membersToRender.map(MakeItem)}
        </select>
      );
    }

    return toRender;
  }
  handleOptionChange = event => {
    this.setState({
      hour_block: event.target.value
    });
  };

  handleChecker = data => {
    var bool = true;
    _.map(data, (items, key) => {
      if (!data[key]) {
        bool = false;
      }
    });
    return bool;
  };

  checkifComplete = () => {
    if (this.state.hour_block === "8") {
      var checked = this.handleChecker(this.state.WeekA);
      checked = this.handleChecker(this.state.WeekB);
      checked = this.handleChecker(this.state.WeekC);
      this.setState({
        complete: checked
      });
    } else if (this.state.hour_block === "12") {
      var checkedB = this.handleChecker(this.state.WeekA);
      checkedB = this.handleChecker(this.state.WeekB);
      this.setState({
        complete: checkedB
      });
    } else if (this.state.hour_block === "24") {
      var checkedC = this.handleChecker(this.state.WeekA);
      this.setState({
        complete: checkedC
      });
    }

    if (this.state.complete && this.state.date) {
      window.alert("Good");
      UploadSchedule(this.state.hour_block,this.state.WeekA,this.state.WeekB,this.state.WeekC,this.state.date,this.props.userData[this.props.uid].Group);
      this.setState({
        complete: false
      });
    }
  };
  render() {
    return (
      <div className="Display-Details-Container-Sched">
        <input type="radio" value="8" checked={this.state.hour_block === "8"}  onChange={this.handleOptionChange}/>
        8 HR Block
        <input type="radio" value="12" checked={this.state.hour_block === "12"} onChange={this.handleOptionChange}  />
        12 HR Block
        <input type="radio" value="24" checked={this.state.hour_block === "24"} onChange={this.handleOptionChange}  />
        24 HR Block
        <form className="table-display">
          <p className="row-display">
            <label className="cell-display">Mondays Date : </label>
            <input name="name" type="date" className="cell-display" onChange={event => this.setState({ date: event.target.value })} />
          </p>
          <p className="row-display">
            <label className="cell-display">Monday : </label>
            {this.renderRosterData(
              event =>
              this.setState({
                WeekA: { ...this.state.WeekA, Monday1: event.target.value }
              }),
              event =>
              this.setState({
                WeekB: { ...this.state.WeekB, Monday2: event.target.value }
              }),
              event =>
              this.setState({
                WeekC: { ...this.state.WeekC, Monday3: event.target.value }
              })
            )}
          </p>
          <p className="row-display">
            <label className="cell-display">Tuesday : </label>
            {this.renderRosterData(
              event =>
              this.setState({
                WeekA: { ...this.state.WeekA, Tuesday1: event.target.value }
              }),
              event =>
              this.setState({
                WeekB: { ...this.state.WeekB, Tuesday2: event.target.value }
              }),
              event =>
              this.setState({
                WeekC: { ...this.state.WeekC, Tuesday3: event.target.value }
              })
            )}
          </p>
          <p className="row-display">
            <label className="cell-display">Wednesday : </label>
            {this.renderRosterData(
              event =>
              this.setState({
                WeekA: { ...this.state.WeekA, Wednesday1: event.target.value }
              }),
              event =>
              this.setState({
                WeekB: { ...this.state.WeekB, Wednesday2: event.target.value }
              }),
              event =>
              this.setState({
                WeekC: { ...this.state.WeekC, Wednesday3: event.target.value }
              })
            )}
          </p>
          <p className="row-display">
            <label className="cell-display">Thursday : </label>
            {this.renderRosterData(
              event =>
              this.setState({
                WeekA: { ...this.state.WeekA, Thursday1: event.target.value }
              }),
              event =>
              this.setState({
                WeekB: { ...this.state.WeekB, Thursday2: event.target.value }
              }),
              event =>
              this.setState({
                WeekC: { ...this.state.WeekC, Thursday3: event.target.value }
              })
            )}
          </p>
          <p className="row-display">
            <label className="cell-display">Friday : </label>
            {this.renderRosterData(
              event =>
              this.setState({
                WeekA: { ...this.state.WeekA, Friday1: event.target.value }
              }),
              event =>
              this.setState({
                WeekB: { ...this.state.WeekB, Friday2: event.target.value }
              }),
              event =>
              this.setState({
                WeekC: { ...this.state.WeekC, Friday3: event.target.value }
              })
            )}
          </p>
          <p className="row-display">
            <label className="cell-display">Saturday : </label>
            {this.renderRosterData(
              event =>
              this.setState({
                WeekA: { ...this.state.WeekA, Saturday1: event.target.value }
              }),
              event =>
              this.setState({
                WeekB: { ...this.state.WeekB, Saturday2: event.target.value }
              }),
              event =>
              this.setState({
                WeekC: { ...this.state.WeekC, Saturday3: event.target.value }
              })
            )}
          </p>
          <p className="row-display">
            <label className="cell-display">Sunday : </label>
            {this.renderRosterData(
              event =>
              this.setState({
                WeekA: { ...this.state.WeekA, Sunday1: event.target.value }
              }),
              event =>
              this.setState({
                WeekB: { ...this.state.WeekB, Sunday2: event.target.value }
              }),
              event =>
              this.setState({
                WeekC: { ...this.state.WeekC, Sunday3: event.target.value }
              })
            )}
          </p>
        </form>
        <button type="button" onClick={() => {this.checkifComplete()}}>
          Submit Schedule
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const checkedUser = state.user || {};
  return {
    uid: checkedUser.uid,
    userData: state.databaseUser,
    userLoading: state.loading.user,
    groupData: state.group
  };
}
let form = reduxForm({
  form: "RosterForm"
})(CreateRosterComponant);
form = connect(mapStateToProps, { UploadSchedule })(form);
export default form;

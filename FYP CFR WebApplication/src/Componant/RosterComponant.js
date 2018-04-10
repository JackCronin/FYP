import React, { Component } from 'react';
import '../Style.css';
import { RegisterGroup } from '../Action/GroupActions';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
class RosterComponant extends Component {
    //render names of members in schedule 
  renderMemberName(schedule){
      const { userData } = this.props;
      let namesToRender = []
      console.log("Here");
      console.log(schedule);
      Object.keys(schedule).forEach(function(user) {

          console.log(userData[schedule[user]].name);
        let el =
        <div>
          {userData[[schedule[user]]].name}
        </div>;
        namesToRender.push(el)

      })
      return namesToRender
    }
    //render the data in schedule 
  renderRosterData(){
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
<tr key={currentgroup + 1}>
  <td>
    {this.renderMemberName(schedule.Monday)}
  </td>
  <td>
    {this.renderMemberName(schedule.Tuesday)}
  </td>
  <td>
    {this.renderMemberName(schedule.Wednesday)}
  </td>
  <td>
    {this.renderMemberName(schedule.Thursday)}
  </td>
  <td>
    {this.renderMemberName(schedule.Friday)}
  </td>
  <td>
    {this.renderMemberName(schedule.Saturday)}
  </td>
  <td>
    {this.renderMemberName(schedule.Sunday)}
  </td>

</tr>
membersToRender.push(el)
})
      return membersToRender
}
//render to screen 
render(){
return (
  <div className="Display-RegisterGroup-Container">
    <table>
      <thead>
        <tr>
          <th data-field="name">Monday</th>
          <th data-field="name">Tuesday</th>
          <th data-field="name">Wednesday</th>
          <th data-field="name">Thursday</th>
          <th data-field="name">Friday</th>
          <th data-field="name">Saturday</th>
          <th data-field="name">Sunday</th>
        </tr>
      </thead>
      <tbody>
        {
          this.renderRosterData()
        }
      </tbody>
    </table>
    </div>

    );
  }
}
//map props values to current states 
function mapStateToProps(state) {
  const checkedUser = state.user || {};
  return { uid: checkedUser.uid, userData: state.databaseUser,userLoading: state.loading.user,groupData: state.group,scheduleData : state.schedule };
}
let form = reduxForm({
  form: 'RosterForm'
})(RosterComponant);
form = connect( mapStateToProps,{ RegisterGroup })(form);
export default form;

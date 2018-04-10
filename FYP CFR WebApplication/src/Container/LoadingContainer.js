import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUser, getDatabaseUsers } from '../Action/UserActions';
import { getFiles} from '../Action/FileActions';
import { getGroups} from '../Action/GroupActions';
import { getSchedule} from '../Action/ScheduleActions';
import Loading from '../Componant/Loading';


class LoadingContainer extends Component {
  componentWillMount() {
    const { userLoading, databaseUserLoading ,fileLoading,groupsLoading,scheduleLoading } = this.props;
    if (userLoading === undefined) {
      this.props.getUser();
    }
    if (databaseUserLoading === undefined) {
      this.props.getDatabaseUsers();

    }
    if (fileLoading === undefined) {
      this.props.getFiles();

    }
    if (groupsLoading === undefined) {
      this.props.getGroups();

    }
    if (scheduleLoading === undefined) {
      this.props.getSchedule();

    }
  }
//used to load data into objects 
  render() {
    const { userLoading, databaseUserLoading,scheduleLoading, fileLoading,groupsLoading,children } = this.props;
    if (userLoading === false && databaseUserLoading === false) {
      return (
        <div>
          {children}
        </div>
      );
    }
     if (fileLoading === false) {
      return (
        <div>
          {children}
        </div>
      );
    }
    if (groupsLoading === false) {
     return (
       <div>
         {children}
       </div>
     );
   }
   if (scheduleLoading === false) {
    return (
      <div>
        {children}
      </div>
    );
  }
    else {
      return (
        <Loading/>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    userLoading: state.loading.user,
    databaseUserLoading: state.loading.databaseUser,
    fileLoading : state.loading.files,
    groupsLoading : state.loading.group,
    scheduleLoading : state.loading.schedule,
    user: state.user,

  };
}

export default withRouter(connect(mapStateToProps, { getUser,getGroups, getDatabaseUsers,getFiles,getSchedule })(LoadingContainer));

import React, { Component } from "react";
import "../Style.css";
import { connect } from 'react-redux';
import SideNavigation from "../Componant/SideNavigation"
import UserHeader from "../Componant/UserHeader"
import _ from 'lodash';
import { logout } from '../Action/UserActions';
class Main extends Component {
  componentDidUpdate() {
    const { userLoading, user } = this.props;
    if (userLoading === false && !user) {
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
              {user.name}
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
              <div>
                <h1>Welcome</h1></div>
              {this.renderUsers()}
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
  return { uid: checkedUser.uid, userData: state.databaseUser,userLoading: state.loading.user };
}

export default connect(mapStateToProps, { logout })(Main);

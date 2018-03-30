import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from "../Action/UserActions";
import '../Style.css';
class UserHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  render() {
    return (
      <div className="User-Header">
        <h1 className="headTitle">CFR CMS</h1>
        <button className="SignOutBtn" onClick={() => {this.props.logout();}}>Sign out</button>
        </div>
    );
  }
}
function mapStateToProps(state) {
  const checkedUser = state.user || {};
  return { uid: checkedUser.uid, userData: state.databaseUser,userLoading: state.loading.user };
}
export default connect(mapStateToProps, { logout })(UserHeader);

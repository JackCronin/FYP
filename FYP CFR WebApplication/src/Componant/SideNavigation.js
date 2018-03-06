import React, { Component } from 'react';
import '../Style.css';
import { NavLink } from 'react-router-dom';
class SideNavigation extends Component {
  render() {
    return (
        <div className="sideNavigation">
          <h1 className="NavTitle">Navigation</h1>
          <ul className="navList">
            <li><NavLink className="NavLinks" to="/">Home</NavLink></li>
            <li><NavLink className="NavLinks" to="/MyProfile">My Profile Page</NavLink></li>
            <li><NavLink className="NavLinks" to="/MyDocuments">My Documents</NavLink></li>
            <li><NavLink className="NavLinks" to="/AddDocuments">Add Documents</NavLink></li>
            <li><NavLink className="NavLinks" to="/MyAlerts">My Alerts</NavLink></li>
            <li><NavLink className="NavLinks" to="/AlertSetting">Alert Settings</NavLink></li>
            <li><NavLink className="NavLinks" to="/MyGroups">My Groups</NavLink></li>
          </ul>
        </div>
    );
  }
}

export default SideNavigation;

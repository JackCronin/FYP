import React, { Component } from 'react';
import '../Style.css';
import { NavLink } from 'react-router-dom';
class SideNavigation extends Component {
    //display side nav bar 
  render() {
    return (
      <div className="sideNavigation">
        <h1 className="NavTitle">Navigation</h1>
        <ul className="navList">
          <li><NavLink className="NavLinks" to="/">Home</NavLink></li>
          <li><NavLink className="NavLinks" to="/MyProfile">My Profile Page</NavLink></li>
          <li><NavLink className="NavLinks" to="/MyDocuments">My Documents</NavLink></li>
          <li><NavLink className="NavLinks" to="/AddDocuments">Add Documents</NavLink></li>
          <li><NavLink className="NavLinks" to="/MyGroups">My Group</NavLink></li>
        </ul>
      </div>
    );
  }
}

export default SideNavigation;

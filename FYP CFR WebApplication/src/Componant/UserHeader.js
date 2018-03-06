import React, { Component } from 'react';
import '../Style.css';
class UserHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  render() {
    return (
      <div className="User-Header">
        <h1 className="headTitle">CFR CMS</h1>
        <form className="SearchBar" onSubmit={this.handleSubmit}>
          <input
            name="search"
            type="text"
            value={this.state.search}
            onChange={this.handleChange}
            placeholder="Search"
          />
          <input type="submit" value="Search" />
        </form>
        
      </div>
    );
  }
}

export default UserHeader;

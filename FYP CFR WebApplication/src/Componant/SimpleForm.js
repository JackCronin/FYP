import React, { Component } from 'react';
import '../Style.css';
class SimpleForm extends Component {
  render() {
    const { title} = this.props;
    return (<div className="LoginDivForm">
      <form className="LoginForm" onSubmit={event => { this.submitLogin(event);}}>
        <label className="Logintitle">{title}</label>
          </form>
        </div>);
        }
        }

        export default SimpleForm;

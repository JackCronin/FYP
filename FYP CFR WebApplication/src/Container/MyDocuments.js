import React, { Component } from "react";
import "../Style.css";
import { connect } from 'react-redux';
import SideNavigation from "../Componant/SideNavigation"
import UserHeader from "../Componant/UserHeader"
import PDFViewer from "../Componant/PDFViewer"
import {reduxForm } from 'redux-form';
import _ from 'lodash';

class MyDocuments extends Component {
  constructor(props) {
  super(props);
  this.state = {
  showPreview : false,
    SelectedFile : "",
    ducks :""
  };

}
componentDidUpdate() {
  const { userLoading, user } = this.props;
  if (userLoading === false && !user) {
    this.props.history.push('/Login');
  }
}


handleButtonClickDownloader(downloadURL){
if(downloadURL !== null || downloadURL !== undefined){
window.open(downloadURL);
}
}
handleButtonClickPreview = (downloadURL) => {
  this.setState({SelectedFile : downloadURL});
    this.setState({showPreview : true});
    console.log("dasdd");
}
renderFiles() {
      const { fileData,uid } = this.props;
      return _.map(_.filter(fileData, (files, key) => {
        console.log(fileData);
        return  fileData[key].Owner === uid;
      }), (files, key) => {
        return (
          <div>
            <form>
              <label >{files.FileName}</label>
              <button type="button" onClick={()=>this.handleButtonClickPreview(files.downloadURL)} >Preview PDF</button>
              <button type="button" onClick={()=>this.handleButtonClickDownloader(files.downloadURL)} >Download PDF</button>
            </form>
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
            <h2>My Documents</h2>
            <div>
              {this.renderFiles()}
            </div>
            <div className="pdf-container">
              {this.state.showPreview && <PDFViewer SelectedFile={this.state.SelectedFile}   />}
            </div>
          </div>
        </div>
        <div className="footer">Footer</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const checkedUser = state.user || {};
  return { uid: checkedUser.uid ,user : state.user,  userData: state.databaseUser,userLoading: state.loading.user ,fileData: state.files};
}
let form = reduxForm({
 form: 'NewMyDoc'
})(MyDocuments);

export default connect(mapStateToProps)(MyDocuments)

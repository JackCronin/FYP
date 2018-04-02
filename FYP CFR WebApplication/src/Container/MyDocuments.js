import React, { Component } from "react";
import "../Style.css";
import { connect } from 'react-redux';
import DeleteDoc from '../Images/DeleteDoc.png';
import PreviewDoc from '../Images/PreviewDoc.png';
import DownloadDoc from '../Images/DownloadDoc.png';
import SideNavigation from "../Componant/SideNavigation"
import UserHeader from "../Componant/UserHeader"
import PDFViewer from "../Componant/PDFViewer"
import { fileDelete } from "../Action/FileActions";
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
  if (userLoading === false && !user ) {
    this.props.history.push('/Login');
  }
}


handleButtonClickDownloader(downloadURL){
if(downloadURL !== null || downloadURL !== undefined){
window.open(downloadURL);
}
}
handleButtonClickDeleter(downloadURL){
if(downloadURL !== null || downloadURL !== undefined){
  console.log("Got here");
fileDelete(downloadURL);

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
        return  fileData[key].Owner === uid;
      }), (files, key) => {
        return (
          <div>
            <form>
              <button className="doc-icon" type="button"><img  title="Preview Document" height="16px" width="16px" alt ="Preview Document" src={PreviewDoc} onClick={()=>this.handleButtonClickPreview(files.downloadURL)} /></button>
              <button className="doc-icon" type="button"><img title="Download Document" height="16px" width="16px" alt ="Download Document" src={DownloadDoc} onClick={()=>this.handleButtonClickDownloader(files.downloadURL)} /></button>
              <button className="doc-icon" type="button"><img title="Delete Document" height="16px" width="16px" alt ="Delete Document" src={DeleteDoc} onClick={()=>this.handleButtonClickDeleter(files.downloadURL)} /></button>
              <label>{files.FileName}</label>
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
            <h2 className="h1title">My Documents</h2>
            <div className="Display-Doc-Container">
              <div className="Display-Doc-Details">
                <div className="column">
                  {this.renderFiles()}
                </div>
                <div className="column">
                  <div className="pdf-container">
                    {this.state.showPreview && <PDFViewer SelectedFile={this.state.SelectedFile}   />}
                  </div>
                </div>
              </div>
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

export default connect(mapStateToProps,{fileDelete})(MyDocuments)

import React, { Component } from "react";
import "../Style.css";
import { Document,Page } from 'react-pdf/dist/entry.webpack';
class PDFViewer extends Component {
  constructor(props) {
  super(props);
  this.state = {
    numPages: null,
    pageNumber: 1,
  };
}
  onDocumentLoadSuccess = ({ numPages }) =>
   this.setState({
     numPages,
   })
   render() {
  const { numPages } = this.state;
       //var proxy="https://cors-anywhere.herokuapp.com/"
        var fileURL=this.props.SelectedFile;
       console.log("Second =" +fileURL);
       var url =fileURL;
        return (

          <div className="pdf-outline">
            {console.log("show")}
            <Document
              file={url}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              {
                Array.from(
                  new Array(numPages),
                  (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                    />
                  ),
                )
              }
            </Document>

          </div>

        );
}
      };
export default PDFViewer;

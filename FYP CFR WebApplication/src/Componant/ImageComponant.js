import React from "react";
const ImageComponant = (props) => {
  return (
    <div >
      <img src={props.src}alt ={props.alttext} width="150px" height="150px"/>
    </div>
  );
};
export default ImageComponant;

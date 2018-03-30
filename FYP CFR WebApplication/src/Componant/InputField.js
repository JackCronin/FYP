import React from "react";
const InputField = (props) => {
  return (
    <div >
      <label htmlFor={props.id}>{props.label}</label>
      <input onChange={props.inputAction} type={props.type}
        id={props.id}/>
    </div>
  );
};
export default InputField;

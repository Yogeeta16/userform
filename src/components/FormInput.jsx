import { useState } from "react";
import "./formInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, validate, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };
  
  return (
    <div className="formInput">
      <label>{label}</label>
      {inputProps.type === "select" ? (
        
        <select {...inputProps} onChange={onChange}>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      ) : (
       
        <input
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          
          focused={focused.toString()}
        />
       
      )}
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;

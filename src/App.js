import { useState } from "react";
import "./App.css";
import FormInput from "./components/FormInput";

const App = () => {
  const validateDateOfBirth = (dob) => {
    const dobDate = new Date(dob);
  const age = Math.floor(
    (Date.now() - dobDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );
  
    if (age < 18) {
      return "You must be at least 18 years old!";
    }
  
    return null;
  };
  
  const [values, setValues] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    mobile_number: "",
    birthday: "",
    Gender: "",
    
  });

  const inputs = [
    {
      id: 1,
      name: "FirstName",
      type: "text",
      placeholder: "First Name",
      errorMessage:
        "First Name should be 3-16 characters and shouldn't include any special character!",
      label: "First Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "LastName",
      type: "text",
      placeholder: "Last Name",
      errorMessage:
        "Last Name should be 3-16 characters and shouldn't include any special character!",
      label: "Last Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "mobile_number",
      type: "tel",
      placeholder: "Mobile Number",
      errorMessage: "Please enter a valid phone number in the format XXX-XXX-XXXX!",
      label: "Mobile Number",
      pattern: "^[0-9]{10}$",
      required: true,
    },
//     {
//   id: 5,
//   name: "birthday",
//   type: "date",
//   placeholder: "Birthday",
//   label: "Birthday",
//   errorMessage: "You must be at least 18 years old!",
  
//   required: true,
// },
{
  id: 5,
  name: "birthday",
  type: "date",
  placeholder: "Birthday",
  label: "Birthday",
  errorMessage: "You must be at least 18 years old!",
  validate: validateDateOfBirth, // add the validate prop
  required: true,
},

    
    {
      id: 6,
    name: "Gender",
    type: "select",
    label: "Gender",
    placeholder: "Gender",
    options: ["Male", "Female", "Other"],
    required: true,
 
    },
    
  ];
  

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const formJSON = Object.fromEntries(formData.entries());
  
    fetch('/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formJSON),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  

  return (
    <div className="app">
    <form onSubmit={handleSubmit}>
      <h2>User Details Form </h2>
      <div className="scrollable-container">
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
      </div>
      <button type = "submit">Submit</button>
    </form>
  </div>
  );
};

export default App;
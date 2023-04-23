import React, { useState } from "react";
import "./App.css";

function App() {
  // State for the main form and subform
  const [mainInput, setMainInput] = useState("");
  const [subFormFields, setSubFormFields] = useState([]);
  const [formData, setFormData] = useState([]);

  // Function to handle the main input change
  const handleMainInputChange = (event) => {
    setMainInput(event.target.value);
  };

  // Function to display the subform
  const displaySubForm = () => {
    switch (mainInput) {
      case "file":
        return createSubForm("File");
      case "dropdown":
        return createSubForm("Dropdown");
      case "input":
        return createSubForm("Input");
      default:
        return null;
    }
  };

  // Function to handle adding new fields in the subform
  const addField = (fieldType) => {
    setSubFormFields([...subFormFields, { type: fieldType, value: "" }]);
  };

  // Function to handle deleting fields in the subform
  const deleteField = (index) => {
    const updatedFields = subFormFields.filter((_, i) => i !== index);
    setSubFormFields(updatedFields);
  };

  // Function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData([...formData, ...subFormFields]);
  };

  // Function to render the subform
  const createSubForm = (fieldType) => {
    return (
      <form onSubmit={handleSubmit}>
        {subFormFields.map((field, index) => (
          <div key={index}>
            <label>{field.type}: &nbsp;</label>
            <input
              type={field.type === "File" ? "file" : "text"}
              value={field.value}
              onChange={(event) =>
                setSubFormFields(
                  subFormFields.map((f, i) =>
                    i === index ? { ...f, value: event.target.value } : f
                  )
                )
              }
            />
            <button type="button" className="dlt-btn" onClick={() => deleteField(index)}>
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addField(fieldType)}>
          Add {fieldType} Field
        </button>
        <button type="submit">Save</button>
      </form>
    );
  };

  return (
    <div className="App">
      <h1>Dynamic Form</h1>
      <select value={mainInput} onChange={handleMainInputChange}>
        <option value="">Select input type</option>
        <option value="file">File</option>
        <option value="dropdown">Dropdown</option>
        <option value="input">Input</option>
      </select>
      {mainInput && displaySubForm()}
      <h2>Saved Data</h2>
      {formData.map((field, index) => (
        <div key={index}>
          <strong>{field.type}:</strong> {field.value}
        </div>
      ))}
    </div>
  );
}

export default App;

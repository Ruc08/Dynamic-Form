import React, { useState } from "react";
import "./App.css";

function App() {
  // State for the main form and subform
  const [mainInput, setMainInput] = useState("");
  const [label, setLabel] = useState("");
  const [dropDownOptions, setDropDownOptions] = useState([""]);
  const [formFields, setFormFields] = useState([]);
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
    setFormFields([...formFields, { type: fieldType, label: label, value: "", dropDownOptions: dropDownOptions }]);
    setLabel("");
    setDropDownOptions([""]);
  };

  // Function to handle deleting fields in the subform
  const deleteField = (index) => {
    const updatedFields = formFields.filter((_, i) => i !== index);
    setFormFields(updatedFields);
  };

  // Function to handle adding new option for dropdown
  const addOption = () => {
    setDropDownOptions([...dropDownOptions, ""])
  }

  // Function to render the subform
  const createSubForm = (fieldType) => {
    return (
      <form>
        <input
          type="text"
          placeholder="Enter Label Name"
          value={label}
          onChange={event => setLabel(event.target.value)}
        />
        <button type="button" disabled={!label.length} onClick={() => addField(fieldType)}>
          Add {fieldType} Field
        </button>
        {
          fieldType === "Dropdown" &&
          dropDownOptions.map((option, index) => (
            <div>
              <input
                type="text"
                placeholder={"Option " + (index + 1)}
                value={option}
                onChange={event =>
                  setDropDownOptions(
                    dropDownOptions.map((option, i) => i === index ? event.target.value : option)
                  )
                }
              />
              <button type="button" onClick={() => addOption()}>
                Add More Option
              </button>
            </div>
          ))
        }
      </form>
    );
  };

  // Function to handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData([...formFields]);
  };

  // Function to handle values in main form
  const handleValueChange = (event, index) => {
    setFormFields(
      formFields.map((field, i) =>
        i === index ? { ...field, value: event.target.value } : field
      )
    );
  };

  // Function to render the main form
  const displayMainForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <div key={index}>
            <label>{field.label}: &nbsp;</label>
            {field.type === "Dropdown" ?
              <select
                value={field.value}
                onChange={(event) => handleValueChange(event, index)}>
                <option value="">Select an option</option>
                {field.dropDownOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              :
              <input
                type={field.type === "File" ? "file" : "text"}
                value={field.value}
                onChange={(event) => handleValueChange(event, index)} />
            }
            <button type="button" className="dlt-btn" onClick={() => deleteField(index)}>
              Delete
            </button>
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    )
  }

  return (
    <div className="App">
      <h1>Dynamic Form</h1>
      <select className="main-select" value={mainInput} onChange={handleMainInputChange}>
        <option value="">Select input type</option>
        <option value="file">File</option>
        <option value="dropdown">Dropdown</option>
        <option value="input">Input</option>
      </select>
      {mainInput && displaySubForm()}
      {formFields.length !== 0 && displayMainForm()}
      <h2>Saved Data</h2>
      {formData.map((field, index) => (
        <div key={index}>
          <strong>{field.label}:</strong> {field.value}
        </div>
      ))}
    </div>
  );
}

export default App;

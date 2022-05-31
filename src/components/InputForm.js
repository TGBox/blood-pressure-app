import { useState } from "react";
import "./InputForm.css";

// Initial values for the different input fields of the form.
const initialValues = {
  uid: 1,
  date: "",
  time: "",
  sys: "",
  dia: "",
  puls: "",
  medi: "",
  energy: "",
  comment: "",
};
/*
  InputForm that will handle the different inputs.
  - currentCount: Int that indicates the current uid of the last dataSet in the dataList array of the app. Starting at 1.
  - addDataSet: Ref to the function inside the app to add the current new data set, that is generated from the inputs. 
*/
export default function InputForm({ addDataSet }) {

  // UseState to set the initial values within the form.
  const [values, setValues] = useState(initialValues);

  // Singular input change handler for all inputs.
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  // Simple submit handler to prevent page refresh, collect all relative data and reset the values for the inputs.
  const handleSubmit = (e) => {
    e.preventDefault();
    addDataSet(values);
    resetForm();
  };

  // Resets the form input fields.
  const resetForm = () => {
    document.getElementById("form").reset();
  };

  return (
    <form id="form">
      <div id="inputs">
        <div className="formRowItem">
          <label className="label" htmlFor="dateIn">Datum:</label><br/>
          <input name="date" id="dateIn" type="date" min="2022-04-27" max="2024-04-27" onChange={handleInputChange} required></input>
        </div>
        <div className="formRowItem">
          <label className="label" htmlFor="timeIn">Uhrzeit:</label><br/>
          <input name="time" id="timeIn" type="time" onChange={handleInputChange} required></input>
        </div>
        <div className="formRowItem">
          <label className="label" htmlFor="sysIn">Systolisch:</label><br/>
          <input name="sys" id="sysIn" className="nr" type="number" min="50" max="300" onChange={handleInputChange} required></input>
        </div>
        <div className="formRowItem">
          <label className="label" htmlFor="diaIn">Diastolisch:</label><br/>
          <input name="dia" id="diaIn" className="nr" type="number" min="50" max="200" onChange={handleInputChange} required></input>
        </div>
        <div className="formRowItem">
          <label className="label" htmlFor="pulsIn">Puls:</label><br/>
          <input name="puls" id="pulsIn" className="nr" type="number" min="50" max="200" onChange={handleInputChange} required></input>
        </div>
        <div className="formRowItem">
          <label className="label" htmlFor="mediIn">Medikinet:</label><br/>
          <input name="medi" id="mediIn" className="nr" type="number" min="0" max="100" onChange={handleInputChange}required></input>
        </div>
        <div className="formRowItem">
          <label className="label" htmlFor="energyIn">Energydrinks:</label><br/>
          <input name="energy" id="energyIn" className="nr" type="number" min="0" max="7" onChange={handleInputChange}required></input>
        </div>
        <div className="formRowItem">
          <label className="label" htmlFor="commentIn">Kommentar:</label><br/>
          <input name="comment" id="commentIn" type="text" placeholder="Zusatzbemerkungen?" onChange={handleInputChange}></input>
        </div>
      </div>
      <div id="submitDiv">
        <button name="submit" id="submit" onClick={handleSubmit}>Werte hinzufügen</button>
      </div>
    </form>
  );

};
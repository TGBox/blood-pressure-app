import { useState } from "react";
import "./InputForm.css";

// Initial values for the different input fields of the form.
const initialValues = {
  date: "",
  time: "",
  sys: "",
  dia: "",
  puls: "",
  medi: "",
  energy: "",
  comment: "",
};

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
    setValues(initialValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="inputs">
        <div className="formRowItem">
          <label className="label" for="dateIn">Datum:</label><br/>
          <input name="date" id="dateIn" type="date" min="2022-04-27" max="2024-04-27" onChange={handleInputChange} required></input>
        </div>
        <div className="formRowItem">
          <label className="label" for="timeIn">Uhrzeit:</label><br/>
          <input name="time" id="timeIn" type="time" onChange={handleInputChange} required></input>
        </div>
        <div className="formRowItem">
          <label className="label" for="sysIn">Systolisch:</label><br/>
          <input name="sys" id="sysIn" className="nr" type="number" min="50" max="300" onChange={handleInputChange} required></input>
        </div>
        <div className="formRowItem">
          <label className="label" for="diaIn">Diastolisch:</label><br/>
          <input name="dia" id="diaIn" className="nr" type="number" min="50" max="200" onChange={handleInputChange} required></input>
        </div>
        <div className="formRowItem">
          <label className="label" for="pulsIn">Puls:</label><br/>
          <input name="puls" id="pulsIn" className="nr" type="number" min="50" max="200" onChange={handleInputChange} required></input>
        </div>
        <div className="formRowItem">
          <label className="label" for="mediIn">Medikinet:</label><br/>
          <input name="medi" id="mediIn" className="nr" type="number" min="0" max="100" onChange={handleInputChange} value="0" required></input>
        </div>
        <div className="formRowItem">
          <label className="label" for="energyIn">Energydrinks:</label><br/>
          <input name="energy" id="energyIn" className="nr" type="number" min="0" max="7" onChange={handleInputChange} value="0" required></input>
        </div>
        <div className="formRowItem">
          <label className="label" for="commentIn">Kommentar:</label><br/>
          <input name="comment" id="commentIn" type="text" placeholder="Zusatzbemerkungen?" onChange={handleInputChange}></input>
        </div>
      </div>
      <div id="submitDiv">
        <input name="submit" type="submit" value="Werte hinzufügen"></input>
      </div>
    </form>
  );

};
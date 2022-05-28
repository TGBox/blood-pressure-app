import { useState } from 'react';
import './App.css';
import InputForm from './components/InputForm';

function App() {

  // DataList that will keep all the single data sets to show them inside of the app.
  const [dataList, setDataList] = useState([]);

  // Handles the collected values from the input form to add them to the list of data that is currently present.
  const addDataSet = (inputValues) => {
    let newDataList = [...dataList];
    newDataList = [...newDataList, {
      date: inputValues.date, 
      time: inputValues.time, 
      sys: inputValues.sys, 
      dia: inputValues.dia, 
      puls: inputValues.puls,
      medi: inputValues.medi,
      energy: inputValues.energy,
      comment: inputValues.comment
    }];
    setDataList(newDataList);
  };

  return (
    <div className="App">
      <header id='head'>
				<h1>Danis Blutdruck Protokollierer</h1>
			</header>
			<div id="body">
				<div id="headings">
					<h5 className='heading'>Datum</h5>
					<h5 className='heading'>Zeit</h5>
					<h5 className='heading'>Systolisch</h5>
					<h5 className='heading'>Diastolisch</h5>
					<h5 className='heading'>Puls</h5>
					<h5 className='heading'>Medikinet in mg</h5>
					<h5 className='heading'>Energydrinks</h5>
					<h5 className='heading'>Kommentar</h5>
				</div>
        <div id="dataListDiv">
          {dataList.map((item, index) => {
            // TODO: Think of an appropriate way to map the single values onto correctly sized divs to match the headings.
          })}
        </div>
        <div id="formDiv">
          <InputForm addDataSet={addDataSet}></InputForm>
        </div>
      </div>
    </div>
  );
}

export default App;

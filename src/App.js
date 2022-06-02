import { useEffect, useState } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import { DataSetRow } from './components/DataSetRow';

function App() {

  // TODO: Time needs to be displayed nicer.
  // TODO: Separation of the single values horizontally needs to be better.
  // TODO: JSON file to be downloaded could get formatted better.
  // TODO: Add possibility to display daily averages and also to export and save them as well.
  // TODO: Resizing will result in the headings being displayed outside of their allocated places. Needs to be altered to handle that.

  /* 
    DataList useState that will keep all the single data sets to show them inside of the app. 
    Checks if data is available in the local storage of the browser and parses that to initialize the useState.
    If no data is available, we initialize an empty array.
  */
  const [dataList, setDataList] = useState(() => {
    const data = localStorage.getItem("bloodPressureData");
    const parsedData = JSON.parse(data);
    return parsedData || [];
  });

  /* 
    Init of the useState for the counter variable that will keep track of the amount of items that we have stored in our list.
    Will check for the length of the dataList array and sets the counter accordingly so that we start counting at 1.
  */
  const [dataCounter, setCounter] = useState(dataList.length + 1);

  // Handles the collected values from the input form to add them to the list of data that is currently present.
  const addDataSet = (input) => {
    let tmpDateObject = new Date(input.date);
    let newDataList = [...dataList];
    newDataList = [...newDataList, {
      uid: dataCounter,
      date: formatDate(tmpDateObject), 
      time: input.time, 
      sys: input.sys, 
      dia: input.dia, 
      puls: input.puls,
      medi: input.medi,
      energy: input.energy,
      comment: input.comment
    }];
    setDataList(newDataList);
    // This will save the data to the local storage of the browser, every time we add another data set.
    localStorage.setItem("bloodPressureData", JSON.stringify(newDataList));
    // And when new data is added, we hide the download link afterwards, so the user has to manually request it again.
    let link = document.getElementById("downloadLink");
    link.style = "display: none";
  };

  // Takes a number and adds a leading zero if the number is smaller than 10.
  const padTo2Digits = (number) => {
    return number.toString().padStart(2, '0');
  };

  // Takes a date object and formats it to german style layout. (DD.MM.YYYY)
  const formatDate = (date) => {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth()),
      date.getFullYear(),
    ].join(".");
  };

  // Called on every rerender event. Will perform the side effect to correctly set the counter according to the new datalist.
  useEffect(() => {
    setCounter(dataList.length + 1);
  }, [dataList]);

  /*
    Handles the preparation of the JSON parsed dataSet as a text file to enable downloading it.
    Checks if data is available and notifies the user otherwise.
  */
  const generateFileToDownload = () => {
    let textFile = null,
      makeTextFile = function (text) {
        let data = new Blob([text], {type: 'text/plain'});
        // If an existing file gets replaced, we need to revoke the object URL to avoid memory leaks.
        if(textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }
        textFile = window.URL.createObjectURL(data);
        return textFile;
      };
    if(dataList === []) {
      alert("Es gibt keine Daten die gespeichert werden können!");
    } else {
      let dataAsReadableText = JSON.stringify(dataList, null, 2);
      let link = document.getElementById("downloadLink");
      link.href = makeTextFile(dataAsReadableText);
      link.style.display = "block";
    }
  };

  // Deletes possibly saved data from the local storage and refreshes the page to update the list that is displayed.
  const deleteData = () => {
    if(window.confirm("Wollen Sie wirklich den kompletten Datensatz löschen?\nDiese Aktion kann nicht rückgängig" + 
      " gemacht werden.\n\nVorheriges Speichern wird empfohlen.")){
      localStorage.removeItem("bloodPressureData");
      window.location.reload();
    }
  };

  return (
    <div className="App">
      <header id='head'>
        <div id="headline">
				  <h1>Danis Blutdruck Protokollierer</h1>
        </div>
        <br/>
        <div id="downloadDiv">
          <button id="createFileLink" onClick={generateFileToDownload}>Datensatz zum Download vorbereiten</button>
          <a download="BlutdruckProtokoll.txt" id="downloadLink" href="none">Download starten</a>
        </div>
        <br/>
        <div>
          <button id="deleteSavedData" onClick={deleteData}>Datensatz löschen</button>
        </div>
			</header>
			<div id="body">
				<div id="headings">
					<h5 className='heading'>Datum</h5>
					<h5 className='heading'>Uhrzeit</h5>
					<h5 className='heading'>Systolischer Blutdruck</h5>
					<h5 className='heading'>Diastolischer Blutdruck</h5>
					<h5 className='heading'>Puls</h5>
					<h5 className='heading'>Medikinet in mg</h5>
					<h5 className='heading'>Energydrinks Stückzahl</h5>
					<h5 className='heading'>Kommentar</h5>
				</div>
        <div id="dataListDiv">
          {dataList.map((item, index) => {
            return (
              <DataSetRow
                date={item.date}
                time={item.time}
                sys={item.sys}
                dia={item.dia}
                puls={item.puls}
                medi={item.medi}
                energy={item.energy}
                comment={item.comment}
                uid={index + 1}
                key={index}
              ></DataSetRow>
            );
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

import React from "react";
import "./DataSetRow.css";

export const DataSetRow = ({ date, time, sys, dia, puls, medi, energy, comment, uid}) => {

  return (
    <div id="dataSetRow" name={uid}>
      <div className="rowItem" id="dateItem">{date}</div>
      <div className="rowItem" id="timeItem">{time}</div>
      <div className="rowItem" id="sysItem">{sys}</div>
      <div className="rowItem" id="diaItem">{dia}</div>
      <div className="rowItem" id="pulsItem">{puls}</div>
      <div className="rowItem" id="mediItem">{medi}</div>
      <div className="rowItem" id="energyItem">{energy}</div>
      <div className="rowItem" id="commentItem">{comment}</div>
    </div>
  );

};
import React from "react";
import "./Track.css";

function Track ({ track, isRemoval }) {
  function renderAction() {
      let button = isRemoval ? 
      <button className="Track-action">-</button> : 
      <button className="Track-action">+</button>;

      return button;
  }

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        
        <p>{track.artist} | {track.album}</p>
      </div>
      {renderAction()}
    </div>
  );
}

export default Track;
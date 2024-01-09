import React from "react";
import "./Track.css";

function Track (props) {
  function renderAction() {
      let button = props.isRemoval
      ? <button className="Track-action" onClick={passTrackToRemove}>-</button>
      : <button className="Track-action" onClick={passTrack}>+</button>;

      return button;
  };

  function passTrack() {
    props.onAdd(props.track);
  };

  function passTrackToRemove(track) {
    props.onRemove(props.track);
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{props.track.name}</h3>
        
        <p>{props.track.artist} | {props.track.album}</p>
      </div>
      {renderAction()}
    </div>
  );
}

export default Track;
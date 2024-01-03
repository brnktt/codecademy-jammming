import React from "react";
import "./Track.css";

function Track (props) {
  function renderAction() {
      let button = props.isRemoval ? 
      <button className="Track-action">-</button> : 
      <button className="Track-action">+</button>;

      return button;
  }

  return (
    <div className="Track">
      <div className="Track-information">
        {/* <h3><!-- track name will go here --></h3> */}
        
        {/* <p><!-- track artist will go here--> | <!-- track album will go here --></p> */}
      </div>
      {renderAction() /* <button class="Track-action"><!-- + or - will go here --></button> */}
    </div>
  );
}

export default Track;
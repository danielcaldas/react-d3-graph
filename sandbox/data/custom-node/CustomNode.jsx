/* eslint-disable valid-jsdoc */
import React from "react";

import "./res/styles/custom-node.css";

const ICON_PATH = "./data/custom-node/res/images/";

const ICON_TYPES = {
  MAN: ICON_PATH + "man.svg",
  WOMAN: ICON_PATH + "girl.svg",
  CAR: ICON_PATH + "car.svg",
  BIKE: ICON_PATH + "bike.svg",
};

/**
 * Component that renders a person's name and gender, along with icons
 * representing if they have a driver license for bike and / or car.
 * @param {Object} props component props to render.
 */
function CustomNode({ person }) {
  const isMale = person.gender === "male";

  return (
    <div className={`flex-container person-node ${isMale ? "male" : "female"}`}>
      <div className="name">{person.name}</div>

      <div className="flex-container fill-space flex-container-row">
        <div className="fill-space">
          <div className="icon" style={{ backgroundImage: `url('${isMale ? ICON_TYPES.MAN : ICON_TYPES.WOMAN}')` }} />
        </div>

        <div className="icon-bar">
          {person.hasBike && <div className="icon" style={{ backgroundImage: `url('${ICON_TYPES.BIKE}')` }} />}
          {person.hasCar && <div className="icon" style={{ backgroundImage: `url('${ICON_TYPES.CAR}')` }} />}
        </div>
      </div>
    </div>
  );
}

export default CustomNode;

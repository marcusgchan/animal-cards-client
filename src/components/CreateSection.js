import { useState, useRefs } from "react";
import axios from "axios";
import styles from "./styles/CreateSection.module.css";
import OPTIONS from "../options";
import { v4 as uuidv4 } from "uuid";

const CreateSection = () => {
  const [cardForm, setCardForm] = useState({ name: "" });
  const [showPopup, setShowPopup] = useState(false);

  function addProperty(e) {
    e.preventDefault();
    let obj = { ...cardForm };
    obj[e.currentTarget.name] = e.currentTarget.value;
    setCardForm(obj);
  }

  const toggleDisplayMenu = (e) => {
    e.preventDefault();
    setShowPopup((prev) => !prev);
  };

  return (
    <section className={styles.sectionContainer}>
      <Card
        toggleDisplayMenu={toggleDisplayMenu}
        cardForm={cardForm}
        showPopup={showPopup}
        addProperty={addProperty}
      />
      <Controls />
    </section>
  );
};

const Controls = () => {
  return (
    <div className={styles.grid}>
      <label htmlFor="widthSlider">width</label>
      <input type="range" id="rangeSlider" />
      <label htmlFor="heightSlider">height</label>
      <input type="range" id="heightSlider" />
      <label htmlFor="color">color</label>
      <input type="color" id="color" />
    </div>
  );
};

const Card = ({ toggleDisplayMenu, cardForm, showPopup, addProperty }) => {
  function displayRows() {
    const rows = [];
    let i = 0;
    for (const [property, value] of Object.entries(cardForm)) {
      rows.push(<CardRow key={uuidv4()} property={property} />);
      i++;
    }
    return rows;
  }
  return (
    <form className={styles.card}>
      <div className={styles.cardContainer}>
        {displayRows()}
        <ToggleOptions
          toggleDisplayMenu={toggleDisplayMenu}
          cardForm={cardForm}
          showPopup={showPopup}
          addProperty={addProperty}
        />
      </div>
    </form>
  );
};

const CardRow = ({ property }) => {
  return (
    <div className={styles.cardRow}>
      <label className={styles.property}>{property}</label>
      <input name={property} className={styles.value} />
    </div>
  );
};

const ToggleOptions = ({
  toggleDisplayMenu,
  cardForm,
  showPopup,
  addProperty,
}) => {
  return (
    <div className={styles.modalContainer}>
      {showPopup && (
        <ul className={styles.modal}>
          {OPTIONS.filter(
            ({ option }) => !Object.keys(cardForm).includes(option)
          ).map(({ id, option }) => (
            <button
              key={id}
              name={option}
              className={styles.addPropertyBtn}
              onClick={addProperty}
            >
              <li>{option}</li>
            </button>
          ))}
        </ul>
      )}
      <button className={styles.addPropertybtn} onClick={toggleDisplayMenu}>
        +
      </button>
    </div>
  );
};

const PropertiesPopup = () => {};

export default CreateSection;

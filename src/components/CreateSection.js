import { useState, useEffect, useRefs } from "react";
import styles from "./styles/CreateSection.module.css";
import OPTIONS from "../options";
import cardServices from "../services/cardServices";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const HEIGHT_SLIDER_CONFIG = {
  defaultValue: 20,
  minValue: 18,
  maxValue: 30,
  step: 0.2,
};
const WIDTH_SLIDER_CONFIG = {
  defaultValue: 20,
  minValue: 18,
  maxValue: 25,
  step: 0.2,
};

const CreateSection = () => {
  const [cardForm, setCardForm] = useState({ name: "" });
  const [height, setHeight] = useState(HEIGHT_SLIDER_CONFIG.defaultValue);
  const [width, setWidth] = useState(WIDTH_SLIDER_CONFIG.defaultValue);
  const [color, setColor] = useState("#2a7f62");
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const urlParams = useParams();

  useEffect(() => {
    // Fetch data for previous card if the id exist, else redirect to regular create page
    if (urlParams.id) {
      cardServices
        .getCard(urlParams.id)
        .then((res) => {
          const data = res.data;
          console.log(res);
          // Remove properties that aren't displayed in the card
          delete data["id"];
          const savedWidth = data["min_card_width"];
          delete data["min_card_width"];
          const savedHeight = data["min_card_height"];
          delete data["min_card_height"];
          const savedColor = data["card_color"];
          delete data["card_color"];

          // remove null properties
          for (const key of Object.keys(data)) {
            if (data[key] === null) {
              delete data[key];
            }
          }

          setHeight(data);
          setWidth(savedWidth);
          setColor(savedColor);
          setCardForm(data);
        })
        .catch((err) => {});
    }
  }, [urlParams]);

  function addProperty(e) {
    e.preventDefault();
    let obj = { ...cardForm };
    obj[e.currentTarget.name] = e.currentTarget.value;
    setCardForm(obj);
  }

  function handleFormInput(e) {
    const newFormInput = { ...cardForm };
    newFormInput[e.target.name] = e.target.value;
    setCardForm(newFormInput);
  }

  const toggleDisplayMenu = (e) => {
    e.preventDefault();
    setShowPopup((prev) => !prev);
  };

  function submit() {
    const card = {
      ...cardForm,
      min_card_height: height,
      min_card_width: width,
      card_color: color,
    };
    if (urlParams.id) {
      cardServices
        .modifyCard(urlParams.id, card)
        .then((res) => console.log("successfully modified: " + res.data.name))
        .catch((err) => console.log("unable to modify: " + err));
    } else {
      cardServices
        .addCard(card)
        .then((res) => console.log("successfully added: " + res.data.name))
        .catch((err) => console.log("unable to add: " + err));
    }
  }

  return (
    <section className={styles.sectionContainer}>
      <Card
        toggleDisplayMenu={toggleDisplayMenu}
        cardForm={cardForm}
        showPopup={showPopup}
        addProperty={addProperty}
        handleFormInput={handleFormInput}
        height={height}
        width={width}
        color={color}
      />
      <Controls
        height={height}
        setHeight={setHeight}
        width={width}
        setWidth={setWidth}
        color={color}
        setColor={setColor}
        submit={submit}
      />
    </section>
  );
};

const Controls = ({
  height,
  setHeight,
  width,
  setWidth,
  color,
  setColor,
  submit,
}) => {
  return (
    <div className={styles.grid}>
      <label htmlFor="widthSlider">width</label>
      <input
        type="range"
        min={WIDTH_SLIDER_CONFIG.minValue}
        max={WIDTH_SLIDER_CONFIG.maxValue}
        step={WIDTH_SLIDER_CONFIG.step}
        value={width}
        onChange={(e) => setWidth(e.target.value)}
      />
      <label htmlFor="heightSlider">height</label>
      <input
        type="range"
        min={HEIGHT_SLIDER_CONFIG.minValue}
        max={HEIGHT_SLIDER_CONFIG.maxValue}
        step={HEIGHT_SLIDER_CONFIG.step}
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <label htmlFor="color">color</label>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button className={styles.btn} onClick={submit}>
        add to database
      </button>
    </div>
  );
};

const Card = ({
  toggleDisplayMenu,
  cardForm,
  showPopup,
  addProperty,
  handleFormInput,
  height,
  width,
  color,
}) => {
  function displayRows() {
    const rows = [];
    for (const property of Object.keys(cardForm)) {
      rows.push(
        <CardRow
          key={property}
          property={property}
          handleFormInput={handleFormInput}
          cardForm={cardForm}
          color={color}
        />
      );
    }
    return rows;
  }
  return (
    <form
      className={styles.card}
      style={{ minHeight: `${height}rem`, minWidth: `${width}rem` }}
    >
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

const CardRow = ({ property, handleFormInput, cardForm, color }) => {
  return (
    <div className={styles.cardRow}>
      <label className={styles.property} style={{ color: color }}>
        {property}
      </label>
      <input
        name={property}
        className={styles.value}
        onChange={handleFormInput}
        value={cardForm[property]}
      />
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

export default CreateSection;

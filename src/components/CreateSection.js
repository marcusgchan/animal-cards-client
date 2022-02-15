import { useState, useEffect, useRefs } from "react";
import styles from "./styles/CreateSection.module.css";
import OPTIONS from "../options";
import cardServices from "../services/cardServices";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";
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

const IS_VALID_DEFAULTS = {
  name: true,
  animal_type: true,
  latin_name: true,
  habitat: true,
  min_weight: true,
  max_weight: true,
};

const MODAL_TIMER = 3000;

const CreateSection = () => {
  const [cardForm, setCardForm] = useState({ name: "" });
  const [isValid, setIsValid] = useState({
    name: true,
    animal_type: true,
    latin_name: true,
    habitat: true,
    min_weight: true,
    max_weight: true,
  });
  const [height, setHeight] = useState(HEIGHT_SLIDER_CONFIG.defaultValue);
  const [width, setWidth] = useState(WIDTH_SLIDER_CONFIG.defaultValue);
  const [color, setColor] = useState("#2a7f62");
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState({
    isToggled: false,
    isSuccessful: false,
    msg: "",
  });
  const urlParams = useParams();
  const navigate = useNavigate();

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

          setHeight(savedHeight);
          setWidth(savedWidth);
          setColor(savedColor);
          setCardForm(data);
        })
        .catch((err) => {
          navigate("/create");
        });
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
    function handleModal(isSuccessful, msg) {
      setShowModal({ isToggled: true, msg, isSuccessful });
      setTimeout(
        () => setShowModal({ isToggled: false, ...showModal }),
        MODAL_TIMER
      );
    }

    function isValidString(val) {
      return val.length > 0 ? true : false;
    }

    function isValidNumber(val) {
      if (isNaN(Number(val)) || val === "") {
        return false;
      }

      return true;
    }

    function validateInput() {
      const updatedIsValid = { ...IS_VALID_DEFAULTS };
      let isValid = true;
      for (const [key, value] of Object.entries(cardForm)) {
        if (
          OPTIONS.find(({ option }) => option === key).type === "string" &&
          !isValidString(value)
        ) {
          updatedIsValid[key] = false;
          isValid = false;
        } else if (
          OPTIONS.find(({ option }) => option === key).type === "number" &&
          !isValidNumber(value)
        ) {
          updatedIsValid[key] = false;
          isValid = false;
        }
      }

      setIsValid(updatedIsValid);
      return isValid;
    }

    const card = {
      ...cardForm,
      min_card_height: height,
      min_card_width: width,
      card_color: color,
    };
    // Stops user from spamming submit button which will mess up the modal
    if (!showModal.isToggled && validateInput()) {
      if (urlParams.id) {
        cardServices
          .modifyCard(urlParams.id, card)
          .then((res) =>
            handleModal(true, `Successfully modifed ${res.data.name}`)
          )
          .catch((err) =>
            handleModal(false, `Error! Unable to modify ${cardForm.name}`)
          );
      } else {
        cardServices
          .addCard(card)
          .then((res) =>
            handleModal(true, `Successfully added ${res.data.name}`)
          )
          .catch((err) => handleModal(false, `Unable to add ${cardForm.name}`));
      }
    }
  }

  return (
    <section className={styles.container}>
      {showModal.isToggled && (
        <div className={styles.modalContainer}>
          <Modal msg={showModal.msg} isSuccessful={showModal.isSuccessful} />
        </div>
      )}
      <div className={styles.sectionContainer}>
        <Card
          toggleDisplayMenu={toggleDisplayMenu}
          cardForm={cardForm}
          showPopup={showPopup}
          addProperty={addProperty}
          handleFormInput={handleFormInput}
          height={height}
          width={width}
          color={color}
          isValid={isValid}
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
      </div>
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
  isValid,
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
          isValid={isValid}
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

const CardRow = ({ property, handleFormInput, cardForm, color, isValid }) => {
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
        style={{ boxShadow: isValid[property] ? "" : "0 0 0.3rem red" }}
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
    <div className={styles.menuContainer}>
      {showPopup && (
        <>
          <div
            className={styles.menuBackground}
            onClick={toggleDisplayMenu}
          ></div>
          <ul className={styles.menu}>
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
        </>
      )}
      <button className={styles.addPropertybtn} onClick={toggleDisplayMenu}>
        +
      </button>
    </div>
  );
};

export default CreateSection;

import { useState } from "react";
import axios from "axios";
import styles from "./styles/CreateSection.module.css";

const CreateSection = () => {
  return (
    <section className={styles.sectionContainer}>
      <Card />
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

const Card = () => {
  return (
    <form className={styles.card}>
      <div className={styles.cardRow}>
        <span className={styles.property}>name</span>
        <input className={styles.value} />
      </div>
    </form>
  );
};

export default CreateSection;

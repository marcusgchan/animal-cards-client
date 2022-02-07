import React from "react";
import styles from "./styles/Homepage.module.css";
import Button from "./Button";

const Homepage = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.mainHeading}>Animal Card Tracker</h1>
      <p className={styles.heroText}>
        Create, store, and customize cards that store the data of animals
      </p>
      <div className={styles.btnContainer}>
        <Button text="create" className="createBtn" />
        <Button text="generate" className="generateBtn" />
        <Button text="view" className="viewBtn" />
      </div>
    </section>
  );
};

export default Homepage;

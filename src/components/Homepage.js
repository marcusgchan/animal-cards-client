import React from "react";
import styles from "./styles/Homepage.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const navigate = useNavigate();
  const navigateToCreate = () => navigate("/create");
  const navigateToView = () => navigate("/view");
  return (
    <section className={styles.hero}>
      <h1 className={styles.mainHeading}>Animal Card Tracker</h1>
      <p className={styles.heroText}>
        Create, store, and customize cards that store the data of animals
      </p>
      <div className={styles.btnContainer}>
        <Button
          text="create"
          className="createBtn"
          onClick={navigateToCreate}
        />
        <Button text="view" className="viewBtn" onClick={navigateToView} />
      </div>
    </section>
  );
};

export default Homepage;

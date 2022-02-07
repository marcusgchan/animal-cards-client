import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles/ViewSection.module.css";

const ViewSection = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/animals")
      .then((res) => setAnimals(res.data))
      .catch((err) => console.err(err));
  }, []);

  return (
    <section className={styles.viewSectionContainer}>
      <div className={styles.grid}>
        {/* Form is a position abolute (not part of stacking context of grid) */}
        <form className={styles.searchContainer}>
          <input className={styles.searchInput} type="search" />
          <button className={styles.serachBtn} type="submit">
            Search
          </button>
        </form>
        {animals.map(({ name }) => (
          <Card text={name} />
        ))}
      </div>
    </section>
  );
};

const Card = ({ name }) => {
  return (
    <article className={styles.card}>
      <h2 className={styles.cardHeading}>{name}</h2>
    </article>
  );
};

export default ViewSection;

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles/ViewSection.module.css";

const ViewSection = () => {
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredAnimals, setFilteredAnimals] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/animals")
      .then((res) => {
        setAnimals(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setFilteredAnimals(
      animals.filter(({ name }) => name.includes(search.toLowerCase()))
    );
  }, [search, animals]);

  return (
    <section className={styles.viewSectionContainer}>
      <div className={styles.grid}>
        {/* Form is a position abolute (not part of stacking context of grid) */}
        <form className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
          />
          <button className={styles.serachBtn} type="submit">
            Search
          </button>
        </form>
        {filteredAnimals.map(({ name, id }) => (
          <Card key={id} text={name} />
        ))}
      </div>
    </section>
  );
};

const Card = ({ text }) => {
  return (
    <article className={styles.card}>
      <h2 className={styles.cardHeading}>{text}</h2>
    </article>
  );
};

export default ViewSection;

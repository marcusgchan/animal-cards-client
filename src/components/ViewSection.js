import React from "react";
import { useEffect, useState } from "react";
import cardServices from "../services/cardServices";
import styles from "./styles/ViewSection.module.css";
import { useNavigate } from "react-router-dom";

const ViewSection = () => {
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredAnimals, setFilteredAnimals] = useState([]);

  useEffect(() => {
    cardServices
      .getCards()
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
        {filteredAnimals.map(({ name, id, card_color }) => (
          <Card key={id} id={id} text={name} cardColor={card_color} />
        ))}
      </div>
    </section>
  );
};

const Card = ({ text, cardColor, id }) => {
  const navigate = useNavigate();
  return (
    <article className={styles.card} onClick={() => navigate(`/create/${id}`)}>
      <h2 className={styles.cardHeading} style={{ color: cardColor }}>
        {text}
      </h2>
    </article>
  );
};

export default ViewSection;

import React from "react";
import styles from "./styles/Logo.module.css";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <span className={styles.logo} onClick={() => navigate("/")}>
      AT
    </span>
  );
};

export default Logo;

import React from "react";
import styles from "./styles/Button.module.css";
import { useNavigate } from "react-router-dom";

const Button = ({ text, className }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/${text}`)}
      className={`${className} ${styles.btn}`}
    >
      {text}
    </button>
  );
};

export default Button;

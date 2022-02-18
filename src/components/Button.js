import React from "react";
import styles from "./styles/Button.module.css";

const Button = ({ text, className, onClick }) => {
  return (
    <button onClick={onClick} className={`${className} ${styles.btn}`}>
      {text}
    </button>
  );
};

export default Button;

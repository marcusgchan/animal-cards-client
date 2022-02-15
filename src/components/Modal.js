import React from "react";
import styles from "./styles/Modal.module.css";

const Modal = ({ isSuccessful, msg }) => {
  return (
    <div
      className={styles.modal}
      style={{ background: isSuccessful ? "green" : "red" }}
    >
      <p>{msg}</p>
    </div>
  );
};

export default Modal;

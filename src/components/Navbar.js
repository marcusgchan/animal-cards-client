import React from "react";
import Logo from "./Logo";
import Button from "./Button";
import styles from "./styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navContainer}>
      <Logo />
      <ul>
        <li className={styles.btnContainer}>
          <Button text="create" className="createBtn" />
          <Button text="generate" className="generateBtn" />
          <Button text="view" className="viewBtn" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

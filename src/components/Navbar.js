import React from "react";
import Logo from "./Logo";
import Button from "./Button";
import styles from "./styles/Navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const navigateToCreate = () => navigate("/create");
  const navigateToView = () => navigate("/view");
  return (
    <nav className={styles.navContainer}>
      <Logo />
      <ul>
        <li className={styles.btnContainer}>
          <Button
            text="create"
            className="createBtn"
            onClick={navigateToCreate}
          />
          <Button text="view" className="viewBtn" onClick={navigateToView} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

import React, { Fragment, useEffect, useState } from "react";
import meals from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const atIndex = storedUsername.indexOf("@");
    if (atIndex !== -1) {
      setUsername(storedUsername.substring(0, atIndex));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <section className={classes["title-wrappers-hpage"]}>
        <div className={classes["logo-8-hpage"]}>
            <h3 className={classes["h3-hpage"]}>tasty<span>twi$t</span></h3>
          </div>
        </section>
        <div className={classes["header-buttons"]}>
          {username}
          <HeaderCartButton onClick={props.onClick} />
          <button className={classes["button"]} onClick={handleLogout}>
            LogOut
          </button>
        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={meals} alt="All the iteams are ready" />
      </div>
    </Fragment>
  );
};
export default Header;

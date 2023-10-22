import React from "react";
import "./SelectionPage.css";
import { useNavigate } from "react-router-dom";

function SelectionPage() {
  const navigate = useNavigate();
  const userLoginHandler = () => {
    navigate("/Login");
  };
  const adminLoginHandler = () => {
    navigate("/adminLogin");
  };
  return (
    <div className="container-spage">
      <div className="title-container-spage">
        <section className="title-wrappers-spage">
          <div className="logo-8">
            <h3 className="h3-spage">tasty<span>twi$t</span></h3>
          </div>
        </section>
      </div>
      <div className="wrapper-spage">
        <div className="buttons">
          <button onClick={userLoginHandler}>USER</button>
          <button onClick={adminLoginHandler}>ADMIN</button>
        </div>
      </div>
    </div>
  );
}

export default SelectionPage;

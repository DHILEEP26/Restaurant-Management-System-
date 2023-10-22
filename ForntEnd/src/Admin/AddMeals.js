import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddMeals.css";
import axios from "axios";
import { toast } from "react-toastify";

const initial = {
  name: "",
  description: "",
  price: "",
};

function AddMeals() {
  const [state, setState] = useState(initial);

  const { name, description, price } = state;

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !description || !price) {
      toast.error("Please provied the required value!");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/postmeal", {
            name,
            description,
            price,
          })
          .then(() => {
            setState({ name: "", description: "", price: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Thanks For Your Rating!!");
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            name,
            description,
            price,
          })
          .then(() => {
            setState({ name: "", description: "", price: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Rating Updated Successfuly!!");
      }

      setTimeout(() => navigate("/adminHome"), 500);
    }
  };
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div className="container-upage">
      <div className="title-container-upage">
        <section className="title-wrappers-upage">
          <div className="logo-8-upage">
            <h3 className="h3-upage">
              tasty<span>twi$t</span>
            </h3>
          </div>
        </section>
      </div>
      <div className="wrapper-upage">
        <h2 className="login-title">Welcome Admin!!</h2>
        <form onSubmit={submitHandler}>
          <div className="input-box-m">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Food Name"
              value={name || ""}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="input-box-m">
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Description"
              value={description || ""}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="input-box-m">
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              value={price || ""}
              onChange={inputChangeHandler}
            />
          </div>
          <input type="submit" value={id ? "Update" : "Save"} className="btn" />
          <div className="table-link">
            <p>
              Don't want to add{" "}
              <Link
                to="/adminHome"
                style={{ color: "#602800", fontStyle: "italic" }}
              >
                back!!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMeals;

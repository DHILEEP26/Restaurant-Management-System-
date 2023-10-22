import React, { useState, useEffect } from "react";
import "./AdminHome.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function AdminHome() {
  const [Data, setData] = useState([]);
  const adminauthenticated =
    localStorage.getItem("adminauthenticated") === "true";

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/meals");
    setData(response.data);
  };
  useEffect(() => {
    loadData();
  }, []);

  const deleteContent = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that information ")
    ) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Deleted Successfuly");
      setTimeout(() => loadData(), 500);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("adminauthenticated");
    window.location.href = "/adminLogin";
  };

  if (!adminauthenticated) {
    return <p>This page need Authentication!!</p>;
  } else {
    return (
      <div className="container-table">
        <div className="title-container-table">
          <section className="title-wrappers-table">
            <div className="logo-8-table">
              <h3 className="h3-table">
                tasty<span>twi$t</span>
              </h3>
            </div>
          </section>
        </div>
        <div className="header-table">
        <Link to="/orderpage">
            <button className="button-table">Take order</button>
          </Link>
          <Link to="/addMeals">
            <button className="button-table">Add Meals</button>
          </Link>
          <button className="button-table" onClick={logoutHandler}>
            Logout
          </button>
        </div>
        <div style={{ margin: "150px" }}>
          <table className="style_table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>No.</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Description</th>
                <th style={{ textAlign: "center" }}>Price($)</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <th scope="row" style={{ color: "white" }}>
                      {index + 1}
                    </th>
                    <td style={{ color: "white" }}>{item.name}</td>
                    <td style={{ color: "white" }}>{item.description}</td>
                    <td style={{ color: "white" }}>{item.price}</td>
                    <td>
                      <Link to={`/update/${item.id}`}>
                        <button className="btn-all btn-edit">Edit</button>
                      </Link>
                      <button
                        className="btn-all btn-delete"
                        onClick={() => deleteContent(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AdminHome;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminHome.css";
import { toast } from "react-toastify";

function OrderPage() {
  const [foodOrders, setFoodOrders] = useState([]);

  const loadOrder = async () => {
    const response = await axios.get("http://localhost:5000/api/orderPage");
    setFoodOrders(response.data);
  };
  useEffect(() => {
    loadOrder();
  }, []);

  const deleteOrder = (user_name) => {
    axios.delete(`http://localhost:5000/api/removeorder/${user_name}`);
    toast.success("Deleted Successfuly");
    setTimeout(() => loadOrder(), 500);
  };

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
      <div style={{ margin: "150px" }}>
        <table className="style_table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Ordered Items</th>
              <th style={{ textAlign: "center" }}>status</th>
            </tr>
          </thead>
          <tbody>
            {foodOrders.map((order, index) => {
              return (
                <tr key={index}>
                  <th scope="row" style={{ color: "white" }}>
                    {index + 1}
                  </th>
                  <td style={{ color: "white" }}>{order.user_name}</td>
                  <td style={{ color: "white" }}>{order.Order_Items}</td>
                  <td>
                    <button
                      className="btn-all btn-delete"
                      onClick={() => deleteOrder(order.user_name)}
                    >
                      Take Order
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

export default OrderPage;

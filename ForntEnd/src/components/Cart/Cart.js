import React, { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItems";
import CartContext from "../../store/Cart-context";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const navigate=useNavigate();

  const cartCxt = useContext(CartContext);

  const totalAmount = `$${cartCxt.totalAmount.toFixed(2)}`;
  const hasItems = cartCxt.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCxt.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCxt.addItem({ ...item, amount: 1 });
  };

  const handleAfterPlaceOrder = async () => {
    try {
      navigate("/home");
    } catch (error) {
      console.error("Error occurred while logging in:", error);
    }
  };
  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/orders", {
        cartItems: cartCxt.items,
        username: localStorage.getItem('username'),
      });
      if (response.status === 200) {
        handleAfterPlaceOrder();
        toast.success("Order Placed!!");
        console.log('Order placed successfully', response.data);
      }
    } catch (error) {
      console.error('Error placing the order', error);
    }
  };

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartCxt.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={handlePlaceOrder}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};
export default Cart;

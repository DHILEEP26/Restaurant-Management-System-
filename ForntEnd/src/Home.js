import React, {useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meal/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import { useNavigate } from "react-router-dom";
function Home() {
 const [cartShown,setcartShown]=useState(false);
 const authenticated = localStorage.getItem('authenticated') === 'true';
 
 const navigate=useNavigate();

 const cartShownHandler=()=>{
  setcartShown(true);
 }

 const cartCloseHandler=()=>{
  setcartShown(false);
 }


 if (!authenticated) {
    navigate('/login');
    return(<p>This page need Authentication!!</p>);
} else{
  return (
    <CartProvider>
      {cartShown && <Cart onClose={cartCloseHandler}/>}
      <Header onClick={cartShownHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

}

export default Home;
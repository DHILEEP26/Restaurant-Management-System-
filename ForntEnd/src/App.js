import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./UserLogin/logInPage";
import Home from "./Home";
import Register from "./UserLogin/Register";
import SelectionPage from "./SelectionPage/SelectionPage";
import AdminLoginPage from "./Admin/adminLoginPage";
import AdminHome from "./Admin/AdminHome";
import AddMeals from "./Admin/AddMeals";
import OrderPage from "./Admin/OrderPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" Component={SelectionPage} />
          <Route path="/adminLogin" Component={AdminLoginPage} />
          <Route path="/adminHome" Component={AdminHome} />
          <Route path="/addMeals" Component={AddMeals} />
          <Route path="/update/:id" Component={AddMeals} />
          <Route path="/orderpage" Component={OrderPage}/>
          <Route path="/Login" Component={Login} />
          <Route path="/home" Component={Home} />
          <Route path="/register" Component={Register} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

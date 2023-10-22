import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "./adminLoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleLogin = async () => {
    try {
      localStorage.setItem("adminauthenticated", "true");
      navigate("/adminHome");
    } catch (error) {
      console.error("Error occurred while logging in:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("Please provied the required value!");
    } else {
      if (
        !formData.username.includes("@") ||
        !formData.password.trim().length > 6
      ) {
        toast.error("Invalid Email Id and Password!!");
      } else {
        if (isSubmitting) {
          return;
        }
        localStorage.setItem("username", formData.username);

        try {
          setIsSubmitting(true);

          const response = await axios.post(
            "http://localhost:5000/api/adminlogin",
            formData
          );

          if (response.status === 200) {
            handleLogin();
            toast.success("Welcome!!");
          } else {
            if (response.status === 401) {
              toast.error("Authentication failed");
            }
          }
        } catch (error) {
          toast.error("Username or the password is incorrect", error);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  return (
    <Fragment>
      <div className="container-apage">
        <div className="title-container-apage">
          <section className="title-wrappers-apage">
            <div className="logo-8-apage">
              <h3 className="h3-apage">
                tasty<span>twi$t</span>
              </h3>
            </div>
          </section>
        </div>
        <div className="wrapper-apage">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box-a">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="input-box-a">
              <input
                type="text"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn">
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminLoginPage;

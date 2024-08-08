import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.name) {
      errors.name = "Required";
    }

    if (!formData.username) {
      errors.username = "Required";
    } else if (/\s/.test(formData.username)) {
      errors.username = "No spaces allowed";
    }

    if (!formData.password) {
      errors.password = "Required";
    } else if (
      formData.password.length < 8 ||
      !/[a-z]/.test(formData.password) ||
      !/[A-Z]/.test(formData.password) ||
      !/\d/.test(formData.password)
    ) {
      errors.password =
        "Password must be at least 8 characters long, contain at least one lowercase character, one uppercase character, one digit, and one special character";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Required";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords must match";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      console.log(formData);
      // Handle successful form submission here
      navigate("/");
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="container w-50 mt-5">
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group  ">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <div className="text-danger">{errors.username}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="text-danger">{errors.confirmPassword}</div>
          )}
        </div>
        <button type="submit" className="btn btn-dark w-25 mt-3">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;

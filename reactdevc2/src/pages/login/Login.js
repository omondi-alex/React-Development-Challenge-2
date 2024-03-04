import React, { useEffect, useState } from "react";
import "./login.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  username: yup.string("Enter your username").required("Username is required"),
  password: yup.string("Enter Password").required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { token, status, error } = useSelector((state) => state);
  const navigate = useNavigate();

  console.log("status", status);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      try {
        dispatch(loginUser(values));
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="login-page">
      <div className="loginFormWrapper">
        <h2>LOGIN TO ACCESS THIS ACCOUNT</h2>
        <form onSubmit={formik.handleSubmit} className="login-form">
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <TextField
              onChange={formik.handleChange}
              value={formik.values.username}
              type="text"
              name="username"
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              InputProps={{
                style: { color: "#172C53" },
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle sx={{ color: "#172C53" }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <TextField
              onChange={formik.handleChange}
              value={formik.values.password}
              type={showPassword ? "text" : "password"}
              name="password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                style: { color: "#172C53" },
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#172C53" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityOff sx={{ color: "#172C53" }} />
                      ) : (
                        <Visibility sx={{ color: "#172C53" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Button
            disabled={status === "loading"}
            className="login-btn"
            type="submit"
          >
            {status === "loading" ? "Please Wait ... " : "Sign in"}
          </Button>
          {error && (
            <div className="error-wrapper">
              <p>{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

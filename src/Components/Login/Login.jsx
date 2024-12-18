// src/components/Login.js
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./style.css";
import { url } from "../../url/url";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
// Function to check if the token is expired

const Login = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
    rememberMe: true,
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${url}/login`, {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("AccessToken", response.data.token);
      setData(response.data);
      navigate("/dashboard");
      toast.success("Logged in successfully");
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;

      toast.error(`Login failed: ${errorMessage.error}`);
      console.error("Login failed:", errorMessage);
    }
  };

  return (
    <>
      <main className="main-content mt-0">
        <div
          className="page-header align-items-start min-vh-100"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          <span className="mask bg-gradient-dark opacity-6"></span>
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-4 col-md-8 col-12 mx-auto">
                <div className="card z-index-0 fadeIn3 fadeInBottom">
                  <img
                    src="../../assets/img/TiwilLOGO 1.jpg"
                    className="main-imgg"
                  />
                  <div className="card-body">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {() => (
                        <Form role="form" className="text-start">
                          <p>Enter Your Email</p>
                          <div className="input-group input-group-outline my-2">
                            <Field
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Email"
                            />
                          </div>
                          <div className="password-validation">
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="error"
                            />
                          </div>

                          <p>Enter Your Password</p>
                          <div className="input-group input-group-outline mb-1">
                            <Field
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Password"
                            />
                          </div>
                          <div className="password-validation">
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="error"
                            />
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn bg-gradient-primary w-100 my-4 mb-2"
                            >
                              Sign in
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer position-absolute bottom-2 py-2 w-100"></footer>
        </div>
      </main>
    </>
  );
};

export default Login;







// const [modalShow, setModalShow] = useState(false);
// const handleShow = () => setModalShow(true);
// const handleClose = () => setModalShow(false);


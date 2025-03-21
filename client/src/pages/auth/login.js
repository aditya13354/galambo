import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import * as Styled from "./style";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import setAuthToken from "../../configs/setAuthToken";
import { useAppContext } from "../../context/AppContext";
import api from "../../configs/api";
import Logo from "../../assets/Logo.png";
import Input from "../../components/form/Input";

import isEmpty from "../../utils/isEmpty";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

const Login = () => {
  const [context, setContext] = useAppContext();
  const [isRemember, setRemember] = useState(false);
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = (
        await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        })
      ).data;

      api
        .post("/auth/google", userInfo)
        // .post("http://localhost:4000/auth/google", userInfo)

        .then((res) => {
          setAuthToken(res.data.token);
          window.dataLayer.push({ userId: res.data.user.id });
          setContext({
            ...context,
            auth: {
              token: res.data.token,
              user: res.data.user,
              isAuthenticated: true,
            },
            authModalOpen: false,
          });
        })
        .catch((error) => {
          if (error.response.data) {
            toast.error(error.response.data.user, { theme: "dark" });
          }
        });
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Formik
      initialValues={{
        email: email !== null ? email : "",
        password: password !== null ? password : "",
      }}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        if (isRemember) {
          localStorage.setItem("email", values.email);
          localStorage.setItem("password", values.password);
        }
        api
          .post("/auth/login", values)
          .then((res) => {
            window.dataLayer.push({ userId: res.data.user.id });
            setAuthToken(res.data.token);
            setContext({
              ...context,
              auth: {
                token: res.data.token,
                user: res.data.user,
                isAuthenticated: true,
              },
              authModalOpen: false,
            });
            setSubmitting(false);
          })
          .catch((error) => {
            if (error.response.data) {
              setErrors(error.response.data);
            }
            setSubmitting(false);
          });
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email must be a valid email.")
          .required("Enter a valid email address"),
        password: Yup.string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/(?=.*[0-9])/, "Password must contain a number."),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <Styled.LoginWrapper>
            <Helmet>
              <title>Login Page | Galambo</title>
              <meta name="description" content="Login page of galambo" />
              <link rel="canonical" href="https://www.galambo.com/login" />
            </Helmet>
            <Styled.LoginContent>
              <img itemProp="image" src={Logo} alt="logo" />
              <h1 itemProp="headline">Sign In</h1>

              <form onSubmit={handleSubmit}>
                <Styled.LoginForm>
                  <Input
                    label={"Email"}
                    placeholder="Enter your email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    className={errors.email && touched.email && "error"}
                    onBlur={handleBlur}
                    required={true}
                  />

                  <Input
                    label={"Password"}
                    placeholder="Enter your password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    className={errors.password && touched.password && "error"}
                    onBlur={handleBlur}
                    required={true}
                  />
                  {errors.email && touched.email && (
                    <Styled.RequireField>{errors.email}</Styled.RequireField>
                  )}
                  {errors.password && touched.password && (
                    <Styled.RequireField>{errors.password}</Styled.RequireField>
                  )}
                  {!isEmpty(errors.user) && (
                    <Styled.RequireField>{errors.user}</Styled.RequireField>
                  )}
                </Styled.LoginForm>
                <Styled.RememberContainer>
                  <input
                    type="checkbox"
                    id="02"
                    value={isRemember}
                    onClick={(e) => setRemember(e.target.checked)}
                  />
                  <label for="02"> Remember Me</label>
                </Styled.RememberContainer>
                <Link rel="canonical" to="/forgot">
                  <Styled.ForgotPassword>
                    Forgot Password?
                  </Styled.ForgotPassword>
                </Link>
                <Styled.Button
                  type="submit"
                  color="#7366EC"
                  className={
                    errors.email || errors.password ? "disalbe-login" : "login"
                  }
                >
                  Login
                </Styled.Button>
              </form>
              <Styled.SubContent>
                <hr />
                <span>OR</span>
                <hr />
              </Styled.SubContent>
              <Styled.GoogleAuthButton onClick={googleLogin}>
                <div>
                  <FcGoogle size={23} />
                </div>
                <span>Log in with Google</span>
              </Styled.GoogleAuthButton>
            </Styled.LoginContent>
          </Styled.LoginWrapper>
        );
      }}
    </Formik>
  );
};
export default Login;

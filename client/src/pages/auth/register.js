import React from "react";
import * as Styled from "./style";
import { Formik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import api from "../../configs/api";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useAppContext } from "../../context/AppContext";
import setAuthToken from "../../configs/setAuthToken";
import { toast } from "react-toastify";
import Logo from "../../assets/Logo.png";
import Input from "../../components/form/Input";
import { Helmet } from "react-helmet";
const Register = () => {
  const [context, setContext] = useAppContext();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = (
        await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        })
      ).data;
      await api
        .post("/auth/google/register", userInfo)
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((error) => {
          toast.error("User already exists.", { theme: "dark" });
        });
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", isActive: false }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        api
          .post("/auth/signup", values)
          .then((res) => {
            toast.success(res.data.message);
            setSubmitting(false);
          })
          .catch((error) => {
            console.error(error);
            setErrors({ email: "User already exists." });
            setSubmitting(false);
          });
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required("User Name is required")
          .min(4, "User Name is too short - should be 4 chars minimum."),
        email: Yup.string()
          .email("Email must be a valid email.")
          .required("Enter a valid email address"),
        password: Yup.string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/(?=.*[0-9])/, "Password must contain a number."),
        isActive: Yup.boolean().test(
          "isActive",
          "You must accept the terms and conditions",
          (value) => value === true
        ),
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
        console.log(errors);
        return (
          <Styled.LoginWrapper>
            <Helmet>
              <title>Register Page | Galambo</title>
              <meta name="description" content="Register page of galambo" />
              <link rel="canonical" href="https://www.galambo.com/register" />
            </Helmet>
            <Styled.LoginContent>
              <img itemProp="image" src={Logo} alt="logo" />
              <h1 itemProp="headline">Sign Up</h1>
              <form onSubmit={handleSubmit}>
                <Styled.LoginForm>
                  <Input
                    label={"Full Name"}
                    placeholder="Enter your full name"
                    name="name"
                    type="name"
                    value={values.name}
                    onChange={handleChange}
                    className={errors.name && touched.name && "error"}
                    onBlur={handleBlur}
                    required={true}
                  />

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
                  {errors.name && touched.name && (
                    <Styled.RequireField>{errors.name}</Styled.RequireField>
                  )}
                  {errors.password && touched.password && (
                    <Styled.RequireField>{errors.password}</Styled.RequireField>
                  )}
                </Styled.LoginForm>
                <Styled.TermsContent>
                  <input
                    type="checkbox"
                    name="isActive"
                    value={values.isActive}
                    onChange={handleChange}
                    className={errors.isActive && touched.isActive && "error"}
                    onBlur={handleBlur}
                    id="01"
                  />
                  <label
                    for="01"
                    className={
                      errors.isActive && touched.isActive && "error_txt"
                    }
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                    }}
                  >
                    I agree with{" "}
                    <Link rel="canonical" to="/term">
                      Terms of Use
                    </Link>{" "}
                    and{" "}
                    <Link rel="canonical" to="/privacy">
                      Privacy Policy
                    </Link>
                  </label>
                </Styled.TermsContent>
                <Styled.Button
                  color="#7366EC"
                  type="submit"
                  className={
                    errors.email || errors.password || errors.name
                      ? "disalbe-login"
                      : "login"
                  }
                >
                  Sign Up
                </Styled.Button>
              </form>
              <Styled.SubContent>
                <hr />
                <span>OR</span>
                <hr />
              </Styled.SubContent>
              <Styled.GoogleAuthButton onClick={googleLogin}>
                <div>
                  <FcGoogle size={30} />
                </div>
                <span>Sign up with Google</span>
              </Styled.GoogleAuthButton>
              {/* <Styled.FormFooter>
                <span>Already have an account?</span>
                <Link rel="canonical"to="/login">Login</Link>
              </Styled.FormFooter> */}
            </Styled.LoginContent>
          </Styled.LoginWrapper>
        );
      }}
    </Formik>
  );
};
export default Register;

import React from "react";
import * as Yup from "yup";
import * as Styled from "./style";
import Input from "../../components/form/Input";
import { Formik } from "formik";
import api from "../../configs/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Forgot() {
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values, { resetForm }) => {
        api
          // .post("https://api.galambo.com/api/forgot", {email})
          .post(`/api/forgot`, {
            email: values.email,
          })
          .then((res) => {
            toast.success("An email for resetting your password is sent!");
            resetForm();
          })
          .catch((error) => {
            if (error.response) {
              toast.error(error.response.data.user, { theme: "dark" });
            }
          });
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email must be a valid email.")
          .required("Enter a valid email address"),
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
          <form onSubmit={handleSubmit}>
            <Styled.StyledForgotContainer>
              <Helmet>
                <title>Forgot Password Page | Galambo</title>
                <meta name="description" content="Forgot password of galambo" />
                <link rel="canonical" href="https://www.galambo.com/forgot" />
              </Helmet>

              <span itemProp="headline">Forgot your password?</span>
              <p>
                Please enter your email address, and we’ll send you instructions
                to reset your password.
              </p>

              <Input
                label={""}
                placeholder="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                className={errors.email && touched.email && "error"}
                onBlur={handleBlur}
                required={true}
              />
              {errors.email && touched.email && (
                <Styled.RequireField>{errors.email}</Styled.RequireField>
              )}
              <button type="submit">Send Request</button>
              <Link rel="canonical" to="/login">
                Back
              </Link>
            </Styled.StyledForgotContainer>
          </form>
        );
      }}
    </Formik>
  );
}

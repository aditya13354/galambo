import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Styled from "./style";
import Input from "../../components/form/Input";
import { Formik } from "formik";
import api from "../../configs/api";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ password: "" }}
      onSubmit={(values) => {
        try {
          const response = api.post(`/api/reset-password`, {
            token,
            password: values.password,
          });
          toast.success("Password Reset Successfully");
          if (response) {
            navigate("/login");
          }
        } catch (error) {
          toast.success("An error occurred. Please try again.");
        }
      }}
      validationSchema={Yup.object().shape({
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
          <Styled.ResetContainer>
            <Helmet>
              <title>Forgot Password Page | Galambo</title>
              <meta
                name="description"
                content="Forgot Password page of galambo"
              />

              <link rel="canonical" href="https://www.galambo.com/reset" />
            </Helmet>
            <h1 itemProp="headline">Reset Password</h1>
            <form onSubmit={handleSubmit}>
              <Input
                label={""}
                placeholder="Enter your password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                className={errors.password && touched.password && "error"}
                onBlur={handleBlur}
                required={true}
              />
              {errors.password && touched.password && (
                <Styled.RequireField>{errors.password}</Styled.RequireField>
              )}
              <button type="submit">Submit</button>
            </form>
          </Styled.ResetContainer>
        );
      }}
    </Formik>
  );
};

export default ResetPassword;

import React, { useState } from "react";
import * as Styled from "./style";
import { Formik } from "formik";
import * as Yup from "yup";
import MainLogo from "../../assets/contact/main.png";
import question from "../../assets/contact/question.png";
import api from "../../configs/api";
import { contact_data } from "./data";
import isEmpty from "../../utils/isEmpty";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useAppContext } from "../../context/AppContext";

const Contact = () => {
  const [context] = useAppContext();

  return (
    <Formik
      initialValues={{
        name: context.auth ? context.auth.user.name : "",
        email: context.auth ? context.auth.user.email : "",
        topic: "",
        comments: "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        api
          .post(`/api/sendmail`, values)
          .then((res) => {
            if (res) {
              toast.success("Successfully submitted");
              if (context.auth) {
                resetForm({
                  name: context.auth.user.name,
                  email: context.auth.user.email,
                  topic: "",
                  comments: "",
                });
              } else {
                resetForm(); // Reset form values after successful submission
              }
            }
          })
          .catch((error) => {
            toast.error("Submission failed", { theme: "dark" });
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Full Name is required"),
        email: Yup.string()
          .email("Email must be a valid email.")
          .required("Enter a valid email address"),
        topic: Yup.string().required("Topic is required"),
        comments: Yup.string().required("Comments is required"),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          isValid,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <Styled.ContactContainer>
            <Helmet>
              <title>Contact Us - Galambo</title>
              <meta name="title" content="Contact Us - Galambo" />
              <meta
                name="description"
                content="Need assistance or have inquiries? Reach out to the Galambo team via our contact page. We’re here to support you."
              />

              <link rel="canonical" href="https://www.galambo.com/contact" />
            </Helmet>
            <form onSubmit={handleSubmit}>
              <Styled.ContactWrapper>
                <div>
                  <div>
                    <img itemProp="image" src={question} alt="question img" />
                  </div>
                  <img
                    itemProp="image"
                    src={MainLogo}
                    alt="logo img"
                    width={219}
                  />
                </div>
                <h1 itemProp="headline">CONTACT US</h1>
                <Styled.ContactForm>
                  <div style={{ width: "38%", marginTop: "15px" }}>
                    <Styled.ContactInput
                      width="100%"
                      placeholder="Name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      className={errors.name && touched.name && "error"}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name && (
                      <Styled.ErrorTxt>{errors.name}</Styled.ErrorTxt>
                    )}
                  </div>
                  <div style={{ width: "58%", marginTop: "15px" }}>
                    <Styled.ContactInput
                      width="100%"
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      className={errors.email && touched.email && "error"}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <Styled.ErrorTxt>{errors.email}</Styled.ErrorTxt>
                    )}
                  </div>
                </Styled.ContactForm>
                <Styled.ContactForm>
                  <div>
                    <Styled.ContactInput
                      placeholder="Topic"
                      name="topic"
                      type="text"
                      value={values.topic}
                      onChange={handleChange}
                      className={errors.topic && touched.topic && "error"}
                      onBlur={handleBlur}
                    />
                    {errors.topic && touched.topic && (
                      <Styled.ErrorTxt>{errors.topic}</Styled.ErrorTxt>
                    )}
                  </div>
                </Styled.ContactForm>
                <Styled.ContactForm>
                  <div>
                    <Styled.CommentView
                      placeholder="Comments"
                      name="comments"
                      type="text"
                      value={values.comments}
                      onChange={handleChange}
                      className={errors.comments && touched.comments && "error"}
                      onBlur={handleBlur}
                    />
                    {errors.comments && touched.comments && (
                      <Styled.ErrorTxt>{errors.comments}</Styled.ErrorTxt>
                    )}
                  </div>
                </Styled.ContactForm>

                {!isEmpty(errors) && (
                  <Styled.RequireField>* Required Fields</Styled.RequireField>
                )}

                <Styled.ContactForm
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "75px",
                  }}
                >
                  <Styled.SendBtn
                    type="submit"
                    disabled={!isValid || isSubmitting}
                  >
                    Send
                  </Styled.SendBtn>
                </Styled.ContactForm>
              </Styled.ContactWrapper>
            </form>
            <span>Find us on</span>
            <Styled.SocialView>
              {contact_data.map((item, key) => (
                <a rel="noreferrer" href={item.link} key={key} target="_blank">
                  <img itemProp="image" src={item.src} alt="find img" />
                </a>
              ))}
            </Styled.SocialView>
          </Styled.ContactContainer>
        );
      }}
    </Formik>
  );
};

export default Contact;

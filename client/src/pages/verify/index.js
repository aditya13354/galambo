import React, { useEffect, useState } from "react";
import * as Styled from "./style";
import verifyImg from "../../assets/verify.png";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../../components/form/Input";
import api from "../../configs/api";
export default function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        try {
          const response = await api.get(`/auth/verify/${token}`);
          if (response) {
            await toast.success(response.data.message);
            await navigate("/login");
          }
        } catch (error) {
          toast.error(error.response.data.message, { theme: "dark" });
        }
      };
      verifyToken();
    }
  }, []);
  const handleResendEmail = async () => {
    try {
      const response = await api.post(`/auth/resend-verification`, { email });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message, { theme: "dark" });
    }
  };
  const onSetEmail = (e) => {
    setEmail(e.target.value);
  };
  return (
    <Styled.VerifyContainter>
      <Helmet>
        <title>Verify Page | Galambo</title>
        <meta name="description" content="Verify page of galambo" />

        <link rel="canonical" href="https://www.galambo.com/verify" />
      </Helmet>
      <h1 itemProp="headline">Account</h1>
      <span>Check your email & click the link to activate your account.</span>
      <img
        itemProp="image"
        src={verifyImg}
        alt="verify img"
        width={195}
        height={154}
      />
      <Input
        label={""}
        placeholder="Enter your email"
        name="email"
        type="email"
        value={email}
        onChange={onSetEmail}
        required={true}
      />
      <button onClick={handleResendEmail}>Resend Email</button>
      <Link rel="canonical" to="/contact">
        <h6>Contact Support</h6>
      </Link>
    </Styled.VerifyContainter>
  );
}

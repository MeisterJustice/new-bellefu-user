import React from "react";
import { Container } from "react-bootstrap";
import HeaderNav from "../navigations/HeaderNav";
import RegistrationForm from "../user/RegisterationFrom";

export default function RegistrationFormPage() {
  return (
    <div>
      <HeaderNav />
      <Container>
        <div style={styles.form1} className="d-none d-lg-block  d-md-none">
          <RegistrationForm />
        </div>
        <div style={styles.form2} className="d-lg-none  d-xs-block d-sm-block d-md-block ">
          <RegistrationForm />
        </div>
      </Container>
    </div>
  );
}

const styles = {
  form1: {
    maxWidth: "500px",
    margin: "auto",
    marginTop: "10%",
  },
  form2: {
    maxWidth: "500px",
    margin: "auto",
    marginTop: "30%",
  },
};

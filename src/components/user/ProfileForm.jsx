import React, { useState } from "react";
import { Card, Form, Col, Row, Accordion, Button } from "react-bootstrap";
import { AiOutlineUser, AiOutlinePhone } from "react-icons/ai";
import { GiWorld } from "react-icons/gi";
import { FaRegAddressCard } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/actions/userActon";
import Axios from "axios";
import { useEffect } from "react";
import SnackBar from "../SnackBar/SnackBar";

export default function ProfileForm() {
  const dispatch = useDispatch();
  const [snack, setsnack] = useState({
    view: false,
    type: "",
    message: "",
  });
  const userSignin = useSelector((state) => state.userSignin);
  const { user } = userSignin;
  const [bio, setBio] = useState("");
  const [updateData, setUpdateData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    city_code: "",
    admin1_code: "",
    admin2_code: "",
    country_code: "",
    address: "",
    avatar: "",
  });

  useEffect(() => {
    setUpdateData({
      first_name: user.user.first_name,
      last_name: user.user.last_name,
      phone: user.user.phone,
      city_code: user.user.city_code,
      admin1_code: user.user.admin1_code,
      admin2_code: user.user.admin2_code,
      country_code: user.user.country_code,
      address: user.user.address,
    });

    setBio(user.user.bio);
  }, [user]);
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmmit = (event) => {
    event.preventDefault();
    Axios.post(
      "https://dev.bellefu.com/api/user/profile/update",
      { ...updateData, bio },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then(() => {
        setsnack({
          view: true,
          type: "success",
          message: "Profile update successful",
        });

        setTimeout(() => {
          setsnack({
            view: false,
            type: "",
            message: "",
          });
        }, 2800);
        setUpdateData({
          first_name: "",
          last_name: "",
          phone: "",
          city_code: "",
          admin1_code: "",
          admin2_code: "",
          country_code: "",
          bio: "",
          address: "",
          avatar: "",
        });
      })
      .catch((err) => {
        setsnack({
          view: true,
          type: "error",
          message: "Something went wrong, please try again! ",
        });

        setTimeout(() => {
          setsnack({
            view: false,
            type: "",
            message: "",
          });
        }, 2800);
      });
  };

  return (
    <div>
      {snack.view && <SnackBar type={snack.type}>{snack.message}</SnackBar>}
      <Form onSubmit={handleSubmmit}>
        <Card className="border-0">
          <Card.Header className="bg-white ">
            <AiOutlineUser className="mr-3" style={styles.icon} />
            <b style={{ opacity: "0.7" }}>My Details</b>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Label style={styles.label}>First Name</Form.Label>
                <div class="input-group mb-3 shadow-none" style={{ height: "50px" }}>
                  <div className="input-group-prepend">
                    <span class="input-group-text">
                      <AiOutlineUser />
                    </span>
                  </div>
                  <Form.Control
                    placeholder="First Name"
                    value={updateData.first_name}
                    name="first_name"
                    onChange={handleOnChange}
                    style={{ height: "50px", boxShadow: "none" }}
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Label style={styles.label}>Last Name</Form.Label>
                <div class="input-group mb-3 shadow-none" style={{ height: "50px" }}>
                  <div className="input-group-prepend">
                    <span class="input-group-text">
                      <AiOutlineUser />
                    </span>
                  </div>

                  <Form.Control
                    placeholder="Last Name"
                    value={updateData.last_name}
                    name="last_name"
                    onChange={handleOnChange}
                    style={{ height: "50px", boxShadow: "none" }}
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Label style={styles.label}>Phone Number</Form.Label>
                <div className="input-group mb-3 shadow-none" style={{ height: "50px" }}>
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <AiOutlinePhone />
                    </span>
                  </div>

                  <Form.Control
                    placeholder="Phone Number"
                    value={updateData.phone}
                    name="phone"
                    onChange={handleOnChange}
                    style={{ height: "50px", boxShadow: "none" }}
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Label style={styles.label}>Admin Code 1</Form.Label>
                <div className="input-group mb-3 shadow-none" style={{ height: "50px" }}>
                  <div class="input-group-prepend">
                    <span class="input-group-text"></span>
                  </div>

                  <Form.Control
                    placeholder="Admin Code 1"
                    value={updateData.admin1_code}
                    name="admin1_code"
                    onChange={handleOnChange}
                    style={{ height: "50px", boxShadow: "none" }}
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Label style={styles.label}>Admin Code 2</Form.Label>
                <div className="input-group mb-3 shadow-none" style={{ height: "50px" }}>
                  <div class="input-group-prepend">
                    <span class="input-group-text"></span>
                  </div>

                  <Form.Control
                    placeholder="Admin Code 2"
                    value={updateData.admin2_code}
                    name="admin2_code"
                    onChange={handleOnChange}
                    style={{ height: "50px", boxShadow: "none" }}
                  />
                </div>
              </Col>

              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Label style={styles.label}>City Code</Form.Label>
                <div className="input-group mb-3 shadow-none" style={{ height: "50px" }}>
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <GiWorld />
                    </span>
                  </div>

                  <Form.Control
                    placeholder="City Code"
                    value={updateData.city_code}
                    name="city_code"
                    onChange={handleOnChange}
                    style={{ height: "50px", boxShadow: "none" }}
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Label style={styles.label}>Country Code</Form.Label>
                <div className="input-group mb-3 shadow-none" style={{ height: "50px" }}>
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <GiWorld />
                    </span>
                  </div>

                  <Form.Control
                    placeholder="Country Code"
                    value={updateData.country_code}
                    name="country_code"
                    onChange={handleOnChange}
                    style={{ height: "50px", boxShadow: "none" }}
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Label style={styles.label}>Address</Form.Label>
                <div className="input-group mb-3 shadow-none" style={{ height: "50px" }}>
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <FaRegAddressCard />
                    </span>
                  </div>

                  <Form.Control
                    placeholder="Address"
                    value={updateData.address}
                    name="address"
                    onChange={handleOnChange}
                    style={{ height: "50px", boxShadow: "none" }}
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Form.Label style={styles.label}>About Me</Form.Label>
                <ReactQuill value={bio} onChange={setBio} name="bio" row="3" style={{ height: "300px", marginBottom: "100px" }} />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Form.Label style={styles.label} className="mr-3">
                  Upload Image
                </Form.Label>
                <div uk-form-custom="target: true">
                  <input
                    onChange={(e) => {
                      setUpdateData((prev) => ({
                        ...prev,
                        avatar: e.target.files[0],
                      }));
                    }}
                    type="file"
                  />
                  <input class="uk-input uk-form-width-medium" name="avatar" type="text" placeholder="Select file" disabled />
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <div>
          <Card className="border-0 mt-4">
            <Card.Body>
              <Accordion>
                <Card className="border-0 mt-4">
                  <Card.Header style={{ backgroundColor: "white" }}>
                    <Row>
                      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <p style={{ opacity: "0.7" }}>Notify me by e-mail when a ad gets posted that is relevant to my choice</p>
                      </Col>
                      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Accordion.Toggle style={styles.btn} as={Button} variant="outline-warning" eventKey="0">
                          Subscribe Now
                        </Accordion.Toggle>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Form.Check type="checkbox" id="autoSizingCheck2" label="Agro tools" style={styles.check} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              <Button type="submit" style={styles.btnUpdate} variant="warning" size="sm">
                Update
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Form>
    </div>
  );
}

const styles = {
  icon: {
    color: "#ffa500",
    fontSize: "20px",
  },
  label: {
    opacity: "0.6",
    fontSize: "0.9em",
  },
  btnUpdate: {
    marginTop: "10px",
    backgroundColor: "#ffa500",
    border: "none",
    color: "white",
  },
  btn: {
    backgroundColor: " white",
    color: "#ffa500",
  },
  check: {
    color: "#ffa500",
  },
  btnUpdate: {
    marginTop: "10px",
    backgroundColor: "#ffa500",
    border: "none",
    color: "white",
    fontSize: "15px",
    width: "100px",
    height: "40px",
  },
};

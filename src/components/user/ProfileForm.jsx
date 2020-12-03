import React, { useState } from "react";
import { Card, Form, Col, Row, Accordion, Button } from "react-bootstrap";
import { AiOutlineUser, AiOutlinePhone, AiOutlineUpload } from "react-icons/ai";
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
import Preloader from "./Preloader";

export default function ProfileForm(props) {
  const [loading, setLoading] = useState(false);
  const [snack, setsnack] = useState({
    view: false,
    type: "",
    message: "",
  });
  const [drop, setDrop] = useState({
    country: [],
    state: [],
    city: [],
  });
  const userSignin = useSelector((state) => state.userSignin);
  const { user } = userSignin;
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [updateData, setUpdateData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    admin1_code: "",
    admin2_code: "",
    country_code: "",
    address: "",
  });

  const [text, setText] = useState([
    "My Details",
    "First Name",
    "Last Name",
    "Phone Number",
    "do not add country code",
    "State",
    "Local Government",
    "City",
    "Country",
    "Address",
    "About Me",
    "Upload Profile Photo",
    "Select An Image",
    "Notify me by e-mail when a ad gets posted that is relevant to my choice",
    "Subscribe Now",
    "Update",
  ]);
  const [originalText, setOriginalText] = useState([
    "My Details",
    "First Name",
    "Last Name",
    "Phone Number",
    "do not add country code",
    "State",
    "Local Government",
    "City",
    "Country",
    "Address",
    "About Me",
    "Upload Profile Photo",
    "Select An Image",
    "Notify me by e-mail when a ad gets posted that is relevant to my choice",
    "Subscribe Now",
    "Update",
  ]);



  const handleOnChange = (event) => {
    const { name, value } = event.target;

    if (name === "admin1_code") {
      const url = `https://bellefu.com/api/${updateData.country_code}/${updateData.admin1_code}/lga/list`;
      Axios.get(url).then((res) => {
        setDrop((prev) => ({ ...prev, city: res.data.lgas }));
      });
    }
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Country Effect
  useEffect(() => {
    const url = "https://bellefu.com/api/country/list";
    setUpdateData((prev) => ({ ...prev, admin2_code: "", admin1_code: "" }));

    Axios.get(url).then((res) => {
      setDrop((prev) => ({ ...prev, country: res.data.countries }));
    });
  }, []);
  //State Effect
  useEffect(() => {
    const url = `https://bellefu.com/api/${updateData.country_code}/state/list`;
    setUpdateData((prev) => ({ ...prev, admin2_code: "" }));

    Axios.get(url).then((res) => {
      setDrop((prev) => ({ ...prev, state: res.data.states }));
    });
  }, [updateData.country_code, drop.country, user]);
  // City Effect
  useEffect(() => {
    const url = `https://bellefu.com/api/${updateData.country_code}/${updateData.admin1_code}/lga/list`;
    Axios.get(url).then((res) => {
      setDrop((prev) => ({ ...prev, city: res.data.lgas }));
    });
  }, [updateData.admin1_code, updateData.country_code, drop.state, user]);

	let url1 = 'https://bellefu.com/api/user/profile/details';


  useEffect(() => {
    Axios.get(url1, {
			headers: {
				Authorization: `Bearer ${user.token}`,
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		}).then((res) => {
      setLoading(false)
      console.log(res.data.user)
        setUpdateData({
          first_name: res.data.user.profile.first_name,
          last_name: res.data.user.profile.last_name,
          phone: res.data.user.phone,
          city_code: res.data.user.city_code,
          admin1_code: res.data.user.admin1_code,
          admin2_code: res.data.user.admin2_code,
          country_code: res.data.user.country_code,
          address: res.data.user.address,
        });
        setAvatar(res.data.user.avatar);
        setBio(res.data.user.bio);
      })
  }, [])

  const handleSubmmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const payload = new FormData();
    payload.append("first_name", updateData.first_name);
    payload.append("last_name", updateData.last_name);
    payload.append("admin1_code", updateData.admin1_code);
    payload.append("phone", updateData.phone);
    payload.append("admin2_code", updateData.admin2_code);
    payload.append("country_code", updateData.country_code);
    payload.append("address", updateData.address);
    payload.append("bio", bio);
    payload.append("avatar", avatar);

    Axios.post("https://bellefu.com/api/user/profile/update", payload, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => {
        setLoading(false);
        if(bio !== ""){
          setsnack({
            view: true,
            type: "success",
            message: "Profile updated successfully",

          });
        } else {
          setsnack({
            view: true,
            type: "success",
            message: "Profile updated successfully....Profile photo might take a while to update on the site",

          });
        }

        setTimeout(() => {
          setsnack({
            view: false,
            type: "",
            message: "",
          });
        }, 3800);
      })
      .catch((err) => {
        setLoading(false);
        setsnack({
          view: true,
          type: "error",
          message: "All fields are required! ",
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
      {loading && (
        <div style={{ height: "100vh", width: "100%" }}>
          <Preloader />
        </div>
      )}
      {snack.view && <SnackBar type={snack.type}>{snack.message}</SnackBar>}
      <Form onSubmit={handleSubmmit}>
        <Card className="border-0">
          <Card.Header className="bg-white ">
            <AiOutlineUser className="mr-3" style={styles.icon} />
            <b style={{ opacity: "0.7" }}>{text[0]}</b>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Label style={styles.label}>{text[1]}</Form.Label>
                <div class="input-group mb-3 shadow-none" style={{ height: "50px" }}>
                  <div className="input-group-prepend">
                    <span class="input-group-text">
                      <AiOutlineUser />
                    </span>
                  </div>
                  <Form.Control
                    placeholder={text[1]}
                    value={updateData.first_name}
                    name="first_name"
                    onChange={handleOnChange}
                    style={{ height: "50px", boxShadow: "none" }}
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Label style={styles.label}>{text[2]}</Form.Label>
                <div class="input-group mb-3 shadow-none" style={{ height: "50px" }}>
                  <div className="input-group-prepend">
                    <span class="input-group-text">
                      <AiOutlineUser />
                    </span>
                  </div>

                  <Form.Control
                    placeholder={text[2]}
                    value={updateData.last_name}
                    name="last_name"
                    onChange={handleOnChange}
                    style={{ height: "50px", boxShadow: "none" }}
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Label style={styles.label}>
                  {text[3]} ({text[4]})
                </Form.Label>
                <div className="input-group mb-3 shadow-none" style={{ height: "50px" }}>
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <AiOutlinePhone />
                    </span>
                  </div>

                  <Form.Control
                    placeholder={text[3]}
                    value={updateData.phone}
                    name="phone"
                    onChange={handleOnChange}
                    style={{ height: "50px", boxShadow: "none" }}
                  />
                </div>
              </Col>

              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Label style={styles.label}>{text[8]}</Form.Label>
                <div className="input-group mb-3 shadow-none" style={{ height: "50px" }}>
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <GiWorld />
                    </span>
                  </div>

                  <Form.Control
                    as="select"
                    placeholder={text[8]}
                    value={updateData.country_code}
                    name="country_code"
                    onChange={handleOnChange}
                    style={{ height: "50px", boxShadow: "none" }}
                  >
                    <option selected disabled value={null}>
                      Select Your Country
                    </option>
                    {drop.country.map((item, key) => (
                      <option key={key} value={item.iso2}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Control>
                </div>
              </Col>

              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Label style={styles.label}>{text[5]}</Form.Label>
                <div className="input-group mb-3 shadow-none" style={{ height: "50px" }}>
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <GiWorld />
                    </span>
                  </div>

                  <Form.Control
                    as="select"
                    placeholder={text[7]}
                    value={updateData.admin1_code}
                    name="admin1_code"
                    onChange={handleOnChange}
                    style={{ height: "50px", boxShadow: "none" }}
                  >
                    <option selected disabled value={null}>
                      Select Your State
                    </option>
                    {drop.state.map((item, key) => (
                      <option key={key} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Control>
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form.Label style={styles.label}>{text[7]}</Form.Label>
                <div className="input-group mb-3 shadow-none" style={{ height: "50px" }}>
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <GiWorld />
                    </span>
                  </div>

                  <Form.Control
                    as="select"
                    value={updateData.admin2_code}
                    name="admin2_code"
                    onChange={handleOnChange}
                    style={{ height: "50px", boxShadow: "none" }}
                  >
                    <option selected disabled value={null}>
                      Select Your City
                    </option>
                    {drop.city.map((item, key) => (
                      <option key={key} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Control>
                </div>
              </Col>
              <Col xs={12} sm={12}>
                <Form.Label style={styles.label}>{text[9]}</Form.Label>
                <div className="input-group mb-3 shadow-none" style={{ height: "50px" }}>
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <FaRegAddressCard />
                    </span>
                  </div>

                  <Form.Control
                    placeholder={text[9]}
                    value={updateData.address}
                    name="address"
                    onChange={handleOnChange}
                    style={{ height: "50px", boxShadow: "none" }}
                  />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Form.Label style={styles.label}>{text[10]}</Form.Label>
                <ReactQuill value={bio} onChange={setBio} name="bio" row="3" style={{ height: "300px", marginBottom: "100px" }} />
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Form.Label style={styles.label} className="mr-3">
                  {text[11]}
                </Form.Label>
                <div uk-form-custom="target: true">
                  <label
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#eee",
                      border: "1px solid #666",
                      borderRadius: "4px",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      style={{ display: "none" }}
                      type="file"
                      name="avatar"
                      onChange={(event) => {
                        const { files } = event.target;
                        setAvatar(files[0]);
                      }}
                    />
                    {avatar === "" || avatar === null ? (
                      <>
                        {text[12]} <AiOutlineUpload style={{ fontSize: 24, marginLeft: 10 }} />
                      </>
                    ) : (
                        avatar.name
                      )}
                  </label>
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

                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Form.Check type="checkbox" id="autoSizingCheck2" label="Agro tools" style={styles.check} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              <Button type="submit" style={styles.btnUpdate} variant="warning" size="sm">
                {text[15]}
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

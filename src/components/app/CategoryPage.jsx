import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Container, Accordion, OverlayTrigger, Badge, Tooltip, Button } from "react-bootstrap";
import { AiFillHeart } from "react-icons/ai";
import { BsArrowLeftRight } from "react-icons/bs";
// import Fillter from "../fillter/Fillter";
import HeaderNav from "../navigations/HeaderNav";
import BottomNav from "../navigations/BottomNav";
// import Items from "../fillter/Items";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiSettingsKnobs } from "react-icons/gi";
import Preloader from "../user/Preloader";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
const queryString = require("query-string");

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (convert)
const convertTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    convert currency
  </Tooltip>
);

//==FUNCTION FOR LIKE AND UNLIKE BUTTON
const Switch = (e) => {
  if (e.target.style.color === "#ffa500") {
    e.target.style.color = "red";
  } else if (e.target.style.color === "red") {
    e.target.style.color = "#ffa500";
  } else {
    e.target.style.color = "red";
  }
};

export default function CategoryPage() {
  // ========FOR FITER FROM STATE AND FUNCTION START HERE ==================================//
  const [filterData, setFilterData] = useState({
    min_price: "",
    country: "",
    max_price: "",
    subcategory: "",
    category: "",
    plan: "",
    sort: "",
  });
  const { min_price, country, max_price, subcategory, category, plan, sort } = filterData;
  const onChangeHandler = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
    loadSubCategory();
  };

  const onSubmitHandle = (e) => {
    loadFilterData();
    e.preventDefault();
    console.log(filterData.category);
  };
  // ========FOR FITER FROM  STATE AND FUNCTION END HERE ==================================//

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [productsData, setProductsData] = useState([]);

  let dataUrl = "";
  let apiUrl = "https://dev.bellefu.com/api/product/list";

  let location = useLocation();
  const parsed = queryString.parse(location.search);

  let filterString = "";

  const loadFilterData = () => {
    filterString = new URLSearchParams(filterData).toString();
    dataUrl = apiUrl + "?" + filterString;
    loadData(1);
  };
  const loadData = (page = 1) => {
    setLoading(true);
    axios
      .get(`${dataUrl}&page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        setLoading(false);
        setProductsData(res.data.products.data);
        setError("");
      })
      .catch((error) => {
        setLoading(false);
        setError("Something went worng");
        console.log(error);
      });
  };

  // ==============CATEGORY LIST STATE =========

  const [categoryData, setCategoryData] = useState([]);
  const loadCategory = () => {
    axios
      .get("https://dev.bellefu.com/api/category/list", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        setCategoryData(res.data.categories.data);
        setError("");
      })
      .catch((error) => {
        setError("Something went worng");
        console.log(error);
      });
  };

  // ==============SUBCATEGORY LIST STATE =========

  const [subcategoryData, setSubCategoryData] = useState([]);
  const [notShow, setNotShow] = useState(true);
  const loadSubCategory = () => {
    axios
      .get(`https://dev.bellefu.com/api/subcategory/listfor/${filterData.category}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        setSubCategoryData(res.data.subcategories.data);
        setNotShow(false);
        setError("");
      })
      .catch((error) => {
        setError("Something went worng");
        console.log(error);
      });
  };

  useEffect(
    () => {
      if (parsed.plan) {
        setFilterData(parsed);
      }

      if (parsed.country) {
        setFilterData(parsed);
      }
      if (parsed.subcategory) {
        setFilterData(parsed);
      }
      if (parsed.category) {
        setFilterData(parsed);
      }
      if (parsed.sort) {
        setFilterData(parsed);
      }
      if (parsed.min_price) {
        setFilterData(parsed);
      }
      if (parsed.max_price) {
        setFilterData(parsed);
      }

      loadFilterData();
      loadCategory();
    },
    [productsData.length],
    [categoryData],
    [subcategoryData]
  );
  return (
    <div>
      <HeaderNav />
      <Container>
        <Row>
          <Col lg={3} md={12} xs={12} sm={12} style={{ paddingLeft: "3px", paddingRight: "3px" }}>
            <div style={{ marginTop: "100px" }}>
              {/* ======FOR DESKTOP FILLTER====== */}
              <div className="d-none d-lg-block  d-md-none">
                <Form onSubmit={onSubmitHandle}>
                  <Card className="border-0">
                    <Container>
                      <Form.Group>
                        <Form.Label className="mt-3" style={{ opacity: "0.4", fontSize: "0.8em" }}>
                          <b>Category</b>
                        </Form.Label>
                        <div>
                          <select
                            class="uk-select  "
                            name="category"
                            id="category"
                            value={category}
                            onChange={(e) => onChangeHandler(e)}
                            onClick={(e) => onChangeHandler(e)}
                          >
                            <option>select category</option>
                            {categoryData.map((data) => (
                              <option key={data.slug} value={data.slug} selected={category === data.slug ? true : false}>
                                {data.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="mt-3" style={{ opacity: "0.4", fontSize: "0.8em" }}>
                          <b>Subcategory</b>
                        </Form.Label>
                        <div>
                          <select
                            class="uk-select  "
                            name="subcategory"
                            id="subcategory"
                            value={subcategory}
                            onChange={(e) => onChangeHandler(e)}
                            disabled={notShow}
                          >
                            <option>select subcategory</option>
                            {subcategoryData.map((data) => (
                              <option key={data.slug} value={data.slug} selected={subcategory === data.slug ? true : false}>
                                {data.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="mt-3" style={{ opacity: "0.4", fontSize: "0.8em" }}>
                          <b>Plan</b>
                        </Form.Label>
                        <div>
                          <select class="uk-select  " name="plan" value={plan} onChange={(e) => onChangeHandler(e)}>
                            <option>select plan</option>
                            <option value="free" selected={subcategory === "free" ? true : false}>
                              Free
                            </option>
                            <option value="urgent" selected={subcategory === "urgent" ? true : false}>
                              Urgent
                            </option>
                            <option value="featured" selected={subcategory === "featured" ? true : false}>
                              Featured
                            </option>
                            <option value="higlighted" selected={subcategory === "higlighted" ? true : false}>
                              Higlighted
                            </option>
                          </select>
                        </div>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label style={{ opacity: "0.4", fontSize: "0.8em" }}>
                          <b>Price</b>
                        </Form.Label>
                        <Row>
                          <Col xs={6} sm={6}>
                            <Form.Control
                              onFocus={inputFocus}
                              type="number"
                              min="0"
                              placeholder="Min Price"
                              name="min_price"
                              value={min_price}
                              onChange={(e) => onChangeHandler(e)}
                            />
                          </Col>
                          <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Form.Control
                              onFocus={inputFocus}
                              placeholder="Price max"
                              type="number"
                              min="0"
                              name="max_price"
                              value={max_price}
                              onChange={(e) => onChangeHandler(e)}
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group>
                        <Button style={styles.btn} variant="warning" size="lg" block type="button" onClick={onSubmitHandle}>
                          <b>Appy Filter</b>
                        </Button>
                      </Form.Group>
                    </Container>
                  </Card>
                </Form>
              </div>

              {/* ======FOR MOBILE FILLTER====== */}
              <div className=" d-lg-none  d-xs-block d-sm-block d-mb-block ">
                <Accordion>
                  <Accordion.Toggle as={Card.Header} style={{ backgroundColor: "white", marginLeft: "0px" }} eventKey="0">
                    <Row type="button">
                      <Col xs={2} sm={2}>
                        <GiSettingsKnobs style={{ color: "#ffa500", fontSize: "30px" }} />
                      </Col>
                      <Col xs={8} sm={8}>
                        <label className="mr-1" style={{ fontSize: "0.9em" }}>
                          <b style={{ opacity: "0.7" }}>Filter Search</b>
                        </label>
                      </Col>
                      <Col xs={2} sm={2}>
                        <IoMdArrowDropdown style={{ color: "#ffa500", fontSize: "30px" }} />
                      </Col>
                    </Row>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <Form onSubmit={onSubmitHandle}>
                        <Card className="border-0">
                          <Container>
                            <Form.Group>
                              <Form.Label className="mt-3" style={{ opacity: "0.4", fontSize: "0.8em" }}>
                                <b>Category</b>
                              </Form.Label>
                              <div>
                                <select
                                  class="uk-select  "
                                  name="category"
                                  id="category"
                                  value={category}
                                  onChange={(e) => onChangeHandler(e)}
                                  onClick={(e) => onChangeHandler(e)}
                                >
                                  <option>---select category---</option>
                                  {categoryData.map((data) => (
                                    <option key={data.slug} value={data.slug} selected={category === data.slug ? true : false}>
                                      {data.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Form.Group>
                            <Form.Group>
                              <Form.Label className="mt-3" style={{ opacity: "0.4", fontSize: "0.8em" }}>
                                <b>Subcategory</b>
                              </Form.Label>
                              <div>
                                <select
                                  class="uk-select  "
                                  name="subcategory"
                                  id="subcategory"
                                  value={subcategory}
                                  onChange={(e) => onChangeHandler(e)}
                                  disabled={notShow}
                                >
                                  <option>---select subcategory---</option>
                                  {subcategoryData.map((data) => (
                                    <option key={data.slug} value={data.slug} selected={subcategory === data.slug ? true : false}>
                                      {data.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Form.Group>
                            <Form.Group>
                              <Form.Label className="mt-3" style={{ opacity: "0.4", fontSize: "0.8em" }}>
                                <b>Plan</b>
                              </Form.Label>
                              <div>
                                <select class="uk-select  " name="plan" value={plan} onChange={(e) => onChangeHandler(e)}>
                                  <option>select plan</option>
                                  <option value="free" selected={subcategory === "free" ? true : false}>
                                    Free
                                  </option>
                                  <option value="urgent" selected={subcategory === "urgent" ? true : false}>
                                    Urgent
                                  </option>
                                  <option value="featured" selected={subcategory === "featured" ? true : false}>
                                    Featured
                                  </option>
                                  <option value="higlighted" selected={subcategory === "higlighted" ? true : false}>
                                    Higlighted
                                  </option>
                                </select>
                              </div>
                            </Form.Group>
                            <Form.Group>
                              <Form.Label style={{ opacity: "0.4", fontSize: "0.8em" }}>
                                <b>Price</b>
                              </Form.Label>
                              <Row>
                                <Col xs={6} sm={6}>
                                  <Form.Control
                                    onFocus={inputFocus}
                                    type="number"
                                    min="0"
                                    placeholder="Min Price"
                                    name="min_price"
                                    value={min_price}
                                    onChange={(e) => onChangeHandler(e)}
                                  />
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                  <Form.Control
                                    onFocus={inputFocus}
                                    placeholder="Price max"
                                    type="number"
                                    min="0"
                                    name="max_price"
                                    value={max_price}
                                    onChange={(e) => onChangeHandler(e)}
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                            <Form.Group>
                              <Button style={styles.btn} variant="warning" size="lg" block type="button" onClick={onSubmitHandle}>
                                <b>Appy Filter</b>
                              </Button>
                            </Form.Group>
                          </Container>
                        </Card>
                      </Form>
                    </Card.Body>
                  </Accordion.Collapse>
                </Accordion>
              </div>
            </div>
          </Col>
          <Col lg={9} md={12} xs={12} sm={12}>
            {/* =========FOR ITEM DESKTOPEVIEW======= */}
            <div style={{ marginTop: "100px" }} className="d-none d-lg-block  d-md-none">
              <Row>
                {loading ? (
                  <Preloader />
                ) : (
                  productsData.map((data) => (
                    <Col key={data.slug} xs={6} sm={6} md={3} lg={3} xl={3} className=" my-1 px-1">
                      <Card className="border-0 rounded-lg">
                        <Card.Img style={styles.image} variant="top" src={`https://dev.bellefu.com/images/products/${data.slug}/${data.images[0]}`} />

                        <Card.ImgOverlay style={{ marginTop: "-15px" }}>
                          <Row>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                              <Badge
                                variant="danger"
                                className={`${
                                  data.plan === "free"
                                    ? "d-none"
                                    : "d-block" || data.plan === "featured"
                                    ? "d-none"
                                    : "d-block" || data.plan === "higlighted"
                                    ? "d-none"
                                    : "d-block" || data.plan === "Ugent"
                                    ? "d-block"
                                    : "d-none"
                                }`}
                              >
                                Ugent
                              </Badge>
                              <Badge
                                variant="warning"
                                className={`${
                                  data.plan === "free"
                                    ? "d-none"
                                    : "d-block" || data.plan === "ugent"
                                    ? "d-none"
                                    : "d-block" || data.plan === "higlighted"
                                    ? "d-none"
                                    : "d-block" || data.plan === "Featured"
                                    ? "d-block"
                                    : "d-none"
                                }`}
                              >
                                Featured
                              </Badge>
                              <Badge
                                variant="success"
                                className={`${
                                  data.plan === "free"
                                    ? "d-none"
                                    : "d-block" || data.plan === "ugent"
                                    ? "d-none"
                                    : "d-block" || data.plan === "featured"
                                    ? "d-none"
                                    : "d-block" || data.plan === "Higlighted"
                                    ? "d-block"
                                    : "d-none"
                                }`}
                              >
                                Higlighted
                              </Badge>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                              <AiFillHeart onClick={Switch} style={styles.favBtn} />
                            </Col>
                          </Row>
                        </Card.ImgOverlay>

                        <Card.Body style={styles.titleBody}>
                          <Link
                            to={{
                              pathname: `/product_detail/${data.slug}`,
                              state: data.slug,
                            }}
                            style={{
                              color: "inherit",
                              textDecoration: "inherit",
                            }}
                          >
                            <p style={styles.title}>{data.title}</p>
                          </Link>

                          <span className="mr-1 ml-1 " style={styles.price}>
                            {data.currency_symbol}
                            {data.price}
                          </span>

                          <OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={convertTooltip}>
                            <BsArrowLeftRight
                              className=" ml-1"
                              style={{
                                fontSize: "0.9em",
                                cursor: "pointer",
                                fontSize: "20px",
                                color: "#ffa500",
                              }}
                            />
                          </OverlayTrigger>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            </div>
            {/* =========FOR ITEM MOBILEVIEW======= */}
            <div style={{ marginTop: "15px" }} className="d-lg-none d-xs-block d-sm-block d-md-block">
              <Row>
                {loading ? (
                  <Preloader />
                ) : (
                  productsData.map((data) => (
                    <Col key={data.slug} xs={6} sm={6} md={3} lg={3} xl={3} className=" my-1 px-1">
                      <Card className="border-0 rounded-lg">
                        <Card.Img style={styles.image} variant="top" src={`https://dev.bellefu.com/images/products/${data.slug}/${data.images[0]}`} />

                        <Card.ImgOverlay style={{ marginTop: "-15px" }}>
                          <Row>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                              <Badge
                                variant="danger"
                                className={`${
                                  data.plan === "free"
                                    ? "d-none"
                                    : "d-block" || data.plan === "featured"
                                    ? "d-none"
                                    : "d-block" || data.plan === "higlighted"
                                    ? "d-none"
                                    : "d-block" || data.plan === "Ugent"
                                    ? "d-block"
                                    : "d-none"
                                }`}
                              >
                                Ugent
                              </Badge>
                              <Badge
                                variant="warning"
                                className={`${
                                  data.plan === "free"
                                    ? "d-none"
                                    : "d-block" || data.plan === "ugent"
                                    ? "d-none"
                                    : "d-block" || data.plan === "higlighted"
                                    ? "d-none"
                                    : "d-block" || data.plan === "Featured"
                                    ? "d-block"
                                    : "d-none"
                                }`}
                              >
                                Featured
                              </Badge>
                              <Badge
                                variant="success"
                                className={`${
                                  data.plan === "free"
                                    ? "d-none"
                                    : "d-block" || data.plan === "ugent"
                                    ? "d-none"
                                    : "d-block" || data.plan === "featured"
                                    ? "d-none"
                                    : "d-block" || data.plan === "Higlighted"
                                    ? "d-block"
                                    : "d-none"
                                }`}
                              >
                                Higlighted
                              </Badge>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                              <AiFillHeart onClick={Switch} style={styles.favBtn} />
                            </Col>
                          </Row>
                        </Card.ImgOverlay>

                        <Card.Body style={styles.titleBody}>
                          <Link
                            to={{
                              pathname: `/product_detail/${data.slug}`,
                              state: data.slug,
                            }}
                            style={{
                              color: "inherit",
                              textDecoration: "inherit",
                            }}
                          >
                            <p style={styles.title}>{data.title}</p>
                          </Link>

                          <span className="mr-1 ml-1 " style={styles.price}>
                            {data.currency_symbol}
                            {data.price}
                          </span>

                          <OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={convertTooltip}>
                            <BsArrowLeftRight
                              className=" ml-1"
                              style={{
                                fontSize: "0.9em",
                                cursor: "pointer",
                                fontSize: "20px",
                                color: "#ffa500",
                              }}
                            />
                          </OverlayTrigger>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <BottomNav />
    </div>
  );
}

const styles = {
  image: {
    height: "150px",
    padding: "5px",
    borderRadius: "10px",
  },
  title: {
    opacity: "0.9",
    fontSize: "14px",
    width: "150px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginTop: "-6px",
  },
  titleBody: {
    padding: "5px",
    paddingLeft: "10px",
  },
  price: {
    fontSize: "0.8em",
    backgroundColor: "whitesmoke",
    padding: "5px",
    color: "#ffa500",
  },
  favBtn: {
    marginBottom: "-220px",
    fontSize: "30px",
    color: "#ffa500",
    cursor: "pointer",
    padding: "2px",
    borderRadius: "50px",
    backgroundColor: "white",
  },
  btn: {
    marginTop: "10px",
    backgroundColor: "#ffa500",
    border: "none",
    color: "white",
  },
};

const inputFocus = (e) => {
  e.target.style.outLineColor = "#ffa500 !important";
};

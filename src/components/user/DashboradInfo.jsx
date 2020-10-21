import React, { useEffect, useState } from "react";
import { Card, Image, Col, Row } from "react-bootstrap";
import avater_placeholder from "../images/avater_placeholder.jpg";
import Preloader from "./Preloader";
import { AiOutlineHeart, AiOutlineGift, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { useSelector } from "react-redux";
import Axios from "axios";
import Ripple from "../Loading/Ripple";

export default function DashboradInfo() {
  const [loading, setLoading] = useState(true);
  const userSignin = useSelector((state) => state.userSignin);
  const { user } = userSignin;
  const [dashboardData, setDashboarddata] = useState({
    favourites: {
      data: 0,
      load: true,
    },
    pending: {
      data: 0,
      load: true,
    },
    expired: {
      data: 0,
      load: true,
    },
    hidden: {
      data: 0,
      load: true,
    },
    products: {
      data: 0,
      load: true,
    },
  });

  useEffect(() => {
	fetchDashboard()
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {};
  }, [user]);

  function fetchDashboard() {
    Axios.get("https://dev.bellefu.com/api/user/product/list", {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        const data = res.data.products.data;

        setDashboarddata((prev) => ({
          ...prev,
          products: {
            data: data.length,
            load: false,
          },
        }));
      })
      .catch((err) => {
        setDashboarddata((prev) => ({
          ...prev,
          products: {
            data: "N/A",
            load: false,
          },
        }));
      });
    Axios.get("https://dev.bellefu.com/api/user/product/favourite/list", {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        const data = res.data.favourites.data;

        setDashboarddata((prev) => ({
          ...prev,
          favourites: {
            data: data.length,
            load: false,
          },
        }));
      })
      .catch((err) => {
        setDashboarddata((prev) => ({
          ...prev,
          favourites: {
            data: "N/A",
            load: false,
          },
        }));
      });

    getProductData("pending");
    getProductData("expired");
    getProductData("hidden");
  }

  function getProductData(parameter) {
    Axios.get("https://dev.bellefu.com/api/user/product/" + parameter, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        const data = res.data.products.data;

        setDashboarddata((prev) => ({
          ...prev,
          [parameter]: {
            data: data.length,
            load: false,
          },
        }));
      })
      .catch((err) => {
        setDashboarddata((prev) => ({
          ...prev,
          [parameter]: {
            data: "N/A",
            load: false,
          },
        }));
      });
  }

  return (
    <div>
      <Card className="border-0 text-center" style={{ padding: "20px" }}>
        {loading ? (
          <Preloader />
        ) : (
          <Row>
            <Col xs={6} sm={6} md={6} lg={2} xl={2}>
              <Image
                src={user.user.avatar !== null ? `images/users/${user.user.username}/${user.user.avatar}` : avater_placeholder}
                style={styles.avater}
                roundedCircle
              />
            </Col>
            <Col xs={6} sm={6} md={6} lg={2} xl={2}>
              <p style={styles.data}>{dashboardData.products.load ? <Ripple size="sm" /> : dashboardData.products.data}</p>
              <span>
                <AiOutlineGift style={styles.icon} className="mr-2" />
                <label style={styles.text}> My Ads</label>
              </span>
            </Col>
            <Col xs={6} sm={6} md={6} lg={2} xl={2}>
              <p style={styles.data}>{dashboardData.favourites.load ? <Ripple size="sm" /> : dashboardData.favourites.data} </p>
              <span>
                <AiOutlineHeart style={styles.icon} className="mr-2" />
                <label style={styles.text}>Favourite</label>
              </span>
            </Col>
            <Col xs={6} sm={6} md={6} lg={2} xl={2}>
              <p style={styles.data}>{dashboardData.pending.load ? <Ripple size="sm" /> : dashboardData.pending.data}</p>
              <span>
                <IoMdTime style={styles.icon} className="mr-2" />
                <label style={styles.text}>Pending Ads</label>
              </span>
            </Col>
            <Col xs={6} sm={6} md={6} lg={2} xl={2}>
              <p style={styles.data}>{dashboardData.expired.load ? <Ripple size="sm" /> : dashboardData.expired.data}</p>
              <span>
                <MdDateRange style={styles.icon} className="mr-2" />
                <label style={styles.text}>Expired Ads</label>
              </span>
            </Col>
            <Col xs={6} sm={6} md={6} lg={2} xl={2}>
              <p style={styles.data}>{dashboardData.hidden.load ? <Ripple size="sm" /> : dashboardData.hidden.data}</p>
              <span>
                <AiOutlineEyeInvisible style={styles.icon} className="mr-2" />
                <label style={styles.text}>Hiden Ads</label>
              </span>
            </Col>
          </Row>
        )}
      </Card>
    </div>
  );
}

const styles = {
  avater: {
    height: "60px",
  },
  icon: {
    fotsize: "30px",
    color: "#ffa500",
  },
  text: {
    opacity: "0.7",
    fontSize: "0.9em",
  },
  data: {
    fontSize: "0.7em",
    marginBottom: "-3px",
    marginTop: "15px",
  },
};

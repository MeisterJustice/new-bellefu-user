import React, { useState } from 'react';
import { useEffect } from 'react';
import {
	Card,
	Row,
	Col,
	Form,
	Container,
	Accordion,
	OverlayTrigger,
	Badge,
	Tooltip,
	Button,
	InputGroup,
	FormControl,
	Modal
} from "react-bootstrap";
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
import Fav from "../Ads/Fav";
import Price from "../Ads/Price";
import Axios from 'axios';

const CategoryPageItem = (props) => {
    const [id, setId] = useState('')

    const [text, setText] = useState([
		props.data.title,
        props.data.plan
    ])
    const [originalText, setOriginalText] = useState([
		props.data.title,
        props.data.plan
    ])
    

    
    return (
        <Col
            xs={6}
            sm={6}
            md={3}
            lg={3}
            xl={3}
            className=" my-1 px-1">
            <Card className="border-0 rounded-lg pc-card-shadow">
                <Card.Img
                    style={props.styles.image}
                    variant="top"
                    src={`https://bellefu.com/images/products/${props.data.slug}/${props.data.images[0]}`}
                />

                <Card.ImgOverlay style={{ marginTop: "-15px" }}>
                    <Row>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Badge
                         style={{width: '100px'}}
                        pill
                            variant={props.data.plan === 'urgent' ? 'danger' : props.data.plan === 'highlighted' ? 'success' : 'warning'}
                            className={`${
                                props.data.plan === "free"
                                    ? "d-none"
                                    : "d-block"
                            }`}>
                            {text[1]}
                            </Badge>
                            
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                            <Fav {...props} user={props.user} data={props.data} />
                        </Col>
                    </Row>
                </Card.ImgOverlay>

                <Card.Body style={props.styles.titleBody}>
                    <Link
                        to={{
                            pathname: `/product_detail/${props.data.slug}`,
                            state: props.data.slug
                        }}
                        style={{
                            color: "inherit",
                            textDecoration: "inherit"
                        }}>
                        <p style={props.styles.title}>{text[0]}</p>
                    </Link>

                    
                </Card.Body>
            </Card>
            <div style={{backgroundColor: 'white', paddingBottom: '10px'}}>
                <Price styles={props.styles} data={props.data} convertTooltip={props.convertTooltip} />
            </div>
        </Col>
    )
}

export default CategoryPageItem
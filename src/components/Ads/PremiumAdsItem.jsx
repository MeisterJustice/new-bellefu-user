import React, { useState } from 'react';
import {
	Card,
	Col,
	Row,
	OverlayTrigger,
	Badge,
	Tooltip,
	Accordion,
	Button
} from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaCommentDots, FaMapMarkerAlt, FaMobileAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { BsArrowLeftRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Price from "./Price";
import Fav from "./Fav";
import MobileAds from "./MobileAds";
import { useEffect } from 'react';
import Axios from 'axios';


const PremiumAdsItem = (props) => {
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
            key={props.data.slug}
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={4}
            className="my-2 px-1">
            <Card className="d-none cursor d-md-block border-0 pc-card-shadow">
                <Link to={{
                    pathname: `/product_detail/${props.data.slug}`,
                    state: props.data.slug
                    }}
                    style={{
                        color: "inherit",
                        textDecoration: "inherit"
                    }}>
                    
                <Card.Img
                    style={props.styles.image}
                    variant="top"
                    src={`https://bellefu.com/images/products/${props.data.slug}/${props.data.images[0]}`}
                />
                </Link>
                <Card.ImgOverlay style={{ marginTop: "-15px" }}>
                    <Row>
                        <Link to={{
                                pathname: `/product_detail/${props.data.slug}`,
                                state: props.data.slug
                            }}
                            style={{
                                color: "inherit",
                                textDecoration: "inherit"
                            }}>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Badge
                            style={{width: '100px'}}
                            pill
                                variant={props.data.plan === 'urgent' ? 'danger' : props.data.plan === 'highlighted' ? 'success' : 'warning'}
                                className={`${
                                    props.data.plan === "free"
                                        ? "d-none"
                                        : "d-block"
                                } `}>
                                {text[1]}
                            </Badge>
                            
                        </Col>
                        </Link>
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
                        <p className="product-title" style={{textTransform: 'capitalize'}}>{text[0]}</p>
                        <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                            <div>
                            <IconContext.Provider value={{ color: "gray", size: '10px'}}>
                                <FaMapMarkerAlt className="cursor" />
                            </IconContext.Provider>
                            </div>
                            <div style={{color: 'gray', fontSize: '12px', marginTop: '5px'}} className="ml-1 product-title">{props.data.address}</div>
                        </div>
                    </Link>

                    
                </Card.Body>
            </Card>
            
            <div className="d-none d-md-block" style={{backgroundColor: 'white', paddingBottom: '10px'}}>
                <Price styles={props.styles} data={props.data} {...props} convertTooltip={props.convertTooltip} />
            </div>
            <MobileAds index={props.index} id={props.id} text={text}  {...props} data={props.data} convertTooltip={props.convertTooltip} />
            
        </Col>
    )
}

export default PremiumAdsItem
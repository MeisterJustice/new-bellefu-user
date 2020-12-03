import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	Card,
	Col,
	Row,
	OverlayTrigger,
	Badge,
	Tooltip,
	Accordion,
	Button,
    Container
} from "react-bootstrap";
import { FaCommentDots, FaMapMarkerAlt, FaMobileAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { BsArrowLeftRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Price from "./Price";
import Fav from "./Fav";
import Axios from "axios";



const MobileAds = (props) => {
    const [id, setId] = useState('')
    const [text, setText] = useState([
		props.data.title,
        props.data.plan,
        'Chat',
        'Whatsapp',
        'Call'
    ])
    const [originalText, setOriginalText] = useState([
		props.data.title,
        props.data.plan,
        'Chat',
        'Whatsapp',
        'Call'
    ])


    
    
return (
    <Container>
    <div style={{backgroundColor: 'white'}} className="d-flex d-md-none flex-column card-shadow">
        <div style={{borderBottom: '1px solid gray'}}>
            
        <Row>
            <Col xs={5}>
                <Link to={{
                        pathname: `/product_detail/${props.data.slug}`,
                        state: props.data.slug
                    }}
                    style={{
                        color: "inherit",
                        textDecoration: "inherit"
                    }}>
                    <img width="100%" height="100%" className="image-height" src={`https://bellefu.com/images/products/${props.data.slug}/${props.data.images[0]}`} />
                </Link>
            </Col>
            <Col xs={7}>
                <div className="p-2">
                    <Link to={{
                        pathname: `/product_detail/${props.data.slug}`,
                        state: props.data.slug
                    }}
                    style={{
                        color: "inherit",
                        textDecoration: "inherit"
                    }}>
                        <div className="" style={{fontWeight: '500', lineHeight: '1', fontSize: '13px', textTransform: 'capitalize'}}>{props.text ? props.text[0].substring(0, 48) : text[0].substring(0, 48)}</div>
                        <div className="pt-1">
                            <IconContext.Provider value={{ color: "gray", size: '10px'}}>
                                <FaMapMarkerAlt className="cursor" />
                            </IconContext.Provider>
                             <span style={{color: 'gray', fontSize: '12px'}} className="ml-1">{props.data.address}</span>
                        </div>
                    </Link>
                        <div className="mt-1">
                            <Price styles={styles} data={props.data} {...props} convertTooltip={props.convertTooltip}/>
                        </div>
                    
                    <div className="mt-1">
                        <Fav {...props} user={props.user} data={props.data} />
                    </div>
                    <div className="mt-1">
                    <Link to={{
                    pathname: `/product_detail/${props.data.slug}`,
                    state: props.data.slug
                }}
                style={{
                    color: "inherit",
                    textDecoration: "inherit"
                }}>
                   <Badge
                        variant={props.data.plan === 'urgent' ? 'danger' : props.data.plan === 'highlighted' ? 'success' : 'warning'}
                        className={`${
                            props.data.plan === "free"
                                ? "d-none"
                                : "d-block"
                        }`}>
                        {props.text ? props.text[1] : text[1]}
                    </Badge>
                           
                    </Link>
                    </div>
                </div>
            </Col>
        </Row>
        </div>
        <div>
        <Row>
            <Col xs={4} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid gray'}}>
                <div className="py-1">
                    <a href={`/messenger?recipient=${props.data.user.username}`}>
                        <IconContext.Provider value={{ color: "#76BA1B", size: '15px', style: {textDecoration: 'none'}}}>
                            <FaCommentDots className="cursor" />
                        </IconContext.Provider>
                        <span className="ml-1" style={{color: 'black', textDecoration: 'none', fontSize: '12px'}}>{text[2]}</span>
                    </a>
                </div>
            </Col>
            <Col xs={4} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid gray'}}>
                <div className="py-1">
                     <a href={`https://wa.me/${props.data.phone}?text=Hi%2C+I+got+your+contact+from+bellefu`}>
                        <IconContext.Provider value={{ color: "#76BA1B", size: '15px', style: {textDecoration: 'none'}}}>
                            <FaWhatsapp className="cursor"/>
                        </IconContext.Provider>
                        <span style={{color: 'black', textDecoration: 'none', fontSize: '12px'}} className="ml-1">{text[3]}</span>
                    </a>
                </div>
            </Col>
            <Col xs={4} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid gray'}}>
                <div className="py-1">
                    <a href={`tel:${props.data.phone}`}>
                        <IconContext.Provider value={{ color: "#76BA1B", size: '15px', style: {textDecoration: 'none'}}}>
                            <FaMobileAlt className="cursor"/>
                        </IconContext.Provider>
                        <span style={{color: 'black', textDecoration: 'none', fontSize: '12px'}} className="ml-1">{text[4]}</span>
                    </a>
                </div>
            </Col>
            
        </Row>
    </div>
</div>
    </Container>
)
}

export default MobileAds

const styles = {
	image: {
		height: "150px",
		padding: "5px",
		borderRadius: "10px"
	},
	title: {
		opacity: "0.9",
		fontSize: "14px",
		width: "150px",
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		marginTop: "-6px"
	},
	titleBody: {
		padding: "5px",
		paddingLeft: "10px"
	},
	price: {
		fontSize: "0.8em",
		backgroundColor: "whitesmoke",
		padding: "5px",
		color: "#ffa500"
	},
	favBtn: {
		marginBottom: "-220px",
		fontSize: "30px",
		color: "#ffa500",
		cursor: "pointer",
		padding: "2px",
		borderRadius: "50px",
		backgroundColor: "white"
	}
};
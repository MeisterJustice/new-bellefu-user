import React, { useState, useEffect } from "react";
import { Card, Row, Image, Col, Accordion, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import avater_placeholder from "../images/avater_placeholder.jpg";
import { IoIosTime, IoMdMailOpen, IoIosChatbubbles } from "react-icons/io";
import { AiFillPhone } from "react-icons/ai";
import Moment from "react-moment";
import { FaCheckCircle, FaMobileAlt, FaRegCommentDots, FaWhatsapp } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { GoVerified } from "react-icons/go";


const renderTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
	  Phone Verified
	</Tooltip>
  );
  const renderTooltip1 = (props) => (
	<Tooltip id="button-tooltip" {...props}>
	  ID Verified
	</Tooltip>
  );
  const renderTooltip2 = (props) => (
	<Tooltip id="button-tooltip" {...props}>
	  KYC Verified
	</Tooltip>
  );

export default function UserAdInfo(props) {
	const [userprofile, setProfileState] = useState(props);
	const [reveal, setReveal] = useState(false)
	const [text, setText] = useState([
        'Advertiser Info',
		'Reveal Contact',
		'Reply By Mail',
		'Message Seller',
    ])
    const [originalText, setOriginalText] = useState([
        'Advertiser Info',
		'Reveal Contact',
		'Reply By Mail',
		'Message Seller',
    ])
	useEffect(() => {
		setProfileState(props);
		console.log('this is profile: ', userprofile)
	}, [props]);

	
	
	return (
		<div>
			<Card className="border-0 ">
				<Card.Header
					className="border-0"
					style={{ backgroundColor: "#76ba1b" }}>
					<b style={{ color: "white" }}>{text[0]}</b>
				</Card.Header>
				<Card.Body>
					<Row>
						<Col
							xm={12}
							sm={12}
							md={12}
							lg={12}
							xl={12}
							className="text-center">
							<Image
								src={userprofile.user && userprofile.user.avatar !== null ? `https://bellefu.com/images/users/${userprofile.user.avatar}` : avater_placeholder}
								style={styles.avater}
								roundedCircle
							/>
						</Col>
						<Col
							xm={12}
							sm={12}
							md={12}
							lg={12}
							xl={12}
							className="text-center mt-2">
							<p>
								<b>{userprofile.user && userprofile.user.profile.first_name}</b>
								<b className="ml-1">
									{userprofile.user && userprofile.user.profile.last_name}
								</b>
								{userprofile.user && (
									<OverlayTrigger
									placement="right"
									
									delay={{ show: 250, hide: 400 }}
									overlay={userprofile.user && userprofile.user.verification_level === 'phone' ? renderTooltip : userprofile.user.verification_level === 'id' ? renderTooltip1 : renderTooltip2}
								>
									<GoVerified style={{marginLeft: '5px', fontSize: '20px', color: userprofile.user && userprofile.user.verification_level === 'phone' ? '#2a2b2b' : userprofile.user.verification_level === 'id' ? 'orange' : '#76BA1B', display: userprofile.user && userprofile.user.verification_level === 'none' ? 'none' : 'inline', }} className="mr-3 cursor" />
								</OverlayTrigger>
								)}
							</p>
						</Col>
						<Col
							xm={12}
							sm={12}
							md={12}
							lg={12}
							xl={12}
							className="mt-2">
							<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
								<div style={{paddingLeft: '80px'}}>
									<IoIosTime style={styles.icon} className="mr-3" />{" "}
									<span style={styles.text}>
										
										<Moment format="D MMM YYYY" withTitle>
										{userprofile.user && userprofile.user.created_at}
										</Moment>
									</span>
								</div>
								<div style={{paddingLeft: '80px'}} className="mt-2">
									<AiFillPhone style={styles.icon} className="mr-3" />{" "}
									{!reveal && (
										<span className="cursor" onClick={() => setReveal(true)} style={{padding: '3px', border: '2px solid #76BA1B', color: '#76BA1B', fontSize: '13px'}}>{text[1]}</span>
									)}
									{reveal && (
										<span style={styles.text}>
										<a href={`tel:${userprofile.user.phone}`}>
											<span>{userprofile.user && userprofile.user.phone}</span>
										</a>
									</span>
									)}
								</div>
								<div style={{paddingLeft: '80px'}} className="mt-2">
									<IoMdMailOpen style={styles.icon} className="mr-3" />{" "}
									<a
										style={{color: 'black'}}
										href={`mailto:${userprofile.user &&
											userprofile.user.email}?subject=subject text`}>
										<span style={styles.text}>
											<span>{text[2]}</span>
										</span>
									</a>
								</div>
								<div style={{paddingLeft: '70px'}} className="mt-2">
								<Accordion>
									
										<Accordion.Toggle as={Button} variant="link" style={{color: 'black', border: 'none', backgroundColor: 'transparent'}}  eventKey="0">
											<IoIosChatbubbles style={styles.icon} className="mr-3" />{" "}
										
											<span style={styles.text}>
												<span style={{color: 'black', }}>{text[3]}</span>
												
											</span>
										
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="0">
										<div className="pl-3">
											<div className="mt-2">
												<a href={`https://wa.me/${userprofile.phone && userprofile.phone}?text=Hi%2C+I+got+your+contact+from+bellefu`}>
													<IconContext.Provider value={{ color: "#ffa500", size: '15px', style: {textDecoration: 'none', marginRight: '20px'}}}>
														<FaWhatsapp className="cursor"/>
													</IconContext.Provider>
													<span style={{color: 'black', textDecoration: 'none'}} className="ml-1">Whatsapp</span>
												</a>
											</div>
											<div className="mt-1 d-block d-lg-none">
											<a href={`tel:${userprofile.phone && userprofile.phone}`}>
												<IconContext.Provider value={{ color: "#ffa500", size: '15px', style: {textDecoration: 'none', marginRight: '20px'}}}>
													<FaMobileAlt className="cursor"/>
												</IconContext.Provider>
												<span style={{color: 'black', textDecoration: 'none'}} className="ml-1">Call</span>
											</a>
											</div>
											<div className="mt-1">
											<a href={`/messenger?recipient=${userprofile.user && userprofile.user.username}`}>
												<IconContext.Provider value={{ color: "#ffa500", size: '15px', style: {textDecoration: 'none', marginRight: '20px'}}}>
													<FaRegCommentDots className="cursor"/>
												</IconContext.Provider>
												<span style={{color: 'black', textDecoration: 'none'}} className="ml-1">Chat</span>
											</a>
											</div>
										</div>
										</Accordion.Collapse>
								</Accordion>
									
								</div>
							</div>
						</Col>
						
						
					</Row>
				</Card.Body>
			</Card>
		</div>
	);
}

const styles = {
	avater: {
		height: "100px"
	},
	icon: {
		color: "#ffa500",
		fontSize: "20px"
	},
	text: {
		fontSize: "15px"
	}
};

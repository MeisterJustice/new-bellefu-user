import React, { useState, useEffect } from "react";
import { Row, Col, Card, Accordion, Button, Form, Spinner } from "react-bootstrap";
import { MdLocationOn } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { IoIosTime } from "react-icons/io";
import { AiFillPhone, AiFillEye } from "react-icons/ai";
import { FaSlackHash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import Moment from "react-moment";
import renderHTML from "react-render-html"
import ReviewItem from "./ReviewItem";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import SnackBar from "../SnackBar/SnackBar";



function AdDetails(props) {
	const userSignin = useSelector((state) => state.userSignin);

	const { user } = userSignin;
	const [data, setData] = useState([])
	const [stat, setStat] = useState({})
	const [data1, setdata1] = useState([])
	const [nextPageUrl, setNextPageUrl] = useState('')
	const [loading, setLoading] = useState(false)
	const [show, setShow] = useState(true)
	const [reportBody, setReportBody] = useState({
		review_message: '',
		review_rating: '',
	})
	const [snack, setsnack] = useState({
		view: false,
		type: "",
		message: "",
	  });
	const [text, setText] = useState([
        'Ad Details',
		'Location',
		props.address,
		'Price',
		'Posted',
		'Ad Views',
		'Ad',
		props.slug,
		'Ad Description',
		
		
    ])
    const [originalText, setOriginalText] = useState([
        'Ad Details',
		'Location',
		props.address,
		'Price',
		'Posted',
		'Ad Views',
		'Ad',
		props.slug,
		'Ad Description',
		
	])
	
	const handleCall = () => {
		Axios.get(`https://bellefu.com/api/product/review/list/for/${props.data.slug}`)
		.then((res) => {
			setData(res.data.reviews.data)
			setdata1(res.data.reviews.data)
			setNextPageUrl(res.data.reviews.next_page_url)
		})
		
	}

	const nextData = () => {
		Axios
			.get(nextPageUrl, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				}
			})
			.then((res) => {
				setdata1(res.data.reviews.data)
				setNextPageUrl(res.data.reviews.next_page_url)
				setData(data.concat(...res.data.reviews.data))
			})
	}

	const handleStat = () => {
		Axios.get(`https://bellefu.com/api/product/rating/for/${props.data.slug}`)
		.then((res) => {
			setStat(res.data)
		})
		
	}


	useEffect(() => {
		setText([
            'Ad Details',
			'Location',
			props.data.address,
			'Price',
			'Posted',
			'Ad Views',
			'Ad',
			props.data.slug,
		'Ad Description',
		
        ])
        setOriginalText([
            'Ad Details',
			'Location',
			props.data.address,
			'Price',
			'Posted',
			'Ad Views',
			'Ad',
			props.data.slug,
		'Ad Description',
		
		])
		handleCall()
		handleStat()
	}, [props.data]);

	const ratingChanged = (newRating) => {
		setReportBody({...reportBody, review_rating: newRating})
	  };

	  const handleChange = (e) => {
		setReportBody({
			...reportBody,
			[e.target.name]: e.target.value
		})
	}


	
	const handleReport = (e) => {
		e.preventDefault()
		setShow(false)
		setLoading(true)
		if(!user.token) {
			props.history.push('/login')
		}
		Axios
			.post(`https://bellefu.com/api/user/product/review/${props.data.slug}`, reportBody, {
				headers: {
					Authorization: user !== null ? `Bearer ${user.token}` : 'hfh',
					"Content-Type": "application/json",
					Accept: "application/json"
				}
			})
			.then((res) => {
				setsnack({
					view: true,
					type: 'success',
					message: 'Success'
				})
				setShow(false)
				setLoading(false)
				setTimeout(() => {
					setsnack({
					  view: false,
					  type: "",
					  message: "",
					});
				  }, 3800);
			})
			.catch((error) => {
				setShow(true)
				setLoading(false)
				setsnack({
					view: true,
					type: 'error',
					message: "error"
				})
				setTimeout(() => {
					setsnack({
					  view: false,
					  type: "",
					  message: "",
					});
				  }, 3800);
			});
	}

	return (
		<div>
						{snack.view && <SnackBar type={snack.type}>{snack.message}</SnackBar>}

					<Card className="border-0">
						<Card.Header
							className="border-0"
							style={{ backgroundColor: "#76ba1b" }}>
							<b style={{ color: "white" }}>{text[0]}</b>
						</Card.Header>
						<Card.Body>
							<Row>
								<Col xm={12} sm={12} md={12} lg={6} xl={6}>
									<div className="mt-3">
										<MdLocationOn style={styles.icon} className="mr-3" />{" "}
										<span style={styles.text}>
											<b>{text[1]}</b>
										</span>
									</div>
									<p className="ml-5">{text[2]}</p>
								</Col>
								<Col xm={12} sm={12} md={12} lg={6} xl={6}>
									<div className="mt-3">
										<GiReceiveMoney style={styles.icon} className="mr-3" />{" "}
										<span style={styles.text}>
											<b>{text[3]}</b>
										</span>
									</div>
									<p className="ml-5 ">
										{props.data.currency_symbol}
										{props.data.price}
									</p>
								</Col>
								<Col xm={12} sm={12} md={12} lg={6} xl={6}>
									<div className="mt-3">
										<IoIosTime style={styles.icon} className="mr-3" />{" "}
										<span style={styles.text}>
											<b>{text[4]}</b>
										</span>
									</div>
									<p className="ml-5">
										<Moment format="D MMM YYYY" withTitle>
											{props.data.created_at}
										</Moment>
									</p>
								</Col>
								
								<Col xm={12} sm={12} md={12} lg={6} xl={6}>
									<div className="mt-3">
										<AiFillEye style={styles.icon} className="mr-3" />{" "}
										<span style={styles.text}>
											<b>{text[5]}</b>
										</span>
									</div>
									<p className="ml-5">{props.data.inorganic_views}</p>
								</Col>
								<Col xm={12} sm={12} md={12} lg={6} xl={6}>
									<div className="mt-3">
										<FaSlackHash style={styles.icon} className="mr-3" />{" "}
										<span style={styles.text}>
											<b>{text[6]}</b>
										</span>
									</div>
									<p className="ml-5 ">{text[7]}</p>
								</Col>
							</Row>
						</Card.Body>
					</Card>

					<Card className="border-0 mt-4">
						<Card.Header
							className="border-0"
							style={{ backgroundColor: "#76ba1b" }}>
							<b style={{ color: "white" }}>{text[8]}</b>
						</Card.Header>
						<Card.Body>
							<Row>
								<Col xm={12} sm={12} md={12} lg={6} xl={6}>
									<span style={styles.text}>	
									{renderHTML(`${props.data.description}`)}
									</span>
								</Col>
							</Row>
						</Card.Body>
					</Card>
					{data.length === 0 && (
						<div className="mt-5">
							{show && (
									<Accordion>
											<Accordion.Toggle eventKey="1">
											
												<Button
													className="border-0"
													style={{
														color: 'black',
														fontSize: "0.9em",
														backgroundColor: "#EFEFEF",
														boxShadow: "none",
														border: 'none'
													}}>
													Review Ad
												</Button>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey="1">
												<Form onSubmit={handleReport}>
													<Form.Group controlId="formBasicEmail">
														<div className="mt-2">
														<ReactStars
															count={5}
															isHalf={true}
															onChange={ratingChanged}
															size={24}
															activeColor="#ffd700"
														/>
														</div>
														<div className="mt-2">
														<Form.Control onChange={handleChange} as="textarea" name="review_message" value={reportBody.review_message} placeholder="nice seller" />
														</div>
														<div className="mt-2">
														<Button
														onClick={handleReport}
														style={{backgroundColor: "#ffa500", color: 'white'}}
															className="border-0"
															>
																Review
														</Button>
														</div>
													</Form.Group>
												</Form>
											</Accordion.Collapse>
									</Accordion>
									
								) 
							}
						</div>
					)}
					{data.length > 0 && (

					
					<Card className="border-0 mt-4" style={{position: 'relative', height: `${data.length * 170}px`}}>
						<Card.Header
							className="border-0"
							style={{ backgroundColor: "#76ba1b" }}>
							<b style={{ color: "white" }}>Reviews</b>
						</Card.Header>
						<Card.Body>
							<Row>
								<Col xm={12} lg={4}>
											
											<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '150px', width: '100%', backgroundColor: '#F5F5F5'}} className="mt-3 p-2">
												<div className="text" style={{fontWeight: '600', fontSize: '27px'}}>{stat.average_rating}/5</div>
												
											</div>
											<div className="mt-2">
												{show && (
									<Accordion>
											<Accordion.Toggle eventKey="1">
											
												<Button
													className="border-0"
													style={{
														color: 'black',
														fontSize: "0.9em",
														backgroundColor: "#EFEFEF",
														boxShadow: "none",
														border: 'none'
													}}>
													Review Ad
												</Button>
											</Accordion.Toggle>
											<Accordion.Collapse eventKey="1">
												<Form onSubmit={handleReport}>
													<Form.Group controlId="formBasicEmail">
														<div className="mt-2">
														<ReactStars
															count={5}
															isHalf={true}
															onChange={ratingChanged}
															size={24}
															activeColor="#ffd700"
														/>
														</div>
														<div className="mt-2">
														<Form.Control onChange={handleChange} as="textarea" name="review_message" value={reportBody.review_message} placeholder="nice seller" />
														</div>
														<div className="mt-2">
														<Button
														onClick={handleReport}
														style={{backgroundColor: "#ffa500", color: 'white'}}
															className="border-0"
															>
																Review
														</Button>
														</div>
													</Form.Group>
												</Form>
											</Accordion.Collapse>
									</Accordion>
									
								) 
							}
							{loading && (
								<Spinner animation="grow" />
							)}
												</div>
										</Col>
										<Col xm={12} lg={8}>
												<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '150px'}} className="mt-2 p-2">
												{data && data.map((data, index) => (
													<ReviewItem data={data} key={index} />
												))}
											</div>
											<div className="mt-2">
											<InfiniteScroll
												dataLength={data.length}
												next={nextData}
												hasMore={data1.current_page !== data1.last_page ? true : false}
												loader={<h4 style={{textAlign: 'center', color: 'gray'}}>Loading...</h4>}
												endMessage={
												<p style={{ textAlign: 'center' }}>
													{/* <b>Yay! You have seen it all</b> */}
												</p>
												}
												>
											</InfiniteScroll>
											</div>
										</Col>
								
								
							</Row>
						</Card.Body>
					</Card>
				)}
		</div>
	);
}

const styles = {
	icon: {
		color: "#ffa500",
		fontSize: "30px"
	},
	text: {
		fontSize: "15px"
	}
};

export default AdDetails;

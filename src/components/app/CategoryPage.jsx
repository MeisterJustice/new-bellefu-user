import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';

import Flag from "react-world-flags";
import DesktopInput from "../slideshow/DesktopInput";
import MyVerticallyCenteredModal from "../Ads/StateModal";
import MobileInput from "../slideshow/MobileInput";
import MobileAds from "../Ads/MobileAds";
import Cookie from 'js-cookie'
import CategoryPageItem from "./CategoryPageItem";
import CategorySubcategoryItem from "./CategorySubcategoryItem";
const queryString = require("query-string");

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (convert)
const convertTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		convert currency
	</Tooltip>
);

export default function CategoryPage(props) {
	const [language, setLanguage] = useState(Cookie.get('language' || 'en'))
	// ========FOR FITER FROM STATE AND FUNCTION START HERE ==================================//
	const [id, setId] = useState('')
	const [filterData, setFilterData] = useState({
		min_price: "",
		country: "",
		max_price: "",
		subcategory: "",
		category: "",
		stateee: "",
		sort: ""
	});
	const {
		min_price,
		country,
		max_price,
		subcategory,
		category,
		stateee,
		sort
	} = filterData;
	const onChangeHandler = (e) => {
		setFilterData({ ...filterData, [e.target.name]: e.target.value });
	};
	
	// ========FOR FITER FROM  STATE AND FUNCTION END HERE ==================================//

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [productsData, setProductsData] = useState([]);
	const [products, setProducts] = useState([])
	const [nextPageUrl, setNextPageUrl] = useState('')

	const [state, setState] = useState({})
	const [states, setStates] = useState([])
	const [modalShow, setModalShow] = React.useState(false);
	const [lgas, setLgas] = useState([])
	const [lga, setLga] = useState({})

	const userSignin = useSelector((state) => state.userSignin);
	const userCountry = useSelector((state) => state.userCountry);
	const { user } = userSignin;

	let params = queryString.parse(props.location.search)
	console.log('the queries: ', params)

	
	let countryy = params.country ? `country=${params.country}` : ''
	let lgaa = params.lga ? `&lga=${params.lga}` : ''
	let statee = stateee.length > 0 ? `&state=${stateee}` : params.state ? `&state=${params.state}` : ''
	let subcategoryy = subcategory.length > 0 ? `&subcategory=${subcategory}` : params.subcategory ? `&subcategory=${params.subcategory}` : ''
	let categoryy = category.length > 0 ? `&category=${category}` : params.category ? `&category=${params.category}` : ''
	let maxPrice = max_price.length > 0 ? `&max_price=${max_price}` : '';
	let minPrice = min_price.length > 0 ? `&min_price=${min_price}` : '';
	

	let dataUrl = "";
	let apiUrl = `https://bellefu.com/api/product/list?${countryy}${lgaa}${statee}${subcategoryy}${categoryy}${maxPrice}${minPrice}`;

	let location = useLocation();
	const parsed = queryString.parse(location.search);

	const loadStates = () => {
		axios.get(`https://bellefu.com/api/${props.userCountry.country_iso2}/state/list`)
		.then((res) => {
			setStates(res.data.states)
		}).catch((e) => {
			console.log('an error occured: ', e)
		})
	}
	const loadData = (page = 1) => {
		setLoading(true);
		axios
			.get(`${apiUrl}&page=${page}`, {
				headers: {
					Authorization: user !== null ? `Bearer ${user.token}` : 'hfh',
					"Content-Type": "application/json",
					Accept: "application/json"
				}
			})
			.then((res) => {
				setLoading(false);
				setProducts(res.data.products)
				setProductsData(res.data.products.data);
				setNextPageUrl(res.data.products.next_page_url)
				setError("");
			})
			.catch((error) => {
				setLoading(false);
				setError("Something went worng");
				console.log(error);
			});
	};

	const nextData = () => {
		setLoading(false);
		axios
			.get(nextPageUrl, {
				headers: {
					Authorization: user !== null ? `Bearer ${user.token}` : 'hfh',
					"Content-Type": "application/json",
					Accept: "application/json"
				}
			})
			.then((res) => {
				setLoading(false);
				setProducts(res.data.products)
				setNextPageUrl(res.data.products.next_page_url)
				setProductsData(productsData.concat(...res.data.products.data))
				console.log(productsData)
			})
	}

// ==============CATEGORY LIST STATE =========
  
const [categoryData, setCategoryData] = useState([])
 const loadCategory = () => {
	
	axios.get("https://bellefu.com/api/category/list", {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		}
	})
	.then((res) => {
		setCategoryData(res.data.categories)
		setFilterData({...filterData, subcategory: ''})
		setError("");
	})
	.catch((error) => {
		setError("Something went worng");
		console.log(error);
	});
 }

 // ==============SUBCATEGORY LIST STATE =========
  
const [subcategoryData, setSubCategoryData] = useState([])
const [notShow, setNotShow] = useState(true)
const loadSubCategory = () => {
   
   axios.get(`https://bellefu.com/api/subcategory/listfor/${filterData.category}`, {
	   headers: {
		   "Content-Type": "application/json",
		   Accept: "application/json"
	   }
   })
   .then((res) => {
	   
	   setSubCategoryData(res.data.subcategories)
	   setNotShow(false)
	   setError("");
   })
   .catch((error) => {
	   setError("Something went worng");
	   console.log(error);
   });
}

	// translate
	const [text, setText] = useState([
		'category',
		'subcategory',
		'state',
		'price',
		'select category',
		'select subcategory',
		'select state',
		'Price',
		'Min Price',
		'Max Price',
		'Apply Filter'
    ])
    const [originalText, setOriginalText] = useState([
		'category',
		'subcategory',
		'state',
		'price',
		'select category',
		'select subcategory',
		'select state',
		'Price',
		'Min Price',
		'Max Price',
		'Apply Filter'
    ])


    const load = async () => {
		await axios.get("https://bellefu.com/api/config/api_key/google_translate")
		.then((res) => {
			setId(res.data.key)
		})
	}



	useEffect(() => {
		loadSubCategory()
	}, [filterData.category])

	useEffect(() => {
		loadCategory();
		load()
		loadData(1);
		loadStates()
	}, [])
	return (
		<div>
			<HeaderNav />
			<Container>
				
				<Row>
					<Col xs={12}>
					<div className="d-none d-lg-block" style={{ marginTop: "100px" }}>
						<DesktopInput id={id} lga={lga} country={props.userCountry} state={state} setModalShow={setModalShow} />
					</div>
					<div className="d-block d-lg-none" style={{ marginTop: "100px" }}>
						<MobileInput id={id} lga={lga} country={props.userCountry} state={state} setModalShow={setModalShow} />
					</div>
					</Col>
					<Col
						lg={3}
						md={12}
						xs={12}
						sm={12}
						style={{ paddingLeft: "3px", paddingRight: "3px" }}>
						<div>
								{/* ======FOR DESKTOP FILLTER====== */}
							<div style={{ marginTop: "80px" }} className="d-none d-lg-block  d-md-none">
								<Form onSubmit={loadData}>
									<Card className="border-0">
										<Container>
											<Form.Group>
												<Form.Label
													className="mt-3"
													style={{ opacity: "0.4", fontSize: "0.8em" }}>
													<b>{text[0]}</b>
												</Form.Label>
												<div>
													
													<select
														class="uk-select  "
														name="category"
														id="category"
														value={category }
														 onChange={(e) => onChangeHandler(e)}
														>

														<option>{text[4]}</option>
														{ 
														categoryData.map((data) => (
															<CategorySubcategoryItem  id={id} language={language} key={data.slug} category={category} data={data} />
														))}
													</select>
													
												</div>
											</Form.Group>
											<Form.Group>
												<Form.Label
													className="mt-3"
													style={{ opacity: "0.4", fontSize: "0.8em" }}>
													<b>{text[1]}</b>
												</Form.Label>
												<div >
													<select
														class="uk-select  "
														name="subcategory"
														id="subcategory"
														value={subcategory}
														onChange={(e) => onChangeHandler(e)}
														disabled={notShow}>
														<option>{text[0]}</option>
														{ 
														subcategoryData.map((data) => (
															<CategorySubcategoryItem id={id} language={language} key={data.slug} subcategory={subcategory} data={data} />
														))}
														
													</select>
												</div>
											</Form.Group>
											<Form.Group>
												<Form.Label
													className="mt-3"
													style={{ opacity: "0.4", fontSize: "0.8em" }}>
													<b>{text[2]}</b>
												</Form.Label>
												<div>
													<select
														class="uk-select  "
														name="stateee"
														value={stateee}
														onChange={(e) => onChangeHandler(e)}>
															<option hidden>{text[6]}</option>
														{states.map((data, index) => (
														<option
														key={index}
															value={data.slug}
															>
															{data.name}
														</option>

														))}
														
													</select>
												</div>
											</Form.Group>
											<Form.Group>
												<Form.Label
													style={{ opacity: "0.4", fontSize: "0.8em" }}>
													<b>{text[7]}</b>
												</Form.Label>
												<Row>
													<Col xs={6} sm={6}>
														<Form.Control
															onFocus={inputFocus}
															type="number"
															min="0"
															placeholder={text[8]}
															name="min_price"
															value={min_price}
															onChange={(e) => onChangeHandler(e)}
														/>
													</Col>
													<Col xs={6} sm={6} md={6} lg={6} xl={6}>
														<Form.Control
															onFocus={inputFocus}
															placeholder={text[9]}
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
												<Button
													style={styles.btn}
													variant="warning"
													size="lg"
													block
													type="button"
													onClick={loadData}>
												<b>{text[10]}</b>	
												</Button>
											</Form.Group>
										</Container>
									</Card>
								</Form>
							</div>

							{/* ======FOR MOBILE FILLTER====== */}
							<div style={{ marginTop: "10px" }} className=" d-lg-none  d-xs-block d-sm-block d-mb-block ">
								<Accordion>
									<Accordion.Toggle
										as={Card.Header}
										style={{ backgroundColor: "white", marginLeft: "0px" }}
										eventKey="0">
										<Row type="button">
											<Col xs={2} sm={2}>
												<GiSettingsKnobs
													style={{ color: "#ffa500", fontSize: "30px" }}
												/>
											</Col>
											<Col xs={8} sm={8}>
												<label className="mr-1" style={{ fontSize: "0.9em" }}>
													<b style={{ opacity: "0.7" }}>Filter Search</b>
												</label>
											</Col>
											<Col xs={2} sm={2}>
												<IoMdArrowDropdown
													style={{ color: "#ffa500", fontSize: "30px" }}
												/>
											</Col>
										</Row>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											<Form onSubmit={loadData}>
												<Card className="border-0">
													<Container>
													<Form.Group>
												<Form.Label
													className="mt-3"
													style={{ opacity: "0.4", fontSize: "0.8em" }}>
													<b>{text[0]}</b>
												</Form.Label>
												<div>
													
													<select
														class="uk-select  "
														name="category"
														id="category"
														value={category }
														 onChange={(e) => onChangeHandler(e)}
														>

														<option hidden>---select category---</option>
														{ 
														categoryData.map((data) => (
														<option key={data.slug}
															value={data.slug}
															selected={
																category === data.slug ? true : false
															}>
															{data.name}
														</option>
														))}
													</select>
													
												</div>
											</Form.Group>
											<Form.Group>
												<Form.Label
													className="mt-3"
													style={{ opacity: "0.4", fontSize: "0.8em" }}>
													<b>{text[1]}</b>
												</Form.Label>
												<div >
													<select
														class="uk-select  "
														name="subcategory"
														id="subcategory"
														value={subcategory}
														onChange={(e) => onChangeHandler(e)}
														disabled={notShow}>
														<option>{text[1]}</option>
														{ 
														subcategoryData.map((data) => (
														<option key={data.slug}
															value={data.slug}
															selected={
																subcategory === data.slug ? true : false
															}>
															{data.name}
														</option>
														))}
														
													</select>
												</div>
											</Form.Group>
														<Form.Group>
															<Form.Label
																className="mt-3"
																style={{ opacity: "0.4", fontSize: "0.8em" }}>
																<b>{text[6]}</b>
															</Form.Label>
															<div >
																<select
																	class="uk-select  "
																	name="stateee"
																	value={stateee}
																	onChange={(e) => onChangeHandler(e)}>
																	<option hidden>select state</option>
																	<option hidden>{text[6]}</option>
														{states.map((data, index) => (
														<option
														key={index}
															value={data.slug}
															>
															{data.name}
														</option>

														))}
																</select>
															</div>
														</Form.Group>
														<Form.Group>
															<Form.Label
																style={{ opacity: "0.4", fontSize: "0.8em" }}>
																<b>{text[3]}</b>
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
															<Button
																style={styles.btn}
																variant="warning"
																size="lg"
																block
																type="button"
																onClick={loadData}>
															<b>{text[10]}</b>	
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
						<div
							style={{ marginTop: "80px" }}
							className="d-none d-lg-block">
							
								{loading ? 
									(
										<div style={{height: '100vh', width: '100%'}}>
						<Preloader />
					</div>
									)
								 :  
								 (
									 <div>
									
									
									  
									<Row>
									{productsData.map((data) => (
										<CategoryPageItem id={id} language={language} convertTooltip={convertTooltip} user={props.user} key={data.slug} data={data} styles={styles} />
									))}
								  	</Row>
									  <InfiniteScroll
										dataLength={productsData.length}
										next={nextData}
										hasMore={products.current_page !== products.last_page ? true : false}
										loader={<h4 style={{textAlign: 'center', color: 'gray'}}>Loading...</h4>}
										endMessage={
										<p style={{ textAlign: 'center' }}>
										</p>
										}
										>
									</InfiniteScroll>
								  </div>
								 )
									
							}
							
						</div>
						{/* =========FOR ITEM MOBILEVIEW======= */}
						<div
							style={{ marginTop: "15px" }}
							className="d-lg-none d-xs-block">
							<Row>
								{loading ? (
									<div style={{height: '100vh', width: '100%'}}>
									<Preloader />
								</div>
								) : (
									productsData.map((data) => (
										<Col
											key={data.slug}
											xs={12}
											sm={12}
											md={3}
											lg={3}
											xl={3}
											className=" my-1 px-1">
											
											<MobileAds id={id} language={language} {...props} data={data} convertTooltip={convertTooltip} />
										</Col>
									))
								)}
							</Row>
							<div >
							<InfiniteScroll
								dataLength={productsData.length}
								next={nextData}
								hasMore={products.current_page !== products.last_page ? true : false}
								loader={<h4 style={{textAlign: 'center', color: 'gray'}}>Loading...</h4>}
								endMessage={
								<p style={{ textAlign: 'center' }}>
								</p>
								}
								>
							</InfiniteScroll>
							</div>
						</div>
					</Col>
				</Row>
				
			</Container>
			<BottomNav />
			<MyVerticallyCenteredModal
				country={userCountry}
				lgas={lgas}
				setLgas={setLgas}
				setLga={setLga}
				states={states}
				show={modalShow}
				state={state}
				setState={setState}
				onHide={() => setModalShow(false)}
			/>
		</div>
	);
}

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
	},
	btn: {
		marginTop: "10px",
		backgroundColor: "#ffa500",
		border: "none",
		color: "white"
	}
};

const inputFocus = (e) => {
	e.target.style.outLineColor = "#ffa500 !important";
};

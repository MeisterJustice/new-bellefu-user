import React, {useState, useEffect} from "react";
import { Navbar, Nav, Button, Tooltip, OverlayTrigger, Modal, Row, Col, Container, Spinner, Dropdown, InputGroup, FormControl } from "react-bootstrap";
import SideNav from "./SideNav";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";
import axios from 'axios';
import Flag from 'react-world-flags';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserCountry, languagee} from '../../redux/actions/userCountry'
import { IconContext } from "react-icons/lib";
import { FaUsers } from "react-icons/fa";
import Axios from "axios";
import MiniSearch from 'minisearch'


//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (CHANGE CONTRY)
const renderTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		Change Contry
	</Tooltip>
);

const languages = [
	{name: 'english', code: 'en'},
	{name: 'french', code: 'fr'},
	{name: 'german', code: 'de'},
	{name: 'spanish', code: 'es'},
	{name: 'arabic', code: 'ar'},
	{name: 'chinese', code: 'zh-CN'},
	{name: 'afrikaans', code: 'af'},
	{name: 'bosnian', code: 'bs'},
	{name: 'croatian', code: 'hr'},
	{name: 'czech', code: 'cs'},
	{name: 'danish', code: 'da'},
	{name: 'dutch', code: 'nl'},
	{name: 'estonian', code: 'et'},
	{name: 'italiano', code: 'it'},
	
]


//THIS IS A HEADER COMPOENT
export default function HeaderNav(props) {
	const dispatch = useDispatch();
	const [loadingCountry, setLoadingCountry] = useState(false)
	const country = useSelector((state) => state.userCountry);
	const [altState, setAltState] = useState([])
    const [searchedState, setSearchedState] = useState('')

	const [show, setShow] = useState(false)
	const [countries, setCountries] = useState([])
	const [language, setLanguage] = useState(Cookie.get('language') || 'en')
	const [number, setNumber] = useState(0)
	const [text, setText] = useState([
		'Post Free Ad',
		'Register',
		'login',
		'Blog',
		"Farmer's Club",
		'country',
		'Dashboard',
		'Logout',
		'Select Your Country'
	])
	const [originalText, setOriginalText] = useState([
		'Post Free Ad',
		'Register',
		'login',
		'Blog',
		"Farmer's Club",
		'country',
		'Dashboard',
		'Logout',
		'Select Your Country'
	])

	let miniSearch = new MiniSearch({
        fields: ['name'],
        storeFields: ['name', 'iso2', 'slug', 'code'],
        searchOptions: {
            boost: { name: 2 },
            fuzzy: 0.2,
            prefix: true
          }
	  })
	  
	  miniSearch.addAll(countries)
  

	const translatee = (lang) => {
		setLanguage(lang)
		setNumber(1)
	}

	const [id, setId] = useState('')

	const load = async () => {
		await Axios.get("https://bellefu.com/api/config/api_key/google_translate")
		.then((res) => {
			setId(res.data.key)
		})
	}


	useEffect(() => {
		load()
	}, [])

	const onShow = () => {
		setTimeout(() => {
			setLoadingCountry(true)
			setTimeout(() => {
				setLoadingCountry(false)
			}, 4000)
		}, 10)
		setShow(true)
	}

	const url = 'https://bellefu.com/api/country/list'

	const onFlagClick = (code) => {
		setShow(false)
		fetch(`https://bellefu.com/api/location/info/set/country/${code}`)
		.then((res) => res.json())
		.then((data) => {
			dispatch(updateUserCountry(data.location_info))
			window.location.reload(true)
		});
	}

	useEffect(() => {
        if(searchedState.length === 0){
            setAltState([])
        } else {
            
        let results = miniSearch.search(searchedState)
        setAltState(results)
            
        }
	}, [searchedState])
	
	const onChange = (e) => {
        setSearchedState(e.target.value)
    }

	const fetchCountries = () => {
		fetch(url)
		.then((res) => res.json())
		.then((data) => {
			
			setCountries(data.countries)
		}).catch((e) => console.log('this is error: ', e))
	}

	useEffect(() => {
		fetchCountries()
	}, [])


	return (
		<div>
			<Navbar style={styles.head} className=" shadow-sm fixed-top">
				<Navbar.Brand as={Link} to="/">
					<img src="https://bellefu.com/images/misc/logo.png" style={styles.logo} />
				</Navbar.Brand>
				<Navbar.Brand>
					<OverlayTrigger
						placement="right"
						delay={{ show: 250, hide: 400 }}
						overlay={renderTooltip}>
						<Button onClick={onShow} variant="outline-warning" style={styles.contrey_btn}>
							<Flag style={{width: '12px', height: '12px'}} code={country.country_iso2} />{'  '}{text[5]}
						</Button>
						
					</OverlayTrigger>
					{loadingCountry && (
						<Spinner style={{marginLeft: '3px', height: '20px', width: '20px'}} animation="grow" />
					)}
				</Navbar.Brand>

				<Navbar.Collapse className="justify-content-end">
					<a
						
						href="https://www.facebook.com/groups/bellefu"
						className="d-none d-lg-block farmers-club pt-4 pr-3"
						style={{color: 'white', paddingBottom: '10px'}}>
							<IconContext.Provider value={{ color: "white", size: '20px', style: {paddingBottom: '5px'}}}>
								<FaUsers className="cursor" />
							</IconContext.Provider>
					{' '}{text[4]}
					</a>
					<a
						target="_blank"
						href="https://blog.bellefu.com"
						className="d-none d-lg-block farmers-club"
						style={{color: 'white', paddingBottom: '12px'}}>
						{text[3]}
					</a>
					<Nav.Link
						as={Link}
						to="/user_dashboard"
						className={`${
							Cookie.get("user")
								? "d-none d-lg-block  d-md-none"
								: "d-none d-lg-none  d-md-none"
						}`}
						style={styles.auth}>
					{text[6]}
					</Nav.Link>
					<Nav.Link
						as={Link}
						to="/user_dashboard"
						onClick={logout}
						className={`${
							Cookie.get("user")
								? "d-none d-lg-block  d-md-none"
								: "d-none d-lg-none  d-md-none"
						}`}
						style={styles.auth}>
						{text[7]}
					</Nav.Link>

					<Nav.Link
						as={Link}
						to="/login"
						className={`${
							Cookie.get("user")
								? "d-none d-lg-none  d-md-none"
								: "d-none d-lg-block  d-md-none"
						}`}
						style={styles.auth}>
						{text[2]}
					</Nav.Link>
					<Nav.Link
						as={Link}
						to="/register"
						className={`${
							Cookie.get("user")
								? "d-none d-lg-none  d-md-none"
								: "d-none d-lg-block  d-md-none"
						}`}
						style={styles.auth}>
						{text[1]}
					</Nav.Link>
					<Navbar.Brand styles={styles.language}>
						<Dropdown>
							<Dropdown.Toggle variant="warning" style={styles.post_free_add_btn} id="dropdown-basic">
								{language}
							</Dropdown.Toggle>

							<Dropdown.Menu style={{height: '280px', overflowY: 'scroll'}}>
								{languages.length > 1 && languages.map((code) => (
								<Dropdown.Item style={{fontSize: '12px'}} onClick={() => translatee(code.code)} key={code.code}>{code.name}</Dropdown.Item>

								))}

							</Dropdown.Menu>
						</Dropdown>
						
					</Navbar.Brand>
					<Navbar.Brand className="d-none d-lg-block  d-md-none">
						<Link to="/post_ad">
						<Button variant="warning" style={styles.post_free_add_btn}>
							{text[0]}
						</Button>
						</Link>
					</Navbar.Brand>
					
					<Navbar.Brand className="d-lg-none d-xs-block  d-sm-block d-md-block">
						<SideNav />
					</Navbar.Brand>
				</Navbar.Collapse>
			</Navbar>
			<Modal size="lg" show={show} onHide={() => setShow(false)} aria-labelledby="select-country-modal" centered>
				<Modal.Header closeButton>
					<Modal.Title className="text" id="select-country-modal">
						<Container>
							<div className="mb-2">
							{text[8]}
								
							</div>
							<InputGroup>
							<FormControl onChange={onChange} value={searchedState} name="searchedState" id="search-state" placeholder="search country" />
						</InputGroup>
						</Container>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
								{altState.length > 0 ? (
									<Row style={{height: '300px', overflowY: 'scroll'}}>
										{altState.map((data, index) => (
											<Col key={index} style={{marginTop: '10px'}} className="cursor country" sm={4}>
												<div onClick={() => onFlagClick(data.iso2, data.name)}>
													<Flag className="flag" code={data.iso2} /> {data.name}
												</div>
												
											</Col>
					 					))}
									</Row>
								) : (
									<Row style={{height: '300px', overflowY: 'scroll'}}>
										{countries.map((data, index) => (
											<Col key={index} style={{marginTop: '10px'}} className="cursor country" sm={4}>
												<div onClick={() => onFlagClick(data.iso2, data.name)}>
													<Flag className="flag" code={data.iso2} /> {data.name}
												</div>
												
											</Col>
					 					))}
									</Row>
								)
							}
					</Container>
				</Modal.Body>
			</Modal>
		</div>
	);
}


//LOGOUT
const logout = () => {
	Cookie.remove("user");
	window.location.reload();
};


//THE COMPONET STYLES GOES HERE.....
const styles = {
	head: {
		backgroundColor: "#76ba1b"
	},
	post_free_add_btn: {
		color: "white",
		backgroundColor: "#ffa500",
		border: "none"
	},
	auth: {
		color: "white"
	},
	contrey_btn: {
		color: "white",
		fontSize: "0.6em"
	},
	logo: {
		height: "30px",
		backgroundColor: "white",
		borderRadius: "5px"
	},

	nav_icon: {
		border: "5px solid red"
	}
};

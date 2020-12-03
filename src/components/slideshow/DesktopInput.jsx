import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import Select from "react-select";
import {FaMapMarkerAlt} from 'react-icons/fa'
import {IconContext} from 'react-icons'
import { Link } from "react-router-dom";
import Axios from "axios";
import Cookie from 'js-cookie'
import { useEffect } from "react";


export default function DesktopInput(props) {
	const [id, setId] = useState('')
	const [categoryData, setCategoryData] = useState([]);
	const [category, setCategory] = useState({})
	const [language, setLanguage] = useState(Cookie.get('language' || 'en'))
	
	const [text, setText] = useState([
		'What are you looking for?',
		'Where?',
		'Search',
	])
	const [originalText, setOriginalText] = useState([
		'What are you looking for?',
		'Where?',
		'Search'
	])
	const options = [];

	const handleChange = (option) => {
		setCategory(option)
	}

	

	

	const load = async () => {
		await Axios.get("https://bellefu.com/api/config/api_key/google_translate")
		.then((res) => {
			setId(res.data.key)
		})
	}



	const loadCategory = () => {
		Axios
			.get("https://bellefu.com/api/category/list", {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				}
			})
			.then((res) => {
				let data = res.data.categories;
			
				for(var i = 0; i < data.length; i++){
					options.push({value: data[i].slug, label: data[i].name})
				}
				setCategoryData(options)
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		load()
		loadCategory()
	}, [])

	const handleClick = () => {
		setTimeout(() => {
			window.location.reload()
		}, 500)
	}
	return (
		<div style={{backgroundColor: 'white', borderRadius: '7px'}}>
			<Form>
				<Form.Row>
					<Col lg={5} md={5} sm={12} clasName="mr-0 ml-0">
						<Select
							name="category"
							onChange={handleChange}
							options={categoryData}
							components={{ DropdownIndicator: () => null }}
							placeholder={text[0]}
							styles={selectStyles}
						/>
					</Col>

					<Col lg={5} md={5} sm={12} clasName="mr-0 ml-0">
						<div onClick={props.setModalShow} className="cursor" style={styles.input}>
							<span >
								<IconContext.Provider value={{ color: "#808080", size: '17px', style:{paddingBottom: '3px'}}}>
									<FaMapMarkerAlt/>
								</IconContext.Provider>
							</span>
							{Object.keys(props.state).length === 0 ? (
								<span style={{fontSize: '16px'}} className="ml-2">{text[1]}  {props.country.country_name}</span>
							) : (

								<span style={{fontSize: '16px'}} className="ml-2">{Object.keys(props.lga).length > 0 ? `${props.lga.name}, ${props.state.name}, ${props.country.country_name}` : `${props.state.name}, ${props.country.country_name}`}</span>
							)
						}
						</div>
					</Col>
						{/* props.state.slug, props.lga.slug, props.country.country_slug */}
					<Col  lg={2} md={2} sm={12} clasName="mr-0 ml-0">
						<Link style={{
										color: "inherit",
										textDecoration: "inherit"
									}} to={`/product_list?${props.state.slug ? `state=${props.state.slug}` : ''}${props.lga.slug ? `&lga=${props.lga.slug}` : ''}&country=${props.country.country_slug}${category.value ? `&category=${category.value}` : ''}`}>
							<Button onClick={handleClick} style={styles.btn} variant="warning">
								{text[2]}
							</Button>
						</Link>
					</Col>
				</Form.Row>
			</Form>
		</div>
	);
}




const selectStyles = {
	control: (styles) => ({
		...styles,
		backgroundColor: "white",
		height: "68px",
		fontSize: "17px",
		border: "none",
		borderRadius: "50px",
		boxShadow: "none"
	}),
	option: (styles) => {
		return {
			...styles,
			backgroundColor: "white",
			fontSize: "15px",
			color: "black",
			postion: "relative",
			"&:hover": {
				backgroundColor: "#faebd7",
				color: "#ffa500"
			},
			cursor: "pointer"
		};
	},
	container: (styles) => {
		return {
			...styles,
			minHeight: '1px',
			textAlign: 'left',
			border: 'none',
		};
	},
};

const styles = {
	input: {
		border: "none",
		height: "68px",
		fontSize: "20px",
		color: "#808080",
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	btn: {
		height: "50px",
		marginTop: "10px",
		width: "100px",
		backgroundColor: "#ffa500",
		border: "none",
		color: "white"
	}
};

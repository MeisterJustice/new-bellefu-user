import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Nav } from 'react-bootstrap';
import { FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';
import Select from "react-select";




const MobileInput = (props) => {
	const [categoryData, setCategoryData] = useState([]);
	const [category, setCategory] = useState({})
	const options = [];

	const handleChange = (option) => {
		setCategory(option)
	}


	const loadCategory = () => {
		Axios
			.get("https://dev.bellefu.com/api/category/list", {
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
		loadCategory()
	}, [])


	const handleClick = () => {
		setTimeout(() => {
			window.location.reload()
		}, 500)
	}
    return (
        <Form >
            <Form.Group >
                <Card style={styles.from_card} className="border-0">
                    <Select
						name="category"
						onChange={handleChange}
                        options={categoryData}
                        components={{ DropdownIndicator: () => null, IndicatorSeparator:() => null }}
                        placeholder={"What are you looking for?"}
                        styles={selectStyles}
                    />
                </Card>
            </Form.Group>
            <Form.Group style={{backgroundColor: 'white', borderRadius: '5px'}}>
                <div onClick={props.setModalShow} className="cursor" style={styles.input}>
                    <span className="pl-2">
                        <IconContext.Provider value={{ color: "#808080", size: '17px'}}>
                            <FaMapMarkerAlt/>
                        </IconContext.Provider>
                    </span>
                    {Object.keys(props.state).length === 0 ? (
                        <span style={{fontSize: '12.5px', color: '#808080'}} className="ml-2">Where?  {props.country.country_name}</span>
                    ) : (

                        <span style={{fontSize: '12.5px', color: '#808080'}} className="ml-2">{Object.keys(props.lga).length > 0 ? `${props.lga.name}, ${props.state.name}, ${props.country.country_name}` : `${props.state.name}, ${props.country.country_name}`}</span>
                    )
                    }
                </div>
            </Form.Group>
            <Form.Group>
			<Link style={{
					color: "inherit",
					textDecoration: "inherit"
				}} to={`/product_list?state=${props.state.slug}&lga=${props.lga.slug}&country=${props.country.country_slug}&category=${category.value}`}>
                <Button onClick={handleClick} style={styles.btn} variant="warning" size="lg" block>
                    Search
                </Button>
			</Link>
            </Form.Group>
			{props.landingpage && (
				<Form.Group style={{paddingTop: '10px'}}>
				<a  target="_blank" style={{
						color: "inherit",
						textDecoration: "inherit"
					}} href="https://www.facebook.com/groups/bellefu">
					<IconContext.Provider value={{ color: "white", size: '20px', style: {paddingBottom: '5px'}}}>
						<FaUsers className="cursor" />
					</IconContext.Provider>
					{' '}Farmer's Club
				</a>
				</Form.Group>
			)}
			
        </Form>
    )
}

export default MobileInput


const selectStyles = {
	control: (styles) => ({
		...styles,
		backgroundColor: "white",
		border: "none",
		borderRadius: "50px",
		height: "48px",
		fontSize: "13px",
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
	from_card: {
		height: "50px",	
	},
	auth: {
		color: "white"
	},
	input: {
		border: "none",
		borderRadius: "none",
		height: "48px",
        fontSize: "13px",
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
	},
	btn: {
		height: "50px",
		marginTop: "10px",
		backgroundColor: "#ffa500",
		border: "none",
		color: "white"
	}
};

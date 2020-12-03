import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Link, Redirect } from "react-router-dom";
import { Card } from "react-bootstrap";
import { signin } from "../../redux/actions/userActon";
import Preloader from "./Preloader";

import { useEffect } from 'react';
import SuccessModal from "./LoginSuccessModal";
import SnackBar from "../SnackBar/SnackBar";
import Axios from "axios";


function LogInForm(props) {
	const dispatch = useDispatch();
	const [id, setId] = useState('')

	const userSignin = useSelector((state) => state.userSignin);
	const { loading, user, error } = userSignin;
	const [formData, setFormData] = useState({
		identifier: "",
		password: ""
	});
	const [firstName, setFirstName] = useState('')
	const [show, setShow] = useState(false);
	const [isVerified, setIsVerified] = useState(false)
	const [isFirstEnter, setIsFirstEnter] = useState(true)
	const [snack, setsnack] = useState({
		view: false,
		type: "",
		message: "",
	  });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
	let url1 = 'https://bellefu.com/api/user/profile/details';

	
	const [text, setText] = useState([
		'Welcome Back',
		"Don't have an account?",
		'Sign Up Now',
		'Email or Phone',
		'Password',
		'Login',
		'Login Successful',
		'Welcome',
		"we're pleased to have you here.",
		'Verify Phone Number',
		'Continue Browsing'
	])
	const [originalText, setOriginalText] = useState([
		'Welcome Back',
		"Don't have an account?",
		'Sign Up Now',
		'Email or Phone',
		'Password',
		'Login',
		'Login Successful',
		'Welcome',
		"we're pleased to have you here.",
		'Verify Phone Number',
		'Continue Browsing'
	])

	const load = async () => {
		await Axios.get("https://bellefu.com/api/config/api_key/google_translate")
		.then((res) => {
			setId(res.data.key)
		})
	}



	useEffect(() => {
		load()
	}, [])
	
	useEffect(() => {
		if(user && !isFirstEnter){
			setsnack({
				view: true,
				type: "success",
				message: text[6],
			  });
	  
			  setTimeout(() => {
				setsnack({
				  view: false,
				  type: "",
				  message: "",
				});
			  }, 3000);
			Axios.get(url1, {
				headers: {
					Authorization: `Bearer ${user.token}`,
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			}).then((res) => {
				setFirstName(res.data.user.profile.first_name)
				if(res.data.user.phone_verification !== null){
					setIsVerified(true)
				} 
				handleShow()
				
			}).catch(() => {
				window.location.push('/')
			})
		}
	}, [user])

	


	const { identifier, password } = formData;
	const onChangeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmitHandle = (e) => {
		e.preventDefault();
		setIsFirstEnter(false)
		dispatch(signin(identifier, password)).then(() => {

		})
	};

	return (
		<div>
			 {/* {user ? <Redirect to="/user_dashboard" />: null} */}
			{loading && (
				<div style={{height: '100vh', width: '100%'}}>
				<Preloader />
			</div>
			)}
			{error && (
				<div class="alert alert-danger" role="alert">
					<strong>{error.message}</strong>
				</div>
			)}
			{snack.view && <SnackBar type={snack.type}>{snack.message}</SnackBar>}

			{show && <SuccessModal welcome={text[7]} welcome2={text[8]} verify={text[9]} browse={text[10]} name={firstName} isVerified={isVerified} handleShow={handleShow} show={show} handleClose={handleClose} />}

			<Card className="border-0">
				<Card.Body>
					<h4 className="text-center">
						<strong>{text[0]}</strong>
					</h4>
					<p className="text-center">
					{text[1]} <span ><Link to="/register" style={{color: "#ffa500"}}>{text[2]}!</Link></span>
					</p>

					<form onSubmit={onSubmitHandle} className="uk-grid-small" uk-grid>
						<div className="uk-margin-top">
							<div className="uk-inline">
								<span
									className="uk-form-icon"
									uk-icon="icon: mail"
									style={styles.iconForm}></span>
								<input
									required
									className="uk-input  uk-form-width-large"
									placeholder={text[3]}
									type="text"
									value={identifier}
									name="identifier"
									onChange={(e) => onChangeHandler(e)}
								/>
							</div>
							{error && (
								<p style={styles.formError}>{error.errors.identifier}</p>
							)}
							{error && <p style={styles.formError}>{error.errors.email}</p>}
							{error && <p style={styles.formError}>{error.errors.phone}</p>}
							{error && <p style={styles.formError}>{error.errors.username}</p>}
						</div>
						<div className="uk-margin">
							<div className="uk-inline">
								<span
									className="uk-form-icon"
									uk-icon="icon:  lock"
									style={styles.iconForm}></span>
								<input
									required
									className="uk-input  uk-form-width-large "
									placeholder={text[4]}
									type="password"
									value={password}
									name="password"
									onChange={(e) => onChangeHandler(e)}
								/>
							</div>
							{error && <p style={styles.formError}>{error.errors.password}</p>}
						</div>

						<div className="uk-margin">
							<button
								class="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom"
								style={styles.btnRegister}
								type="submit"
								onClick={onSubmitHandle}>
								<b>{text[5]}</b>
							</button>
						</div>
					</form>
				</Card.Body>
			</Card>
		</div>
	);
}

const styles = {
	iconForm: {
		color: "#ffa500"
	},
	btnRegister: {
		backgroundColor: "#ffa500",
		border: "none",
		color: "white"
	},
	formError: {
		fontSize: "0.7em",
		color: "red",
		marginTop: "10px"
	}
};
export default withRouter(LogInForm);

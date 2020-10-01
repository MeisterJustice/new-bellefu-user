import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { signin } from "../../redux/actions/userActon";
import Preloader from "../user/Preloader";

export default function LogInFrom(props) {
	const [formData, setFormData] = useState({
		identifier: "",
		password: ""
	});

	const dispatch = useDispatch();

	const userSignin = useSelector((state) => state.userSignin);
	const { loading, user, error } = userSignin;

	useEffect(() => {
		if (user) {
			props.history.push("/user_dashboard");
		}
		return () => {};
	}, [user]);

	const { identifier, password } = formData;
	const onChangeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmitHandle = (e) => {
		e.preventDefault();
		if (formData.identifier.length > 3 && formData.password.length > 3) {
			dispatch(signin(identifier, password));
		} else {
			alert("form can't be empty");
		}
	};

	return (
	
		<div>
			{loading && <Preloader />}
			{error && (
				<div class="alert alert-danger" role="alert">
					<strong>{error.message}</strong>
				</div>
			)}
			<Card className="border-0">
				<Card.Body>
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
									placeholder="Email or Phone"
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
									placeholder="password"
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
								<b>Register</b>
							</button>
						</div>
					</form>
				</Card.Body>
			</Card>
		</div>
	);
}

function Alert() {
	const [show, setShow] = useState(true);

	if (show) {
		return (
			<Alert variant="danger" onClose={() => setShow(false)} dismissible>
				<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
				<p>Form can't be empty, fill Out the form to continue</p>
			</Alert>
		);
	}
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

import React, {useEffect} from "react";
import { Button } from "react-bootstrap";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";

export default function SideNav() {

	return (
		<div>
			<div type="button" uk-toggle="target: #offcanvas-push">
				<AiOutlineMenuUnfold style={styles.icon} />
			</div>

			<div id="offcanvas-push" uk-offcanvas="mode: push; overlay: true">
				<div className="uk-offcanvas-bar uk-padding-remove  uk-margin-remove">
					<div>
						<MdCancel
							style={styles.close_icon}
							className="uk-offcanvas-close"
							uk-close
						/>
					</div>
					<h6 style={styles.menu} className="uk-padding-small">
						Menu
					</h6>
					<div style={styles.line}>
						<br />
					</div>
					<div>
						<div className="mb-3">
						<a href="/user_dashboard"
						className={`${
							Cookie.get("user")
								? "d-block"
								: "d-none"
						} `}
							
							style={{ color: "inherit", textDecoration: "inherit" }}>
							<Button  className="rounded-0" variant="dark" size="sm" block>
								Dashboard
							</Button>
						</a>
						</div>
						<div className="mb-3">
						<a href="/profile"
						className={`${
							Cookie.get("user")
								? "d-block"
								: "d-none"
						}`}
							style={{ color: "inherit", textDecoration: "inherit" }}>
							<Button  className="rounded-0" variant="dark" size="sm" block>
								profile
							</Button>
						</a>
						</div>
						<div className="mb-3">
						<a href="https://blog.bellefu.com"
							target="_blank"
							style={{ color: "inherit", textDecoration: "inherit" }}>
							<Button  className="rounded-0" variant="dark" size="sm" block>
								Blog
							</Button>
						</a>
						</div>
						<div className="mb-3">
						<a href="https://bellefu.info"
							target="_blank"
							style={{ color: "inherit", textDecoration: "inherit" }}>
							<Button  className="rounded-0" variant="dark" size="sm" block>
								Bellefu Radio
							</Button>
						</a>
						</div>
						<div className="mb-3">
						<a href="https://chat.whatsapp.com/IJW6VM4aVnG6AOASxx9VIV"
							target="_blank"
							style={{ color: "inherit", textDecoration: "inherit" }}>
							<Button  className="rounded-0" variant="dark" size="sm" block>
								Training
							</Button>
						</a>
						</div>
						<div className="mb-3">
						<a href="https://webinar.bellefu.com"
							target="_blank"
							style={{ color: "inherit", textDecoration: "inherit" }}>
							<Button  className="rounded-0" variant="dark" size="sm" block>
								Webinar
							</Button>
						</a>
						</div>
						<div className="mb-3">
						<a href="/login"
						className={`${
							Cookie.get("user")
								? "d-none"
								: "d-block"
						}`}
							style={{ color: "inherit", textDecoration: "inherit" }}>
							<Button  className="rounded-0" variant="dark" size="sm" block>
								Login
							</Button>
						</a>
					</div>
					<div className="mb-3">
						<a href="/register"
						className={`${
							Cookie.get("user")
								? "d-none"
								: "d-block"
						}`}
							style={{ color: "inherit", textDecoration: "inherit" }}>
							<Button  className="rounded-0" variant="dark" size="sm" block>
								Register
							</Button>
						</a>
						</div>
						<div className="mb-3">
						<a
							href="/post_ad"
							style={{ color: "inherit", textDecoration: "inherit" }}>
							<Button
								className="rounded-0"
								variant="warning"
								size="sm"
								block
								style={styles.post_free_add_btn}>
								Post Free Ad
							</Button>
						</a>
						</div>
						<div className={`${
							Cookie.get("user")
								? "d-block"
								: "d-none"
								} `}>
							<Button  onClick={logout} style={{backgroundColor: "red"}}  className="rounded-0" variant="dark" size="sm" block>
								Logout
							</Button>
							</div>
					</div>
				</div>
			</div>
		</div>
	);
}


//LOGOUT
const logout = () => {
	Cookie.remove("user");
	window.location.reload();
};

const reload = () => {
	window.location.reload();
}
//THIS COMPONET STYLES GOES HERE
const styles = {
	icon: {
		color: "white",
		fontSize: "35px"
	},
	close_icon: {
		fontSize: "1.9em",
		color: "#ffa500",
		marginTop: "-20px"
	},
	line: {
		marginTop: "-20px"
	},
	menu: {
		marginTop: "-5px"
	},
	post_free_add_btn: {
		color: "white",
		backgroundColor: "#ffa500",
		border: "none"
	}
};

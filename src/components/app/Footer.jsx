import React, { useEffect, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import Cookie from 'js-cookie'
import Axios from "axios";
import { Link } from "react-router-dom";
// import '../../../public/'


export default function Footer() {
	const [id, setId] = useState('')
	const [language, setLanguage] = useState(Cookie.get('language' || 'en'))
    const [text, setText] = useState([
		'About Us',
		'Bellefu.com is a dynamic online marketplace dedicated to agriculture-related activities ensuring farmers, buyers, and sellers of agricultural products have direct contact with other agro-allied providers and manufacturing industries around the world. Bellefu is designed to make searching for agro products available at your fingertips.',
		'Tools & Resources',
		'Bellefu Radio',
		'Training Group',
		'Help & Support',
		'Feedback',
		'Contact',
		'Submit CV',
		'Documentary',
		'Information',
		'About Us',
		'Countries',
		'Site Map',
		'Legal',
		'Privacy Policy',
		'Bellefu Agro consult. All rights reserved.',
		"Webinar",
		"Blog",
		"Head office:",
		"Contact Phones:",
	])
	
	const [originalText, setOriginalText] = useState([
		'About Us',
		'Bellefu.com is a dynamic online marketplace dedicated to agriculture-related activities ensuring farmers, buyers, and sellers of agricultural products have direct contact with other agro-allied providers and manufacturing industries around the world. Bellefu is designed to make searching for agro products available at your fingertips.',
		'Tools & Resources',
		'Bellefu Radio',
		'Training Group',
		'Help & Support',
		'Feedback',
		'Contact',
		'Submit CV',
		'Documentary',
		'Information',
		'About Us',
		'Countries',
		'Site Map',
		'Legal',
		'Privacy Policy',
		'Bellefu Agro consult. All rights reserved.',
		"Webinar",
		"Blog",
		"Head office:",
		"Contact Phones:",
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

	return (
		<div>
			<section className="footer" style={styles.footer}>
				<div className="container" style={{ paddingTop: "50px" }}>
					<div className="row footer-content" style={styles.footer_content}>
						<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-none d-lg-block">
							<h3 style={styles.footerAbout}>{text[0]}</h3>

							<p style={{ opacity: "0.7" }}>
							{text[1]}
							</p>
						</div>

						<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
							<div className="row">
								<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
									<ul>
										<li className="d-block d-lg-none" style={styles.list}>
											<Accordion>
													<Accordion.Toggle style={{backgroundColor: '#191a19', color: 'white', border: 'none'}} eventKey="0">
													{text[0]}
													</Accordion.Toggle>
													<Accordion.Collapse eventKey="0">
													<p className="pt-2" style={{ opacity: "0.7", color: '#c0c0c0' }}>
													{text[1]}
													</p>
													</Accordion.Collapse>
											</Accordion>
										</li>
										<li className="d-none d-lg-block" style={styles.list}>
											<p>{text[2]}</p>
										</li>
										<li className="d-none d-lg-block" style={styles.list}>
											<a target="_blank" style={styles.link} href="https://bellefu.info">
															{text[3]}
															</a>
										</li>
										<li className="d-none d-lg-block" style={styles.list}>
												<a target="_blank" style={styles.link} href="https://chat.whatsapp.com/IJW6VM4aVnG6AOASxx9VIV">
															{text[4]}
															</a>
										</li>
										<li className="d-none d-lg-block" style={styles.list}>
												<a target="_blank" style={styles.link} href="https://webinar.bellefu.com">
															{text[17]}
															</a>
										</li>
										<li className="d-none d-lg-block" style={styles.list}>
												<a target="_blank" style={styles.link}  href="https://blog.bellefu.com">
															{text[18]}
															</a>
										</li>
										<li className="d-block d-lg-none mt-2" style={styles.list}>
											<Accordion>
													<Accordion.Toggle style={{backgroundColor: '#191a19', color: 'white', border: 'none'}} eventKey="0">
													{text[2]}
													</Accordion.Toggle>
													<Accordion.Collapse eventKey="0">
														<div className="pt-2">
															<a target="_blank" style={styles.link} href="https://bellefu.info">
															{text[3]}
															</a>
															<a target="_blank" style={styles.link} href="https://chat.whatsapp.com/IJW6VM4aVnG6AOASxx9VIV">
															{text[4]}
															</a>
															<a target="_blank" style={styles.link} href="https://webinar.bellefu.com">
															{text[17]}
															</a>
															<a target="_blank" style={styles.link} href="https://blog.bellefu.com">
															{text[18]}
															</a>
														</div>
													</Accordion.Collapse>
											</Accordion>
										</li>
									</ul>
								</div>
								<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
									<ul>
										<li className="d-none d-lg-block" style={styles.list}>
											<p>{text[5]}</p>
										</li>
										<li className="d-none d-lg-block" style={styles.list}>
											<Link style={styles.link} to="/feedback">
											{text[6]}
											</Link>
										</li>
										<li className="d-none d-lg-block" style={styles.list}>
											<Link style={styles.link} to="/contact">
											{text[7]}
											</Link>
										</li>
										<li className="d-none d-lg-block" style={styles.list}>
											<a target="_blank" style={styles.link} href="https://www.linkedin.com/company/bellefu">
											{text[8]}
											</a>
										</li>
										<li className="d-none d-lg-block" style={styles.list}>
											<a target="_blank" style={styles.link} href="https://www.youtube.com/channel/UCOmmJSiICuspcEjyj4nFx0Q">
											{text[9]}
											</a>
										</li>
										<li className="d-block d-lg-none" style={styles.list}>
											<Accordion>
													<Accordion.Toggle style={{backgroundColor: '#191a19', color: 'white', border: 'none'}} eventKey="0">
														{text[5]}
													</Accordion.Toggle>
													<Accordion.Collapse eventKey="0">
														<div className="pt-2">
														<Link style={styles.link} to="/feedback">
											{text[6]}
											</Link>
											<Link style={styles.link} to="/contact">
											{text[7]}
											</Link>
											<a target="_blank" style={styles.link} href="https://www.linkedin.com/company/bellefu">
											{text[8]}
											</a>
											<a target="_blank" style={styles.link} href="https://www.youtube.com/channel/UCOmmJSiICuspcEjyj4nFx0Q">
											{text[9]}
											</a>
														</div>
													</Accordion.Collapse>
											</Accordion>
										</li>
									</ul>
								</div>
								<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
									<ul>
										<li className="d-none d-lg-block" style={styles.list}>
											<p>{text[10]}</p>
										</li>
										<li className="d-none d-lg-block" style={styles.list}>
											<Link style={styles.link} to="/about">
											{text[11]}
											</Link>
										</li>
										
										<li className="d-none d-lg-block" style={styles.list}>
											<Link style={styles.link} to="/legal">
											{text[14]}
											</Link>
										</li>
										
										<li className="d-block d-lg-none" style={styles.list}>
											<Accordion>
													<Accordion.Toggle style={{backgroundColor: '#191a19', color: 'white', border: 'none'}} eventKey="0">
													{text[10]}
													</Accordion.Toggle>
													<Accordion.Collapse eventKey="0">
														<div className="pt-2">
															<Link style={styles.link} to="/about">
															{text[11]}
															</Link>
															
															<Link style={styles.link} to="/legal">
															{text[14]}
															</Link>
															
														</div>
													</Accordion.Collapse>
											</Accordion>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					{/* <!-- ******footer bottom --> */}
                    <hr class="uk-divider-icon"style={{opacity: "0.4"}} />

					<div className="footer-bottom">
						<div className="py-3" style={{display: 'flex', justifyContent: 'flex-start'}}>
							<div>
								<h5 style={{color: "white", fontSize: '15px'}}>{text[19]}</h5>
								<h6 className="mt-2" style={{color: "white" , opacity: "0.4", fontSize: '12px'}}>9550 Forestlane <br/> Dallas 75243,<br/> TX, US</h6>
							</div>
							<div className="ml-lg-5 ml-2">
								<h5 style={{color: "white" , fontSize: '15px'}}>{text[20]}</h5>
								<h6 className="mt-2" style={{color: "white" , opacity: "0.4", fontSize: '12px'}}>+1 (214) 447-5585 USA</h6>
								<h6 className="mt-2" style={{color: "white" , opacity: "0.4", fontSize: '12px'}}>+(234) 813 668 6060 Nigeria</h6>
								<h6 className="mt-2" style={{color: "white" , opacity: "0.4", fontSize: '12px'}}>+(27) 62 579 5507 South Africa</h6>
							</div>
							<div style={{marginTop: '-10px'}} className="ml-5 d-none d-lg-block">
								<a href="#">
									<img src="google-play-badge.png" height="170" width="170" />
								</a>
							</div>
							<div className="ml-5 d-none d-lg-block">
								<a href="#">
									<img src="badge-download-on-the-app-store.svg" height="135" width="135" />
								</a>
							</div>
						</div>
						<div className="py-2 py-lg-0 d-block d-lg-none">
							<span style={{marginTop: '-10px'}}>
								<a href="#">
									<img src="google-play-badge.png" height="150" width="150" />
								</a>
							</span>
							<span className="ml-2">
								<a href="#">
									<img src="badge-download-on-the-app-store.svg" height="125" width="125" />
								</a>
							</span>
						</div>
						<h5 className="d-none d-lg-block" style={{color: "white" , opacity: "0.4"}}>&copy; 2020 {text[16]}</h5>
						<h5 className="d-block d-lg-none" style={{color: "white" , opacity: "0.4", fontSize: '15px'}}>&copy; 2020 {text[16]}</h5>
					</div>
				</div>
			</section>
		</div>
	);
}

const styles = {
	footer: {
		backgroundColor: "#191a19",
		color: "#fff",
		paddingtop: "50px",
		paddingBottom: "20px"
	},
	footer_content: {
		textAlign: "left"
	},
	footerAbout: {
		fontSize: "32px",
		padding: "0px 0px 10px",
		fontWeight: "500",
		margin: "0",
		color: "#fff"
	},
	footer_p: {
		color: "#c0c0c0",
		fontSize: "16px",
		margin: "0px 0px 16px",
		lineHeight: "26px"
	},
	link: {
		color: "#c0c0c0",
		fontWeight: "600px",
		fontSize: "16px",
		display: "block",
		textAlign: "left",
		padding: "0",
		lineHeight: "2rem",
		textDecoration: "none",
		opacity: "0.7"
	},
	list: {
		textDecoration: "none",
		display: "block",
		textAlign: "left",
		padding: "0"
	}
};

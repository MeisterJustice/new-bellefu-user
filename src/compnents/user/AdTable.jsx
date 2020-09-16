import React from "react";
import {
	Card,
	Badge,
	Image,
	Button,
	Tooltip,
	OverlayTrigger
} from "react-bootstrap";
import { AiOutlineTag } from "react-icons/ai";
import { GoLocation, GoPencil } from "react-icons/go";
import { MdDateRange } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import pic from "../images/pic.jpg";

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (delete)
const deleteTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		Delete Ad
	</Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (edit)
const editTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		Edit Ad
	</Tooltip>
);

export default function AdTable() {
	return (
		<div>
			<Card className="border-0">
				<Card.Body>
					<table class="uk-table uk-table-responsive uk-table-divider">
						<thead style={{ backgroundColor: "#76ba1b", color: "white" }}>
							<tr>
								<th
									style={{ color: "white", fontWeight: "bold" }}
									className="uk-table-expand">
									Ads
								</th>
								<th
									style={{ color: "white", fontWeight: "bold" }}
									className="uk-width-*">
									{" "}
								</th>

								<th style={{ color: "white", fontWeight: "bold" }}>Status</th>
								<th
									className="uk-table-expand"
									style={{ color: "white", fontWeight: "bold" }}>
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="uk-text-center">
									<Image src={pic} style={styles.image} />
								</td>
								<td>
									<p style={styles.titel}>
										Freshly processed onions for worldwide bulk delivery Freshly
									</p>

									<Badge variant="danger" className="ml-2">
										Ugent
									</Badge>
									<Badge style={{color: 'white'}} variant="warning" className="ml-2">
										Featured
									</Badge>
									<Badge variant="success" className="ml-2">
										Higlighted
									</Badge>

									<div className="mt-3">
										<AiOutlineTag style={styles.icon} className="mr-2" />
										<span style={styles.category} className="ml-2 mt-3">
											Agricultural Produce
										</span>
										<span style={styles.subCategory} className="ml-2 mt-5">
											Grains
										</span>
									</div>
									<div className="mt-3">
										<GoLocation style={styles.icon} className="mr-1" />
										<span style={styles.location} className="ml-1 ">
											port harcourt
										</span>
										<MdDateRange style={styles.icon} className="mr-1 ml-1" />
										<span style={styles.date} className="ml-1 ">
											Expiring: 02-May-23
										</span>
										<span className="ml-2" style={styles.price}>
											$100
										</span>
									</div>
								</td>
								<td>
									<Badge
										style={{ backgroundColor: "#b8e6b8", color: "white" }}
										className="ml-2">
										active
									</Badge>
								</td>
								<td>
									<div className="btn-group" role="group">
										<OverlayTrigger
											placement="bottom"
											delay={{ show: 50, hide: 100 }}
											overlay={editTooltip}>
											<Button size="lg" variant="light">
												<GoPencil style={{ color: "green" }} />
											</Button>
										</OverlayTrigger>

										<OverlayTrigger
											placement="bottom"
											delay={{ show: 50, hide: 100 }}
											overlay={deleteTooltip}>
											<Button size="lg" variant="light">
												<IoMdTrash style={{ color: "red" }} />
											</Button>
										</OverlayTrigger>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</Card.Body>
			</Card>
		</div>
	);
}
const styles = {
	image: {
		height: "100px"
	},
	icon: {
		fotsize: "30px",
		color: "#ffa500"
	},
	titel: {
		opacity: "0.9",
		fontSize: "20px",
		width: "300px",
		whiteSpace: "nowrap",
		overflow:"hidden",
		 textOverflow: "ellipsis"
	},
	category: {
		fontSize: "0.7em",
		color: "#ffa500",
		backgroundColor: "whitesmoke",
		padding: "3px"
	},
	subCategory: {
		fontSize: "0.7em",
		color: "#ffa500",
		backgroundColor: "whitesmoke",
		padding: "3px"
	},
	location: {
		fontSize: "0.7em"
	},
	date: {
		fontSize: "0.7em"
	},
	price: {
		fontSize: "0.9em",
		color: "#ffa500",
		backgroundColor: "whitesmoke",
		padding: "3px"
	}
};

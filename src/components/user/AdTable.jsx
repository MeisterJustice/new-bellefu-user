import React, { useState, useEffect } from "react";
import Preloader from "./Preloader";
import axios from "axios";
import { useSelector } from "react-redux";


import {
	Card,
	
	Tooltip,
	
} from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroll-component';
import AdTableItem from "./AdTableItem";

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (delete)
const deleteTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		Delete Ad
	</Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (view ad)
const viewTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		View Ad
	</Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (edit)
const editTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		Edit Ad
	</Tooltip>
);

const upgradeTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		Upgrade Ad
	</Tooltip>
);

export default function AdTable(props) {
	const [loading, setLoading] = useState(true);
	const [loadingg, setLoadingg] = useState(false);
	const [ad, setAd] = useState([]);
	const [products, setProducts] = useState([])
	const [nextPageUrl, setNextPageUrl] = useState('')
	const [fee, setFee] = useState({})
	const [status, setStatus] = useState('loading')

	const onAdDelete = (slug) => {
		setAd((ads) =>
      	ads.filter((ad) => ad.slug !== slug)
    );
	}


	const userSignin = useSelector((state) => state.userSignin);
	const { user } = userSignin;

	

	const nextData = () => {
		setLoading(false);
		axios
			.get(nextPageUrl, {
				headers: {
					Authorization: `Bearer ${user.token}`,
					"Content-Type": "application/json",
					Accept: "application/json"
				}
			})
			.then((res) => {
				setProducts(res.data.products)
				setNextPageUrl(res.data.products.next_page_url)
				console.log('called next page: ', nextPageUrl)
				setAd(ad.concat(...res.data.products.data))
			})
	}

	let url = "https://bellefu.com/api/user/product/list";
	useEffect(() => {
		axios
			.get(url, {
				headers: {
					Authorization: `Bearer ${user.token}`,
					"Content-Type": "application/json",
					Accept: "application/json"
				}
			})
			.then((res) => {
				setLoading(false);
				setProducts(res.data.products)
				console.log(res.data.products)
				setAd(res.data.products.data);
				setNextPageUrl(res.data.products.next_page_url)
				if(res.data.products.data.length < 1){
					setStatus('No Ad')
				}
			})
			.catch((error) => {
				setStatus('No Ad')
				setLoading(false);
				setAd([]);
			});

			axios
			.get("https://bellefu.com/api/user/product/upgrade/fee", {
				headers: {
					Authorization: `Bearer ${user.token}`,
					"Content-Type": "application/json",
					Accept: "application/json"
				}
			})
			.then((res) => {
				setFee(res.data)
				console.log(res)
			})
			.catch((error) => {
				
			});
	}, []);

	return (
		<div>
			{loadingg && (
				<Preloader />
			)}
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
							{loading ? (
								<div style={{height: '100vh', width: '100%'}}>
								<Preloader />
								</div>
							) : (
								
								ad.map((data) => (
									<AdTableItem fee={fee} upgradeTooltip={upgradeTooltip} setLoadingg={setLoadingg} key={data.id} onAdDelete={onAdDelete} styles={styles} data={data} viewTooltip={viewTooltip} editTooltip={editTooltip} deleteTooltip={deleteTooltip} {...props} user={user} />
								))
								
							)}
						</tbody>
					</table>
					<InfiniteScroll
						dataLength={ad.length}
						next={nextData}
						hasMore={products.current_page !== products.last_page ? true : false}
						loader={<h4 style={{textAlign: 'center', color: 'gray'}}>Loading...</h4>}
						endMessage={
						<p style={{ textAlign: 'center' }}>
							
						</p>
						}
						>
					</InfiniteScroll>

					{ad.length < 1 && (
						<div className={"text-center"}>
							<p>{status}</p>
						</div>
					)}
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
	title: {
		opacity: "0.9",
		fontSize: "15px",
		width: "300px",
		whiteSpace: "nowrap",
		overflow: "hidden",
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

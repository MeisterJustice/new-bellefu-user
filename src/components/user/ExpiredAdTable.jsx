import React, { useState, useEffect } from "react";
import Preloader from "./Preloader";
import axios from "axios";
import { useSelector } from "react-redux";
import {
	Card,
	Tooltip,
} from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroll-component';
import ExpiredAdItem from "./ExpiredAdItem.jsx";

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

const pageLimit = 10;
export default function ExpiredAdTable(props) {
	const [loading, setLoading] = useState(true);
	const [loadingg, setLoadingg] = useState(false);
	const [ad, setAd] = useState([]);
	const [products, setProducts] = useState([])
	const [nextPageUrl, setNextPageUrl] = useState('')
	const [status, setStatus] = useState('loading')

	const onAdDelete = (slug) => {
		setAd((ads) =>
      	ads.filter((ad) => ad.slug !== slug)
    );
	}

	const userSignin = useSelector((state) => state.userSignin);
	const { user } = userSignin;
	let url = "https://bellefu.com/api/user/product/expired";

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

	useEffect(() => {
		axios
			.get(`${url}`, {
				headers: {
					Authorization: `Bearer ${user.token}`,
					"Content-Type": "application/json",
					Accept: "application/json"
				}
			})
			.then((res) => {
				setLoading(false);
				setProducts(res.data.products)
				console.log(res.data.products.data)
				setAd(res.data.products.data);
				setNextPageUrl(res.data.products.next_page_url)
			})
			.catch((error) => {
				setStatus('No Expired Ad')
				setLoading(false);
				setAd([]);
			});
	
}, []);


useEffect(() => {
	axios
		.get(`${url}`, {
			headers: {
				Authorization: `Bearer ${user.token}`,
				"Content-Type": "application/json",
				Accept: "application/json"
			}
		})
		.then((res) => {
			setLoading(false);
			setProducts(res.data.products)
			console.log(res.data.products.data)
			setAd(res.data.products.data);
			setNextPageUrl(res.data.products.next_page_url)
			if(res.data.products.data.length < 1){
				setStatus('No Expired Ad')
			}
		})
		.catch((error) => {
			setStatus('No Expired Ad')
			setLoading(false);
			setAd([]);
		});

}, []);

	return (
		<div>
			{loadingg && (
				<Preloader />
			)}
			<Card className="border-0">
				<Card.Body>
					<table  class="uk-table uk-table-responsive uk-table-divider">
						<thead  style={{ backgroundColor: "#76ba1b", color: "white" }}>
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
								<th className="uk-table-expand" style={{ color: "white", fontWeight: "bold" }}>Action</th>
							</tr>
						</thead>
						<tbody>
						{loading ? (
								<div style={{height: '100vh', width: '100%'}}>
								<Preloader />
							</div>
							) : (
								
								ad.map((data) => (
										<ExpiredAdItem setLoadingg={setLoadingg} key={data.id} onAdDelete={onAdDelete} styles={styles} data={data} editTooltip={editTooltip} deleteTooltip={deleteTooltip} {...props} user={user}  />
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

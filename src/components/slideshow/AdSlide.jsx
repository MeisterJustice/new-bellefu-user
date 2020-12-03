import React from 'react'
import { Carousel, Card, Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';



export default function AdSlide() {
    return (
        <div>
		
			<Link to="#">
				<div className="mt-4">
				
				<img
					className="d-block w-100"
					src="https://bellefu.com/images/misc/bellefu-external-ad-1.jpeg"
					alt="First slide"
					style={{ height: "200px" }}
				/>
			
			</div>
			</Link>
			<Link to="#">

			<div className="mt-4">
            
				<img
					className="d-block w-100"
					src="https://bellefu.com/images/misc/bellefu-external-ad-2.jpeg"
					alt="First slide"
					style={{ height: "200px" }}
				/>
				
        	</div>
			</Link>
			<Link to="#">

			<div className="mt-4">
            
			<img
				className="d-block w-100"
				src="https://bellefu.com/images/misc/bellefu-external-ad-3.jpeg"
				alt="First slide"
				style={{ height: "200px" }}
			/>
			
			</div>
			</Link>
			<Link to="#">

			<div className="mt-4">
            
			<img
				className="d-block w-100"
				src="https://bellefu.com/images/misc/bellefu-external-ad-4.jpeg"
				alt="First slide"
				style={{ height: "200px" }}
			/>
			
			</div>
			</Link>
		</div>
    )
}

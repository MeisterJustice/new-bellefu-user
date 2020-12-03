import React, { useState, useEffect } from "react";
import { Card, Row, Image, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";


const MobileCategoryItem = (props) => {
    const [text, setText] = useState([
		props.data.name,
    ])
    const [originalText, setOriginalText] = useState([
		props.data.name,
    ])
    
    return (
        <Col xs={4} sm={4} md={4} className=" my-1 px-1">
            <Card style={{ height: "100%" }} className="border-0 category-shadow">
                <Link
                    to={`/subcategory/${props.data.slug}`}
                    style={{ color: "inherit", textDecoration: "inherit" }}>
                    <Card.Body className="text-center">
                        <Image
                            src={`https://bellefu.com/images/categories/${props.data.image}`}
                            style={{ height: "40px" }}
                        />
                        <Card.Text style={{ fontSize: "0.6em" }} className="mt-2">
                            {text[0]}
                        </Card.Text>
                    </Card.Body>
                </Link>
            </Card>
        </Col>
    )
}

export default MobileCategoryItem
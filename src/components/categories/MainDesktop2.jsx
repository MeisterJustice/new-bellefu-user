import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { ListGroup, Row, Col, Image, Accordion, Card } from "react-bootstrap";


const MainDesktop2 = (props) => {
    const [text, setText] = useState([
        props.data.name,
        'ads'
    ])
    const [originalText, setOriginalText] = useState([
        props.data.name,
        'ads'
    ])

    


    return (
        <ListGroup.Item>
            <Link
                to={`/product_list?subcategory=${props.data.slug}`}
                style={{ color: "inherit", textDecoration: "inherit" }}>
                <p style={{ fontSize: "0.66em", textAlign: 'center' }}>{text[0]}</p>
                <div style={{ marginTop: "-38px" }}>
                    <br />
                </div>
                <p
                    style={{
                        textAlign: 'center',
                        fontSize: "0.6em",
                        opacity: "0.5",
                        marginBottom: "-0px",
                        color: 'gray'
                    }}>
                    {props.data.products_count}{' '}{text[1]}
                </p>
            </Link>
        </ListGroup.Item>
    )
}

export default MainDesktop2
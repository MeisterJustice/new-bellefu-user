import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { ListGroup, Row, Col, Image, Accordion, Card } from "react-bootstrap";
import { IoMdArrowDropright } from "react-icons/io";
import { useEffect } from 'react';
import MainDesktop2 from './MainDesktop2';



const MainDesktopItem = (props) => {
    const [text, setText] = useState([
		props.data.name,
    ])
    const [originalText, setOriginalText] = useState([
		props.data.name,
    ])

    
    return (
        <Accordion>
        <Card className="border-0 cursor">
            <Accordion.Toggle
                as={Card.Header}
                style={{ backgroundColor: "white" }}
                eventKey="0">
                <div style={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column'}} type="button">
                    <div style={{alignSelf: 'center'}}>
                        <Image
                            height="40px"
                            width="40px"
                            src={`https://bellefu.com/images/categories/${props.data.image}`}
                            roundedCircle
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div className="pt-1">
                            <label className="mr-1" style={{ fontSize: "0.77em" }}>
                                {text[0]}
                            </label>
                        </div>
                        <div>
                            <IoMdArrowDropright
                                style={{ color: "#ffa500", fontSize: "20px" }}
                            />
                        </div>
                    </div>
                </div>
            </Accordion.Toggle>

            {/* =============SUB CATRGOTY=============== */}
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    {props.data.subcategories.map((data) => (
                        <MainDesktop2 id={props.id} language={props.language} data={data} key={data.slug}/>
                    ))}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>
    )
}

export default MainDesktopItem
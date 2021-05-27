import React, {useState} from "react";
import {Button, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import cn from "classname";

import styles from "./SearchBlock.module.css";


export default function SearchBlock({setSearchWordF, className, children}) {
    const [searchRequest, setSearchRequest] = useState(null);

    return (
        <div className={className}>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h1>Search file by word:</h1>
                </Col>
            </Row>
            <Row className={cn("justify-content-md-center", styles.block)} noGutters>
                <Col md="auto">
                    <InputGroup size="lg">
                        <FormControl onChange={(e) => setSearchRequest( e.target.value)}
                                     aria-label="Large"
                                     aria-describedby="inputGroup-sizing-sm"/>
                    </InputGroup>
                </Col>
                <Col md="auto">
                    <Button size="lg" onClick={() => setSearchWordF(searchRequest)}>Search</Button>
                </Col>
                <Col md="auto">
                    {children}
                </Col>
            </Row>
        </div>
    )
}
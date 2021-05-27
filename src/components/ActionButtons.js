import React from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import {downloadFile} from "../utils/api";

export default function ActionButtons(fileName, deleteF) {

    return (
        <ButtonGroup>
            <Button onClick={() => downloadFile(fileName)} variant="secondary">Download</Button>
            <Button onClick={() => deleteF(fileName)} variant="secondary">Delete</Button>
        </ButtonGroup>
    )
}
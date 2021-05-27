import React, {useRef} from "react";
import {Button} from "react-bootstrap";

export default function UploadFileBtn({uploadF}) {

    const inputFile = useRef(null);

    const onFileUploadButtonClick = () => {
        inputFile.current.click();
    }

    return (
        <div>
            <Button onClick={onFileUploadButtonClick} size="lg">
                Upload
            </Button>
            <input style={{display: "none"}}
                   ref={inputFile}
                   accept=".txt"
                   onChange={uploadF}
                   type="file"
            />
        </div>
    );
}
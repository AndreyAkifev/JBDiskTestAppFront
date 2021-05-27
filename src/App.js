import React, {useEffect, useState} from "react";
import {Col, Container} from 'react-bootstrap';
import axios from "axios";

import FilesTable from "./components/FilesTable";
import UploadFileBtn from "./components/UploadFileBtn";
import SearchBlock from "./components/SearchBlock";
import {deleteFile, queryPage, uploadFile} from "./utils/api";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import './App.css';


const CancelToken = axios.CancelToken;
let cancelSource = null;

export default function App() {

    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchWord, setSearchWord] = useState('');


    useEffect(() => {
        queryPageF({
            token: true,
        });
    }, [currentPage, pageSize, searchWord]);
    useEffect(() => {
        queryPageF({
            token: true
        });
    }, []);

    useEffect(() => {
        const onRefresh = () => {
            queryPageF({
                token: true,
            });
        };

        const timeoutId = setInterval(function timeoutRefresh() {
            onRefresh();
        }, 3 * 1000);

        return () => {
            if (timeoutId) clearInterval(timeoutId);
        }

    }, [currentPage, pageSize, searchWord]);

    const queryPageF = (options) => {
        if (cancelSource) {
            cancelSource.cancel("timeout");
            cancelSource = null;
        }
        cancelSource = CancelToken.source();
        return queryPage({
            word: searchWord,
            currentPage,
            size: pageSize,
            setItems,
            setTotal,
            cancelToken: options?.token ? cancelSource?.token : null
        });
    }

    const deleteF = (fileName) => {
        deleteFile(fileName)
            .then(() => queryPageF({token: false}));
    }

    const uploadF = (e) => {
        uploadFile(e.target.files[0])
            .then(() => queryPageF({token: false}));
    }

    const onSearchClickF = (w) => {
        setCurrentPage(1);
        setSearchWord(w);
    }

    return (
        <div>
            <Container>
                <br/>
                <SearchBlock setSearchWordF={onSearchClickF}>
                    <UploadFileBtn uploadF={uploadF}/>
                </SearchBlock>
                <Col>
                    <FilesTable items={items}
                                total={total}
                                currentPage={currentPage}
                                pageSize={pageSize}
                                deleteF={deleteF}
                                setCurrentPageF={setCurrentPage}
                    />
                </Col>
            </Container>
        </div>
    )

}
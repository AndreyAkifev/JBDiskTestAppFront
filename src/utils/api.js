import axios from "axios";
import jsSave from "js-file-download";

export function queryPage({ word, currentPage, size, setItems, setTotal, cancelToken }) {
    return axios.get(`/api/v1/files`, {
        params: {
            word: word,
            page: currentPage - 1,
            size: size,
            sort: 'originalFileName',
            timestamp: Date.now()
        },
        cancelToken: cancelToken,
    })
        .catch((e) => {
            if (!axios.isCancel(e)) {
                throw e;
            }
        })
        .then(
            (result) => {
                if (result) {
                    setItems(result.data.content);
                    setTotal(result.data.totalElements);
                }
            }
        );
}

export function uploadFile(file) {
    const data = new FormData();
    data.append("file", file);
    return axios.post("/api/v1/files", data, {})
        .catch((e) => {
            if (e.response?.data?.message) {
                window.alert(e.response.data.message);
            } else {
                window.alert(e);
            }
        });
}

export function deleteFile(fileName) {
    return axios.delete(`/api/v1/files/${fileName}`)
        .catch((e) => {
            if (e.response?.data?.message) {
                window.alert(e.response.data.message);
            } else {
                window.alert(e);
            }
        });
}

export function downloadFile(fileName) {
    return axios.get(`/api/v1/files/${fileName}`, {
        params: {
            timestamp: Date.now()
        },
        responseType: 'blob'
    }).then(value => {
        jsSave(value.data, fileName);
    }).catch(e => {
        window.alert(e.message);
    });
}
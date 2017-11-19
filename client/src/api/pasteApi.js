import axios from 'axios';

import {apiUrl} from './api';
import querystring from 'querystring';

class PasteApi {

    static getPastes(abuse, offset) {
        return axios.get(`${apiUrl()}/pastes`,
            {
                headers: {
                    "X-Pastebin-User-Token": localStorage.getItem("userToken")
                },
                params: {
                    abuse,
                    offset
                }
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    static getPaste(pasteId) {
        return axios.get(`${apiUrl()}/pastes/${pasteId}`, {
            headers: {
                "X-Pastebin-User-Token": localStorage.getItem("userToken")
            },
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    static changePasteAbuse(pasteId, abuse) {
        if (localStorage.getItem("admin") !== "true") {
            throw new Error("Not an administrator, fail");
        }
        console.log(abuse);
        return axios.patch(`${apiUrl()}/pastes/${pasteId}`, {
                abuse
            },
            {
                headers: {
                    "X-Pastebin-User-Token": localStorage.getItem("userToken")
                }
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    static savePaste(paste) {

        let headers = {};

        if (localStorage.getItem("userToken")) {
            headers['X-Pastebin-User-Token'] = localStorage.getItem("userToken");
        }
        ;

        return axios.post(`${apiUrl()}/pastes`, {
            'content': paste.code,
            'language': paste.language
        }, {
            headers: headers
        })
            .then(response => {
                let userToken = localStorage.getItem("userToken");

                if (!userToken || userToken === 'undefined') {
                    localStorage.setItem("userToken", response.headers['x-pastebin-user-token']);
                }

                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    static deletePaste(pasteId) {
        return axios.delete(`${apiUrl()}/pastes/${pasteId}`)
            .then(response => {
                if (response.status === 204) {
                    return pasteId;
                }
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    static checkAdmin(adminKey) {
        let data = querystring.stringify({
            "admin_key": adminKey,
        });

        return axios.post(`${apiUrl()}/admin`, data)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw new Error(error);
            });
    }

}

export default PasteApi;

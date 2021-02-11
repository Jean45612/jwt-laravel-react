import axios from "axios";

import "../services/interceptor-api.js"; //EL INTERCEPTOR ME PERMITE VALIDAR LOS SOLICITUDES Y RESPUESTAS DE MIS PETICIONES API

export default {

    get(url, urlParams = '') {

        const params = urlParams ? '/' + urlParams : '';

        return axios.get(url + params).then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error.response));
    },

    post(url, body) {
        return axios.post(url, JSON.stringify(body)).then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error.response));
    },

    put(url, urlParams, body) {
        return axios.put(url + '/' + urlParams, JSON.stringify(body)).then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error.response));
    },

    delete(url, urlParams) {
        return axios.delete(url + '/' + urlParams).then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error.response));
    },

    uploadFiles(url, formData) {
        return axios.post(url, formData).then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error.response));
    },

    downloadFile(url, body) {
        return axios.post(url, JSON.stringify(body), {
            responseType: 'blob',
        }).then((response) => {
            const FILENAME = response.headers['content-disposition'].split(';')[1].trim().split('=')[1];
            
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', FILENAME);
            document.body.appendChild(fileLink);

            fileLink.click();
        }).catch((error) => Promise.reject(error.response));
    }
}

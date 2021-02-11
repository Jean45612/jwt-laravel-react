import axios from "axios";
import Token from "./token.js";
import swal from "./swal.js";
import {
    Redirect
} from "react-router-dom";

//INTERCEPTOR REQUEST

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
    config => {
        const token = Token.getToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json;charset=utf-8';

        if (config.method === 'post' && config.data.toString() === "[object FormData]") { //SI ES QUE VOY A SUBIR IMAGENES ELIMINO LO DEL APLICATION JSON
            delete config.headers['Content-Type'];
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    });

//INTERCEPTOR RESPONSE

axios.interceptors.response.use((response) => {
    return response
}, function (error) {

    if (error.response.status == 401 && error.response.data.message == "Token has expired") {//SI EL ERROR ES POR TOKEN
        return refreshToken(error);
    }

    if (error.response.data.message == "Token has expired and can no longer be refreshed") {
        swal.alerta("La sesión ha expirado", "warning");
        Token.remove();
        <Redirect to='/login' />
    }

    if ( //SI ES QUE EL ERROR ES DE TIPO BLOB
        error.request.responseType === 'blob' &&
        error.response.data instanceof Blob &&
        error.response.data.type &&
        error.response.data.type.toLowerCase().indexOf('json') != -1
    ) {
        return errorBlob(error);
    };

    return Promise.reject(error);
});

////LEER ERRORES DE TIPO BLOB/////////

function errorBlob(error) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => {
            error.response.data = JSON.parse(reader.result);
            resolve(Promise.reject(error));
        };

        reader.onerror = () => {
            reject(error);
        };

        reader.readAsText(error.response.data);
    });
}


/////////////REFRESCAR TOKEN//////////

let refreshingToken = false;

// LISTA DE SOLICITUDES EN COLA QUE SE EJECUTARAN DESPUES DE QUE EL TOKEN SE REFRESQUE
let subscribers = [];

async function refreshToken(error) {
    try {
        const errorResponse = error.response;

        /* Creamos una promesa que reintentará la solicitud*/
        const retryOriginalRequest = new Promise(resolve => {
            /* Agregamos el reintento de solicitud a la cola */
            addSubscriber(access_token => {
                errorResponse.config.headers.Authorization = 'Bearer ' + access_token;
                resolve(axios(errorResponse.config));
            });
        });

        if (!refreshingToken) {
            refreshingToken = true;
            const response = await axios.post('refresh', {});
            if (!response.data) {
                return Promise.reject(error);
            }
            Token.setToken(response.data.access_token, response.data.user);
            refreshingToken = false;
            onAccessTokenFetched(response.data.access_token);
        }
        return retryOriginalRequest;
    } catch (err) {
        return Promise.reject(err);
    }
}

function onAccessTokenFetched(access_token) {
    //Cuando la actualización es exitosa, comenzamos a reintentar las solicitudes una por una y vaciamos la cola
    subscribers.forEach(callback => callback(access_token));
    subscribers = [];
}

function addSubscriber(callback) {
    subscribers.push(callback);
}

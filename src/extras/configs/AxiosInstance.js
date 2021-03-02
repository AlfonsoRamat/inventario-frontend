import axios from 'axios';

// axios.defaults.withCredentials = true;

const AxiosInstance = (history = null) => {

    const baseURL = 'http://localhost:3004';

    const axiosInstance = axios.create({
        baseURL: baseURL,
        withCredentials: true
    });

    axiosInstance.interceptors.request.use(req => { // Incluye el token de autorizacion en todas las request cuando este disponible
        if (localStorage.token) {
            req.headers.authorization = `Bearer ${localStorage.token}`;
        }
        return req;
    });


    axiosInstance.interceptors.response.use( // Si la respuesta tiene un status de 2xx la devuelve
        response => response,
        error => {// Si la respuesta tiene un status de 3xx o mas ejecuta el siguiente codigo
            return new Promise((resolve, reject) => {
                const pedidoOriginal = error.config;
                if (error.response && error.response.status === 401 && error.config && !error.config._retry) {
                    pedidoOriginal._retry = true;
                    console.log('about to retry');
                    const resultado = fetch(`${baseURL}/usuarios/refresh-token`, {
                        method: 'POST',
                        credentials: 'include'
                    }).then(res => {
                        if (res.status === 200) {
                            res.json().then(res => {
                                console.log('res is 200');
                                localStorage.setItem('token', res.accessToken);
                                return axios(pedidoOriginal);
                            }).catch(err => console.log(err));
                        }
                    });
                    resolve(resultado);
                }
                reject('log in again');
            });
        }
    );

    return axiosInstance;
}

export default AxiosInstance;





import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from "axios"

axios.interceptors.request.use(request => {
    console.log("successfull request! ", request)
    //edit the request if neccesary e.g. adding auth header
    //return it, to not block it!
    return request;
}, error => {
    console.log("failed request! ", error);
    Promise.reject(error);
})

axios.interceptors.response.use(response => {
    console.log("successfull response! ", response)
    //edit the response if neccesary
    //return it, to not block it!
    return response;
}, error => {
    console.log("failed response! ", error);
    Promise.reject(error);
})

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();

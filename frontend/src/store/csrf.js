// ./frontend/src/store/csrf.js

import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}){
    // set options.method to 'GET' if there is no method
    options.method = options.method || 'GET';
    //set options.headers to an empty object if there is no headers
    options.header = options.headers || {};

    // if the options.headers is not 'GET', set "Content-Type" header to
    // "application/json", and set the "XSRF-TOKEN" header to the value of
    // the "XSRF-TOKEN" cookie
    if(options.method.toUpperCase() !== 'GET'){
        options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }

    // call the default window's fetch with the url and the options passed in
    const res = await window.fetch(url, options);

    // if the response status code is 400 or above, then throw the error with 
    // the error being in the response
    if(res.status >= 400) throw res;

    // if the response status code is under 400, then return the resposne to the
    // next promise chain
    return res;
}
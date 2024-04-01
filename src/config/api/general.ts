import axios from "axios";

export const REST_URL = axios.create({
    baseURL: 'https://restcountries.com/v3.1',
    headers: {'content-type': 'application/json'}
})

export const API_URL = axios.create({
    baseURL: 'http://192.168.100.5:3000',
    headers: {'content-type': 'application/json'}
})


export const API_JSON = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    // headers: {'content-type': 'application/json'}
})


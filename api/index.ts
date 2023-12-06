import axios from "axios";
import pages from './pages'

let API_URL = 'http://localhost:3001';

const config = {
    API_URL,
}

export const Api = {
    pages: pages(axios, config),
}
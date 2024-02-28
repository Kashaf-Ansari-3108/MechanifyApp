import axios from "axios";

const instance = axios.create({
    baseURL: 'https://dull-gray-sari.cyclic.app/api/'
    
})

export default instance;
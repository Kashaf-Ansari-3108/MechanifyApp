import axios from "axios";

const instance = axios.create({
    baseURL: 'https://odd-jade-brown-bear-hem.cyclic.app/api/'
    
})

export default instance;
import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://olegegoism.pythonanywhere.com/',
    timeout: 60000,
});

export default httpClient;